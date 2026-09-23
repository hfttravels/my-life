import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { checkAdminSession } from "@/lib/adminAuth";
import { db } from "@/db";
import {
  packages,
  packageDays,
  packageFaqs,
  packageItems,
  destinations,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const isAuth = await checkAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();

    const dest = await db.query.destinations.findFirst({
      where: eq(destinations.id, data.destinationId),
    });

    if (!dest) {
      return NextResponse.json({ error: "Destination not found" }, { status: 400 });
    }

    const [newPkg] = await db
      .insert(packages)
      .values({
        destinationId: data.destinationId,
        slug: data.slug.trim().toLowerCase(),
        name: data.name.trim(),
        tagline: data.tagline || null,
        packageType: data.packageType || "group",
        nights: Number(data.nights) || 1,
        days: Number(data.days) || 2,
        startingPriceInr: data.startingPriceInr ? Number(data.startingPriceInr) : null,
        priceNote: data.priceNote || null,
        includesFlights: Boolean(data.includesFlights),
        groupSizeMin: data.groupSizeMin ? Number(data.groupSizeMin) : null,
        groupSizeMax: data.groupSizeMax ? Number(data.groupSizeMax) : null,
        departureCities: data.departureCities || [],
        bestMonths: data.bestMonths || [],
        highlights: data.highlights || [],
        mealsSummary: data.mealsSummary || null,
        staySummary: data.staySummary || null,
        transportSummary: data.transportSummary || null,
        visaNote: data.visaNote || null,
        heroImage: data.heroImage || "/dest-mountain.jpg",
        gallery: data.gallery || [],
        seoTitle: data.seoTitle || `${data.name} | Hassle Free Travels`,
        seoDescription: data.seoDescription || data.tagline || "",
        ogImage: data.ogImage || data.heroImage || null,
        canonicalPath: `/destination/${dest.slug}/${data.slug.trim().toLowerCase()}`,
        isPublished: Boolean(data.isPublished),
        isFeatured: Boolean(data.isFeatured),
        publishedAt: data.isPublished ? new Date() : null,
      })
      .returning();

    // Insert Days
    if (data.daysList && Array.isArray(data.daysList)) {
      for (let i = 0; i < data.daysList.length; i++) {
        const d = data.daysList[i];
        if (d.title && d.body) {
          await db.insert(packageDays).values({
            packageId: newPkg.id,
            dayNumber: i + 1,
            title: d.title,
            body: d.body,
            meals: d.meals || null,
            stay: d.stay || null,
          });
        }
      }
    }

    // Insert FAQs
    if (data.faqsList && Array.isArray(data.faqsList)) {
      for (let i = 0; i < data.faqsList.length; i++) {
        const f = data.faqsList[i];
        if (f.question && f.answer) {
          await db.insert(packageFaqs).values({
            packageId: newPkg.id,
            question: f.question,
            answer: f.answer,
            sortOrder: i + 1,
          });
        }
      }
    }

    // Insert Items
    if (data.itemsList && Array.isArray(data.itemsList)) {
      for (let i = 0; i < data.itemsList.length; i++) {
        const item = data.itemsList[i];
        if (item.label) {
          await db.insert(packageItems).values({
            packageId: newPkg.id,
            kind: item.kind || "inclusion",
            label: item.label,
            sortOrder: i + 1,
          });
        }
      }
    }

    // Revalidate paths on save
    revalidatePath(`/destination/${dest.slug}/${newPkg.slug}`);
    revalidatePath(`/destination/${dest.slug}`);
    revalidatePath(`/tours/${newPkg.slug}`);
    revalidatePath("/sitemap.xml");
    revalidatePath("/");

    return NextResponse.json({ success: true, id: newPkg.id, slug: newPkg.slug });
  } catch (err: unknown) {
    console.error("Create package error:", err);
    return NextResponse.json(
      { error: (err as Error).message || "Failed to create package" },
      { status: 500 }
    );
  }
}
