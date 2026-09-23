import Link from "next/link";
import { requireAdminAuth } from "@/lib/adminAuth";
import { db } from "@/db";
import { packages, destinations } from "@/db/schema";
import { desc, asc } from "drizzle-orm";
import PackagesTableClient from "./PackagesTableClient";
import styles from "../admin.module.css";

export default async function AdminPackagesPage() {
  await requireAdminAuth();

  const allPackages = await db.query.packages.findMany({
    with: {
      destination: true,
    },
    orderBy: [desc(packages.updatedAt)],
  });

  const allDestinations = await db
    .select({ id: destinations.id, name: destinations.name, slug: destinations.slug })
    .from(destinations)
    .orderBy(asc(destinations.name));

  const tableData = allPackages.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    destinationName: p.destination.name,
    destinationSlug: p.destination.slug,
    nights: p.nights,
    days: p.days,
    startingPriceInr: p.startingPriceInr,
    isPublished: p.isPublished,
    isFeatured: p.isFeatured,
    updatedAt: p.updatedAt.toISOString(),
  }));

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Tour Packages</h1>
          <p style={{ color: "#64748b", margin: "4px 0 0" }}>
            Manage, edit and publish SEO tour package landing pages.
          </p>
        </div>
        <Link href="/admin/packages/new" className={styles.primaryActionBtn}>
          + Create New Package
        </Link>
      </div>

      <PackagesTableClient packages={tableData} destinations={allDestinations} />
    </div>
  );
}
