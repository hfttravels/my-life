import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ALL_DESTINATIONS } from "@/data/destinations";
import { THAILAND_PACKAGES, getThailandPackageBySlug } from "@/data/thailand-packages";
import { JAPAN_PACKAGES, getJapanPackageBySlug } from "@/data/japan-packages";
import { SRI_LANKA_PACKAGES, getSriLankaPackageBySlug } from "@/data/sri-lanka-packages";
import { MALAYSIA_PACKAGES, getMalaysiaPackageBySlug } from "@/data/malaysia-packages";
import { MALDIVES_PACKAGES, getMaldivesPackageBySlug } from "@/data/maldives-packages";
import { EGYPT_PACKAGES, getEgyptPackageBySlug } from "@/data/egypt-packages";
import DestinationClient, {
  DbPackageCard,
} from "@/components/destination/DestinationClient";
import { db } from "@/db";
import { destinations, packages, blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";

interface DestinationPageProps {
  params: Promise<{ id: string }>;
}

export interface DbBlogPostCard {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string | null;
  readMinutes: number;
  featuredImage: string | null;
  publishedAt: string | null;
}

export function generateStaticParams() {
  return Object.keys(ALL_DESTINATIONS).map((id) => ({
    id,
  }));
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { id } = await params;
  const data = ALL_DESTINATIONS[id];

  if (!data) {
    return {
      title: "Destination Not Found | Hassle Free Travels",
      description: "The requested destination could not be found.",
    };
  }

  const isTrending = !!data.trending2026;
  const title = isTrending
    ? `${data.name} Tour Packages 2026 | ${data.trending2026?.tagline} | Hassle Free Travels`
    : `${data.hero.title} | Hassle Free Travels`;
  const description = isTrending
    ? `${data.name} Tour Packages 2026: ${data.trending2026?.whyTrending} Handcrafted itineraries, verified stays & seamless WhatsApp booking with Hassle Free Travels.`
    : data.hero.subtitle;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.hasslefree-travels.com/destination/${id}`,
      images: [
        {
          url: data.hero.image,
          width: 1200,
          height: 630,
          alt: `${data.name} Travel Experiences 2026`,
        },
      ],
      type: "website",
    },
  };
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { id } = await params;

  // Single canonical redirect for Spiti
  if (id === "spiti") {
    redirect("/destination/spiti/spiti-valley-tour-packages");
  }

  const data = ALL_DESTINATIONS[id];

  if (!data) {
    notFound();
  }

  // Fetch real published packages and blog posts for this destination from Postgres
  let dbPackagesList: DbPackageCard[] | undefined = undefined;
  let dbBlogPostsList: DbBlogPostCard[] | undefined = undefined;
  try {
    const destRecord = await db.query.destinations.findFirst({
      where: eq(destinations.slug, id),
      with: {
        packages: {
          where: eq(packages.isPublished, true),
        },
        blogPosts: {
          where: eq(blogPosts.isPublished, true),
        },
      },
    });

    if (destRecord) {
      dbPackagesList = destRecord.packages.map((p) => {
        const matched =
          id === "thailand"
            ? getThailandPackageBySlug(p.slug)
            : id === "japan"
            ? getJapanPackageBySlug(p.slug)
            : id === "sri-lanka"
            ? getSriLankaPackageBySlug(p.slug)
            : id === "malaysia"
            ? getMalaysiaPackageBySlug(p.slug)
            : id === "maldives"
            ? getMaldivesPackageBySlug(p.slug)
            : id === "egypt"
            ? getEgyptPackageBySlug(p.slug)
            : undefined;
        return {
          id: p.id,
          slug: p.slug,
          name: p.name,
          tagline: p.tagline,
          nights: p.nights,
          days: p.days,
          startingPriceInr: p.startingPriceInr,
          priceNote: p.priceNote,
          packageType: p.packageType,
          categoryLabel: matched?.categoryLabel ?? (p.packageType === "group" ? "Group" : "Private"),
          startCity: matched?.startCity ?? (p.departureCities?.[0] ?? null),
          heroImage: p.heroImage,
          highlights: p.highlights,
          isFeatured: p.isFeatured || (matched?.isFeatured ?? false),
        };
      });

      dbBlogPostsList = destRecord.blogPosts.map((b) => ({
        id: b.id,
        slug: b.slug,
        title: b.title,
        excerpt: b.excerpt,
        category: b.category,
        readMinutes: b.readMinutes,
        featuredImage: b.featuredImage,
        publishedAt: b.publishedAt ? b.publishedAt.toISOString() : null,
      }));
    }
  } catch (err) {
    console.error("Error querying db packages and blogs for destination:", err);
  }

  // Fallback to static Thailand data if DB returned empty or wasn't seeded yet
  if (id === "thailand" && (!dbPackagesList || dbPackagesList.length === 0)) {
    dbPackagesList = THAILAND_PACKAGES.map((p) => ({
      id: p.slug,
      slug: p.slug,
      name: p.name,
      tagline: p.tagline,
      nights: p.nights,
      days: p.days,
      startingPriceInr: p.priceFromINR,
      priceNote: p.priceNote,
      packageType: p.packageType,
      categoryLabel: p.categoryLabel,
      startCity: p.startCity,
      heroImage: p.heroImage,
      highlights: p.highlights,
      isFeatured: p.isFeatured,
    }));
  }

  // Fallback to static Japan data if DB returned empty or wasn't seeded yet
  if (id === "japan" && (!dbPackagesList || dbPackagesList.length === 0)) {
    dbPackagesList = JAPAN_PACKAGES.map((p) => ({
      id: p.slug,
      slug: p.slug,
      name: p.name,
      tagline: p.tagline,
      nights: p.nights,
      days: p.days,
      startingPriceInr: p.priceFromINR,
      priceNote: p.priceNote,
      packageType: p.packageType,
      categoryLabel: p.categoryLabel,
      startCity: p.startCity,
      heroImage: p.heroImage,
      highlights: p.highlights,
      isFeatured: p.isFeatured,
    }));
  }

  // Fallback to static Sri Lanka data if DB returned empty or wasn't seeded yet
  if (id === "sri-lanka" && (!dbPackagesList || dbPackagesList.length === 0)) {
    dbPackagesList = SRI_LANKA_PACKAGES.map((p) => ({
      id: p.slug,
      slug: p.slug,
      name: p.name,
      tagline: p.tagline,
      nights: p.nights,
      days: p.days,
      startingPriceInr: p.priceFromINR,
      priceNote: p.priceNote,
      packageType: p.packageType,
      categoryLabel: p.categoryLabel,
      startCity: p.startCity,
      heroImage: p.heroImage,
      highlights: p.highlights,
      isFeatured: p.isFeatured,
    }));
  }

  // Fallback to static Malaysia data if DB returned empty or wasn't seeded yet
  if (id === "malaysia" && (!dbPackagesList || dbPackagesList.length === 0)) {
    dbPackagesList = MALAYSIA_PACKAGES.map((p) => ({
      id: p.slug,
      slug: p.slug,
      name: p.name,
      tagline: p.tagline,
      nights: p.nights,
      days: p.days,
      startingPriceInr: p.priceFromINR,
      priceNote: p.priceNote,
      packageType: p.packageType,
      categoryLabel: p.categoryLabel,
      startCity: p.startCity,
      heroImage: p.heroImage,
      highlights: p.highlights,
      isFeatured: p.isFeatured,
    }));
  }

  // Fallback to static Maldives data if DB returned empty or wasn't seeded yet
  if (id === "maldives" && (!dbPackagesList || dbPackagesList.length === 0)) {
    dbPackagesList = MALDIVES_PACKAGES.map((p) => ({
      id: p.slug,
      slug: p.slug,
      name: p.name,
      tagline: p.tagline,
      nights: p.nights,
      days: p.days,
      startingPriceInr: p.priceFromINR,
      priceNote: p.priceNote,
      packageType: p.packageType,
      categoryLabel: p.categoryLabel,
      startCity: p.startCity,
      heroImage: p.heroImage,
      highlights: p.highlights,
      isFeatured: p.isFeatured,
    }));
  }

  // Fallback to static Egypt data if DB returned empty or wasn't seeded yet
  if (id === "egypt" && (!dbPackagesList || dbPackagesList.length === 0)) {
    dbPackagesList = EGYPT_PACKAGES.map((p) => ({
      id: p.slug,
      slug: p.slug,
      name: p.name,
      tagline: p.tagline,
      nights: p.nights,
      days: p.days,
      startingPriceInr: p.priceFromINR,
      priceNote: p.priceNote,
      packageType: p.packageType,
      categoryLabel: p.categoryLabel,
      startCity: p.startCity,
      heroImage: p.heroImage,
      highlights: p.highlights,
      isFeatured: p.isFeatured,
    }));
  }

  const offers =
    dbPackagesList && dbPackagesList.length > 0
      ? dbPackagesList.map((pkg) => ({
          "@type": "Offer",
          name: pkg.name,
          priceCurrency: "INR",
          price: pkg.startingPriceInr || undefined,
          url: `https://www.hasslefree-travels.com/destination/${id}/${pkg.slug}`,
          availability: "https://schema.org/InStock",
        }))
      : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "TouristDestination"],
    name: data.name,
    description: data.trending2026 ? data.trending2026.whyTrending : data.hero.subtitle,
    url: `https://www.hasslefree-travels.com/destination/${id}`,
    image: data.hero.image,
    touristType: data.trending2026 ? data.trending2026.travelerTypes : "Families, Couples, Solo Travelers",
    ...(offers.length > 0 ? { makesOffer: offers } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DestinationClient
        data={data}
        dbPackages={dbPackagesList}
        dbBlogPosts={dbBlogPostsList}
      />
    </>
  );
}
