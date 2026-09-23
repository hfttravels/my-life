"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "../admin.module.css";

interface PackageRow {
  id: string;
  name: string;
  slug: string;
  destinationName: string;
  destinationSlug: string;
  nights: number;
  days: number;
  startingPriceInr: number | null;
  isPublished: boolean;
  isFeatured: boolean;
  updatedAt: string;
}

interface PackagesTableClientProps {
  packages: PackageRow[];
  destinations: { id: string; name: string; slug: string }[];
}

export default function PackagesTableClient({
  packages: initialPackages,
  destinations,
}: PackagesTableClientProps) {
  const [selectedDest, setSelectedDest] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedFeatured, setSelectedFeatured] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filtered = initialPackages.filter((pkg) => {
    if (selectedDest !== "all" && pkg.destinationSlug !== selectedDest) {
      return false;
    }
    if (selectedStatus === "published" && !pkg.isPublished) return false;
    if (selectedStatus === "draft" && pkg.isPublished) return false;
    if (selectedFeatured === "featured" && !pkg.isFeatured) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        pkg.name.toLowerCase().includes(q) ||
        pkg.slug.toLowerCase().includes(q) ||
        pkg.destinationName.toLowerCase().includes(q)
      );
    }
    return true;
  });

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
          placeholder="🔍 Search by package name or slug..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: "1 1 200px",
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
          {destinations.map((d) => (
            <option key={d.slug} value={d.slug}>
              {d.name}
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

        <select
          value={selectedFeatured}
          onChange={(e) => setSelectedFeatured(e.target.value)}
          className={styles.statusSelect}
        >
          <option value="all">All Types</option>
          <option value="featured">Featured / Bestseller</option>
        </select>
      </div>

      {/* Packages Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Tour Package</th>
              <th>Destination</th>
              <th>Duration</th>
              <th>Starting Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                  No packages match the selected criteria.
                </td>
              </tr>
            ) : (
              filtered.map((pkg) => (
                <tr key={pkg.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: "#0f172a" }}>
                      {pkg.name}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                      /destination/{pkg.destinationSlug}/{pkg.slug}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: "#00A896" }}>
                      {pkg.destinationName}
                    </span>
                  </td>
                  <td>
                    {pkg.days}D / {pkg.nights}N
                  </td>
                  <td>
                    {pkg.startingPriceInr
                      ? `₹${pkg.startingPriceInr.toLocaleString("en-IN")}`
                      : "On Request"}
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                      <span
                        className={
                          pkg.isPublished ? styles.badgePublished : styles.badgeDraft
                        }
                      >
                        {pkg.isPublished ? "PUBLISHED" : "DRAFT"}
                      </span>
                      {pkg.isFeatured && (
                        <span style={{ fontSize: "0.85rem" }} title="Featured Bestseller">
                          ⭐
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <Link
                        href={`/admin/packages/${pkg.id}`}
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
                      {pkg.isPublished && (
                        <Link
                          href={`/destination/${pkg.destinationSlug}/${pkg.slug}`}
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
