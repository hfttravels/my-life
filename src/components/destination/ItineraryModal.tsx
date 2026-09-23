"use client";

import { useState, useEffect } from "react";
import styles from "./DestinationModals.module.css";
import { TourPackage } from "@/data/destinations";

interface ItineraryModalProps {
  pkg: TourPackage | null;
  onClose: () => void;
  onBookNow: (pkg: TourPackage) => void;
}

export default function ItineraryModal({ pkg, onClose, onBookNow }: ItineraryModalProps) {
  const [activeTab, setActiveTab] = useState<"itinerary" | "inclusions" | "needToKnow">("itinerary");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!pkg) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.modalTitleGroup}>
            <span className={styles.badge}>{pkg.badge}</span>
            <h3 style={{ marginTop: "6px" }}>{pkg.title}</h3>
            <div className={styles.modalMeta}>
              <span>⏱️ {pkg.duration}</span>
              <span>📍 {pkg.pickupDrop}</span>
              <span>⭐ {pkg.rating} ({pkg.reviewCount} reviews)</span>
            </div>
          </div>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        {/* Tab switcher */}
        <div className={styles.tabsBar}>
          <button
            className={`${styles.tabBtn} ${activeTab === "itinerary" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("itinerary")}
          >
            Day-by-Day Itinerary ({pkg.itinerary.length} Days)
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === "inclusions" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("inclusions")}
          >
            Inclusions & Exclusions
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === "needToKnow" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("needToKnow")}
          >
            Need to Know
          </button>
        </div>

        {/* Body content */}
        <div className={styles.modalBody}>
          {activeTab === "itinerary" && (
            <div className={styles.timeline}>
              {pkg.itinerary.map((day) => (
                <div key={day.day} className={styles.timelineItem}>
                  <div className={styles.dayPill}>D{day.day}</div>
                  <div className={styles.dayDetails}>
                    <h4 className={styles.dayTitle}>{day.title}</h4>
                    <p className={styles.dayDesc}>{day.description}</p>
                    <div className={styles.dayMeta}>
                      <span className={styles.metaItem}>🏨 Stay: {day.stay}</span>
                      <span className={styles.metaItem}>🍽️ Meals: {day.meals}</span>
                      {day.altitude && (
                        <span className={styles.metaItem}>🏔️ Altitude: {day.altitude}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "inclusions" && (
            <div className={styles.inclusionsGrid}>
              <div className={styles.inclusionBox}>
                <h4 className={styles.boxTitle} style={{ color: "#16a34a" }}>
                  <span>✓</span> What is Included
                </h4>
                <ul className={styles.inclusionList}>
                  {pkg.inclusions.map((item, idx) => (
                    <li key={idx}>
                      <span style={{ color: "#16a34a", fontWeight: "bold" }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                  <li>
                    <span style={{ color: "#16a34a", fontWeight: "bold" }}>✓</span>
                    <span>Toll tax, state permits, and driver allowances</span>
                  </li>
                  <li>
                    <span style={{ color: "#16a34a", fontWeight: "bold" }}>✓</span>
                    <span>Medical kit with Diamox & Oximeter on board</span>
                  </li>
                </ul>
              </div>

              <div className={styles.exclusionBox}>
                <h4 className={styles.boxTitle} style={{ color: "#dc2626" }}>
                  <span>✗</span> What is Not Included
                </h4>
                <ul className={styles.inclusionList}>
                  <li>
                    <span style={{ color: "#dc2626", fontWeight: "bold" }}>✗</span>
                    <span>Meals not mentioned in the inclusions list</span>
                  </li>
                  <li>
                    <span style={{ color: "#dc2626", fontWeight: "bold" }}>✗</span>
                    <span>Personal expenses such as laundry, tips & phone calls</span>
                  </li>
                  <li>
                    <span style={{ color: "#dc2626", fontWeight: "bold" }}>✗</span>
                    <span>Monument entry fees & photography permits</span>
                  </li>
                  <li>
                    <span style={{ color: "#dc2626", fontWeight: "bold" }}>✗</span>
                    <span>Emergency evacuations or unforeseen road block expenses</span>
                  </li>
                  <li>
                    <span style={{ color: "#dc2626", fontWeight: "bold" }}>✗</span>
                    <span>5% GST applicable at final checkout</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "needToKnow" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ background: "#eff6ff", padding: "16px", borderRadius: "10px", border: "1px solid #bfdbfe" }}>
                <h5 style={{ color: "#1e40af", marginBottom: "6px", fontWeight: "700" }}>
                  Acclimatization & Altitude Care
                </h5>
                <p style={{ fontSize: "0.9rem", color: "#1e3a8a", lineHeight: 1.5 }}>
                  Spiti averages over 12,500 ft elevation. Drink at least 3-4 liters of water daily. Avoid alcohol for the first 48 hours. Our itineraries are specifically planned to cross via Kinnaur for gradual altitude adjustment.
                </p>
              </div>

              <div style={{ background: "#fefce8", padding: "16px", borderRadius: "10px", border: "1px solid #fef08a" }}>
                <h5 style={{ color: "#854d0e", marginBottom: "6px", fontWeight: "700" }}>
                  Mobile Connectivity & Cash
                </h5>
                <p style={{ fontSize: "0.9rem", color: "#713f12", lineHeight: 1.5 }}>
                  Only BSNL postpaid and Jio 4G have intermittent coverage in Kaza. Carry sufficient cash as ATMs in Kaza often run out of cash during high season.
                </p>
              </div>

              <div style={{ background: "#f1f5f9", padding: "16px", borderRadius: "10px" }}>
                <h5 style={{ color: "#334155", marginBottom: "6px", fontWeight: "700" }}>
                  Luggage & Clothing Guidelines
                </h5>
                <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: 1.5 }}>
                  Carry soft rucksacks/duffels instead of rigid hard trolleys to easily fit in vehicles. Heavy windcheaters, thermals, and fleece are mandatory even in peak summer months.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={styles.modalFooter}>
          <div className={styles.footerPrice}>
            <span className={styles.footerOriginal}>₹{pkg.originalPrice.toLocaleString("en-IN")}</span>
            <span className={styles.footerCurrent}>
              ₹{pkg.discountedPrice.toLocaleString("en-IN")}{" "}
              <span style={{ fontSize: "0.85rem", fontWeight: "normal", color: "#64748b" }}>/ person</span>
            </span>
          </div>
          <div className={styles.footerActions}>
            <button
              className={styles.bookBtn}
              onClick={() => {
                onClose();
                onBookNow(pkg);
              }}
            >
              Book Now / Send Query
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
