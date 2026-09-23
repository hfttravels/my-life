import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { db } from "./index";
import {
  destinations,
  packages,
  packageDays,
  packageFaqs,
  packageItems,
  blogPosts,
  blogFaqs,
} from "./schema";
import { ALL_DESTINATIONS } from "../data/destinations";
import { BLOG_POSTS } from "../data/blogs";
import { eq } from "drizzle-orm";

async function seed() {
  console.log("🌱 Starting database seed...");

  try {
    // 1. Seed 20 destinations
    console.log("📍 Seeding 20 destinations from src/data/destinations.ts...");
    const destEntries = Object.values(ALL_DESTINATIONS);

    const destinationMap = new Map<string, string>(); // slug -> id

    for (let i = 0; i < destEntries.length; i++) {
      const d = destEntries[i];
      const seoTitle = d.trending2026
        ? `${d.name} Tour Packages 2026 | ${d.trending2026.tagline} | Hassle Free Travels`
        : `${d.hero.title} | Hassle Free Travels`;
      const seoDescription = d.trending2026
        ? `${d.name} Tour Packages 2026: ${d.trending2026.whyTrending} Handcrafted itineraries, verified stays & seamless WhatsApp booking with Hassle Free Travels.`
        : d.hero.subtitle;

      // Upsert destination
      const existing = await db
        .select()
        .from(destinations)
        .where(eq(destinations.slug, d.id))
        .limit(1);

      let destId: string;

      if (existing.length > 0) {
        destId = existing[0].id;
        await db
          .update(destinations)
          .set({
            name: d.name,
            type: d.type || "international",
            tagline: d.trending2026?.tagline || d.hero.badge,
            overview: d.trending2026?.whyTrending || d.hero.subtitle,
            best_season: d.trending2026?.season || (d.seasons?.[0]?.title ?? "Year-round"),
            ideal_duration: d.trending2026?.duration || "5N / 6D",
            hero_image: d.hero.image,
            og_image: d.hero.image,
            seo_title: seoTitle,
            seo_description: seoDescription,
            sort_order: i,
            updatedAt: new Date(),
          })
          .where(eq(destinations.id, destId));
      } else {
        const [inserted] = await db
          .insert(destinations)
          .values({
            slug: d.id,
            name: d.name,
            type: d.type || "international",
            tagline: d.trending2026?.tagline || d.hero.badge,
            overview: d.trending2026?.whyTrending || d.hero.subtitle,
            best_season: d.trending2026?.season || (d.seasons?.[0]?.title ?? "Year-round"),
            ideal_duration: d.trending2026?.duration || "5N / 6D",
            hero_image: d.hero.image,
            og_image: d.hero.image,
            seo_title: seoTitle,
            seo_description: seoDescription,
            is_published: true,
            sort_order: i,
          })
          .returning();
        destId = inserted.id;
      }

      destinationMap.set(d.id, destId);
    }
    console.log(`✅ Seeded ${destinationMap.size} destinations.`);

    // 2. Seed Spiti Valley Circuit Package (Real content from live Spiti page)
    const spitiDestId = destinationMap.get("spiti");
    if (!spitiDestId) {
      throw new Error("Spiti destination not found in map");
    }

    const spitiSlug = "spiti-valley-tour-packages";
    console.log(`🏔️ Seeding benchmark package: ${spitiSlug}...`);

    const existingPkg = await db
      .select()
      .from(packages)
      .where(eq(packages.slug, spitiSlug))
      .limit(1);

    let pkgId: string;

    const spitiPkgData = {
      destinationId: spitiDestId,
      slug: spitiSlug,
      name: "Spiti Valley Circuit Tour Package (Shimla to Manali)",
      tagline: "The Ultimate 8 Nights Full Circuit Himalayan Road Trip",
      packageType: "adventure",
      nights: 8,
      days: 9,
      startingPriceInr: 16499,
      priceNote: "per person, twin share, ex-Delhi, without flights",
      includesFlights: false,
      groupSizeMin: 4,
      groupSizeMax: 16,
      departureCities: ["Delhi", "Chandigarh"],
      bestMonths: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
      highlights: [
        "1000-year-old Key & Dhankar Monasteries perched over cliffs",
        "Send postcards from the World's Highest Post Office in Hikkim (4,440 m)",
        "Stargazing and luxury tent camping beside crescent Chandratal Lake",
        "Drive across high Himalayan passes including Kunzum Pass (4,590 m)",
        "Oxygen-fitted vehicles with certified high-altitude Trip Captains",
      ],
      mealsSummary: "16 Meals (8 Breakfasts + 8 Dinners)",
      staySummary: "8 Nights in Handpicked Hotels, Homestays & Swiss Alpine Tents",
      transportSummary: "Comfortable Tempo Traveller / 4x4 SUV with oxygen onboard",
      visaNote: "No visa required for Indian citizens. Inner Line Permits arranged by Hassle Free Travels.",
      heroImage: "/images/spiti/spiti-hero.jpg",
      gallery: [
        "/images/spiti/spiti-hero.jpg",
        "/images/spiti/chandratal.jpg",
        "/images/spiti/spiti-bike.jpg",
      ],
      seoTitle: "Spiti Valley Tour Packages 2026 | Hassle Free Travels",
      seoDescription:
        "Experience the untamed magic of the 'Middle Land' between India and Tibet. Thrilling 4x4 expeditions and Royal Enfield bike trips.",
      ogImage: "/images/spiti/spiti-hero.jpg",
      canonicalPath: `/destination/spiti/${spitiSlug}`,
      isPublished: true,
      isFeatured: true,
      publishedAt: new Date(),
      updatedAt: new Date(),
    };

    if (existingPkg.length > 0) {
      pkgId = existingPkg[0].id;
      await db.update(packages).set(spitiPkgData).where(eq(packages.id, pkgId));
      // Delete old sub-items for fresh re-seed
      await db.delete(packageDays).where(eq(packageDays.packageId, pkgId));
      await db.delete(packageFaqs).where(eq(packageFaqs.packageId, pkgId));
      await db.delete(packageItems).where(eq(packageItems.packageId, pkgId));
    } else {
      const [newPkg] = await db.insert(packages).values(spitiPkgData).returning();
      pkgId = newPkg.id;
    }

    // 9 Days of Itinerary from Spiti benchmark
    const daysData = [
      {
        packageId: pkgId,
        dayNumber: 1,
        title: "Delhi to Narkanda — Gateway to the Himalayas",
        body: "Assemble in Delhi in the evening. Board the comfortable AC vehicle for an overnight scenic drive towards Narkanda. Enjoy a morning climb through apple orchard country with views of snow-clad Shivalik peaks.",
        stay: "Hotel in Narkanda",
        meals: "Dinner",
      },
      {
        packageId: pkgId,
        dayNumber: 2,
        title: "Narkanda to Chitkul — India's Last Inhabited Village",
        body: "Drive along the mighty Sutlej River through Kinnaur's jaw-dropping cliff-carved roads. Arrive in the idyllic Baspa Valley and settle into Chitkul (3,450 m), the last village on the Indo-Tibetan border.",
        stay: "Riverside Resort in Sangla / Chitkul",
        meals: "Breakfast & Dinner",
      },
      {
        packageId: pkgId,
        dayNumber: 3,
        title: "Chitkul to Kalpa — Kinner Kailash Views",
        body: "Explore Chitkul village, pristine riverbeds, and apple orchards. Head towards Kalpa (2,960 m). Witness the awe-inspiring 70-meter sacred rock spire of Kinner Kailash glowing golden at sunset.",
        stay: "Hotel in Kalpa",
        meals: "Breakfast & Dinner",
      },
      {
        packageId: pkgId,
        dayNumber: 4,
        title: "Kalpa to Kaza — Entering the Middle Land",
        body: "Cross the Khab confluence where Spiti and Sutlej meet. Visit the 500-year-old Mummy of Sangha Tenzin at Gue village. Cross Tabo and enter the barren, Martian moonscapes of Kaza (3,800 m).",
        stay: "Hotel in Kaza",
        meals: "Breakfast & Dinner",
      },
      {
        packageId: pkgId,
        dayNumber: 5,
        title: "Hikkim, Komic & Langza — The High Altitude Circuit",
        body: "Post a heartfelt letter from the World's Highest Post Office at Hikkim (4,440 m). Visit the world's highest village connected by motorable road at Komic (4,587 m), and admire the giant Golden Buddha looking over marine fossils at Langza.",
        stay: "Hotel in Kaza",
        meals: "Breakfast & Dinner",
      },
      {
        packageId: pkgId,
        dayNumber: 6,
        title: "Key Monastery & Chicham Bridge — Tibetan Citadel",
        body: "Ascend to Key Monastery (4,166 m), an 11th-century monastic fort overlooking the Spiti riverbed. Walk across Chicham Bridge, Asia's highest suspension bridge towering over a 1,000-foot sheer canyon.",
        stay: "Hotel in Kaza",
        meals: "Breakfast & Dinner",
      },
      {
        packageId: pkgId,
        dayNumber: 7,
        title: "Kaza to Chandratal Lake — Camping by the Moon Lake",
        body: "Conquer the formidable Kunzum Pass (4,590 m) and pay homage at the Kunzum Mata temple. Hike down to the breathtaking crescent-shaped Chandratal Lake (4,300 m). Experience an unforgettable night under millions of stars.",
        stay: "Deluxe Swiss Tents near Chandratal",
        meals: "Breakfast & Dinner",
      },
      {
        packageId: pkgId,
        dayNumber: 8,
        title: "Chandratal to Manali via Atal Tunnel",
        body: "Navigate the rugged Batal and Chhatru riverbeds. Ascend towards Gramphu and pass through the state-of-the-art Atal Tunnel into the lush green valley of Manali. Celebrate the circuit completion with a group dinner.",
        stay: "Premium Hotel in Manali",
        meals: "Breakfast & Dinner",
      },
      {
        packageId: pkgId,
        dayNumber: 9,
        title: "Manali to Delhi — Return Journey",
        body: "Enjoy a relaxed breakfast exploring Old Manali cafes. Board the comfortable transfer back to Delhi or Chandigarh, returning with lifelong memories, postcard friendships, and high-altitude stories.",
        stay: "Overnight Transit",
        meals: "Breakfast",
      },
    ];

    await db.insert(packageDays).values(daysData);

    // FAQs from Spiti
    const faqsData = [
      {
        packageId: pkgId,
        question: "What is the best time to visit Spiti Valley?",
        answer:
          "Mid-May to mid-October is the best season for the full circuit when both Shimla and Manali passes are open and Chandratal camping is fully operational. November to April is reserved for the extreme Winter Spiti Expedition (Snow Leopard trails).",
        sortOrder: 1,
      },
      {
        packageId: pkgId,
        question: "How does Hassle Free Travels handle AMS (Altitude Sickness)?",
        answer:
          "Our itinerary ascends gradually via the Shimla route for optimal acclimatization. Every vehicle carries medical-grade oxygen cylinders, oximeters, and our Trip Captains are wilderness first-aid certified.",
        sortOrder: 2,
      },
      {
        packageId: pkgId,
        question: "Are mobile networks and internet available in Spiti?",
        answer:
          "BSNL and Jio post-paid have the most reliable coverage in Kaza, Tabo, and Kalpa. Expect zero connectivity near Chandratal Lake and Batal. We recommend completing critical digital tasks before departing Shimla.",
        sortOrder: 3,
      },
      {
        packageId: pkgId,
        question: "What should I pack for the Spiti road trip?",
        answer:
          "Pack layered clothing: thermals, fleece jackets, a windproof heavy parka, sturdy trekking shoes, UV sunglasses, sunscreen (SPF 50+), lip balm, and power banks. Temperatures drop below freezing at night near Chandratal.",
        sortOrder: 4,
      },
    ];

    await db.insert(packageFaqs).values(faqsData);

    // Inclusions & Exclusions
    const itemsData = [
      {
        packageId: pkgId,
        kind: "inclusion",
        label: "8 Nights handpicked stays (3/4 Star Hotels, Heritage Homestays & Deluxe Swiss Alpine Tents)",
        sortOrder: 1,
      },
      {
        packageId: pkgId,
        kind: "inclusion",
        label: "16 Delicious Meals (8 Healthy Breakfasts + 8 Authentic Dinners)",
        sortOrder: 2,
      },
      {
        packageId: pkgId,
        kind: "inclusion",
        label: "Dedicated sanitized Tempo Traveller / 4x4 SUV with experienced mountain chauffeur",
        sortOrder: 3,
      },
      {
        packageId: pkgId,
        kind: "inclusion",
        label: "Medical-grade Oxygen Cylinder, First Aid Kit & Oximeter onboard at all times",
        sortOrder: 4,
      },
      {
        packageId: pkgId,
        kind: "inclusion",
        label: "Inner Line Permits, green taxes, toll charges, driver allowance & parking fees",
        sortOrder: 5,
      },
      {
        packageId: pkgId,
        kind: "inclusion",
        label: "Experienced & certified Wilderness Trip Captain throughout the expedition",
        sortOrder: 6,
      },
      {
        packageId: pkgId,
        kind: "exclusion",
        label: "Any airfare or train tickets to/from Delhi",
        sortOrder: 1,
      },
      {
        packageId: pkgId,
        kind: "exclusion",
        label: "Personal expenses, laundry, alcohol, tips, and mineral water bottles",
        sortOrder: 2,
      },
      {
        packageId: pkgId,
        kind: "exclusion",
        label: "Monastery entrance fees, camera fees, or optional adventure activities",
        sortOrder: 3,
      },
      {
        packageId: pkgId,
        kind: "exclusion",
        label: "Any unforeseen expenses arising from road blocks, landslides, or medical emergencies",
        sortOrder: 4,
      },
      {
        packageId: pkgId,
        kind: "addon",
        label: "Single Occupancy Room Upgrade (₹8,500 additional)",
        sortOrder: 1,
      },
      {
        packageId: pkgId,
        kind: "addon",
        label: "Royal Enfield Himalayan 450 Upgrade with backup mechanic",
        sortOrder: 2,
      },
    ];

    await db.insert(packageItems).values(itemsData);

    console.log("✅ Spiti Valley package and all sub-items seeded successfully!");

    // 3. Seed 1 Unpublished Draft Package (for admin testing)
    const baliDestId = destinationMap.get("bali");
    if (baliDestId) {
      const baliSlug = "bali-tropical-island-getaway";
      console.log(`📝 Seeding unpublished draft package: ${baliSlug}...`);

      const existingDraft = await db
        .select()
        .from(packages)
        .where(eq(packages.slug, baliSlug))
        .limit(1);

      if (existingDraft.length === 0) {
        const [draftPkg] = await db
          .insert(packages)
          .values({
            destinationId: baliDestId,
            slug: baliSlug,
            name: "Bali Tropical Island Getaway with Nusa Penida",
            tagline: "Beaches, Waterfalls, Clifftop Temples & Private Pool Villa",
            packageType: "honeymoon",
            nights: 6,
            days: 7,
            startingPriceInr: 38999,
            priceNote: "per person, twin share, ex-Denpasar, flights extra",
            includesFlights: false,
            groupSizeMin: 2,
            groupSizeMax: 10,
            departureCities: ["Mumbai", "Delhi", "Bengaluru"],
            bestMonths: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
            highlights: [
              "Stay 2 nights in a private jungle pool villa in Ubud",
              "Speedboat excursion to Nusa Penida: Kelingking T-Rex cliff & Broken Beach",
              "Sunset seafood candlelight dinner on Jimbaran Beach",
            ],
            mealsSummary: "6 Breakfasts + 2 Candlelight Dinners",
            staySummary: "4 Nights 4-Star Beach Resort in Seminyak + 2 Nights Private Pool Villa in Ubud",
            transportSummary: "Private AC Car with English-speaking Balinese driver-guide",
            visaNote: "Visa on Arrival (VoA) for Indian passport holders (approx. $35 USD).",
            heroImage: "/dest-beach.jpg",
            gallery: ["/dest-beach.jpg"],
            seoTitle: "Bali Tour Packages 2026 | Private Villa Getaway | Hassle Free Travels",
            seoDescription: "Handcrafted Bali tour packages with private pool villa, Nusa Penida speed boat trip, and sunset dinners.",
            ogImage: "/dest-beach.jpg",
            canonicalPath: `/destination/bali/${baliSlug}`,
            isPublished: false, // DRAFT
            isFeatured: false,
          })
          .returning();

        // Add 1 day
        await db.insert(packageDays).values([
          {
            packageId: draftPkg.id,
            dayNumber: 1,
            title: "Arrival in Bali — Seminyak Check-in",
            body: "Welcome to the Island of the Gods! Meet our friendly chauffeur at Ngurah Rai Airport and transfer to your beachfront resort.",
            stay: "Seminyak Resort",
            meals: "Dinner",
          },
        ]);

        console.log("✅ Seeded unpublished draft package for CMS testing!");
      }
    }

    // 4. Seed 12 Published Blog Posts from src/data/blogs.ts
    console.log("📝 Seeding 12 blog posts from src/data/blogs.ts...");
    for (const post of BLOG_POSTS) {
      let targetDestSlug: string | null = null;
      if (post.slug.includes("spiti") || post.tags.includes("Spiti")) targetDestSlug = "spiti";
      else if (post.slug.includes("bali") || post.tags.includes("Bali")) targetDestSlug = "bali";
      else if (post.slug.includes("manali") || post.tags.includes("Manali")) targetDestSlug = "manali";
      else if (post.slug.includes("kerala") || post.tags.includes("Kerala")) targetDestSlug = "kerala";
      else if (post.slug.includes("vietnam") || post.tags.includes("Vietnam")) targetDestSlug = "vietnam";
      else if (post.slug.includes("kashmir") || post.tags.includes("Kashmir")) targetDestSlug = "kashmir";
      else if (post.slug.includes("goa") || post.tags.includes("Goa")) targetDestSlug = "goa";
      else if (post.slug.includes("ladakh") || post.tags.includes("Ladakh")) targetDestSlug = "kashmir";

      const matchedDestId = targetDestSlug ? destinationMap.get(targetDestSlug) || null : null;
      const matchedPkgId = targetDestSlug === "spiti" ? pkgId : null;

      const readMin = parseInt(post.readTime) || 8;
      const pubDate = new Date(post.date);
      const validDate = isNaN(pubDate.getTime()) ? new Date() : pubDate;

      const contentMarkdown = `
${post.excerpt}

## Comprehensive Travel Overview
Planning a trip requires careful balancing of time, logistics, weather, and budget. At **Hassle Free Travels**, our trip captains and destination specialists ensure your travel experience is immersive, safe, and seamlessly executed.

### What Makes This Experience Special
- **Local Insider Access:** Skip tourist traps and connect with authentic communities, family-run cafes, and heritage sites.
- **Optimized Pacing:** Well-structured routes with ample acclimatization and relaxation time.
- **Verified Accommodations:** Handpicked boutique hotels, homestays, and luxury camps inspected for cleanliness and comfort.

## Essential Practical Advice
1. **Best Season to Visit:** Monitor weather patterns and road conditions before finalizing your departure.
2. **Packing Smart:** Carry layered clothing, comfortable trekking shoes, and necessary medications.
3. **Connectivity & Cash:** While digital payments work in major hubs, remote regions still require cash reserves.

## Suggested Travel Style
Whether you prefer small-group departures or customized private itineraries, our destination specialists can tailor every detail to your pace and budget.
      `.trim();

      const existingPost = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.slug, post.slug))
        .limit(1);

      let postId: string;
      if (existingPost.length > 0) {
        postId = existingPost[0].id;
        await db
          .update(blogPosts)
          .set({
            title: post.title,
            excerpt: post.excerpt,
            contentMd: contentMarkdown,
            category: post.category,
            tags: post.tags,
            authorName: post.author || "Hassle Free Travels",
            featuredImage: post.image,
            ogImage: post.image,
            seoTitle: `${post.title} | Hassle Free Travels Blog`,
            seoDescription: post.excerpt,
            destinationId: matchedDestId,
            packageId: matchedPkgId,
            destinationSlug: targetDestSlug,
            readMinutes: readMin,
            isPublished: true,
            publishedAt: validDate,
            updatedAt: new Date(),
          })
          .where(eq(blogPosts.id, postId));
      } else {
        const [newPost] = await db
          .insert(blogPosts)
          .values({
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            contentMd: contentMarkdown,
            category: post.category,
            tags: post.tags,
            authorName: post.author || "Hassle Free Travels",
            featuredImage: post.image,
            ogImage: post.image,
            seoTitle: `${post.title} | Hassle Free Travels Blog`,
            seoDescription: post.excerpt,
            destinationId: matchedDestId,
            packageId: matchedPkgId,
            destinationSlug: targetDestSlug,
            readMinutes: readMin,
            isPublished: true,
            publishedAt: validDate,
          })
          .returning();
        postId = newPost.id;
      }

      // Add sample FAQs for Spiti and Bali posts
      if (post.slug.includes("spiti")) {
        await db.delete(blogFaqs).where(eq(blogFaqs.postId, postId));
        await db.insert(blogFaqs).values([
          {
            postId,
            question: "How many days are ideal for exploring Spiti Valley?",
            answer: "A minimum of 8 to 9 days is recommended to comfortably complete the full circuit from Shimla to Manali with proper acclimatization.",
            sortOrder: 1,
          },
          {
            postId,
            question: "Is oxygen support provided on Hassle Free Travels Spiti trips?",
            answer: "Yes, all our expedition vehicles carry certified medical oxygen cylinders and pulse oximeters monitored by trained trip captains.",
            sortOrder: 2,
          },
        ]);
      } else if (post.slug.includes("bali")) {
        await db.delete(blogFaqs).where(eq(blogFaqs.postId, postId));
        await db.insert(blogFaqs).values([
          {
            postId,
            question: "Do Indians need a visa before flying to Bali?",
            answer: "Indian passport holders can obtain a 30-day Visa on Arrival (VoA) at Denpasar Airport for approximately 500,000 IDR (~$35 USD).",
            sortOrder: 1,
          },
        ]);
      }
    }
    console.log("✅ Seeded 12 published blog posts with FAQs into Postgres!");

    console.log("🎉 Seeding completed successfully!");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seed();
