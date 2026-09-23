"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./TrendingDestinations.module.css";
import { ALL_DESTINATIONS, DestinationData } from "@/data/destinations";

type FilterTab = "all" | "international" | "domestic";

interface TrendingDestinationsProps {
  initialDestinations?: DestinationData[];
}

export default function TrendingDestinations({ initialDestinations }: TrendingDestinationsProps = {}) {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const baseList = initialDestinations && initialDestinations.length > 0
    ? initialDestinations
    : Object.values(ALL_DESTINATIONS);

  const trendingList = baseList.filter(
    (dest) => !!dest.trending2026
  );

  const filtered = trendingList.filter((dest) => {
    if (activeTab === "all") return true;
    return dest.type === activeTab;
  });

  return (
    <section id="trending-2026" className={styles.section}>
      <div className="container">
        <div className={styles.headerRow}>
          <div>
            <div className={styles.badgePill}>🔥 2026 Travel Index</div>
            <h2 className={styles.title}>Trending with Indian Travellers in 2026</h2>
            <p className={styles.subtitle}>
              The top 10 international and domestic destinations surging across booking and search reports.
            </p>
          </div>

          <div className={styles.tabsGroup}>
            <button
              className={`${styles.tabBtn} ${activeTab === "all" ? styles.activeTabBtn : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All (10)
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === "international" ? styles.activeTabBtn : ""}`}
              onClick={() => setActiveTab("international")}
            >
              International (5)
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === "domestic" ? styles.activeTabBtn : ""}`}
              onClick={() => setActiveTab("domestic")}
            >
              Domestic (5)
            </button>
          </div>
        </div>

        <div className={styles.cardsGrid}>
          {filtered.map((dest) => {
            const info = dest.trending2026!;
            return (
              <Link href={`/destination/${dest.id}`} key={dest.id} className={styles.card}>
                <div className={styles.imageWrap}>
                  <Image
                    src={dest.hero.image}
                    alt={`${dest.name} - ${info.highlights[0] || "Travel"}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                    style={{ objectFit: "cover" }}
                  />
                  <div className={styles.cardBadge}>{info.badge}</div>
                  <div className={styles.typeBadge}>
                    {dest.type === "international" ? "International" : "Domestic"}
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.nameRow}>
                    <h3 className={styles.name}>{dest.name}</h3>
                  </div>

                  <p className={styles.tagline}>{info.tagline}</p>

                  <div className={styles.detailsList}>
                    <div className={styles.detailItem}>
                      <span className={styles.detailIcon}>⏱️</span>
                      <span>{info.duration}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailIcon}>🗓️</span>
                      <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {info.season}
                      </span>
                    </div>
                  </div>

                  <div className={styles.cardFooter}>
                    <span style={{ fontSize: "0.82rem", color: "#64748b" }}>
                      {dest.hero.startingPrice}
                    </span>
                    <span className={styles.ctaLink}>
                      Plan this trip ➔
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
