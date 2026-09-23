import Link from "next/link";
import { requireAdminAuth } from "@/lib/adminAuth";
import { db } from "@/db";
import { blogPosts, destinations } from "@/db/schema";
import { desc, asc } from "drizzle-orm";
import BlogsTableClient from "./BlogsTableClient";
import styles from "../admin.module.css";

export const metadata = {
  title: "Admin Blog CMS | Hassle Free Travels",
  robots: { index: false, follow: false },
};

export default async function AdminBlogsPage() {
  await requireAdminAuth();

  const allPosts = await db.query.blogPosts.findMany({
    with: {
      destination: true,
      package: true,
    },
    orderBy: [desc(blogPosts.updatedAt)],
  });

  const allDestinations = await db
    .select({ id: destinations.id, name: destinations.name, slug: destinations.slug })
    .from(destinations)
    .orderBy(asc(destinations.name));

  const categories = Array.from(
    new Set(allPosts.map((p) => p.category).filter((c): c is string => Boolean(c)))
  ).sort();

  const tableData = allPosts.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    category: p.category || "Travel Guide",
    destinationName: p.destination?.name || null,
    destinationSlug: p.destinationSlug || null,
    readMinutes: p.readMinutes,
    isPublished: p.isPublished,
    publishedAt: p.publishedAt ? p.publishedAt.toISOString() : null,
    updatedAt: p.updatedAt.toISOString(),
  }));

  const publishedCount = allPosts.filter((p) => p.isPublished).length;
  const draftCount = allPosts.length - publishedCount;

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Blog & Travel Guides CMS</h1>
          <p style={{ color: "#64748b", margin: "4px 0 0" }}>
            Create, edit, and publish destination-agnostic travel guides and articles.
          </p>
        </div>
        <Link href="/admin/blogs/new" className={styles.primaryActionBtn}>
          + Create New Post
        </Link>
      </div>

      {/* Quick Stats */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total Articles</div>
          <div className={styles.statNumber}>{allPosts.length}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Published Live</div>
          <div className={styles.statNumber} style={{ color: "#16a34a" }}>
            {publishedCount}
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Drafts</div>
          <div className={styles.statNumber} style={{ color: "#d97706" }}>
            {draftCount}
          </div>
        </div>
      </div>

      <BlogsTableClient
        blogs={tableData}
        destinations={allDestinations}
        categories={categories}
      />
    </div>
  );
}
