import type { Metadata } from "next";
import { ALL_DESTINATIONS } from "@/data/destinations";
import { db } from "@/db";
import { packages } from "@/db/schema";
import { eq } from "drizzle-orm";
import ThankYouClient from "./ThankYouClient";

export const metadata: Metadata = {
  title: "Thank You — Your Enquiry is Confirmed | Hassle Free Travels",
  description:
    "Your travel enquiry has been received. Our destination specialist will contact you within 15 minutes via WhatsApp or call with a personalized itinerary and best-price quote.",
  robots: { index: false, follow: false },
};

// Pre-compute related destinations for static rendering
function getRelatedDestinations(slug: string) {
  const dest = ALL_DESTINATIONS[slug];
  if (dest?.trending2026?.relatedSlugs) {
    return dest.trending2026.relatedSlugs
      .slice(0, 3)
      .map((s) => {
        const d = ALL_DESTINATIONS[s];
        return d ? { id: d.id, name: d.name, tagline: d.hero.subtitle } : null;
      })
      .filter(Boolean) as { id: string; name: string; tagline: string }[];
  }

  // Fallback: pick 3 destinations that are not the current one
  const all = Object.values(ALL_DESTINATIONS).filter((d) => d.id !== slug);
  return all.slice(0, 3).map((d) => ({
    id: d.id,
    name: d.name,
    tagline: d.hero.subtitle,
  }));
}

export default async function ThankYouPage(props: {
  searchParams: Promise<{ destination?: string; name?: string; package?: string }>;
}) {
  const searchParams = await props.searchParams;
  const destinationSlug = searchParams.destination || "";
  const packageSlug = searchParams.package || "";
  const userName = searchParams.name || "";

  let targetName = "";
  if (packageSlug) {
    try {
      const pkg = await db.query.packages.findFirst({
        where: eq(packages.slug, packageSlug),
      });
      targetName = pkg ? pkg.name : packageSlug.replace(/-/g, " ");
    } catch {
      targetName = packageSlug.replace(/-/g, " ");
    }
  } else if (destinationSlug) {
    const dest = ALL_DESTINATIONS[destinationSlug];
    targetName = dest?.name || destinationSlug;
  }

  const related = getRelatedDestinations(destinationSlug || "spiti");

  return (
    <ThankYouClient
      destinationName={targetName}
      destinationSlug={destinationSlug}
      userName={userName}
      relatedDestinations={related}
    />
  );
}
