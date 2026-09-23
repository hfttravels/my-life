import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import * as fs from "fs";
import * as path from "path";
import { db } from "./index";
import {
  destinations,
  packages,
  packageDays,
  packageItems,
} from "./schema";
import { eq } from "drizzle-orm";
import { ALL_DESTINATIONS } from "../data/destinations";

const USD_TO_INR = 84;

function roundToMarketingPrice(inr: number): number {
  return Math.ceil(inr / 1000) * 1000 - 1; // e.g. 83500 -> 83999
}

async function seedVietnam() {
  console.log("🌱 Starting Vietnam database seed...");

  try {
    const vietnamDestData = ALL_DESTINATIONS["vietnam"];
    if (!vietnamDestData) {
      throw new Error("Vietnam not found in ALL_DESTINATIONS");
    }

    let destId: string;
    const existingDest = await db
      .select()
      .from(destinations)
      .where(eq(destinations.slug, "vietnam"))
      .limit(1);

    if (existingDest.length > 0) {
      destId = existingDest[0].id;
      console.log("✅ Found existing Vietnam destination:", destId);
    } else {
      const [inserted] = await db
        .insert(destinations)
        .values({
          slug: "vietnam",
          name: vietnamDestData.name,
          type: vietnamDestData.type || "international",
          tagline: vietnamDestData.hero.badge,
          overview: vietnamDestData.hero.subtitle,
          best_season: "Oct–Apr",
          ideal_duration: "6N / 7D",
          hero_image: vietnamDestData.hero.image,
          og_image: vietnamDestData.hero.image,
          seo_title: vietnamDestData.hero.title,
          seo_description: vietnamDestData.hero.subtitle,
          is_published: true,
          sort_order: 10,
        })
        .returning();
      destId = inserted.id;
      console.log("✅ Created Vietnam destination:", destId);
    }

    // Parse the MD file
    const mdPath = path.resolve(process.cwd(), "vietnam-packages-hft.md");
    const mdContent = fs.readFileSync(mdPath, "utf-8");

    // We'll split the content by package headers
    const packageBlocks = mdContent.split(/### (?:Group Package #\d+|FIT \d+)[^\n]*/).slice(1);
    
    // Slugs from the prompt:
    const slugs = [
      "vietnam-classic-group-10d",
      "vietnam-highlights-group-9d",
      "vietnam-classic-private-8d",
      "north-vietnam-sapa-ha-long-8d",
      "phu-quoc-island-escape-5d",
      "ha-giang-loop-adventure-5d",
      "vietnam-honeymoon-luxury-10d",
      "da-nang-hoi-an-private-6d",
      "ninh-binh-ha-long-private-6d",
      "south-vietnam-mekong-private-7d",
      "vietnam-food-trail-8d",
      "vietnam-north-south-private-14d",
      "sapa-trekking-homestay-4d",
      "vietnam-family-private-10d",
      "ha-long-luxury-cruise-3d",
      "hue-heritage-spiritual-5d",
      "central-vietnam-private-5d",
      "ha-long-sapa-adventure-7d",
      "phu-quoc-hcmc-private-7d",
      "vietnam-cycling-mekong-hoi-an-10d"
    ];

    if (packageBlocks.length !== 20) {
      console.error(`Found ${packageBlocks.length} packages in MD, expected 20.`);
    }

    for (let i = 0; i < Math.min(20, packageBlocks.length); i++) {
      const block = packageBlocks[i];
      const slug = slugs[i];
      
      const isGroup = i < 2;
      const packageType = isGroup ? "group" : "custom";
      
      // Extract Duration
      const durationMatch = block.match(/\*\*Duration:\*\*\s*(.+)/);
      const durationStr = durationMatch ? durationMatch[1].trim() : "";
      const daysMatch = durationStr.match(/(\d+)\s*[dD]ays?/);
      const nightsMatch = durationStr.match(/(\d+)\s*[nN]ights?/);
      const days = daysMatch ? parseInt(daysMatch[1]) : 0;
      const nights = nightsMatch ? parseInt(nightsMatch[1]) : 0;

      // Extract Route
      const routeMatch = block.match(/\*\*Route:\*\*\s*(.+)/);
      const routeStr = routeMatch ? routeMatch[1].trim() : "";

      // Extract Price
      const priceMatch = block.match(/\*\*From-Price:\*\*\s*From USD ([\d,]+)/);
      const usdPrice = priceMatch ? parseInt(priceMatch[1].replace(/,/g, "")) : 0;
      const inrPrice = roundToMarketingPrice(usdPrice * USD_TO_INR);

      // Extract Title (from the heading we split by, so we need to find it before the split or we can just make one up or use the first line of the block if it has one? Actually the title was in the split regex. Let's find it another way, or just use the slug to generate title)
      const name = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

      // Extract Visa Note
      const visaMatch = block.match(/\*\*Visa Note:\*\*\s*(.+)/);
      const visaNote = visaMatch ? visaMatch[1].trim() : "Vietnam e-visa required (USD 25, apply at https://evisa.xuatnhapcanh.gov.vn, ~3 business days)";

      console.log(`Seeding package ${i+1}/20: ${slug}`);

      const existingPkg = await db
        .select()
        .from(packages)
        .where(eq(packages.slug, slug))
        .limit(1);

      let pkgId: string;
      const pkgData = {
        destinationId: destId,
        slug: slug,
        name: name,
        tagline: routeStr,
        packageType: packageType,
        nights: nights,
        days: days,
        startingPriceInr: inrPrice,
        priceNote: "per person, twin share, land only, international flights extra",
        includesFlights: false,
        visaNote: visaNote,
        heroImage: "/dest-jungle.jpg", 
        seoTitle: `${name} | Hassle Free Travels`,
        seoDescription: `Enjoy ${durationStr} in Vietnam. ${routeStr}`,
        isPublished: true,
      };

      if (existingPkg.length > 0) {
        pkgId = existingPkg[0].id;
        await db.update(packages).set(pkgData).where(eq(packages.id, pkgId));
        await db.delete(packageDays).where(eq(packageDays.packageId, pkgId));
        await db.delete(packageItems).where(eq(packageItems.packageId, pkgId));
      } else {
        const [newPkg] = await db.insert(packages).values(pkgData).returning();
        pkgId = newPkg.id;
      }

      // Parse Days
      const daysSectionMatch = block.match(/#### Full Day-by-Day Itinerary([\s\S]*?)(?=\*\*Inclusions:\*\*|---)/);
      if (daysSectionMatch) {
        const daysText = daysSectionMatch[1];
        const dayBlocks = daysText.split(/\*\*Day \d+ — /).slice(1);
        
        let dayNum = 1;
        const daysToInsert = [];
        for (const dayBlock of dayBlocks) {
          const lines = dayBlock.trim().split("\n");
          const titleLine = lines[0].replace(/\*\*/g, "").trim();
          const body = lines.slice(1).join("\n").replace(/\*Meals:.*?\*/, "").trim();
          
          // Meals
          const mealsMatch = dayBlock.match(/\*Meals:\s*(.*?)\./);
          const meals = mealsMatch ? mealsMatch[1].trim() : "";

          // Stay
          const stayMatch = dayBlock.match(/\*Overnight:\s*(.*?)\./);
          const stay = stayMatch ? stayMatch[1].trim() : "";

          daysToInsert.push({
            packageId: pkgId,
            dayNumber: dayNum,
            title: titleLine,
            body: body,
            meals: meals,
            stay: stay,
          });
          dayNum++;
        }
        if (daysToInsert.length > 0) {
          await db.insert(packageDays).values(daysToInsert);
        }
      }

      // Parse Inclusions/Exclusions
      const incMatch = block.match(/\*\*Inclusions:\*\*([\s\S]*?)(?=\*\*Exclusions:\*\*)/);
      const excMatch = block.match(/\*\*Exclusions:\*\*([\s\S]*?)(?=\*\*Visa Note:\*\*|---|$)/);

      const itemsToInsert = [];
      let sortOrder = 1;

      if (incMatch) {
        const incLines = incMatch[1].trim().split("\n");
        for (const line of incLines) {
          if (line.trim().startsWith("- ")) {
            itemsToInsert.push({
              packageId: pkgId,
              kind: "inclusion",
              label: line.replace("- ", "").trim(),
              sortOrder: sortOrder++,
            });
          }
        }
      }

      sortOrder = 1;
      if (excMatch) {
        const excLines = excMatch[1].trim().split("\n");
        for (const line of excLines) {
          if (line.trim().startsWith("- ")) {
            itemsToInsert.push({
              packageId: pkgId,
              kind: "exclusion",
              label: line.replace("- ", "").trim(),
              sortOrder: sortOrder++,
            });
          }
        }
      }

      if (itemsToInsert.length > 0) {
        await db.insert(packageItems).values(itemsToInsert);
      }
    }

    console.log("🎉 Vietnam seeding completed successfully!");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seedVietnam();
