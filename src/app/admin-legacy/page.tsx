import Link from "next/link";
import { requireAdminAuth } from "@/lib/adminAuth";
import { db } from "@/db";
import { packages, leads } from "@/db/schema";
import { eq, desc, count } from "drizzle-orm";
import styles from "./admin.module.css";

export default async function AdminDashboardPage() {
  await requireAdminAuth();

  // Metric counts
  const [totalPkgsResult] = await db.select({ value: count() }).from(packages);
  const [publishedPkgsResult] = await db
    .select({ value: count() })
    .from(packages)
    .where(eq(packages.isPublished, true));

  const [totalLeadsResult] = await db.select({ value: count() }).from(leads);
  const [newLeadsResult] = await db
    .select({ value: count() })
    .from(leads)
    .where(eq(leads.status, "new"));

  const recentLeads = await db
    .select()
    .from(leads)
    .orderBy(desc(leads.createdAt))
    .limit(5);

  const totalPackages = totalPkgsResult?.value ?? 0;
  const publishedPackages = publishedPkgsResult?.value ?? 0;
  const draftPackages = totalPackages - publishedPackages;
  const totalLeads = totalLeadsResult?.value ?? 0;
  const newLeads = newLeadsResult?.value ?? 0;

  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #8B2FC9, #6B1FA9)", color: "#ffffff", padding: "16px 20px", borderRadius: "12px", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h3 style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: 700 }}>⚡ Unified Revenue Intelligence Platform is Live</h3>
          <p style={{ margin: 0, fontSize: "13px", opacity: 0.9 }}>AI Lead Scoring, Omnichannel CRM, Bookings, Analytics & Full CMS have been consolidated into /admin.</p>
        </div>
        <Link href="/admin" style={{ background: "#ffffff", color: "#8B2FC9", padding: "10px 18px", borderRadius: "8px", fontWeight: 700, fontSize: "13px", textDecoration: "none" }}>
          Open New Command Centre →
        </Link>
      </div>

      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Legacy Dashboard</h1>
          <p style={{ color: "#64748b", margin: "4px 0 0" }}>
            Monitor live tour packages and customer enquiries.
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Link href="/admin/packages/new" className={styles.primaryActionBtn}>
            + Create New Package
          </Link>
          <Link
            href="/admin/leads"
            className={styles.primaryActionBtn}
            style={{ background: "#05668D" }}
          >
            Review Enquiries
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Published Tours</div>
          <div className={styles.statNumber} style={{ color: "#16a34a" }}>
            {publishedPackages}
          </div>
          <div style={{ fontSize: "0.82rem", color: "#64748b" }}>
            Live on hasslefree-travels.com
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statLabel}>Draft Packages</div>
          <div className={styles.statNumber} style={{ color: "#b45309" }}>
            {draftPackages}
          </div>
          <div style={{ fontSize: "0.82rem", color: "#64748b" }}>
            Unpublished / In preparation
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statLabel}>New Leads</div>
          <div className={styles.statNumber} style={{ color: "#00A896" }}>
            {newLeads}
          </div>
          <div style={{ fontSize: "0.82rem", color: "#64748b" }}>
            Awaiting follow-up
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total Enquiries</div>
          <div className={styles.statNumber} style={{ color: "#0f172a" }}>
            {totalLeads}
          </div>
          <div style={{ fontSize: "0.82rem", color: "#64748b" }}>
            All-time captured leads
          </div>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div style={{ marginTop: "32px" }}>
        <div className={styles.pageHeader}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, margin: 0 }}>
            Recent Enquiries
          </h2>
          <Link
            href="/admin/leads"
            style={{
              color: "#00A896",
              fontWeight: 600,
              fontSize: "0.9rem",
              textDecoration: "none",
            }}
          >
            View All Leads ➔
          </Link>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Target / Destination</th>
                <th>Source</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "32px", color: "#64748b" }}>
                    No leads captured yet.
                  </td>
                </tr>
              ) : (
                recentLeads.map((l) => (
                  <tr key={l.id}>
                    <td>
                      {new Date(l.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td style={{ fontWeight: 600 }}>{l.name}</td>
                    <td>
                      <a
                        href={`https://wa.me/91${l.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#16a34a", textDecoration: "none", fontWeight: 600 }}
                      >
                        📱 {l.phone}
                      </a>
                    </td>
                    <td>{l.packageSlug || l.destinationSlug || "General"}</td>
                    <td>
                      <span style={{ fontSize: "0.82rem", color: "#64748b" }}>
                        {l.source}
                      </span>
                    </td>
                    <td>
                      <span
                        className={
                          l.status === "new" ? styles.badgePublished : styles.badgeDraft
                        }
                      >
                        {l.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
