"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../admin.module.css";

interface DestinationOption {
  id: string;
  name: string;
  slug: string;
}

interface PackageDayData {
  dayNumber: number;
  title: string;
  body: string;
  meals: string;
  stay: string;
}

interface PackageFaqData {
  question: string;
  answer: string;
}

interface PackageItemData {
  kind: string;
  label: string;
}

interface PackageFormProps {
  initialData?: {
    id?: string;
    destinationId: string;
    slug: string;
    name: string;
    tagline: string;
    packageType: string;
    nights: number;
    days: number;
    startingPriceInr: number | null;
    priceNote: string;
    includesFlights: boolean;
    groupSizeMin: number | null;
    groupSizeMax: number | null;
    departureCities: string[];
    bestMonths: string[];
    highlights: string[];
    mealsSummary: string;
    staySummary: string;
    transportSummary: string;
    visaNote: string;
    heroImage: string;
    gallery: string[];
    seoTitle: string;
    seoDescription: string;
    ogImage: string;
    isPublished: boolean;
    isFeatured: boolean;
    daysList: PackageDayData[];
    faqsList: PackageFaqData[];
    itemsList: PackageItemData[];
  };
  destinations: DestinationOption[];
  isEdit?: boolean;
}

export default function PackageForm({
  initialData,
  destinations,
  isEdit = false,
}: PackageFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form states
  const [destinationId, setDestinationId] = useState(
    initialData?.destinationId || destinations[0]?.id || ""
  );
  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [tagline, setTagline] = useState(initialData?.tagline || "");
  const [packageType, setPackageType] = useState(
    initialData?.packageType || "group"
  );
  const [nights, setNights] = useState(initialData?.nights ?? 5);
  const [days, setDays] = useState(initialData?.days ?? 6);
  const [startingPriceInr, setStartingPriceInr] = useState<string>(
    initialData?.startingPriceInr ? String(initialData.startingPriceInr) : ""
  );
  const [priceNote, setPriceNote] = useState(
    initialData?.priceNote || "per person, twin share, ex-Delhi, without flights"
  );
  const [includesFlights, setIncludesFlights] = useState(
    initialData?.includesFlights || false
  );
  const [groupSizeMin, setGroupSizeMin] = useState<string>(
    initialData?.groupSizeMin ? String(initialData.groupSizeMin) : "2"
  );
  const [groupSizeMax, setGroupSizeMax] = useState<string>(
    initialData?.groupSizeMax ? String(initialData.groupSizeMax) : "16"
  );
  const [departureCitiesStr, setDepartureCitiesStr] = useState(
    initialData?.departureCities?.join(", ") || "Delhi, Mumbai"
  );
  const [bestMonthsStr, setBestMonthsStr] = useState(
    initialData?.bestMonths?.join(", ") || "May, Jun, Jul, Aug, Sep, Oct"
  );
  const [highlightsStr, setHighlightsStr] = useState(
    initialData?.highlights?.join("\n") || ""
  );
  const [mealsSummary, setMealsSummary] = useState(
    initialData?.mealsSummary || "Daily Breakfast & Dinner"
  );
  const [staySummary, setStaySummary] = useState(
    initialData?.staySummary || "3/4 Star Handpicked Hotels & Resorts"
  );
  const [transportSummary, setTransportSummary] = useState(
    initialData?.transportSummary || "Private AC Vehicle / Tempo Traveller"
  );
  const [visaNote, setVisaNote] = useState(
    initialData?.visaNote || "Permits and paperwork assisted by Hassle Free Travels."
  );
  const [heroImage, setHeroImage] = useState(
    initialData?.heroImage || "/dest-mountain.jpg"
  );
  const [galleryStr, setGalleryStr] = useState(
    initialData?.gallery?.join(", ") || ""
  );
  const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || "");
  const [seoDescription, setSeoDescription] = useState(
    initialData?.seoDescription || ""
  );
  const [ogImage, setOgImage] = useState(initialData?.ogImage || "");
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured || false);

  // Sub-items
  const [daysList, setDaysList] = useState<PackageDayData[]>(
    initialData?.daysList || [
      {
        dayNumber: 1,
        title: "Arrival & Welcome",
        body: "Arrive at the destination and transfer to your handpicked stay. Enjoy a relaxed evening at leisure.",
        meals: "Dinner",
        stay: "Premium Hotel",
      },
    ]
  );

  const [faqsList, setFaqsList] = useState<PackageFaqData[]>(
    initialData?.faqsList || [
      {
        question: "What is the best time to take this tour?",
        answer: "This tour is ideal during the pleasant travel months with clear skies and optimal sightseeing weather.",
      },
    ]
  );

  const [itemsList, setItemsList] = useState<PackageItemData[]>(
    initialData?.itemsList || [
      { kind: "inclusion", label: "All accommodations as per itinerary" },
      { kind: "inclusion", label: "Daily breakfast and specified dinners" },
      { kind: "inclusion", label: "Dedicated sanitized vehicle with mountain driver" },
      { kind: "exclusion", label: "Flights or train tickets to starting point" },
      { kind: "exclusion", label: "Personal expenses, shopping and optional activities" },
    ]
  );

  const generateSlugFromName = () => {
    const s = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    setSlug(s);
  };

  const handleAddDay = () => {
    setDaysList([
      ...daysList,
      {
        dayNumber: daysList.length + 1,
        title: `Day ${daysList.length + 1}: Sightseeing`,
        body: "Full day exploration of key attractions, local culture, and scenic landscapes.",
        meals: "Breakfast & Dinner",
        stay: "Premium Hotel",
      },
    ]);
  };

  const handleRemoveDay = (index: number) => {
    const updated = daysList.filter((_, i) => i !== index);
    setDaysList(updated.map((d, i) => ({ ...d, dayNumber: i + 1 })));
  };

  const handleUpdateDay = (index: number, field: keyof PackageDayData, val: string) => {
    const updated = [...daysList];
    updated[index] = { ...updated[index], [field]: val };
    setDaysList(updated);
  };

  const handleAddFaq = () => {
    setFaqsList([
      ...faqsList,
      { question: "Question here?", answer: "Detailed answer here." },
    ]);
  };

  const handleRemoveFaq = (index: number) => {
    setFaqsList(faqsList.filter((_, i) => i !== index));
  };

  const handleUpdateFaq = (index: number, field: keyof PackageFaqData, val: string) => {
    const updated = [...faqsList];
    updated[index] = { ...updated[index], [field]: val };
    setFaqsList(updated);
  };

  const handleAddItem = (kind: string = "inclusion") => {
    setItemsList([...itemsList, { kind, label: "New item label" }]);
  };

  const handleRemoveItem = (index: number) => {
    setItemsList(itemsList.filter((_, i) => i !== index));
  };

  const handleUpdateItem = (index: number, field: keyof PackageItemData, val: string) => {
    const updated = [...itemsList];
    updated[index] = { ...updated[index], [field]: val };
    setItemsList(updated);
  };

  const handleSubmit = async (publish: boolean) => {
    if (!name.trim() || !slug.trim() || !destinationId) {
      setError("Please fill in Package Name, Slug, and select a Destination.");
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccessMsg(null);

    const payload = {
      destinationId,
      name: name.trim(),
      slug: slug.trim().toLowerCase(),
      tagline: tagline.trim(),
      packageType,
      nights: Number(nights),
      days: Number(days),
      startingPriceInr: startingPriceInr ? Number(startingPriceInr) : null,
      priceNote: priceNote.trim(),
      includesFlights,
      groupSizeMin: groupSizeMin ? Number(groupSizeMin) : null,
      groupSizeMax: groupSizeMax ? Number(groupSizeMax) : null,
      departureCities: departureCitiesStr
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      bestMonths: bestMonthsStr
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      highlights: highlightsStr
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      mealsSummary: mealsSummary.trim(),
      staySummary: staySummary.trim(),
      transportSummary: transportSummary.trim(),
      visaNote: visaNote.trim(),
      heroImage: heroImage.trim() || "/dest-mountain.jpg",
      gallery: galleryStr
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      seoTitle: seoTitle.trim() || `${name} | Hassle Free Travels`,
      seoDescription: seoDescription.trim() || tagline || "",
      ogImage: ogImage.trim() || heroImage.trim() || null,
      isPublished: publish,
      isFeatured,
      daysList,
      faqsList,
      itemsList,
    };

    try {
      const url = isEdit
        ? `/api/admin/packages/${initialData?.id}`
        : "/api/admin/packages";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setSuccessMsg(
          publish
            ? "🚀 Package published live! Static pages and sitemap revalidated."
            : "💾 Package saved as draft."
        );
        setTimeout(() => {
          router.push("/admin/packages");
          router.refresh();
        }, 1200);
      } else {
        setError(data.error || "Failed to save package.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "1000px" }}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>
            {isEdit ? `Edit: ${name}` : "Create New Tour Package"}
          </h1>
          <p style={{ color: "#64748b", margin: "4px 0 0" }}>
            Fill in the details below. Everything you configure here generates a unique SEO tour page.
          </p>
        </div>
        <Link
          href="/admin/packages"
          style={{
            color: "#64748b",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "0.9rem",
          }}
        >
          ← Back to Packages
        </Link>
      </div>

      {error && (
        <div
          style={{
            background: "#fee2e2",
            border: "1px solid #fca5a5",
            color: "#991b1b",
            padding: "12px 16px",
            borderRadius: "8px",
            marginBottom: "20px",
            fontWeight: 600,
          }}
        >
          {error}
        </div>
      )}

      {successMsg && (
        <div
          style={{
            background: "#dcfce7",
            border: "1px solid #86efac",
            color: "#166534",
            padding: "12px 16px",
            borderRadius: "8px",
            marginBottom: "20px",
            fontWeight: 600,
          }}
        >
          {successMsg}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
        {/* Core Details Card */}
        <div className={styles.statCard}>
          <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "16px" }}>
            1. Core Package Details
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "6px" }}>
                Destination *
              </label>
              <select
                value={destinationId}
                onChange={(e) => setDestinationId(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
              >
                {destinations.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.slug})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "6px" }}>
                Package Type
              </label>
              <select
                value={packageType}
                onChange={(e) => setPackageType(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
              >
                <option value="group">Group Tour</option>
                <option value="custom">Customized Package</option>
                <option value="adventure">Adventure Expedition</option>
                <option value="honeymoon">Honeymoon Special</option>
                <option value="family">Family Holiday</option>
                <option value="spiritual">Spiritual Pilgrimage</option>
              </select>
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "6px" }}>
                Package Name (H1) *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Spiti Valley Circuit (Shimla to Manali)"
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
              />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 700 }}>
                  URL Slug (/tours/[slug]) *
                </label>
                <button
                  type="button"
                  onClick={generateSlugFromName}
                  style={{ background: "none", border: "none", color: "#00A896", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600 }}
                >
                  Auto-generate from title
                </button>
              </div>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. spiti-valley-circuit-shimla-to-manali"
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
              />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "6px" }}>
                Tagline / Subtitle
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. The Ultimate 8 Nights Full Circuit Himalayan Road Trip"
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "6px" }}>
                Days
              </label>
              <input
                type="number"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                min={1}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "6px" }}>
                Nights
              </label>
              <input
                type="number"
                value={nights}
                onChange={(e) => setNights(Number(e.target.value))}
                min={0}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "6px" }}>
                Starting Price (₹ INR)
              </label>
              <input
                type="number"
                value={startingPriceInr}
                onChange={(e) => setStartingPriceInr(e.target.value)}
                placeholder="e.g. 16499 (leave empty if enquire only)"
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "6px" }}>
                Price Note
              </label>
              <input
                type="text"
                value={priceNote}
                onChange={(e) => setPriceNote(e.target.value)}
                placeholder="e.g. per person, twin share, ex-Delhi, without flights"
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "6px" }}>
                Group Size Min
              </label>
              <input
                type="number"
                value={groupSizeMin}
                onChange={(e) => setGroupSizeMin(e.target.value)}
                placeholder="2"
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "6px" }}>
                Group Size Max
              </label>
              <input
                type="number"
                value={groupSizeMax}
                onChange={(e) => setGroupSizeMax(e.target.value)}
                placeholder="16"
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
              />
            </div>

            <div style={{ display: "flex", gap: "20px", alignItems: "center", gridColumn: "1 / -1", paddingTop: "8px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: 600, fontSize: "0.9rem" }}>
                <input
                  type="checkbox"
                  checked={includesFlights}
                  onChange={(e) => setIncludesFlights(e.target.checked)}
                />
                Includes Flights
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: 600, fontSize: "0.9rem" }}>
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                />
                ⭐ Featured / Bestseller Badge
              </label>
            </div>
          </div>
        </div>

        {/* Logistics & Facts Card */}
        <div className={styles.statCard}>
          <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "16px" }}>
            2. Logistics &amp; Travel Facts
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "6px" }}>
                Departure Cities (comma-separated)
              </label>
              <input
                type="text"
                value={departureCitiesStr}
                onChange={(e) => setDepartureCitiesStr(e.target.value)}
                placeholder="Delhi, Chandigarh, Mumbai"
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "6px" }}>
                Best Months to Visit (comma-separated)
              </label>
              <input
                type="text"
                value={bestMonthsStr}
                onChange={(e) => setBestMonthsStr(e.target.value)}
                placeholder="May, Jun, Jul, Aug, Sep, Oct"
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "6px" }}>
                Meals Summary
              </label>
              <input
                type="text"
                value={mealsSummary}
                onChange={(e) => setMealsSummary(e.target.value)}
                placeholder="e.g. 16 Meals (8 Breakfasts + 8 Dinners)"
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "6px" }}>
                Stay Summary
              </label>
              <input
                type="text"
                value={staySummary}
                onChange={(e) => setStaySummary(e.target.value)}
                placeholder="e.g. Hotels, Homestays & Deluxe Swiss Tents"
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "6px" }}>
                Transport Summary
              </label>
              <input
                type="text"
                value={transportSummary}
                onChange={(e) => setTransportSummary(e.target.value)}
                placeholder="e.g. Comfortable Tempo Traveller / 4x4 SUV"
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "6px" }}>
                Permits / Visa Note
              </label>
              <input
                type="text"
                value={visaNote}
                onChange={(e) => setVisaNote(e.target.value)}
                placeholder="e.g. Inner Line Permits arranged by team"
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
              />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "6px" }}>
                Highlights (one per line)
              </label>
              <textarea
                value={highlightsStr}
                onChange={(e) => setHighlightsStr(e.target.value)}
                rows={4}
                placeholder="Key Monastery cliff views&#10;World's Highest Post Office in Hikkim&#10;Stargazing at Chandratal Lake"
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
              />
            </div>
          </div>
        </div>

        {/* Media & SEO Card */}
        <div className={styles.statCard}>
          <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "16px" }}>
            3. Media &amp; SEO Metadata
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "6px" }}>
                Hero Image URL *
              </label>
              <input
                type="text"
                value={heroImage}
                onChange={(e) => setHeroImage(e.target.value)}
                placeholder="/images/spiti/spiti-hero.jpg"
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
              />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "6px" }}>
                Gallery Images (comma-separated URLs)
              </label>
              <input
                type="text"
                value={galleryStr}
                onChange={(e) => setGalleryStr(e.target.value)}
                placeholder="/images/spiti/spiti-hero.jpg, /images/spiti/chandratal.jpg"
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
              />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "6px" }}>
                OpenGraph Social Image URL (defaults to hero image)
              </label>
              <input
                type="text"
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                placeholder="/images/spiti/spiti-hero.jpg"
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
              />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "6px" }}>
                SEO Title *
              </label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Spiti Valley Tour Packages 2026 | Hassle Free Travels"
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
              />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "6px" }}>
                SEO Meta Description *
              </label>
              <textarea
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                rows={2}
                placeholder="Experience the untamed magic of the Middle Land. Thrilling 4x4 expeditions..."
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
              />
            </div>
          </div>
        </div>

        {/* Day-by-Day Itinerary Editor */}
        <div className={styles.statCard}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, margin: 0 }}>
              4. Day-by-Day Itinerary ({daysList.length} Days)
            </h3>
            <button
              type="button"
              onClick={handleAddDay}
              style={{ background: "#00A896", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "6px", fontWeight: 600, cursor: "pointer", fontSize: "0.85rem" }}
            >
              + Add Next Day
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {daysList.map((d, index) => (
              <div
                key={index}
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                  padding: "16px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <span style={{ fontWeight: 800, color: "#00A896", fontSize: "0.9rem" }}>
                    Day {d.dayNumber}
                  </span>
                  {daysList.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveDay(index)}
                      style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600 }}
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <input
                      type="text"
                      value={d.title}
                      onChange={(e) => handleUpdateDay(index, "title", e.target.value)}
                      placeholder="Day Title, e.g. Delhi to Narkanda"
                      style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                    />
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <textarea
                      value={d.body}
                      onChange={(e) => handleUpdateDay(index, "body", e.target.value)}
                      rows={2}
                      placeholder="Day description and sightseeing details..."
                      style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={d.stay}
                      onChange={(e) => handleUpdateDay(index, "stay", e.target.value)}
                      placeholder="Stay: Hotel in Kaza"
                      style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={d.meals}
                      onChange={(e) => handleUpdateDay(index, "meals", e.target.value)}
                      placeholder="Meals: Breakfast & Dinner"
                      style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs Editor */}
        <div className={styles.statCard}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, margin: 0 }}>
              5. Tour FAQs ({faqsList.length})
            </h3>
            <button
              type="button"
              onClick={handleAddFaq}
              style={{ background: "#00A896", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "6px", fontWeight: 600, cursor: "pointer", fontSize: "0.85rem" }}
            >
              + Add FAQ
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {faqsList.map((faq, index) => (
              <div
                key={index}
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                  padding: "14px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "#64748b" }}>
                    Q&amp;A #{index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFaq(index)}
                    style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", fontSize: "0.8rem" }}
                  >
                    Remove
                  </button>
                </div>
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => handleUpdateFaq(index, "question", e.target.value)}
                  placeholder="Question..."
                  style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", marginBottom: "8px" }}
                />
                <textarea
                  value={faq.answer}
                  onChange={(e) => handleUpdateFaq(index, "answer", e.target.value)}
                  rows={2}
                  placeholder="Answer..."
                  style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Inclusions & Exclusions */}
        <div className={styles.statCard}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, margin: 0 }}>
              6. Inclusions &amp; Exclusions ({itemsList.length})
            </h3>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                type="button"
                onClick={() => handleAddItem("inclusion")}
                style={{ background: "#16a34a", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "6px", fontWeight: 600, cursor: "pointer", fontSize: "0.82rem" }}
              >
                + Inclusion
              </button>
              <button
                type="button"
                onClick={() => handleAddItem("exclusion")}
                style={{ background: "#dc2626", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "6px", fontWeight: 600, cursor: "pointer", fontSize: "0.82rem" }}
              >
                + Exclusion
              </button>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {itemsList.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  background: "#f8fafc",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <select
                  value={item.kind}
                  onChange={(e) => handleUpdateItem(index, "kind", e.target.value)}
                  style={{
                    padding: "6px 8px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e1",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    color: item.kind === "inclusion" ? "#16a34a" : "#dc2626",
                  }}
                >
                  <option value="inclusion">✓ Inclusion</option>
                  <option value="exclusion">✕ Exclusion</option>
                  <option value="addon">+ Add-on</option>
                </select>
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => handleUpdateItem(index, "label", e.target.value)}
                  placeholder="Item description..."
                  style={{ flex: 1, padding: "6px 10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer" }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div
          style={{
            position: "sticky",
            bottom: "20px",
            background: "#ffffff",
            padding: "18px 24px",
            borderRadius: "14px",
            border: "1px solid #cbd5e1",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div>
            <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
              Publishing will update static pages, canonical routes, and sitemap.xml.
            </span>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              type="button"
              disabled={submitting}
              onClick={() => handleSubmit(false)}
              style={{
                padding: "12px 20px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                background: "#f1f5f9",
                color: "#334155",
                fontWeight: 700,
                cursor: submitting ? "not-allowed" : "pointer",
              }}
            >
              {submitting ? "Saving..." : "Save Draft"}
            </button>
            <button
              type="button"
              disabled={submitting}
              onClick={() => handleSubmit(true)}
              style={{
                padding: "12px 28px",
                borderRadius: "8px",
                border: "none",
                background: "linear-gradient(135deg, #00A896, #028090)",
                color: "#ffffff",
                fontWeight: 700,
                cursor: submitting ? "not-allowed" : "pointer",
                boxShadow: "0 4px 14px rgba(0, 168, 150, 0.3)",
              }}
            >
              {submitting ? "Publishing..." : "Publish Live 🚀"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
