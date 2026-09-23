import { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { destinations, packages, packageDays, packageFaqs, packageItems, blogPosts, Package, Destination, PackageDay, PackageFaq, PackageItem, BlogPost } from "@/db/schema";
import { eq, and, ne, asc, or } from "drizzle-orm";
import TourClient from "@/components/tour/TourClient";
import { THAILAND_PACKAGES, getThailandPackageBySlug } from "@/data/thailand-packages";
import { JAPAN_PACKAGES, getJapanPackageBySlug } from "@/data/japan-packages";
import { SRI_LANKA_PACKAGES, getSriLankaPackageBySlug } from "@/data/sri-lanka-packages";
import { MALAYSIA_PACKAGES, getMalaysiaPackageBySlug } from "@/data/malaysia-packages";
import { MALDIVES_PACKAGES, getMaldivesPackageBySlug } from "@/data/maldives-packages";
import { EGYPT_PACKAGES, getEgyptPackageBySlug } from "@/data/egypt-packages";

interface DestinationPackagePageProps {
  params: Promise<{ id: string; packageSlug: string }>;
}

// Generate static params for every published package across ALL destinations
export async function generateStaticParams() {
  const paramsList: { id: string; packageSlug: string }[] = [];
  try {
    const publishedPackages = await db.query.packages.findMany({
      where: eq(packages.isPublished, true),
      with: {
        destination: true,
      },
    });

    for (const pkg of publishedPackages) {
      if (pkg.destination?.slug) {
        paramsList.push({
          id: pkg.destination.slug,
          packageSlug: pkg.slug,
        });
      }
    }
  } catch (err) {
    console.error("Failed to generateStaticParams for destination packages from DB:", err);
  }

  // Ensure all 20 Thailand packages are pre-rendered
  for (const tp of THAILAND_PACKAGES) {
    if (!paramsList.some((p) => p.id === "thailand" && p.packageSlug === tp.slug)) {
      paramsList.push({
        id: "thailand",
        packageSlug: tp.slug,
      });
    }
  }

  // Ensure all 20 Japan packages are pre-rendered
  for (const jp of JAPAN_PACKAGES) {
    if (!paramsList.some((p) => p.id === "japan" && p.packageSlug === jp.slug)) {
      paramsList.push({
        id: "japan",
        packageSlug: jp.slug,
      });
    }
  }

  // Ensure all 20 Sri Lanka packages are pre-rendered
  for (const sp of SRI_LANKA_PACKAGES) {
    if (!paramsList.some((p) => p.id === "sri-lanka" && p.packageSlug === sp.slug)) {
      paramsList.push({
        id: "sri-lanka",
        packageSlug: sp.slug,
      });
    }
  }

  // Ensure all 20 Malaysia packages are pre-rendered
  for (const mp of MALAYSIA_PACKAGES) {
    if (!paramsList.some((p) => p.id === "malaysia" && p.packageSlug === mp.slug)) {
      paramsList.push({
        id: "malaysia",
        packageSlug: mp.slug,
      });
    }
  }

  // Ensure all 18 Maldives packages are pre-rendered
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
  }

  return paramsList;
}

// Generate metadata dynamically per package
export async function generateMetadata({
  params,
}: DestinationPackagePageProps): Promise<Metadata> {
  const { id: destinationSlug, packageSlug } = await params;

  let dest: Destination | null | undefined = null;
  try {
    dest = await db.query.destinations.findFirst({
      where: eq(destinations.slug, destinationSlug),
    });
  } catch (e) {
    console.error("Failed to query destination for metadata:", e);
  }

  const thaiPkg = destinationSlug === "thailand" ? getThailandPackageBySlug(packageSlug) : undefined;
  const japanPkg = destinationSlug === "japan" ? getJapanPackageBySlug(packageSlug) : undefined;
  const sriLankaPkg = destinationSlug === "sri-lanka" ? getSriLankaPackageBySlug(packageSlug) : undefined;
  const malaysiaPkg = destinationSlug === "malaysia" ? getMalaysiaPackageBySlug(packageSlug) : undefined;
  const maldivesPkg = destinationSlug === "maldives" ? getMaldivesPackageBySlug(packageSlug) : undefined;
  const egyptPkg = destinationSlug === "egypt" ? getEgyptPackageBySlug(packageSlug) : undefined;
  const staticFallbackPkg = thaiPkg || japanPkg || sriLankaPkg || malaysiaPkg || maldivesPkg || egyptPkg;

  let pkg: Package | null | undefined = null;
  if (dest) {
    try {
      pkg = await db.query.packages.findFirst({
        where: and(
          eq(packages.slug, packageSlug),
          eq(packages.destinationId, dest.id),
          eq(packages.isPublished, true)
        ),
      });
    } catch (e) {
      console.error("Failed to query package for metadata:", e);
    }
  }

  if (!pkg && !staticFallbackPkg) {
    return {
      title: "Package Not Found | Hassle Free Travels",
      description: "The requested tour package could not be found.",
    };
  }

  const canonicalUrl = `https://www.hasslefree-travels.com/destination/${destinationSlug}/${packageSlug}`;
  const ogImageUrl = pkg?.ogImage || pkg?.heroImage || staticFallbackPkg?.heroImage;
  const title = pkg?.seoTitle || staticFallbackPkg?.seoTitle || `${pkg?.name || staticFallbackPkg?.name} | Hassle Free Travels`;
  const description = pkg?.seoDescription || staticFallbackPkg?.seoDescription || pkg?.tagline || staticFallbackPkg?.tagline || "";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: pkg?.name || thaiPkg?.name || "Tour Package",
            },
          ]
        : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
  };
}

export default async function DestinationPackagePage({
  params,
}: DestinationPackagePageProps) {
  const { id: destinationSlug, packageSlug } = await params;

  // 1. Verify destination exists
  let dest: Destination | null | undefined = null;
  try {
    dest = await db.query.destinations.findFirst({
      where: eq(destinations.slug, destinationSlug),
    });
  } catch (e) {
    console.error("Error querying destination:", e);
  }

  const thaiPkg = destinationSlug === "thailand" ? getThailandPackageBySlug(packageSlug) : undefined;
  const japanPkg = destinationSlug === "japan" ? getJapanPackageBySlug(packageSlug) : undefined;
  const sriLankaPkg = destinationSlug === "sri-lanka" ? getSriLankaPackageBySlug(packageSlug) : undefined;
  const malaysiaPkg = destinationSlug === "malaysia" ? getMalaysiaPackageBySlug(packageSlug) : undefined;
  const maldivesPkg = destinationSlug === "maldives" ? getMaldivesPackageBySlug(packageSlug) : undefined;
  const egyptPkg = destinationSlug === "egypt" ? getEgyptPackageBySlug(packageSlug) : undefined;

  if (!dest && destinationSlug !== "thailand" && destinationSlug !== "japan" && destinationSlug !== "sri-lanka" && destinationSlug !== "malaysia" && destinationSlug !== "maldives" && destinationSlug !== "egypt") {
    notFound();
  }

  // 2. Query package belonging strictly to this destination and published
  let pkg:
    | (Package & {
        destination: Destination;
        itineraryDays: PackageDay[];
        faqs: PackageFaq[];
        items: PackageItem[];
      })
    | null
    | undefined = null;

  if (dest) {
    try {
      pkg = await db.query.packages.findFirst({
        where: and(
          eq(packages.slug, packageSlug),
          eq(packages.destinationId, dest.id),
          eq(packages.isPublished, true)
        ),
        with: {
          destination: true,
          itineraryDays: {
            orderBy: [asc(packageDays.dayNumber)],
          },
          faqs: {
            orderBy: [asc(packageFaqs.sortOrder)],
          },
          items: {
            orderBy: [asc(packageItems.sortOrder)],
          },
        },
      });
    } catch (e) {
      console.error("Error querying package from DB:", e);
    }
  }

  // Fallback to static Thailand data if package is not found in DB
  if (!pkg && thaiPkg) {
    const destRecord: Destination = dest || {
      id: "thailand-dest-uuid",
      slug: "thailand",
      name: "Thailand",
      country: "Thailand",
      type: "international",
      tagline: "India’s default international holiday in 2026",
      overview: "From Bangkok's glittering temples to turquoise Andaman waters.",
      best_season: "Nov–Feb",
      ideal_duration: "6N / 7D",
      hero_image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80",
      og_image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80",
      seo_title: "Thailand Tour Packages 2026",
      seo_description: "Thailand Tour Packages 2026",
      is_published: true,
      sort_order: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    pkg = {
      id: thaiPkg.slug,
      destinationId: destRecord.id,
      slug: thaiPkg.slug,
      name: thaiPkg.name,
      tagline: thaiPkg.tagline,
      packageType: thaiPkg.packageType,
      nights: thaiPkg.nights,
      days: thaiPkg.days,
      startingPriceInr: thaiPkg.priceFromINR,
      priceNote: thaiPkg.priceNote,
      includesFlights: false,
      groupSizeMin: thaiPkg.isGroup ? 2 : 2,
      groupSizeMax: thaiPkg.isGroup ? 16 : null,
      departureCities: thaiPkg.departureCities || ["Delhi", "Mumbai", "Bengaluru"],
      bestMonths: thaiPkg.bestMonths,
      highlights: thaiPkg.highlights,
      mealsSummary: thaiPkg.mealsSummary || "Daily Breakfast",
      staySummary: thaiPkg.staySummary || thaiPkg.hotelCategory,
      transportSummary: thaiPkg.transportSummary || "Private A/C vehicles throughout",
      visaNote: thaiPkg.visaNote,
      heroImage: thaiPkg.heroImage,
      gallery: [],
      seoTitle: thaiPkg.seoTitle,
      seoDescription: thaiPkg.seoDescription,
      ogImage: thaiPkg.heroImage,
      canonicalPath: `/destination/thailand/${thaiPkg.slug}`,
      isPublished: true,
      isFeatured: thaiPkg.isFeatured,
      publishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      destination: destRecord,
      itineraryDays: thaiPkg.itineraryDays.map((d) => ({
        id: `${thaiPkg.slug}-d${d.dayNumber}`,
        packageId: thaiPkg.slug,
        dayNumber: d.dayNumber,
        title: d.title,
        body: d.body,
        meals: d.meals || null,
        stay: d.stay || null,
      })),
      faqs: [
        {
          id: `${thaiPkg.slug}-faq-1`,
          packageId: thaiPkg.slug,
          question: "Are Indian vegetarian and Jain meals available on this tour?",
          answer: "Yes! Hassle Free Travels coordinates vetted Indian and local vegetarian/Jain meal options on all our Thailand itineraries.",
          sortOrder: 1,
        },
        {
          id: `${thaiPkg.slug}-faq-2`,
          packageId: thaiPkg.slug,
          question: "What is the visa process for Indian passport holders?",
          answer: thaiPkg.visaNote,
          sortOrder: 2,
        },
        {
          id: `${thaiPkg.slug}-faq-3`,
          packageId: thaiPkg.slug,
          question: "Are flights included in this package price?",
          answer: "This is a land-only package. International and domestic flights are excluded unless specifically stated. Our team will assist with flight ticketing upon request.",
          sortOrder: 3,
        },
      ],
      items: [
        ...thaiPkg.inclusions.map((inc, i) => ({
          id: `${thaiPkg.slug}-inc-${i}`,
          packageId: thaiPkg.slug,
          kind: "inclusion" as const,
          label: inc,
          sortOrder: i + 1,
        })),
        ...thaiPkg.exclusions.map((exc, i) => ({
          id: `${thaiPkg.slug}-exc-${i}`,
          packageId: thaiPkg.slug,
          kind: "exclusion" as const,
          label: exc,
          sortOrder: i + 1,
        })),
      ],
    };
  }

  // Fallback to static Japan data if package is not found in DB
  if (!pkg && japanPkg) {
    const destRecord: Destination = dest || {
      id: "japan-dest-uuid",
      slug: "japan",
      name: "Japan",
      country: "Japan",
      type: "international",
      tagline: "India’s most-searched international destination for 2026",
      overview: "Explore futuristic Tokyo, historic Kyoto, and the street-food capital of Osaka with seamless Shinkansen rail passes.",
      best_season: "Mar–Apr & Oct–Nov",
      ideal_duration: "8N / 9D",
      hero_image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
      og_image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
      seo_title: "Japan Tour Packages 2026 | Cherry Blossoms, Mt Fuji & Bullet Trains",
      seo_description: "Explore Japan in 2026 with Hassle Free Travels. Guaranteed Shinkansen rail passes, Tokyo, Kyoto, Osaka & curated Indian vegetarian food options.",
      is_published: true,
      sort_order: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    pkg = {
      id: japanPkg.slug,
      destinationId: destRecord.id,
      slug: japanPkg.slug,
      name: japanPkg.name,
      tagline: japanPkg.tagline,
      packageType: japanPkg.packageType,
      nights: japanPkg.nights,
      days: japanPkg.days,
      startingPriceInr: japanPkg.priceFromINR,
      priceNote: japanPkg.priceNote,
      includesFlights: false,
      groupSizeMin: 2,
      groupSizeMax: japanPkg.isGroup ? 20 : null,
      departureCities: japanPkg.departureCities || ["Delhi", "Mumbai", "Bengaluru"],
      bestMonths: japanPkg.bestMonths,
      highlights: japanPkg.highlights,
      mealsSummary: japanPkg.mealsSummary || "Daily Breakfast",
      staySummary: japanPkg.staySummary || japanPkg.hotelCategory,
      transportSummary: japanPkg.transportSummary || "Private A/C vehicles throughout",
      visaNote: japanPkg.visaNote,
      heroImage: japanPkg.heroImage,
      gallery: [],
      seoTitle: japanPkg.seoTitle,
      seoDescription: japanPkg.seoDescription,
      ogImage: japanPkg.heroImage,
      canonicalPath: `/destination/japan/${japanPkg.slug}`,
      isPublished: true,
      isFeatured: japanPkg.isFeatured,
      publishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      destination: destRecord,
      itineraryDays: japanPkg.itineraryDays.map((d) => ({
        id: `${japanPkg.slug}-d${d.dayNumber}`,
        packageId: japanPkg.slug,
        dayNumber: d.dayNumber,
        title: d.title,
        body: d.body,
        meals: d.meals || null,
        stay: d.stay || null,
      })),
      faqs: [
        {
          id: `${japanPkg.slug}-faq-1`,
          packageId: japanPkg.slug,
          question: "Are Indian vegetarian and Jain meals available on this tour?",
          answer: "Yes! Hassle Free Travels coordinates vetted Japanese vegetarian dining, Indian restaurants, and Jain-friendly meal options on request across Tokyo, Kyoto, and Osaka.",
          sortOrder: 1,
        },
        {
          id: `${japanPkg.slug}-faq-2`,
          packageId: japanPkg.slug,
          question: "What is the visa process for Indian passport holders?",
          answer: japanPkg.visaNote,
          sortOrder: 2,
        },
        {
          id: `${japanPkg.slug}-faq-3`,
          packageId: japanPkg.slug,
          question: "How does the Japan Rail (JR) Pass and Shinkansen bullet train work?",
          answer: "Your package includes pre-arranged Japan Rail passes or Shinkansen tickets as specified in the itinerary. Our local team provides seat reservation support and detailed station transfer guides.",
          sortOrder: 3,
        },
        {
          id: `${japanPkg.slug}-faq-4`,
          packageId: japanPkg.slug,
          question: "Are flights included in this package price?",
          answer: "This is a land-only package. International and domestic flights are excluded unless specifically stated. Our team will gladly assist with direct flights via ANA, Japan Airlines, or Air India.",
          sortOrder: 4,
        },
      ],
      items: [
        ...japanPkg.inclusions.map((inc, i) => ({
          id: `${japanPkg.slug}-inc-${i}`,
          packageId: japanPkg.slug,
          kind: "inclusion" as const,
          label: inc,
          sortOrder: i + 1,
        })),
        ...japanPkg.exclusions.map((exc, i) => ({
          id: `${japanPkg.slug}-exc-${i}`,
          packageId: japanPkg.slug,
          kind: "exclusion" as const,
          label: exc,
          sortOrder: i + 1,
        })),
      ],
    };
  }

  // Fallback to static Sri Lanka data if package is not found in DB
  if (!pkg && sriLankaPkg) {
    const destRecord: Destination = dest || {
      id: "sri-lanka-dest-uuid",
      slug: "sri-lanka",
      name: "Sri Lanka",
      country: "Sri Lanka",
      type: "international",
      tagline: "The easiest foreign holiday Indians can still book last-minute",
      overview: "Compact geography, scenic hill-country train rides, pristine beaches, and warm island hospitality.",
      best_season: "Nov–Apr west/south; May–Sep east",
      ideal_duration: "7N / 8D",
      hero_image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80",
      og_image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80",
      seo_title: "Sri Lanka Tour Packages 2026 | Handcrafted Itineraries | Hassle Free Travels",
      seo_description: "Explore Sri Lanka in 2026 with Hassle Free Travels. Sigiriya, Kandy scenic train, Yala safari, Galle Fort, and verified Indian vegetarian dining.",
      is_published: true,
      sort_order: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    pkg = {
      id: sriLankaPkg.slug,
      destinationId: destRecord.id,
      slug: sriLankaPkg.slug,
      name: sriLankaPkg.name,
      tagline: sriLankaPkg.tagline,
      packageType: sriLankaPkg.packageType,
      nights: sriLankaPkg.nights,
      days: sriLankaPkg.days,
      startingPriceInr: sriLankaPkg.priceFromINR,
      priceNote: sriLankaPkg.priceNote,
      includesFlights: false,
      groupSizeMin: 2,
      groupSizeMax: sriLankaPkg.isGroup ? 20 : null,
      departureCities: sriLankaPkg.departureCities || ["Delhi", "Mumbai", "Bengaluru", "Chennai"],
      bestMonths: sriLankaPkg.bestMonths,
      highlights: sriLankaPkg.highlights,
      mealsSummary: sriLankaPkg.mealsSummary || "Daily Breakfast",
      staySummary: sriLankaPkg.staySummary || sriLankaPkg.hotelCategory,
      transportSummary: sriLankaPkg.transportSummary || "Private A/C vehicles throughout",
      visaNote: sriLankaPkg.visaNote,
      heroImage: sriLankaPkg.heroImage,
      gallery: [],
      seoTitle: sriLankaPkg.seoTitle,
      seoDescription: sriLankaPkg.seoDescription,
      ogImage: sriLankaPkg.heroImage,
      canonicalPath: `/destination/sri-lanka/${sriLankaPkg.slug}`,
      isPublished: true,
      isFeatured: sriLankaPkg.isFeatured,
      publishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      destination: destRecord,
      itineraryDays: sriLankaPkg.itineraryDays.map((d) => ({
        id: `${sriLankaPkg.slug}-d${d.dayNumber}`,
        packageId: sriLankaPkg.slug,
        dayNumber: d.dayNumber,
        title: d.title,
        body: d.body,
        meals: d.meals || null,
        stay: d.stay || null,
      })),
      faqs: [
        {
          id: `${sriLankaPkg.slug}-faq-1`,
          packageId: sriLankaPkg.slug,
          question: "Are Indian vegetarian and Jain meals available on this tour?",
          answer: "Yes! Hassle Free Travels coordinates verified Indian vegetarian and Jain-friendly meal options on all our Sri Lanka itineraries upon advance request.",
          sortOrder: 1,
        },
        {
          id: `${sriLankaPkg.slug}-faq-2`,
          packageId: sriLankaPkg.slug,
          question: "What is the visa process for Indian passport holders?",
          answer: sriLankaPkg.visaNote,
          sortOrder: 2,
        },
        {
          id: `${sriLankaPkg.slug}-faq-3`,
          packageId: sriLankaPkg.slug,
          question: "Are flights included in this package price?",
          answer: "This is a land-only package. International flights to/from Colombo (CMB) and domestic flights (such as to Jaffna) are excluded unless specifically stated. Our team will gladly assist with direct flight ticketing from Indian cities.",
          sortOrder: 3,
        },
        {
          id: `${sriLankaPkg.slug}-faq-4`,
          packageId: sriLankaPkg.slug,
          question: "How do scenic train rides and wildlife safaris work?",
          answer: "Pre-reserved train seats (2nd class reserved or 1st class observation where listed) and private 4x4 open jeep safaris with national park permits are pre-arranged by our local team.",
          sortOrder: 4,
        },
      ],
      items: [
        ...sriLankaPkg.inclusions.map((inc, i) => ({
          id: `${sriLankaPkg.slug}-inc-${i}`,
          packageId: sriLankaPkg.slug,
          kind: "inclusion" as const,
          label: inc,
          sortOrder: i + 1,
        })),
        ...sriLankaPkg.exclusions.map((exc, i) => ({
          id: `${sriLankaPkg.slug}-exc-${i}`,
          packageId: sriLankaPkg.slug,
          kind: "exclusion" as const,
          label: exc,
          sortOrder: i + 1,
        })),
      ],
    };
  }

  // Fallback to static Malaysia data if package is not found in DB
  if (!pkg && malaysiaPkg) {
    const destRecord: Destination = dest || {
      id: "malaysia-dest-uuid",
      slug: "malaysia",
      name: "Malaysia",
      country: "Malaysia",
      type: "international",
      tagline: "Visit Malaysia Year 2026 + visa-free until 31 Dec 2026",
      overview: "Experience Kuala Lumpur’s vibrant skyline, Genting theme parks, UNESCO street food in Penang, and the pristine beaches of Langkawi.",
      best_season: "Year-round",
      ideal_duration: "5N / 6D",
      hero_image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80",
      og_image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80",
      seo_title: "Malaysia Tour Packages 2026 | Visit Malaysia Year | Hassle Free Travels",
      seo_description: "Explore Malaysia in 2026 with Hassle Free Travels. 30-day visa-free for Indian travellers, Petronas Towers, Langkawi, Penang & curated vegetarian dining.",
      is_published: true,
      sort_order: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    pkg = {
      id: malaysiaPkg.slug,
      destinationId: destRecord.id,
      slug: malaysiaPkg.slug,
      name: malaysiaPkg.name,
      tagline: malaysiaPkg.tagline,
      packageType: malaysiaPkg.packageType,
      nights: malaysiaPkg.nights,
      days: malaysiaPkg.days,
      startingPriceInr: malaysiaPkg.priceFromINR,
      priceNote: malaysiaPkg.priceNote,
      includesFlights: false,
      groupSizeMin: 2,
      groupSizeMax: malaysiaPkg.isGroup ? 20 : null,
      departureCities: malaysiaPkg.departureCities || ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Kochi", "Hyderabad"],
      bestMonths: malaysiaPkg.bestMonths,
      highlights: malaysiaPkg.highlights,
      mealsSummary: malaysiaPkg.mealsSummary || "Daily Breakfast",
      staySummary: malaysiaPkg.staySummary || malaysiaPkg.hotelCategory,
      transportSummary: malaysiaPkg.transportSummary || "Private A/C vehicles throughout",
      visaNote: malaysiaPkg.visaNote,
      heroImage: malaysiaPkg.heroImage,
      gallery: [],
      seoTitle: malaysiaPkg.seoTitle,
      seoDescription: malaysiaPkg.seoDescription,
      ogImage: malaysiaPkg.heroImage,
      canonicalPath: `/destination/malaysia/${malaysiaPkg.slug}`,
      isPublished: true,
      isFeatured: malaysiaPkg.isFeatured,
      publishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      destination: destRecord,
      itineraryDays: malaysiaPkg.itineraryDays.map((d) => ({
        id: `${malaysiaPkg.slug}-d${d.dayNumber}`,
        packageId: malaysiaPkg.slug,
        dayNumber: d.dayNumber,
        title: d.title,
        body: d.body,
        meals: d.meals || null,
        stay: d.stay || null,
      })),
      faqs: [
        {
          id: `${malaysiaPkg.slug}-faq-1`,
          packageId: malaysiaPkg.slug,
          question: "Are Indian vegetarian and Jain meals available on this tour?",
          answer: "Yes! Hassle Free Travels coordinates verified Indian vegetarian and Jain-friendly dining options across Kuala Lumpur, Penang, Langkawi, Genting, and Sabah upon advance request.",
          sortOrder: 1,
        },
        {
          id: `${malaysiaPkg.slug}-faq-2`,
          packageId: malaysiaPkg.slug,
          question: "What is the visa process for Indian passport holders?",
          answer: malaysiaPkg.visaNote,
          sortOrder: 2,
        },
        {
          id: `${malaysiaPkg.slug}-faq-3`,
          packageId: malaysiaPkg.slug,
          question: "Are flights included in this package price?",
          answer: "This is a land-only package. International flights to/from India and internal domestic flights (such as Kota Kinabalu to Sandakan, or Langkawi to Singapore) are excluded unless specifically stated. Our team will gladly assist with flight bookings upon request.",
          sortOrder: 3,
        },
        {
          id: `${malaysiaPkg.slug}-faq-4`,
          packageId: malaysiaPkg.slug,
          question: "How do theme park tickets, ferry transfers, and national park permits work?",
          answer: "All sightseeing tickets, theme park admissions, ferry passes, and cable car rides listed in your package inclusions are pre-arranged and pre-confirmed by our local team for a seamless experience.",
          sortOrder: 4,
        },
      ],
      items: [
        ...malaysiaPkg.inclusions.map((inc, i) => ({
          id: `${malaysiaPkg.slug}-inc-${i}`,
          packageId: malaysiaPkg.slug,
          kind: "inclusion" as const,
          label: inc,
          sortOrder: i + 1,
        })),
        ...malaysiaPkg.exclusions.map((exc, i) => ({
          id: `${malaysiaPkg.slug}-exc-${i}`,
          packageId: malaysiaPkg.slug,
          kind: "exclusion" as const,
          label: exc,
          sortOrder: i + 1,
        })),
      ],
    };
  }

  if (!pkg && maldivesPkg) {
    const destRecord: Destination = dest || {
      id: "maldives-dest-uuid",
      slug: "maldives",
      name: "Maldives",
      country: "Maldives",
      type: "international",
      tagline: "Turquoise Atolls, Guesthouse Adventures & Overwater Luxury",
      overview: "Sun-kissed atolls, turquoise lagoons, vibrant coral reefs, and luxury overwater living in the heart of the Indian Ocean.",
      best_season: "Nov to Apr",
      ideal_duration: "5N / 6D",
      hero_image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1600&auto=format&fit=crop&q=80",
      og_image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1600&auto=format&fit=crop&q=80",
      seo_title: "Maldives Tour Packages 2026 | Free 30-Day VOA | Hassle Free Travels",
      seo_description: "Explore Maldives 2026 packages with Hassle Free Travels. 30-day Free Visa on Arrival for Indian passport holders, Maafushi, Dhigurah, luxury overwater villas & vegetarian dining.",
      is_published: true,
      sort_order: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    pkg = {
      id: maldivesPkg.slug,
      destinationId: destRecord.id,
      slug: maldivesPkg.slug,
      name: maldivesPkg.name,
      tagline: maldivesPkg.tagline,
      packageType: maldivesPkg.packageType,
      nights: maldivesPkg.nights,
      days: maldivesPkg.days,
      startingPriceInr: maldivesPkg.priceFromINR,
      priceNote: maldivesPkg.priceNote,
      includesFlights: false,
      groupSizeMin: 2,
      groupSizeMax: null,
      departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Kochi", "Hyderabad"],
      bestMonths: maldivesPkg.bestMonths,
      highlights: maldivesPkg.highlights,
      mealsSummary: maldivesPkg.mealsSummary || "Daily Breakfast / Full Board as per package",
      staySummary: maldivesPkg.staySummary || maldivesPkg.hotelCategory,
      transportSummary: maldivesPkg.transportSummary || "Speedboat / Seaplane as per itinerary",
      visaNote: maldivesPkg.visaNote,
      heroImage: maldivesPkg.heroImage,
      gallery: [],
      seoTitle: maldivesPkg.seoTitle,
      seoDescription: maldivesPkg.seoDescription,
      ogImage: maldivesPkg.heroImage,
      canonicalPath: `/destination/maldives/${maldivesPkg.slug}`,
      isPublished: true,
      isFeatured: maldivesPkg.isFeatured,
      publishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      destination: destRecord,
      itineraryDays: maldivesPkg.itineraryDays.map((d) => ({
        id: `${maldivesPkg.slug}-d${d.dayNumber}`,
        packageId: maldivesPkg.slug,
        dayNumber: d.dayNumber,
        title: d.title,
        body: d.body,
        meals: d.meals || null,
        stay: d.stay || null,
      })),
      faqs: [
        {
          id: `${maldivesPkg.slug}-faq-1`,
          packageId: maldivesPkg.slug,
          question: "Are Indian vegetarian and Jain meals available in the Maldives?",
          answer: "Yes! Hassle Free Travels coordinates with local guesthouses and luxury island resorts to arrange dedicated Indian vegetarian and Jain dietary options. Most resort buffets feature live cooking stations with dal, roti, curries, and vegetarian preparations upon advance request.",
          sortOrder: 1,
        },
        {
          id: `${maldivesPkg.slug}-faq-2`,
          packageId: maldivesPkg.slug,
          question: "What is the visa requirement for Indian citizens visiting the Maldives?",
          answer: maldivesPkg.visaNote,
          sortOrder: 2,
        },
        {
          id: `${maldivesPkg.slug}-faq-3`,
          packageId: maldivesPkg.slug,
          question: "Are international flights and island transfers included in the package?",
          answer: maldivesPkg.slug === "maldives-luxury-escape-ifuru-island"
            ? "International flights from India to Malé (MLE) are not included. However, return domestic flights from Malé to Ifuru Island and resort transfers are included in this package."
            : (maldivesPkg.slug === "robinson-noonu-all-inclusive-wellness" || maldivesPkg.slug === "robinson-maldives-adults-only-romantic"
                ? "International flights from India to Malé (MLE) are not included. Round-trip domestic flight/seaplane and speedboat transfers between Malé airport and the resort are included as specified."
                : (maldivesPkg.slug === "central-atolls-liveaboard-dive-safari"
                    ? "International flights to Malé (MLE) are excluded. Round-trip airport transfers, liveaboard cabin accommodation, full board meals, and up to 18 guided dives (with tanks & weights) are included. PADI Open Water certification is required."
                    : "This is a land-only package. International flights to/from Malé (MLE) are excluded. All arrival and departure transfers (speedboat or domestic transfer as specified in inclusions) between Malé Airport and your island accommodation are included.")),
          sortOrder: 3,
        },
        {
          id: `${maldivesPkg.slug}-faq-4`,
          packageId: maldivesPkg.slug,
          question: "What should I pack and know about local island customs in the Maldives?",
          answer: "When staying on local inhabited islands (such as Maafushi, Dhigurah, or Fulidhoo), modest dress covering shoulders and knees is respected in village areas, while bikinis and swimwear are welcome on designated 'Bikini Beaches'. On private resort islands and liveaboards, standard resort swimwear is completely unrestricted.",
          sortOrder: 4,
        },
      ],
      items: [
        ...maldivesPkg.inclusions.map((inc, i) => ({
          id: `${maldivesPkg.slug}-inc-${i}`,
          packageId: maldivesPkg.slug,
          kind: "inclusion" as const,
          label: inc,
          sortOrder: i + 1,
        })),
        ...maldivesPkg.exclusions.map((exc, i) => ({
          id: `${maldivesPkg.slug}-exc-${i}`,
          packageId: maldivesPkg.slug,
          kind: "exclusion" as const,
          label: exc,
          sortOrder: i + 1,
        })),
      ],
    };
  }


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
      is_published: true,
      sort_order: 1,
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
      canonicalPath: `/destination/egypt/${egyptPkg.slug}`,
      isPublished: true,
      isFeatured: egyptPkg.isFeatured,
      publishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      destination: destRecord,
      itineraryDays: egyptPkg.itineraryDays.map((day) => ({
        id: `${egyptPkg.slug}-day-${day.dayNumber}`,
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
          id: `${egyptPkg.slug}-faq-1`,
          packageId: egyptPkg.slug,
          question: "Are Indian vegetarian and Jain meals available on Egypt tours?",
          answer: "Yes! Hassle Free Travels coordinates vetted Indian and local vegetarian/Jain meal options on all our Egypt itineraries, including on Nile cruises.",
          sortOrder: 1,
        },
        {
          id: `${egyptPkg.slug}-faq-2`,
          packageId: egyptPkg.slug,
          question: "What is the visa process for Indian passport holders?",
          answer: "Indian passport holders can obtain an Egypt tourist visa on arrival at Cairo International Airport (USD 25) or apply for an e-visa in advance.",
          sortOrder: 2,
        },
        {
          id: `${egyptPkg.slug}-faq-3`,
          packageId: egyptPkg.slug,
          question: "Are international flights included?",
          answer: "These are land-only packages. We do include domestic flights within Egypt (e.g., Cairo to Luxor/Aswan) as specified in each itinerary.",
          sortOrder: 3,
        }
      ],
      items: [
        ...egyptPkg.inclusions.map((inc, i) => ({
          id: `${egyptPkg.slug}-inc-${i}`,
          packageId: egyptPkg.slug,
          kind: "inclusion" as const,
          label: inc,
          sortOrder: i + 1,
        })),
        ...egyptPkg.exclusions.map((exc, i) => ({
          id: `${egyptPkg.slug}-exc-${i}`,
          packageId: egyptPkg.slug,
          kind: "exclusion" as const,
          label: exc,
          sortOrder: i + 1,
        })),
      ],
    };
  }

  if (!pkg) {
    notFound();
  }

  // 3. Query up to 3 related published packages in the same destination
  let relatedPackages: (Package & { destination?: Destination })[] = [];
  try {
    relatedPackages = await db.query.packages.findMany({
      where: and(
        eq(packages.destinationId, pkg.destinationId),
        eq(packages.isPublished, true),
        ne(packages.id, pkg.id)
      ),
      limit: 3,
    });
  } catch {
    // ignore
  }

  if (relatedPackages.length === 0 && thaiPkg) {
    const relatedList = thaiPkg.relatedSlugs
      .map((slug) => getThailandPackageBySlug(slug))
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
      groupSizeMin: 2,
      groupSizeMax: null,
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
      canonicalPath: `/destination/thailand/${rel.slug}`,
      isPublished: true,
      isFeatured: rel.isFeatured,
      publishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      destination: pkg!.destination,
    }));
  }

  if (relatedPackages.length === 0 && japanPkg) {
    const relatedList = japanPkg.relatedSlugs
      .map((slug) => getJapanPackageBySlug(slug))
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
      groupSizeMin: 2,
      groupSizeMax: null,
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
      canonicalPath: `/destination/japan/${rel.slug}`,
      isPublished: true,
      isFeatured: rel.isFeatured,
      publishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      destination: pkg!.destination,
    }));
  }

  if (relatedPackages.length === 0 && sriLankaPkg) {
    const relatedList = sriLankaPkg.relatedSlugs
      .map((slug) => getSriLankaPackageBySlug(slug))
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
      groupSizeMin: 2,
      groupSizeMax: null,
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
      canonicalPath: `/destination/sri-lanka/${rel.slug}`,
      isPublished: true,
      isFeatured: rel.isFeatured,
      publishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      destination: pkg!.destination,
    }));
  }

  if (relatedPackages.length === 0 && malaysiaPkg) {
    const relatedList = malaysiaPkg.relatedSlugs
      .map((slug) => getMalaysiaPackageBySlug(slug))
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
      groupSizeMin: 2,
      groupSizeMax: null,
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
      canonicalPath: `/destination/malaysia/${rel.slug}`,
      isPublished: true,
      isFeatured: rel.isFeatured,
      publishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      destination: pkg!.destination,
    }));
  }

  if (relatedPackages.length === 0 && maldivesPkg) {
    const relatedList = maldivesPkg.relatedSlugs
      .map((slug) => getMaldivesPackageBySlug(slug))
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
      groupSizeMin: 2,
      groupSizeMax: null,
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
      canonicalPath: `/destination/maldives/${rel.slug}`,
      isPublished: true,
      isFeatured: rel.isFeatured,
      publishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      destination: pkg!.destination,
    }));
  }


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
      canonicalPath: `/destination/egypt/${rel.slug}`,
      isPublished: true,
      isFeatured: rel.isFeatured,
      publishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      destination: pkg!.destination,
    }));
  }

  // 3b. Query up to 3 related published blog guides for this package or destination
  let relatedBlogs: BlogPost[] = [];
  try {
    relatedBlogs = await db.query.blogPosts.findMany({
      where: and(
        or(
          eq(blogPosts.destinationId, pkg.destinationId),
          eq(blogPosts.packageId, pkg.id)
        ),
        eq(blogPosts.isPublished, true)
      ),
      limit: 3,
    });
  } catch {
    // ignore
  }

  const baseUrl = "https://www.hasslefree-travels.com";
  const canonicalUrl = `${baseUrl}/destination/${pkg.destination.slug}/${pkg.slug}`;

  // 4. Schema.org JSON-LD Structured Data
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pkg.destination.name,
        item: `${baseUrl}/destination/${pkg.destination.slug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: pkg.name,
        item: canonicalUrl,
      },
    ],
  };

  const touristTripJsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.name,
    description: pkg.seoDescription,
    image: pkg.heroImage,
    touristType: pkg.packageType,
    itinerary: {
      "@type": "ItemList",
      numberOfItems: pkg.itineraryDays.length,
      itemListElement: pkg.itineraryDays.map((d) => ({
        "@type": "ListItem",
        position: d.dayNumber,
        name: d.title,
        description: d.body,
      })),
    },
    offers: pkg.startingPriceInr
      ? {
          "@type": "Offer",
          price: pkg.startingPriceInr,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          url: canonicalUrl,
          validFrom: new Date().toISOString().split("T")[0],
        }
      : undefined,
    provider: {
      "@type": "TravelAgency",
      name: "Hassle Free Travels",
      url: baseUrl,
      telephone: "+91-8375030889",
    },
  };

  const faqJsonLd =
    pkg.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: pkg.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <TourClient
        pkg={pkg}
        relatedPackages={relatedPackages}
        relatedBlogs={relatedBlogs}
      />
    </>
  );
}
