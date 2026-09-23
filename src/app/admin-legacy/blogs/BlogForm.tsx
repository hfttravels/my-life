"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";

interface DestinationOption {
  id: string;
  name: string;
  slug: string;
}

interface PackageOption {
  id: string;
  name: string;
  slug: string;
  destinationId: string;
}

interface BlogFaqData {
  question: string;
  answer: string;
}

interface BlogFormProps {
  initialData?: {
    id?: string;
    destinationId?: string | null;
    packageId?: string | null;
    slug: string;
    title: string;
    excerpt: string;
    contentMd: string;
    category: string;
    tags: string[];
    authorName: string;
    featuredImage: string;
    ogImage: string;
    seoTitle: string;
    seoDescription: string;
    readMinutes: number;
    isPublished: boolean;
    faqsList?: BlogFaqData[];
  };
  destinations: DestinationOption[];
  packages: PackageOption[];
  isEdit?: boolean;
}

export default function BlogForm({
  initialData,
  destinations,
  packages,
  isEdit = false,
}: BlogFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form states
  const [destinationId, setDestinationId] = useState(
    initialData?.destinationId || ""
  );
  const [packageId, setPackageId] = useState(
    initialData?.packageId || ""
  );
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [isSlugCustom, setIsSlugCustom] = useState(isEdit);
  const [category, setCategory] = useState(initialData?.category || "Travel Guide");
  const [tagsStr, setTagsStr] = useState(initialData?.tags?.join(", ") || "");
  const [authorName, setAuthorName] = useState(
    initialData?.authorName || "Hassle Free Travels"
  );
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [contentMd, setContentMd] = useState(initialData?.contentMd || "");
  const [readMinutes, setReadMinutes] = useState<number>(initialData?.readMinutes || 5);
  const [featuredImage, setFeaturedImage] = useState(
    initialData?.featuredImage || "/dest-mountain.jpg"
  );
  const [ogImage, setOgImage] = useState(
    initialData?.ogImage || initialData?.featuredImage || "/dest-mountain.jpg"
  );
  const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || "");
  const [seoDescription, setSeoDescription] = useState(
    initialData?.seoDescription || ""
  );
  const [isPublished, setIsPublished] = useState(
    initialData?.isPublished ?? false
  );
  const [faqsList, setFaqsList] = useState<BlogFaqData[]>(
    initialData?.faqsList || []
  );

  // Content tab: 'write' or 'preview'
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  // Auto-slugify when title changes if user hasn't edited slug manually
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isSlugCustom && !isEdit) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      setSlug(generated);
      if (!seoTitle) {
        setSeoTitle(`${val} | Hassle Free Travels`);
      }
    }
  };

  // Filter packages for the selected destination
  const filteredPackages = destinationId
    ? packages.filter((p) => p.destinationId === destinationId)
    : packages;

  // Compute word count and reading time
  const wordCount = contentMd.split(/\s+/).filter(Boolean).length;
  const computedMinutes = Math.max(1, Math.ceil(wordCount / 200));

  const handleAddFaq = () => {
    setFaqsList((prev) => [...prev, { question: "", answer: "" }]);
  };

  const handleRemoveFaq = (index: number) => {
    setFaqsList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFaqChange = (index: number, field: "question" | "answer", val: string) => {
    setFaqsList((prev) =>
      prev.map((faq, i) => (i === index ? { ...faq, [field]: val } : faq))
    );
  };

  const handleSubmit = async (publishOverride?: boolean) => {
    setError(null);
    setSuccessMsg(null);

    if (!title.trim()) {
      setError("Article title is required.");
      return;
    }
    if (!slug.trim()) {
      setError("Slug is required.");
      return;
    }
    if (!contentMd.trim()) {
      setError("Markdown content body is required.");
      return;
    }

    setSubmitting(true);

    const publishState = publishOverride !== undefined ? publishOverride : isPublished;

    const payload = {
      title: title.trim(),
      slug: slug.trim().toLowerCase(),
      excerpt: excerpt.trim() || title.trim(),
      contentMd: contentMd.trim(),
      category: category.trim() || "Travel Guide",
      tags: tagsStr
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      authorName: authorName.trim() || "Hassle Free Travels",
      destinationId: destinationId || null,
      packageId: packageId || null,
      readMinutes: readMinutes || computedMinutes,
      featuredImage: featuredImage.trim() || "/dest-mountain.jpg",
      ogImage: ogImage.trim() || featuredImage.trim() || "/dest-mountain.jpg",
      seoTitle: seoTitle.trim() || `${title.trim()} | Hassle Free Travels`,
      seoDescription: seoDescription.trim() || excerpt.trim() || title.trim(),
      isPublished: publishState,
      faqsList: faqsList.filter((f) => f.question.trim() && f.answer.trim()),
    };

    try {
      const url = isEdit
        ? `/api/admin/blogs/${initialData?.id}`
        : "/api/admin/blogs";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save blog post");
      }

      setSuccessMsg("Blog post saved successfully! Revalidated caches.");
      setIsPublished(publishState);

      if (!isEdit) {
        router.push(`/admin/blogs/${data.id}`);
      } else {
        router.refresh();
      }
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "1000px" }}>
      {/* Top Header & Actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <Link
            href="/admin/blogs"
            style={{
              color: "#00A896",
              fontWeight: 600,
              fontSize: "0.85rem",
              textDecoration: "none",
            }}
          >
            ← Back to Blog CMS
          </Link>
          <h1
            style={{
              fontSize: "1.8rem",
              fontWeight: 800,
              color: "#0f172a",
              margin: "6px 0 0",
            }}
          >
            {isEdit ? "Edit Blog Post" : "Create New Blog Post"}
          </h1>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {isEdit && slug && (
            <Link
              href={`/blogs/${slug}`}
              target="_blank"
              style={{
                background: "#f1f5f9",
                color: "#334155",
                padding: "10px 16px",
                borderRadius: "8px",
                fontSize: "0.85rem",
                fontWeight: 600,
                textDecoration: "none",
                border: "1px solid #cbd5e1",
              }}
            >
              View Live 🌐
            </Link>
          )}

          <button
            type="button"
            onClick={() => handleSubmit(false)}
            disabled={submitting}
            style={{
              background: "#ffffff",
              color: "#334155",
              border: "1px solid #cbd5e1",
              padding: "10px 18px",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "0.88rem",
              cursor: "pointer",
            }}
          >
            {submitting ? "Saving..." : "Save Draft"}
          </button>

          <button
            type="button"
            onClick={() => handleSubmit(true)}
            disabled={submitting}
            style={{
              background: "linear-gradient(135deg, #00A896, #028090)",
              color: "#ffffff",
              border: "none",
              padding: "10px 22px",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "0.88rem",
              cursor: "pointer",
            }}
          >
            {submitting ? "Publishing..." : "Save & Publish 🚀"}
          </button>
        </div>
      </div>

      {error && (
        <div
          style={{
            background: "#fee2e2",
            border: "1px solid #f87171",
            color: "#991b1b",
            padding: "12px 16px",
            borderRadius: "8px",
            marginBottom: "20px",
            fontSize: "0.9rem",
          }}
        >
          ⚠️ {error}
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
            fontSize: "0.9rem",
          }}
        >
          ✓ {successMsg}
        </div>
      )}

      {/* Main Form Body */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Core Info Card */}
        <div
          style={{
            background: "#ffffff",
            padding: "24px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
          }}
        >
          <h2
            style={{
              fontSize: "1.15rem",
              fontWeight: 700,
              marginBottom: "18px",
              color: "#0f172a",
            }}
          >
            1. Core Article Information
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Title */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  marginBottom: "6px",
                  color: "#334155",
                }}
              >
                Article Title (H1) *
              </label>
              <input
                type="text"
                placeholder="e.g. Spiti Valley Road Trip: The Complete 2026 Itinerary & Guide"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "1rem",
                  fontWeight: 600,
                }}
              />
            </div>

            {/* Slug & Destination in 2 cols */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "16px",
              }}
            >
              {/* Slug */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    marginBottom: "6px",
                    color: "#334155",
                  }}
                >
                  URL Slug * (public at /blogs/[slug])
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{
                      background: "#f1f5f9",
                      border: "1px solid #cbd5e1",
                      borderRight: "none",
                      padding: "10px 12px",
                      borderRadius: "8px 0 0 8px",
                      fontSize: "0.85rem",
                      color: "#64748b",
                    }}
                  >
                    /blogs/
                  </span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => {
                      setIsSlugCustom(true);
                      setSlug(e.target.value);
                    }}
                    placeholder="spiti-valley-road-trip-guide"
                    style={{
                      flex: 1,
                      padding: "10px 14px",
                      borderRadius: "0 8px 8px 0",
                      border: "1px solid #cbd5e1",
                      fontSize: "0.9rem",
                    }}
                  />
                </div>
              </div>

              {/* Destination Link */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    marginBottom: "6px",
                    color: "#334155",
                  }}
                >
                  Associated Destination (Optional FK)
                </label>
                <select
                  value={destinationId}
                  onChange={(e) => {
                    setDestinationId(e.target.value);
                    // Reset packageId if it doesn't match new destination
                    setPackageId("");
                  }}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "0.9rem",
                    background: "#ffffff",
                  }}
                >
                  <option value="">General Travel (No Destination FK)</option>
                  {destinations.map((d) => (
                    <option key={d.id} value={d.id}>
                      📍 {d.name} ({d.slug})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Related Package (Optional) & Category & Read Time */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    marginBottom: "6px",
                    color: "#334155",
                  }}
                >
                  Featured Tour Package (Optional FK)
                </label>
                <select
                  value={packageId}
                  onChange={(e) => setPackageId(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "0.9rem",
                    background: "#ffffff",
                  }}
                >
                  <option value="">None / No specific package</option>
                  {filteredPackages.map((p) => (
                    <option key={p.id} value={p.id}>
                      🎒 {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    marginBottom: "6px",
                    color: "#334155",
                  }}
                >
                  Category
                </label>
                <input
                  type="text"
                  placeholder="e.g. Travel Guide, Itineraries, Adventure"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "0.9rem",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    marginBottom: "6px",
                    color: "#334155",
                  }}
                >
                  Read Time (min)
                </label>
                <input
                  type="number"
                  min="1"
                  value={readMinutes}
                  onChange={(e) => setReadMinutes(Number(e.target.value))}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "0.9rem",
                  }}
                />
                <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                  Estimated: {computedMinutes} min ({wordCount} words)
                </span>
              </div>
            </div>

            {/* Author Name & Tags */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "16px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    marginBottom: "6px",
                    color: "#334155",
                  }}
                >
                  Author Name
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "0.9rem",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    marginBottom: "6px",
                    color: "#334155",
                  }}
                >
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="Road Trip, Spiti, Mountains, 2026 Guide"
                  value={tagsStr}
                  onChange={(e) => setTagsStr(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "0.9rem",
                  }}
                />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  marginBottom: "6px",
                  color: "#334155",
                }}
              >
                Excerpt / Summary * (appears on listing cards & hero lead)
              </label>
              <textarea
                rows={3}
                placeholder="2-3 engaging sentences summarizing the article..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "0.9rem",
                  lineHeight: 1.5,
                }}
              />
            </div>
          </div>
        </div>

        {/* Content Body with Markdown & Live Preview */}
        <div
          style={{
            background: "#ffffff",
            padding: "24px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <h2
              style={{
                fontSize: "1.15rem",
                fontWeight: 700,
                color: "#0f172a",
                margin: 0,
              }}
            >
              2. Markdown Content Body *
            </h2>

            {/* Tab switch */}
            <div
              style={{
                display: "flex",
                background: "#f1f5f9",
                borderRadius: "8px",
                padding: "3px",
              }}
            >
              <button
                type="button"
                onClick={() => setActiveTab("write")}
                style={{
                  padding: "6px 14px",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  background: activeTab === "write" ? "#ffffff" : "transparent",
                  color: activeTab === "write" ? "#0f172a" : "#64748b",
                  boxShadow: activeTab === "write" ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
                }}
              >
                ✏️ Markdown Source
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                style={{
                  padding: "6px 14px",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  background: activeTab === "preview" ? "#ffffff" : "transparent",
                  color: activeTab === "preview" ? "#0f172a" : "#64748b",
                  boxShadow: activeTab === "preview" ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
                }}
              >
                👁️ Live Preview
              </button>
            </div>
          </div>

          {activeTab === "write" ? (
            <div>
              <div
                style={{
                  fontSize: "0.78rem",
                  color: "#64748b",
                  marginBottom: "8px",
                }}
              >
                Supports: # H1, ## H2, ### H3, - Bullet lists, 1. Numbered lists, **bold**, *italic*, &gt; Blockquotes, [Link Text](https://...).
              </div>
              <textarea
                rows={18}
                value={contentMd}
                onChange={(e) => setContentMd(e.target.value)}
                placeholder="Write your article in Markdown..."
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "0.92rem",
                  fontFamily: "monospace",
                  lineHeight: 1.6,
                }}
              />
            </div>
          ) : (
            <div
              style={{
                minHeight: "350px",
                padding: "20px",
                borderRadius: "8px",
                border: "1px dashed #cbd5e1",
                background: "#fafafa",
              }}
            >
              {contentMd.trim() ? (
                <MarkdownRenderer content={contentMd} />
              ) : (
                <p style={{ color: "#94a3b8", textAlign: "center", marginTop: "40px" }}>
                  (No markdown written yet. Switch to Markdown Source tab to add content.)
                </p>
              )}
            </div>
          )}
        </div>

        {/* Media & Images */}
        <div
          style={{
            background: "#ffffff",
            padding: "24px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
          }}
        >
          <h2
            style={{
              fontSize: "1.15rem",
              fontWeight: 700,
              marginBottom: "18px",
              color: "#0f172a",
            }}
          >
            3. Featured & Social Media Images
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "16px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  marginBottom: "6px",
                  color: "#334155",
                }}
              >
                Featured Image URL
              </label>
              <input
                type="text"
                placeholder="/dest-mountain.jpg or https://..."
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "0.9rem",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  marginBottom: "6px",
                  color: "#334155",
                }}
              >
                Open Graph / Twitter Image URL
              </label>
              <input
                type="text"
                placeholder="/dest-mountain.jpg or https://..."
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "0.9rem",
                }}
              />
            </div>
          </div>
        </div>

        {/* SEO Meta Tags */}
        <div
          style={{
            background: "#ffffff",
            padding: "24px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
          }}
        >
          <h2
            style={{
              fontSize: "1.15rem",
              fontWeight: 700,
              marginBottom: "18px",
              color: "#0f172a",
            }}
          >
            4. SEO & Structured Data
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "6px",
                }}
              >
                <label
                  style={{
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    color: "#334155",
                  }}
                >
                  SEO Title *
                </label>
                <span
                  style={{
                    fontSize: "0.78rem",
                    color: seoTitle.length > 60 ? "#ea580c" : "#64748b",
                  }}
                >
                  {seoTitle.length}/60 chars (recommended: 50-60)
                </span>
              </div>
              <input
                type="text"
                placeholder="Unique SEO Title with primary keywords | Hassle Free Travels"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "0.9rem",
                }}
              />
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "6px",
                }}
              >
                <label
                  style={{
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    color: "#334155",
                  }}
                >
                  SEO Meta Description *
                </label>
                <span
                  style={{
                    fontSize: "0.78rem",
                    color: seoDescription.length > 160 ? "#ea580c" : "#64748b",
                  }}
                >
                  {seoDescription.length}/160 chars (recommended: 140-160)
                </span>
              </div>
              <textarea
                rows={3}
                placeholder="Compelling meta description with target keywords and call to action..."
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "0.9rem",
                }}
              />
            </div>
          </div>
        </div>

        {/* FAQs Builder */}
        <div
          style={{
            background: "#ffffff",
            padding: "24px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                5. Blog FAQs (Schema.org FAQPage)
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.82rem", margin: "4px 0 0" }}>
                Add rich Q&A pairs that render directly on the post and power Google FAQ rich snippets.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddFaq}
              style={{
                background: "#00A896",
                color: "#ffffff",
                border: "none",
                padding: "8px 14px",
                borderRadius: "6px",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              + Add FAQ
            </button>
          </div>

          {faqsList.length === 0 ? (
            <div
              style={{
                background: "#f8fafc",
                padding: "24px",
                borderRadius: "8px",
                textAlign: "center",
                color: "#94a3b8",
                fontSize: "0.88rem",
              }}
            >
              No FAQs added yet. Click &ldquo;+ Add FAQ&rdquo; to add schema-ready questions.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {faqsList.map((faq, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "#f8fafc",
                    padding: "16px",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                    }}
                  >
                    <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "#475569" }}>
                      FAQ #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFaq(idx)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#ef4444",
                        cursor: "pointer",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                      }}
                    >
                      Remove ✕
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Question (e.g. Do I need an inner line permit for Spiti Valley?)"
                    value={faq.question}
                    onChange={(e) => handleFaqChange(idx, "question", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid #cbd5e1",
                      marginBottom: "8px",
                      fontSize: "0.88rem",
                    }}
                  />
                  <textarea
                    rows={2}
                    placeholder="Detailed answer..."
                    value={faq.answer}
                    onChange={(e) => handleFaqChange(idx, "answer", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid #cbd5e1",
                      fontSize: "0.88rem",
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Publishing Toggle & Footer Actions */}
        <div
          style={{
            background: "#ffffff",
            padding: "24px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              style={{ width: "18px", height: "18px", accentColor: "#00A896" }}
            />
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0f172a" }}>
                Publish Live to Site
              </div>
              <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                When published, this post is indexed, included in sitemap.xml, and live at /blogs/{slug || "[slug]"}.
              </div>
            </div>
          </label>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="button"
              onClick={() => handleSubmit(false)}
              disabled={submitting}
              style={{
                background: "#ffffff",
                color: "#334155",
                border: "1px solid #cbd5e1",
                padding: "10px 18px",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "0.88rem",
                cursor: "pointer",
              }}
            >
              {submitting ? "Saving..." : "Save Draft"}
            </button>

            <button
              type="button"
              onClick={() => handleSubmit(true)}
              disabled={submitting}
              style={{
                background: "linear-gradient(135deg, #00A896, #028090)",
                color: "#ffffff",
                border: "none",
                padding: "10px 22px",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "0.88rem",
                cursor: "pointer",
              }}
            >
              {submitting ? "Publishing..." : "Save & Publish 🚀"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
