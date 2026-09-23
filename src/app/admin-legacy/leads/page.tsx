import { requireAdminAuth } from "@/lib/adminAuth";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { desc } from "drizzle-orm";
import LeadsTableClient from "./LeadsTableClient";
import styles from "../admin.module.css";

export default async function AdminLeadsPage() {
  await requireAdminAuth();

  const allLeads = await db
    .select()
    .from(leads)
    .orderBy(desc(leads.createdAt))
    .limit(100);

  const formattedLeads = allLeads.map((l) => ({
    id: l.id,
    name: l.name,
    phone: l.phone,
    email: l.email,
    packageSlug: l.packageSlug,
    destinationSlug: l.destinationSlug,
    travelDate: l.travelDate,
    paxAdults: l.paxAdults,
    paxChildren: l.paxChildren,
    tripType: l.tripType,
    message: l.message,
    source: l.source,
    sourcePage: l.sourcePage,
    status: l.status,
    notes: l.notes,
    createdAt: l.createdAt.toISOString(),
  }));

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Customer Enquiries &amp; Leads</h1>
          <p style={{ color: "#64748b", margin: "4px 0 0" }}>
            Real-time enquiries submitted across package pages, destination hubs, and contact forms.
          </p>
        </div>
      </div>

      <LeadsTableClient initialLeads={formattedLeads} />
    </div>
  );
}
