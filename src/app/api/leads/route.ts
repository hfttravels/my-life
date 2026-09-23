import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { leads, leadScores, leadActivities, visitors, sessions } from "@/db/schema";
import { calculateLeadScore } from "@/lib/leads/scoring";
import {
  sendInternalTelegramAlert,
  sendInternalEmailAlert,
  sendCustomerWelcomeEmail,
} from "@/lib/notifications/channels";
import { eq } from "drizzle-orm";

const leadSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .max(15)
    .regex(/^[0-9+\-\s()]+$/, "Invalid phone format"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  destination: z.string().max(200).optional().default(""),
  travelDate: z.string().max(100).optional().default(""),
  message: z.string().max(2000).optional().default(""),
  sourcePage: z.string().max(500).optional().default(""),
  tripType: z.enum(["group", "custom", "unknown"]).optional(),
  packageId: z.string().uuid().optional().or(z.literal("")),
  packageSlug: z.string().max(200).optional().default(""),
  destinationId: z.string().uuid().optional().or(z.literal("")),
  destinationSlug: z.string().max(200).optional().default(""),
  paxAdults: z
    .union([z.number(), z.string().regex(/^\d+$/).transform(Number)])
    .optional(),
  paxChildren: z
    .union([z.number(), z.string().regex(/^\d+$/).transform(Number)])
    .optional(),
  source: z.string().max(100).optional().default("website"),

  // Extended Lead Intelligence Fields
  departureCity: z.string().max(200).optional(),
  budget: z.string().max(100).optional(),
  durationPreference: z.string().max(100).optional(),
  accommodationPreference: z.string().max(100).optional(),
  customRequirements: z.string().max(2000).optional(),
  communicationPreference: z.enum(["whatsapp", "email", "phone"]).optional().default("whatsapp"),
  visitorId: z.string().max(100).optional(),
  sessionId: z.string().max(100).optional(),
  utmSource: z.string().max(100).optional(),
  utmMedium: z.string().max(100).optional(),
  utmCampaign: z.string().max(100).optional(),
  utmTerm: z.string().max(100).optional(),
  utmContent: z.string().max(100).optional(),

  // Honeypot field — bots fill this
  website: z.string().optional(),
});

type LeadPayload = z.infer<typeof leadSchema>;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const lead = parsed.data;

    // Honeypot check: if the hidden `website` field is filled, a bot submitted this
    if (lead.website) {
      return NextResponse.json({ success: true });
    }

    // 1. Calculate Real-Time Lead Score & Intelligence Grade
    const scoreResult = calculateLeadScore({
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      destinationSlug: lead.destinationSlug || lead.destination,
      packageSlug: lead.packageSlug,
      travelDate: lead.travelDate,
      departureCity: lead.departureCity,
      paxAdults: lead.paxAdults,
      paxChildren: lead.paxChildren,
      tripType: lead.tripType,
      budget: lead.budget,
      message: lead.message,
      source: lead.source,
    });

    // 2. Insert into PostgreSQL leads table
    let insertedLeadId: string;
    try {
      const [newLead] = await db
        .insert(leads)
        .values({
          name: lead.name,
          phone: lead.phone,
          email: lead.email || null,
          destinationId: lead.destinationId || null,
          packageId: lead.packageId || null,
          packageSlug: lead.packageSlug || null,
          destinationSlug: lead.destinationSlug || null,
          travelDate: lead.travelDate || null,
          paxAdults: lead.paxAdults ?? null,
          paxChildren: lead.paxChildren ?? null,
          tripType: lead.tripType || "unknown",
          message: lead.message || null,
          source: lead.source || "website",
          sourcePage: lead.sourcePage || null,
          status: "new",
          pipelineStage: "new",
          priority: scoreResult.grade === "hot" ? "urgent" : scoreResult.grade === "warm" ? "high" : "medium",
          leadScore: scoreResult.score,
          leadGrade: scoreResult.grade,
          departureCity: lead.departureCity || null,
          budget: lead.budget || null,
          durationPreference: lead.durationPreference || null,
          accommodationPreference: lead.accommodationPreference || null,
          customRequirements: lead.customRequirements || null,
          communicationPreference: lead.communicationPreference,
          visitorId: lead.visitorId || null,
          sessionId: lead.sessionId || null,
          utmSource: lead.utmSource || null,
          utmMedium: lead.utmMedium || null,
          utmCampaign: lead.utmCampaign || null,
          utmTerm: lead.utmTerm || null,
          utmContent: lead.utmContent || null,
        })
        .returning({ id: leads.id });

      insertedLeadId = newLead.id;

      // 3. Save Lead Score Breakdown
      await db.insert(leadScores).values({
        leadId: insertedLeadId,
        score: scoreResult.score,
        grade: scoreResult.grade,
        engagementScore: scoreResult.engagementScore,
        intentScore: scoreResult.intentScore,
        fitScore: scoreResult.fitScore,
        budgetScore: scoreResult.budgetScore,
        urgencyScore: scoreResult.urgencyScore,
        breakdownJson: JSON.stringify(scoreResult.breakdown),
        aiSummary: scoreResult.aiSummary,
        recommendedAction: scoreResult.recommendedAction,
      });

      // 4. Record Lead Activity
      await db.insert(leadActivities).values({
        leadId: insertedLeadId,
        activityType: "form_submitted",
        title: `Enquiry Submitted via ${lead.source || "Website"}`,
        description: `Source Page: ${lead.sourcePage || "/"}, Score: ${scoreResult.score}/100 (${scoreResult.grade})`,
        performedBy: lead.name,
      });

      // 5. Link Visitor / Session if available
      if (lead.visitorId) {
        await db
          .update(visitors)
          .set({ leadId: insertedLeadId })
          .where(eq(visitors.visitorId, lead.visitorId))
          .catch(() => {});
      }
      if (lead.sessionId) {
        await db
          .update(sessions)
          .set({ leadId: insertedLeadId, converted: true })
          .where(eq(sessions.sessionId, lead.sessionId))
          .catch(() => {});
      }
    } catch (dbErr) {
      console.error("[leads] Database insert failed:", dbErr);
      return NextResponse.json(
        {
          success: false,
          error:
            "Could not record your enquiry. Please WhatsApp us directly at +91 8375030889 for instant assistance.",
        },
        { status: 500 }
      );
    }

    // 6. Secondary alerts (Non-blocking): Resend email & Telegram
    const notificationPayload = {
      leadId: insertedLeadId,
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      destination: lead.destination || lead.destinationSlug,
      packageSlug: lead.packageSlug,
      travelDate: lead.travelDate,
      departureCity: lead.departureCity,
      paxAdults: lead.paxAdults,
      paxChildren: lead.paxChildren,
      tripType: lead.tripType,
      budget: lead.budget,
      message: lead.message,
      source: lead.source,
      sourcePage: lead.sourcePage,
      leadScore: scoreResult.score,
      leadGrade: scoreResult.grade,
      recommendedAction: scoreResult.recommendedAction,
    };

    // Fire-and-forget notification delivery
    Promise.allSettled([
      sendInternalTelegramAlert(notificationPayload),
      sendInternalEmailAlert(notificationPayload),
      lead.email ? sendCustomerWelcomeEmail(notificationPayload) : Promise.resolve(false),
    ]).catch((err) => {
      console.error("[leads] Notification worker error:", err);
    });

    return NextResponse.json({
      success: true,
      leadId: insertedLeadId,
      leadScore: scoreResult.score,
      leadGrade: scoreResult.grade,
    });
  } catch (err) {
    console.error("[leads] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
