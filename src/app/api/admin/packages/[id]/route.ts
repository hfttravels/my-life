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

export async function PUT(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const isAuth = await checkAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await props.params;

  try {
    const data = await request.json();

    const existingPkg = await db.query.packages.findFirst({
      where: eq(packages.id, id),
      with: { destination: true },
    });

    if (!existingPkg) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    const dest = await db.query.destinations.findFirst({
      where: eq(destinations.id, data.destinationId || existingPkg.destinationId),
    });

    const wasPublished = existingPkg.isPublished;
    const isNowPublished = Boolean(data.isPublished);

    await db
      .update(packages)
      .set({
        destinationId: data.destinationId || existingPkg.destinationId,
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
        heroImage: data.heroImage || existingPkg.heroImage,
        gallery: data.gallery || [],
        seoTitle: data.seoTitle || `${data.name} | Hassle Free Travels`,
        seoDescription: data.seoDescription || data.tagline || "",
        ogImage: data.ogImage || data.heroImage || null,
        canonicalPath: dest
          ? `/destination/${dest.slug}/${data.slug.trim().toLowerCase()}`
          : `/destination/${data.slug.trim().toLowerCase()}`,
        isPublished: isNowPublished,
        isFeatured: Boolean(data.isFeatured),
        publishedAt: !wasPublished && isNowPublished ? new Date() : existingPkg.publishedAt,
        updatedAt: new Date(),
      })
      .where(eq(packages.id, id));

    // Update Days (replace existing)
    if (data.daysList && Array.isArray(data.daysList)) {
      await db.delete(packageDays).where(eq(packageDays.packageId, id));
      for (let i = 0; i < data.daysList.length; i++) {
        const d = data.daysList[i];
        if (d.title && d.body) {
          await db.insert(packageDays).values({
            packageId: id,
            dayNumber: i + 1,
            title: d.title,
            body: d.body,
            meals: d.meals || null,
            stay: d.stay || null,
          });
        }
      }
    }

    // Update FAQs (replace existing)
    if (data.faqsList && Array.isArray(data.faqsList)) {
      await db.delete(packageFaqs).where(eq(packageFaqs.packageId, id));
      for (let i = 0; i < data.faqsList.length; i++) {
        const f = data.faqsList[i];
        if (f.question && f.answer) {
          await db.insert(packageFaqs).values({
            packageId: id,
            question: f.question,
            answer: f.answer,
            sortOrder: i + 1,
          });
        }
      }
    }

    // Update Items (replace existing)
    if (data.itemsList && Array.isArray(data.itemsList)) {
      await db.delete(packageItems).where(eq(packageItems.packageId, id));
      for (let i = 0; i < data.itemsList.length; i++) {
        const item = data.itemsList[i];
        if (item.label) {
          await db.insert(packageItems).values({
            packageId: id,
            kind: item.kind || "inclusion",
            label: item.label,
            sortOrder: i + 1,
          });
        }
      }
    }

    // Revalidate paths on save
    if (dest) {
      revalidatePath(`/destination/${dest.slug}/${existingPkg.slug}`);
      revalidatePath(`/destination/${dest.slug}/${data.slug.trim().toLowerCase()}`);
      revalidatePath(`/destination/${dest.slug}`);
    }
    revalidatePath(`/tours/${existingPkg.slug}`);
    revalidatePath(`/tours/${data.slug.trim().toLowerCase()}`);
    revalidatePath("/sitemap.xml");
    revalidatePath("/");

    return NextResponse.json({ success: true, slug: data.slug.trim().toLowerCase() });
  } catch (err: unknown) {
    console.error("Update package error:", err);
    return NextResponse.json(
      { error: (err as Error).message || "Failed to update package" },
      { status: 500 }
    );
  }
}
