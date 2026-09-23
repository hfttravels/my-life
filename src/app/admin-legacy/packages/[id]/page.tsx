import { notFound } from "next/navigation";
import { requireAdminAuth } from "@/lib/adminAuth";
import { db } from "@/db";
import {
  packages,
  destinations,
  packageDays,
  packageFaqs,
  packageItems,
} from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import PackageForm from "../PackageForm";

interface EditPackagePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPackagePage({ params }: EditPackagePageProps) {
  await requireAdminAuth();

  const { id } = await params;

  const pkg = await db.query.packages.findFirst({
    where: eq(packages.id, id),
    with: {
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

  if (!pkg) {
    notFound();
  }

  const allDestinations = await db
    .select({ id: destinations.id, name: destinations.name, slug: destinations.slug })
    .from(destinations)
    .orderBy(asc(destinations.name));

  const formData = {
    id: pkg.id,
    destinationId: pkg.destinationId,
    slug: pkg.slug,
    name: pkg.name,
    tagline: pkg.tagline || "",
    packageType: pkg.packageType,
    nights: pkg.nights,
    days: pkg.days,
    startingPriceInr: pkg.startingPriceInr,
    priceNote: pkg.priceNote || "",
    includesFlights: pkg.includesFlights,
    groupSizeMin: pkg.groupSizeMin,
    groupSizeMax: pkg.groupSizeMax,
    departureCities: pkg.departureCities || [],
    bestMonths: pkg.bestMonths || [],
    highlights: pkg.highlights || [],
    mealsSummary: pkg.mealsSummary || "",
    staySummary: pkg.staySummary || "",
    transportSummary: pkg.transportSummary || "",
    visaNote: pkg.visaNote || "",
    heroImage: pkg.heroImage,
    gallery: pkg.gallery || [],
    seoTitle: pkg.seoTitle,
    seoDescription: pkg.seoDescription,
    ogImage: pkg.ogImage || "",
    isPublished: pkg.isPublished,
    isFeatured: pkg.isFeatured,
    daysList: pkg.itineraryDays.map((d) => ({
      dayNumber: d.dayNumber,
      title: d.title,
      body: d.body,
      meals: d.meals || "",
      stay: d.stay || "",
    })),
    faqsList: pkg.faqs.map((f) => ({
      question: f.question,
      answer: f.answer,
    })),
    itemsList: pkg.items.map((i) => ({
      kind: i.kind,
      label: i.label,
    })),
  };

  return (
    <div>
      <PackageForm
        initialData={formData}
        destinations={allDestinations}
        isEdit={true}
      />
    </div>
  );
}
