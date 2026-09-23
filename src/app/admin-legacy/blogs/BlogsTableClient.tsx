"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "../admin.module.css";

interface BlogRow {
  id: string;
  title: string;
  slug: string;
  category: string;
  destinationName: string | null;
  destinationSlug: string | null;
  readMinutes: number;
  isPublished: boolean;
  publishedAt: string | null;
  updatedAt: string;
}

interface BlogsTableClientProps {
  blogs: BlogRow[];
  destinations: { id: string; name: string; slug: string }[];
  categories: string[];
}

export default function BlogsTableClient({
  blogs: initialBlogs,
  destinations,
  categories,
}: BlogsTableClientProps) {
  const [blogsList, setBlogsList] = useState<BlogRow[]>(initialBlogs);
  const [selectedDest, setSelectedDest] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = blogsList.filter((post) => {
    if (selectedDest !== "all") {
      if (selectedDest === "none" && post.destinationSlug !== null) return false;
      if (selectedDest !== "none" && post.destinationSlug !== selectedDest) return false;
    }
    if (selectedCategory !== "all" && post.category !== selectedCategory) {
      return false;
    }
    if (selectedStatus === "published" && !post.isPublished) return false;
    if (selectedStatus === "draft" && post.isPublished) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(q) ||
        post.slug.toLowerCase().includes(q) ||
        (post.destinationName && post.destinationName.toLowerCase().includes(q)) ||
        post.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setBlogsList((prev) => prev.filter((b) => b.id !== id));
      } else {
        alert(data.error || "Failed to delete post");
      }
    } catch {
      alert("Network error while deleting post");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      {/* Filter Bar */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "20px",
          background: "#ffffff",
          padding: "16px",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search title, slug, or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: "1 1 220px",
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid #cbd5e1",
            fontSize: "0.9rem",
          }}
        />

        <select
          value={selectedDest}
          onChange={(e) => setSelectedDest(e.target.value)}
          className={styles.statusSelect}
        >
          <option value="all">All Destinations</option>
          <option value="none">General / No Destination</option>
          {destinations.map((d) => (
            <option key={d.slug} value={d.slug}>
              {d.name}
            </option>
          ))}
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={styles.statusSelect}
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className={styles.statusSelect}
        >
          <option value="all">All Statuses</option>
          <option value="published">Published Only</option>
          <option value="draft">Drafts Only</option>
        </select>
      </div>

      {/* Blogs Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Article / Guide</th>
              <th>Category</th>
              <th>Destination</th>
              <th>Read Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                  No blog posts match the selected criteria.
                </td>
              </tr>
            ) : (
              filtered.map((post) => (
                <tr key={post.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: "#0f172a" }}>
                      {post.title}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                      /blogs/{post.slug}
                    </div>
                  </td>
                  <td>
                    <span
                      style={{
                        background: "#f1f5f9",
                        padding: "3px 8px",
                        borderRadius: "4px",
                        fontSize: "0.8rem",
                        color: "#475569",
                        fontWeight: 600,
                      }}
                    >
                      {post.category}
                    </span>
                  </td>
                  <td>
                    {post.destinationName ? (
                      <span style={{ fontWeight: 600, color: "#00A896" }}>
                        📍 {post.destinationName}
                      </span>
                    ) : (
                      <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
                        Global / None
                      </span>
                    )}
                  </td>
                  <td>{post.readMinutes} min</td>
                  <td>
                    <span
                      className={
                        post.isPublished ? styles.badgePublished : styles.badgeDraft
                      }
                    >
                      {post.isPublished ? "PUBLISHED" : "DRAFT"}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <Link
                        href={`/admin/blogs/${post.id}`}
                        style={{
                          background: "#00A896",
                          color: "#ffffff",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          textDecoration: "none",
                        }}
                      >
                        Edit ✏️
                      </Link>
                      {post.isPublished && (
                        <Link
                          href={`/blogs/${post.slug}`}
                          target="_blank"
                          style={{
                            background: "#f1f5f9",
                            color: "#334155",
                            padding: "6px 10px",
                            borderRadius: "6px",
                            fontSize: "0.82rem",
                            fontWeight: 600,
                            textDecoration: "none",
                            border: "1px solid #cbd5e1",
                          }}
                        >
                          View 🌐
                        </Link>
                      )}
                      <button
                        onClick={() => handleDelete(post.id, post.title)}
                        disabled={deletingId === post.id}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#dc2626",
                          cursor: "pointer",
                          fontSize: "0.85rem",
                          padding: "6px",
                          opacity: deletingId === post.id ? 0.5 : 1,
                        }}
                        title="Delete Post"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
