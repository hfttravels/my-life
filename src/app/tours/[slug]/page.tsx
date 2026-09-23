import { notFound, permanentRedirect } from "next/navigation";
import { db } from "@/db";
import { packages } from "@/db/schema";
import { eq } from "drizzle-orm";

interface TourPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const published = await db
      .select({ slug: packages.slug })
      .from(packages)
      .where(eq(packages.isPublished, true));

    return published.map((p) => ({ slug: p.slug }));
  } catch (err) {
    console.error("Failed to generateStaticParams for tours redirect:", err);
    return [];
  }
}

export default async function TourPage({ params }: TourPageProps) {
  const { slug } = await params;

  const pkg = await db.query.packages.findFirst({
    where: eq(packages.slug, slug),
    with: {
      destination: true,
    },
  });

  if (!pkg || !pkg.destination) {
    notFound();
  }

  // 301 Permanent Redirect to the single nested canonical pattern
  permanentRedirect(`/destination/${pkg.destination.slug}/${pkg.slug}`);
}
