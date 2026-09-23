import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { db } from "./index";
import {
  destinations,
  packages,
  packageDays,
  packageItems,
  packageFaqs,
} from "./schema";
import { eq, and } from "drizzle-orm";
import { ALL_DESTINATIONS } from "../data/destinations";
import { THAILAND_PACKAGES } from "../data/thailand-packages";

async function seedThailand() {
  console.log("🌱 Starting Thailand database seed...");

  try {
    const thailandDestData = ALL_DESTINATIONS["thailand"];
    if (!thailandDestData) {
      throw new Error("Thailand not found in ALL_DESTINATIONS");
    }

    let destId: string;
    const existingDest = await db
      .select()
      .from(destinations)
      .where(eq(destinations.slug, "thailand"))
      .limit(1);

    const destValues = {
      slug: "thailand",
      name: thailandDestData.name,
      country: "Thailand",
      type: thailandDestData.type || "international",
      tagline: thailandDestData.trending2026?.tagline || thailandDestData.hero.badge,
      overview: thailandDestData.trending2026?.whyTrending || thailandDestData.hero.subtitle,
      best_season: "Nov–Feb",
      ideal_duration: "5N–7N (typical 6N/7D)",
      hero_image: thailandDestData.hero.image || "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80",
      og_image: thailandDestData.hero.image || "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80",
      seo_title: thailandDestData.hero.title,
      seo_description: thailandDestData.hero.subtitle,
      is_published: true,
      sort_order: 1,
    };

    if (existingDest.length > 0) {
      destId = existingDest[0].id;
      await db.update(destinations).set(destValues).where(eq(destinations.id, destId));
      console.log("✅ Updated existing Thailand destination:", destId);
    } else {
      const [inserted] = await db.insert(destinations).values(destValues).returning();
      destId = inserted.id;
      console.log("✅ Created Thailand destination:", destId);
    }

    console.log(`📦 Seeding ${THAILAND_PACKAGES.length} Thailand packages into database...`);

    for (let i = 0; i < THAILAND_PACKAGES.length; i++) {
      const tp = THAILAND_PACKAGES[i];
      console.log(`[${i + 1}/${THAILAND_PACKAGES.length}] Processing package: ${tp.slug}`);

      const pkgData = {
        destinationId: destId,
        slug: tp.slug,
        name: tp.name,
        tagline: tp.tagline,
        packageType: tp.packageType,
        nights: tp.nights,
        days: tp.days,
        startingPriceInr: tp.priceFromINR,
        priceNote: tp.priceNote,
        includesFlights: false,
        groupSizeMin: tp.isGroup ? 2 : 2,
        groupSizeMax: tp.isGroup ? 16 : null,
        departureCities: tp.departureCities || ["Delhi", "Mumbai", "Bengaluru"],
        bestMonths: tp.bestMonths,
        highlights: tp.highlights,
        mealsSummary: tp.mealsSummary || "Daily Breakfast",
        staySummary: tp.staySummary || tp.hotelCategory,
        transportSummary: tp.transportSummary || "Private A/C vehicle",
        visaNote: tp.visaNote,
        heroImage: tp.heroImage,
        seoTitle: tp.seoTitle,
        seoDescription: tp.seoDescription,
        ogImage: tp.heroImage,
        canonicalPath: `/destination/thailand/${tp.slug}`,
        isPublished: true,
        isFeatured: tp.isFeatured,
      };

      const existingPkg = await db
        .select()
        .from(packages)
        .where(and(eq(packages.destinationId, destId), eq(packages.slug, tp.slug)))
        .limit(1);

      let pkgId: string;
      if (existingPkg.length > 0) {
        pkgId = existingPkg[0].id;
        await db.update(packages).set(pkgData).where(eq(packages.id, pkgId));
        await db.delete(packageDays).where(eq(packageDays.packageId, pkgId));
        await db.delete(packageItems).where(eq(packageItems.packageId, pkgId));
        await db.delete(packageFaqs).where(eq(packageFaqs.packageId, pkgId));
      } else {
        const [insertedPkg] = await db.insert(packages).values(pkgData).returning();
        pkgId = insertedPkg.id;
      }

      // Insert Itinerary Days
      if (tp.itineraryDays && tp.itineraryDays.length > 0) {
        const daysToInsert = tp.itineraryDays.map((d) => ({
          packageId: pkgId,
          dayNumber: d.dayNumber,
          title: d.title,
          body: d.body,
          meals: d.meals || null,
          stay: d.stay || null,
        }));
        await db.insert(packageDays).values(daysToInsert);
      }

      // Insert Inclusions and Exclusions
      const itemsToInsert: {
        packageId: string;
        kind: "inclusion" | "exclusion";
        label: string;
        sortOrder: number;
      }[] = [];

      let incOrder = 1;
      for (const inc of tp.inclusions) {
        itemsToInsert.push({
          packageId: pkgId,
          kind: "inclusion",
          label: inc,
          sortOrder: incOrder++,
        });
      }

      let excOrder = 1;
      for (const exc of tp.exclusions) {
        itemsToInsert.push({
          packageId: pkgId,
          kind: "exclusion",
          label: exc,
          sortOrder: excOrder++,
        });
      }

      if (itemsToInsert.length > 0) {
        await db.insert(packageItems).values(itemsToInsert);
      }

      // Insert Standard FAQs
      const faqsToInsert = [
        {
          packageId: pkgId,
          question: "Are Indian vegetarian and Jain meals available on this tour?",
          answer: "Yes! Hassle Free Travels coordinates vetted Indian and local vegetarian/Jain meal options on all our Thailand itineraries.",
          sortOrder: 1,
        },
        {
          packageId: pkgId,
          question: "What is the visa process for Indian passport holders?",
          answer: tp.visaNote,
          sortOrder: 2,
        },
        {
          packageId: pkgId,
          question: "Are flights included in this package price?",
          answer: "This is a land-only package. International and domestic flights are excluded unless specifically stated. Our team will assist with flight ticketing upon request.",
          sortOrder: 3,
        },
      ];
      await db.insert(packageFaqs).values(faqsToInsert);
    }

    console.log("🎉 Thailand database seeding completed successfully!");
  } catch (err) {
    console.error("❌ Thailand seeding failed:", err);
    process.exit(1);
  }
}

seedThailand();
