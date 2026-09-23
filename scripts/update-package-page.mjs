import fs from "fs";
import path from "path";

const targetPath = path.resolve("src/app/destination/[id]/[packageSlug]/page.tsx");
let content = fs.readFileSync(targetPath, "utf-8");

// 1. Imports
content = content.replace(
  `import { MALDIVES_PACKAGES, getMaldivesPackageBySlug } from "@/data/maldives-packages";`,
  `import { MALDIVES_PACKAGES, getMaldivesPackageBySlug } from "@/data/maldives-packages";\nimport { EGYPT_PACKAGES, getEgyptPackageBySlug } from "@/data/egypt-packages";`
);

// 2. generateStaticParams
content = content.replace(
  `  // Ensure all 18 Maldives packages are pre-rendered
  for (const mp of MALDIVES_PACKAGES) {
    if (!paramsList.some((p) => p.id === "maldives" && p.packageSlug === mp.slug)) {
      paramsList.push({
        id: "maldives",
        packageSlug: mp.slug,
      });
    }
  }`,
  `  // Ensure all 18 Maldives packages are pre-rendered
  for (const mp of MALDIVES_PACKAGES) {
    if (!paramsList.some((p) => p.id === "maldives" && p.packageSlug === mp.slug)) {
      paramsList.push({
        id: "maldives",
        packageSlug: mp.slug,
      });
    }
  }

  // Ensure all 20 Egypt packages are pre-rendered
  for (const ep of EGYPT_PACKAGES) {
    if (!paramsList.some((p) => p.id === "egypt" && p.packageSlug === ep.slug)) {
      paramsList.push({
        id: "egypt",
        packageSlug: ep.slug,
      });
    }
  }`
);

// 3. generateMetadata pkg loading
content = content.replace(
  `const maldivesPkg = destinationSlug === "maldives" ? getMaldivesPackageBySlug(packageSlug) : undefined;`,
  `const maldivesPkg = destinationSlug === "maldives" ? getMaldivesPackageBySlug(packageSlug) : undefined;\n  const egyptPkg = destinationSlug === "egypt" ? getEgyptPackageBySlug(packageSlug) : undefined;`
);

// 4. staticFallbackPkg in generateMetadata
content = content.replace(
  `const staticFallbackPkg = thaiPkg || japanPkg || sriLankaPkg || malaysiaPkg || maldivesPkg;`,
  `const staticFallbackPkg = thaiPkg || japanPkg || sriLankaPkg || malaysiaPkg || maldivesPkg || egyptPkg;`
);

// 5. DestinationPackagePage loading
// note: maldivesPkg is loaded here too, we replace it again (global replace might hit both, so doing it via regex)
content = content.replace(
  /const maldivesPkg = destinationSlug === "maldives" \? getMaldivesPackageBySlug\(packageSlug\) : undefined;/g,
  `const maldivesPkg = destinationSlug === "maldives" ? getMaldivesPackageBySlug(packageSlug) : undefined;\n  const egyptPkg = destinationSlug === "egypt" ? getEgyptPackageBySlug(packageSlug) : undefined;`
);

// 6. Destination check
content = content.replace(
  `if (!dest && destinationSlug !== "thailand" && destinationSlug !== "japan" && destinationSlug !== "sri-lanka" && destinationSlug !== "malaysia" && destinationSlug !== "maldives") {`,
  `if (!dest && destinationSlug !== "thailand" && destinationSlug !== "japan" && destinationSlug !== "sri-lanka" && destinationSlug !== "malaysia" && destinationSlug !== "maldives" && destinationSlug !== "egypt") {`
);

// 7. Add fallback block
const fallbackBlock = `
  // Fallback to static Egypt data if package is not found in DB
  if (!pkg && egyptPkg) {
    const destRecord: Destination = dest || {
      id: "egypt-dest-uuid",
      slug: "egypt",
      name: "Egypt",
      country: "Egypt",
      type: "international",
      tagline: "Pyramids, Nile Cruises & the Red Sea",
      overview: "A timeless destination combining ancient wonders with luxury Nile cruises and Red Sea resorts.",
      best_season: "Oct–Apr",
      ideal_duration: "7-11 nights",
      hero_image: "https://images.unsplash.com/photo-1572252009286-268caa47ea56?auto=format&fit=crop&w=1200&q=80",
      og_image: "https://images.unsplash.com/photo-1572252009286-268caa47ea56?auto=format&fit=crop&w=1200&q=80",
      seo_title: "Egypt Tour Packages 2026",
      seo_description: "Explore Egypt in 2026 with Hassle Free Travels.",
      createdAt: new Date(),
      updatedAt: new Date(),
      isPublished: true,
    };

    pkg = {
      id: egyptPkg.slug,
      destinationId: destRecord.id,
      slug: egyptPkg.slug,
      name: egyptPkg.name,
      tagline: egyptPkg.tagline,
      packageType: egyptPkg.packageType,
      nights: egyptPkg.nights,
      days: egyptPkg.days,
      startingPriceInr: egyptPkg.priceFromINR,
      priceNote: egyptPkg.priceNote,
      includesFlights: false,
      groupSizeMin: egyptPkg.isGroup ? 2 : 2,
      groupSizeMax: egyptPkg.isGroup ? 24 : null,
      departureCities: null,
      bestMonths: egyptPkg.bestMonths,
      highlights: egyptPkg.highlights,
      mealsSummary: egyptPkg.mealsSummary || null,
      staySummary: egyptPkg.staySummary || null,
      transportSummary: egyptPkg.transportSummary || null,
      visaNote: egyptPkg.visaNote,
      heroImage: egyptPkg.heroImage,
      gallery: null,
      seoTitle: egyptPkg.seoTitle,
      seoDescription: egyptPkg.seoDescription,
      ogImage: egyptPkg.heroImage,
      canonicalPath: \`/destination/egypt/\${egyptPkg.slug}\`,
      isPublished: true,
      isFeatured: egyptPkg.isFeatured,
      publishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      destination: destRecord,
      itineraryDays: egyptPkg.itineraryDays.map((day) => ({
        id: \`\${egyptPkg.slug}-day-\${day.dayNumber}\`,
        packageId: egyptPkg.slug,
        dayNumber: day.dayNumber,
        title: day.title,
        body: day.body,
        stay: day.stay || null,
        meals: day.meals || null,
        sortOrder: day.dayNumber,
      })),
      faqs: [
        {
          id: \`\${egyptPkg.slug}-faq-1\`,
          packageId: egyptPkg.slug,
          question: "Are Indian vegetarian and Jain meals available on Egypt tours?",
          answer: "Yes! Hassle Free Travels coordinates vetted Indian and local vegetarian/Jain meal options on all our Egypt itineraries, including on Nile cruises.",
          sortOrder: 1,
        },
        {
          id: \`\${egyptPkg.slug}-faq-2\`,
          packageId: egyptPkg.slug,
          question: "What is the visa process for Indian passport holders?",
          answer: "Indian passport holders can obtain an Egypt tourist visa on arrival at Cairo International Airport (USD 25) or apply for an e-visa in advance.",
          sortOrder: 2,
        },
        {
          id: \`\${egyptPkg.slug}-faq-3\`,
          packageId: egyptPkg.slug,
          question: "Are international flights included?",
          answer: "These are land-only packages. We do include domestic flights within Egypt (e.g., Cairo to Luxor/Aswan) as specified in each itinerary.",
          sortOrder: 3,
        }
      ],
      items: [
        ...egyptPkg.inclusions.map((inc, i) => ({
          id: \`\${egyptPkg.slug}-inc-\${i}\`,
          packageId: egyptPkg.slug,
          kind: "inclusion" as const,
          label: inc,
          sortOrder: i + 1,
        })),
        ...egyptPkg.exclusions.map((exc, i) => ({
          id: \`\${egyptPkg.slug}-exc-\${i}\`,
          packageId: egyptPkg.slug,
          kind: "exclusion" as const,
          label: exc,
          sortOrder: i + 1,
        })),
      ],
    };
  }
`;

content = content.replace(
  `  if (!pkg) {
    notFound();
  }`,
  fallbackBlock + `\n  if (!pkg) {\n    notFound();\n  }`
);

// 8. Add related packages block
const relatedBlock = `
  if (relatedPackages.length === 0 && egyptPkg) {
    const relatedList = egyptPkg.relatedSlugs
      .map((slug) => getEgyptPackageBySlug(slug))
      .filter((p): p is NonNullable<typeof p> => p !== undefined)
      .slice(0, 3);

    relatedPackages = relatedList.map((rel) => ({
      id: rel.slug,
      destinationId: pkg!.destinationId,
      slug: rel.slug,
      name: rel.name,
      tagline: rel.tagline,
      packageType: rel.packageType,
      nights: rel.nights,
      days: rel.days,
      startingPriceInr: rel.priceFromINR,
      priceNote: rel.priceNote,
      includesFlights: false,
      groupSizeMin: rel.isGroup ? 2 : 2,
      groupSizeMax: rel.isGroup ? 24 : null,
      departureCities: null,
      bestMonths: rel.bestMonths,
      highlights: rel.highlights,
      mealsSummary: rel.mealsSummary || null,
      staySummary: rel.staySummary || null,
      transportSummary: rel.transportSummary || null,
      visaNote: rel.visaNote,
      heroImage: rel.heroImage,
      gallery: null,
      seoTitle: rel.seoTitle,
      seoDescription: rel.seoDescription,
      ogImage: rel.heroImage,
      canonicalPath: \`/destination/egypt/\${rel.slug}\`,
      isPublished: true,
      isFeatured: rel.isFeatured,
      publishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      destination: pkg!.destination,
    }));
  }
`;

content = content.replace(
  `  // 3b. Query up to 3 related published blog guides for this package or destination`,
  relatedBlock + `\n  // 3b. Query up to 3 related published blog guides for this package or destination`
);

fs.writeFileSync(targetPath, content, "utf-8");
console.log("Successfully updated page.tsx!");
