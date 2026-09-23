"use client";

import { useState } from "react";
import styles from "../admin.module.css";

interface LeadItem {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  packageSlug: string | null;
  destinationSlug: string | null;
  travelDate: string | null;
  paxAdults: number | null;
  paxChildren: number | null;
  tripType: string | null;
  message: string | null;
  source: string | null;
  sourcePage: string | null;
  status: string;
  notes: string | null;
  createdAt: string;
}

interface LeadsTableClientProps {
  initialLeads: LeadItem[];
}

export default function LeadsTableClient({ initialLeads }: LeadsTableClientProps) {
  const [leadsList, setLeadsList] = useState<LeadItem[]>(initialLeads);
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filtered = leadsList.filter((l) => {
    if (statusFilter !== "all" && l.status !== statusFilter) return false;
    return true;
  });

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setLeadsList((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
        );
        if (selectedLead?.id === id) {
          setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const statusOptions = [
    { value: "new", label: "New" },
    { value: "contacted", label: "Contacted" },
    { value: "hot", label: "Hot Lead" },
    { value: "follow_up", label: "Follow Up" },
    { value: "quoted", label: "Quoted" },
    { value: "won", label: "Won / Booked" },
    { value: "lost", label: "Lost" },
  ];

  return (
    <div>
      {/* Filter Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          background: "#ffffff",
          padding: "16px",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#64748b" }}>
            Filter Status:
          </span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={styles.statusSelect}
          >
            <option value="all">All Enquiries ({leadsList.length})</option>
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Contact</th>
              <th>Target Tour / Hub</th>
              <th>Source</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                  No enquiries found matching filter.
                </td>
              </tr>
            ) : (
              filtered.map((l) => (
                <tr key={l.id}>
                  <td>
                    <div style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                      {new Date(l.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                      {new Date(l.createdAt).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, color: "#0f172a" }}>{l.name}</div>
                    {l.email && (
                      <div style={{ fontSize: "0.8rem", color: "#64748b" }}>{l.email}</div>
                    )}
                  </td>
                  <td>
                    <a
                      href={`https://wa.me/91${l.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                        `Hi ${l.name}! Thank you for enquiring with Hassle Free Travels regarding ${l.packageSlug || l.destinationSlug || "our tours"}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        background: "#dcfce7",
                        color: "#15803d",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        textDecoration: "none",
                      }}
                    >
                      💬 {l.phone}
                    </a>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: "#00A896" }}>
                      {l.packageSlug || l.destinationSlug || "General"}
                    </div>
                    {l.travelDate && (
                      <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                        📅 {l.travelDate}
                      </div>
                    )}
                  </td>
                  <td>
                    <span style={{ fontSize: "0.82rem", color: "#64748b" }}>
                      {l.source || "web"}
                    </span>
                  </td>
                  <td>
                    <select
                      value={l.status}
                      disabled={updatingId === l.id}
                      onChange={(e) => handleStatusChange(l.id, e.target.value)}
                      className={styles.statusSelect}
                      style={{
                        background:
                          l.status === "new"
                            ? "#ecfdf5"
                            : l.status === "won"
                            ? "#dbeafe"
                            : l.status === "lost"
                            ? "#fee2e2"
                            : "#ffffff",
                      }}
                    >
                      {statusOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => setSelectedLead(l)}
                      style={{
                        background: "#f1f5f9",
                        border: "1px solid #cbd5e1",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      View 👁️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={() => setSelectedLead(null)}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              maxWidth: "540px",
              width: "100%",
              padding: "28px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: 0 }}>
                Enquiry Details
              </h3>
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                style={{ background: "none", border: "none", fontSize: "1.3rem", cursor: "pointer", color: "#64748b" }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.92rem" }}>
              <div>
                <strong>Name:</strong> {selectedLead.name}
              </div>
              <div>
                <strong>Phone:</strong> {selectedLead.phone}
              </div>
              {selectedLead.email && (
                <div>
                  <strong>Email:</strong> {selectedLead.email}
                </div>
              )}
              {selectedLead.packageSlug && (
                <div>
                  <strong>Tour Package:</strong> /tours/{selectedLead.packageSlug}
                </div>
              )}
              {selectedLead.destinationSlug && (
                <div>
                  <strong>Destination Hub:</strong> /destination/{selectedLead.destinationSlug}
                </div>
              )}
              {selectedLead.travelDate && (
                <div>
                  <strong>Travel Date:</strong> {selectedLead.travelDate}
                </div>
              )}
              {(selectedLead.paxAdults || selectedLead.paxChildren) && (
                <div>
                  <strong>Travelers:</strong> {selectedLead.paxAdults || 0} Adults, {selectedLead.paxChildren || 0} Children
                </div>
              )}
              <div>
                <strong>Captured On:</strong>{" "}
                {new Date(selectedLead.createdAt).toLocaleString("en-IN")}
              </div>
              <div>
                <strong>Source Page:</strong> {selectedLead.sourcePage || "N/A"}
              </div>
              {selectedLead.message && (
                <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0", marginTop: "6px" }}>
                  <strong>Message / Requirements:</strong>
                  <p style={{ margin: "6px 0 0", color: "#334155", whiteSpace: "pre-wrap" }}>
                    {selectedLead.message}
                  </p>
                </div>
              )}
            </div>

            <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <a
                href={`https://wa.me/91${selectedLead.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#25D366",
                  color: "#fff",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                }}
              >
                Chat on WhatsApp
              </a>
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                style={{
                  background: "#e2e8f0",
                  color: "#334155",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
