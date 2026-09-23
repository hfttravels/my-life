import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { db } from "@/db";
import { blogPosts, blogFaqs, packages } from "@/db/schema";
import { eq, and, ne, asc, desc } from "drizzle-orm";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";
import styles from "./BlogPost.module.css";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params from ALL published blog posts in Postgres
export async function generateStaticParams() {
  try {
    const published = await db
      .select({ slug: blogPosts.slug })
      .from(blogPosts)
      .where(eq(blogPosts.isPublished, true));

    return published.map((post) => ({
      slug: post.slug,
    }));
  } catch (err) {
    console.error("Failed to generateStaticParams for blogs:", err);
    return [];
  }
}

// Dynamic SEO metadata per blog post
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = await db.query.blogPosts.findFirst({
    where: and(eq(blogPosts.slug, slug), eq(blogPosts.isPublished, true)),
  });

  if (!post) {
    return {
      title: "Blog Not Found | Hassle Free Travels",
      description: "The requested travel guide could not be found.",
    };
  }

  const canonicalUrl = `https://www.hasslefree-travels.com/blogs/${post.slug}`;
  const ogImageUrl = post.ogImage || post.featuredImage || "/dest-mountain.jpg";

  return {
    title: post.seoTitle || `${post.title} | Hassle Free Travels Blog`,
    description: post.seoDescription || post.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      url: canonicalUrl,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.authorName],
      tags: post.tags || [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: [ogImageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const post = await db.query.blogPosts.findFirst({
    where: and(eq(blogPosts.slug, slug), eq(blogPosts.isPublished, true)),
    with: {
      destination: true,
      package: true,
      faqs: {
        orderBy: [asc(blogFaqs.sortOrder)],
      },
    },
  });

  if (!post) {
    notFound();
  }

  // Related Packages (up to 3 published packages for the linked destination)
  let relatedPackagesList: {
    id: string;
    slug: string;
    name: string;
    nights: number;
    days: number;
    startingPriceInr: number | null;
    heroImage: string;
    destinationSlug: string;
  }[] = [];

  if (post.destinationId) {
    const pkgs = await db.query.packages.findMany({
      where: and(
        eq(packages.destinationId, post.destinationId),
        eq(packages.isPublished, true)
      ),
      with: {
        destination: true,
      },
      limit: 3,
      orderBy: [desc(packages.isFeatured), desc(packages.updatedAt)],
    });

    relatedPackagesList = pkgs.map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      nights: p.nights,
      days: p.days,
      startingPriceInr: p.startingPriceInr,
      heroImage: p.heroImage,
      destinationSlug: p.destination.slug,
    }));
  }

  // Related Blog Posts (up to 3 other published posts in the same category or destination)
  const relatedPosts = await db.query.blogPosts.findMany({
    where: and(
      ne(blogPosts.id, post.id),
      eq(blogPosts.isPublished, true)
    ),
    with: {
      destination: true,
    },
    limit: 3,
    orderBy: [desc(blogPosts.publishedAt)],
  });

  const baseUrl = "https://www.hasslefree-travels.com";
  const canonicalUrl = `${baseUrl}/blogs/${post.slug}`;

  // Structured Data: BlogPosting & Breadcrumbs
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
        name: "Travel Blog",
        item: `${baseUrl}/blogs`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: canonicalUrl,
      },
    ],
  };

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage || "/dest-mountain.jpg",
    author: {
      "@type": "Person",
      name: post.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Hassle Free Travels",
      url: baseUrl,
    },
    datePublished: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    url: canonicalUrl,
  };

  const faqJsonLd =
    post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently Updated";

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918375030889";
  const destName = post.destination?.name || post.destinationSlug || "India & International";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi Hassle Free Travels! I just read your article "${post.title}" and would love assistance planning a trip to ${destName}.`
  )}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <Header />

      <main className={styles.page}>
        <article className={styles.article}>
          <Link href="/blogs" className={styles.backLink}>
            ← Back to All Travel Guides
          </Link>

          <header className={styles.hero}>
            {post.category && <div className={styles.kicker}>{post.category}</div>}
            <h1>{post.title}</h1>
            <p>{post.excerpt}</p>

            <div className={styles.meta}>
              <span className={styles.avatar}>
                {post.authorName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
              <span>{post.authorName}</span>
              <span>•</span>
              <span>{formattedDate}</span>
              <span>•</span>
              <span>⏱️ {post.readMinutes} min read</span>
              {post.destination && (
                <>
                  <span>•</span>
                  <Link
                    href={`/destination/${post.destination.slug}`}
                    style={{ color: "#00A896", fontWeight: 600, textDecoration: "none" }}
                  >
                    📍 {post.destination.name}
                  </Link>
                </>
              )}
            </div>
          </header>

          {post.featuredImage && (
            <div className={styles.imageFrame}>
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 900px"
              />
            </div>
          )}

          {/* Article Markdown Body */}
          <div className={styles.content}>
            <MarkdownRenderer content={post.contentMd} />
          </div>

          {/* Article FAQs (if present) */}
          {post.faqs.length > 0 && (
            <div
              style={{
                marginTop: "32px",
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "18px",
                padding: "32px",
              }}
            >
              <h2 style={{ fontSize: "1.4rem", color: "#0f172a", marginBottom: "18px" }}>
                Frequently Asked Questions
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {post.faqs.map((faq) => (
                  <div
                    key={faq.id}
                    style={{
                      borderBottom: "1px solid #f1f5f9",
                      paddingBottom: "14px",
                    }}
                  >
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#1e293b", marginBottom: "6px" }}>
                      Q: {faq.question}
                    </h3>
                    <p style={{ color: "#475569", lineHeight: 1.6, margin: 0 }}>
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Destination Callout Card (if destination_id set) */}
          {post.destination && (
            <div
              style={{
                marginTop: "36px",
                background: "linear-gradient(135deg, #f0fdfa, #e6fffa)",
                border: "1px solid #99f6e4",
                borderRadius: "18px",
                padding: "32px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              <div style={{ maxWidth: "560px" }}>
                <span
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 800,
                    color: "#00A896",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Explore Destination
                </span>
                <h3 style={{ fontSize: "1.4rem", color: "#0f172a", margin: "6px 0 8px" }}>
                  Planning a trip to {post.destination.name}?
                </h3>
                <p style={{ color: "#475569", margin: 0, lineHeight: 1.5 }}>
                  {post.destination.overview || post.destination.tagline ||
                    `Discover our verified local stays, handcrafted circuits, and transparent quotes for ${post.destination.name}.`}
                </p>
              </div>
              <Link
                href={`/destination/${post.destination.slug}`}
                style={{
                  background: "linear-gradient(135deg, #00A896, #028090)",
                  color: "#ffffff",
                  padding: "12px 24px",
                  borderRadius: "12px",
                  fontWeight: 700,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                View {post.destination.name} Hub ➔
              </Link>
            </div>
          )}

          {/* Related Packages for this Destination */}
          {relatedPackagesList.length > 0 && (
            <div style={{ marginTop: "44px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "18px" }}>
                <div>
                  <h2 style={{ fontSize: "1.5rem", color: "#0f172a", margin: 0 }}>
                    Featured Tours for {post.destination?.name}
                  </h2>
                  <p style={{ color: "#64748b", margin: "4px 0 0", fontSize: "0.95rem" }}>
                    Expertly paced packages matching this guide.
                  </p>
                </div>
                {post.destination && (
                  <Link
                    href={`/destination/${post.destination.slug}`}
                    style={{ color: "#00A896", fontWeight: 700, textDecoration: "none", fontSize: "0.9rem" }}
                  >
                    See all {post.destination.name} tours ➔
                  </Link>
                )}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: "18px",
                }}
              >
                {relatedPackagesList.map((pkg) => (
                  <Link
                    key={pkg.id}
                    href={`/destination/${pkg.destinationSlug}/${pkg.slug}`}
                    style={{
                      background: "#ffffff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "14px",
                      overflow: "hidden",
                      textDecoration: "none",
                      color: "inherit",
                      boxShadow: "0 4px 14px rgba(15, 23, 42, 0.05)",
                    }}
                  >
                    <div style={{ position: "relative", height: "160px" }}>
                      <Image
                        src={pkg.heroImage}
                        alt={pkg.name}
                        fill
                        sizes="300px"
                        style={{ objectFit: "cover" }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: "8px",
                          right: "8px",
                          background: "rgba(0, 0, 0, 0.75)",
                          color: "#fff",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          padding: "4px 8px",
                          borderRadius: "6px",
                        }}
                      >
                        ⏱️ {pkg.days}D / {pkg.nights}N
                      </div>
                    </div>
                    <div style={{ padding: "14px" }}>
                      <h4 style={{ fontSize: "0.98rem", fontWeight: 700, margin: "0 0 8px", color: "#0f172a" }}>
                        {pkg.name}
                      </h4>
                      <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#00A896" }}>
                        {pkg.startingPriceInr
                          ? `Starts from ₹${pkg.startingPriceInr.toLocaleString("en-IN")}`
                          : "Price on Request"}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Enquire / WhatsApp Banner */}
          <div
            style={{
              marginTop: "44px",
              background: "linear-gradient(135deg, #0f172a, #1e293b)",
              borderRadius: "20px",
              padding: "36px",
              textAlign: "center",
              color: "#ffffff",
            }}
          >
            <span style={{ fontSize: "2rem" }}>💬</span>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 800, margin: "12px 0 8px" }}>
              Need Help Customizing Your {destName} Itinerary?
            </h3>
            <p style={{ color: "#94a3b8", maxWidth: "560px", margin: "0 auto 24px", lineHeight: 1.6 }}>
              Speak directly with our destination trip captains. Get real-time weather advice, customized routes, and honest quotes with zero pressure.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#25D366",
                  color: "#ffffff",
                  padding: "14px 28px",
                  borderRadius: "12px",
                  fontWeight: 700,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span>💬</span> WhatsApp Trip Captain
              </a>
              {post.destination && (
                <Link
                  href={`/destination/${post.destination.slug}`}
                  style={{
                    background: "rgba(255, 255, 255, 0.12)",
                    color: "#ffffff",
                    padding: "14px 24px",
                    borderRadius: "12px",
                    fontWeight: 700,
                    textDecoration: "none",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                  Explore {post.destination.name} Packages ➔
                </Link>
              )}
            </div>
          </div>
        </article>

        {/* Related Reads */}
        {relatedPosts.length > 0 && (
          <section className={styles.related}>
            <h2>Related Travel Stories</h2>
            <div className={styles.relatedGrid}>
              {relatedPosts.map((item) => (
                <Link href={`/blogs/${item.slug}`} className={styles.relatedCard} key={item.id}>
                  <div className={styles.relatedImage}>
                    <Image
                      src={item.featuredImage || "/dest-mountain.jpg"}
                      alt={item.title}
                      fill
                      sizes="300px"
                    />
                  </div>
                  <span>{item.category || "Travel Guide"}</span>
                  <h3>{item.title}</h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
