"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Blogs.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export interface DbBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  destinationName?: string | null;
  destinationSlug?: string | null;
}

interface BlogsClientProps {
  posts: DbBlogPost[];
}

export default function BlogsClient({ posts }: BlogsClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean))),
  ];

  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags || [])));
  const featuredPosts = posts.slice(0, 3);

  const normalizedSearch = searchQuery.trim().toLowerCase();
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      !normalizedSearch ||
      post.title.toLowerCase().includes(normalizedSearch) ||
      post.excerpt.toLowerCase().includes(normalizedSearch) ||
      (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch))) ||
      (post.destinationName && post.destinationName.toLowerCase().includes(normalizedSearch));
    return matchesCategory && matchesSearch;
  });

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    setActiveCategory("All");
  };

  return (
    <div className={styles.blogPage}>
      <Header />

      {/* ── Hero Section ── */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>✍️ Hassle Free Travels Blog</div>
          <h1 className={styles.heroTitle}>
            Stories, Guides &amp; <span>Travel Inspiration</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Curated travel guides, packing tips, hidden gems, and insider
            stories from our community of passionate travelers and trip captains.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.heroStatItem}>
              <span className={styles.heroStatNumber}>{posts.length}+</span> Articles
            </div>
            <div className={styles.heroStatItem}>
              <span className={styles.heroStatNumber}>20+</span> Destinations
            </div>
            <div className={styles.heroStatItem}>
              <span className={styles.heroStatNumber}>100%</span> Verified Stays
            </div>
          </div>
        </div>
      </section>

      {/* ── Search Bar ── */}
      <div className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <div className={styles.searchBox}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search travel guides, destinations, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className={styles.searchClear}
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Categories Filter ── */}
      <div className={styles.categorySection}>
        <div className={styles.categoryContainer}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.categoryPill} ${
                activeCategory === cat ? styles.activeCategoryPill : ""
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Featured Articles ── */}
      {!searchQuery && activeCategory === "All" && featuredPosts.length > 0 && (
        <section className={styles.featuredSection}>
          <h2 className={styles.sectionTitle}>
            <span>⭐</span> Featured Stories
          </h2>
          <div className={styles.featuredGrid}>
            {featuredPosts.map((post, index) => (
              <Link
                key={post.id}
                href={`/blogs/${post.slug}`}
                className={`${styles.featuredCard} ${
                  index === 0 ? styles.featuredCardLarge : ""
                }`}
              >
                <div className={styles.featuredImageWrapper}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className={styles.featuredBadge}>FEATURED</div>
                  <span className={styles.readTimeBadge}>{post.readTime}</span>
                </div>
                <div className={styles.featuredBody}>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" }}>
                    <span className={styles.blogCategory}>{post.category}</span>
                    {post.destinationName && (
                      <span
                        style={{
                          fontSize: "0.75rem",
                          background: "#f0fdfa",
                          color: "#00A896",
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: "4px",
                        }}
                      >
                        📍 {post.destinationName}
                      </span>
                    )}
                  </div>
                  <h3 className={styles.featuredTitle}>{post.title}</h3>
                  <p className={styles.featuredExcerpt}>{post.excerpt}</p>
                  <div className={styles.blogMeta}>
                    <div className={styles.authorAvatar}>
                      {post.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <div className={styles.authorInfo}>
                      <span className={styles.authorName}>{post.author}</span>
                      <span className={styles.blogDate}>{post.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── All Articles Grid ── */}
      <section className={styles.articlesSection}>
        <div className={styles.sectionHeaderRow}>
          <h2 className={styles.sectionTitle}>
            {activeCategory === "All" ? "All Travel Guides" : `${activeCategory} Articles`}
          </h2>
          <span className={styles.articlesCount}>
            {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}
          </span>
        </div>

        {filteredPosts.length > 0 ? (
          <div className={styles.blogGrid}>
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blogs/${post.slug}`}
                className={styles.blogCard}
              >
                <div className={styles.blogImageWrapper}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span className={styles.readTimeBadge}>{post.readTime}</span>
                </div>
                <div className={styles.blogBody}>
                  <div style={{ display: "flex", gap: "6px", alignItems: "center", marginBottom: "8px", flexWrap: "wrap" }}>
                    <span className={styles.blogCategory}>{post.category}</span>
                    {post.destinationName && (
                      <span
                        style={{
                          fontSize: "0.72rem",
                          background: "#f0fdfa",
                          color: "#00A896",
                          fontWeight: 700,
                          padding: "1px 6px",
                          borderRadius: "4px",
                        }}
                      >
                        📍 {post.destinationName}
                      </span>
                    )}
                  </div>
                  <h3 className={styles.blogTitle}>{post.title}</h3>
                  <p className={styles.blogExcerpt}>{post.excerpt}</p>
                  <div className={styles.blogMeta}>
                    <div className={styles.authorAvatar}>
                      {post.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <div className={styles.authorInfo}>
                      <span className={styles.authorName}>{post.author}</span>
                      <span className={styles.blogDate}>{post.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <div className={styles.noResultsEmoji}>🔍</div>
            <div className={styles.noResultsTitle}>No articles found</div>
            <p>Try a different search term or select another category.</p>
          </div>
        )}
      </section>

      {/* ── Popular Tags ── */}
      {allTags.length > 0 && (
        <section className={styles.tagsSection}>
          <h3 className={styles.tagsSectionTitle}>Popular Tags</h3>
          <div className={styles.tagsCloud}>
            {allTags.map((tag) => (
              <button
                key={tag}
                className={styles.tag}
                onClick={() => handleTagClick(tag)}
              >
                #{tag}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ── Newsletter Section ── */}
      <section className={styles.newsletterSection}>
        <div className={styles.newsletterCard}>
          <div className={styles.newsletterInfo}>
            <span className={styles.newsletterBadge}>📬 Newsletter</span>
            <h3 className={styles.newsletterTitle}>
              Get Travel Inspiration Straight to Your Inbox
            </h3>
            <p className={styles.newsletterDesc}>
              Join passionate travelers who receive our weekly curated guides,
              exclusive trip discounts, and high-altitude road trip advisories.
            </p>
          </div>
          <form
            className={styles.newsletterForm}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              className={styles.newsletterInput}
              placeholder="Enter your email"
            />
            <button type="submit" className={styles.newsletterBtn}>
              Subscribe ➔
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
