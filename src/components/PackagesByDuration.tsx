"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./PackagesByDuration.module.css";

type DurationTab = "3-5" | "6-9" | "10+";

interface DurationPackage {
  id: string;
  name: string;
  priceFormatted: string;
  image: string;
  url: string;
  position: "top-left" | "bottom-left-1" | "bottom-left-2" | "center-tall" | "top-right" | "bottom-right";
}

const packagesByDurationData: Record<DurationTab, DurationPackage[]> = {
  "3-5": [
    {
      id: "thailand-3-5",
      name: "Thailand",
      priceFormatted: "From ₹24,999",
      image: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1000&q=80",
      url: "/destination/thailand",
      position: "top-left",
    },
    {
      id: "maldives-3-5",
      name: "Maldives",
      priceFormatted: "From ₹48,999",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=80",
      url: "/destination/maldives",
      position: "bottom-left-1",
    },
    {
      id: "sri-lanka-3-5",
      name: "Sri Lanka",
      priceFormatted: "From ₹26,999",
      image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1000&q=80",
      url: "/destination/sri-lanka",
      position: "bottom-left-2",
    },
    {
      id: "vietnam-3-5",
      name: "Vietnam",
      priceFormatted: "From ₹29,999",
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80",
      url: "/destination/vietnam",
      position: "center-tall",
    },
    {
      id: "bali-3-5",
      name: "Bali",
      priceFormatted: "From ₹28,999",
      image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1000&q=80",
      url: "/destination/bali",
      position: "top-right",
    },
    {
      id: "mauritius-3-5",
      name: "Mauritius",
      priceFormatted: "From ₹45,999",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80",
      url: "/destination/mauritius",
      position: "bottom-right",
    },
  ],
  "6-9": [
    {
      id: "thailand-6-9",
      name: "Thailand",
      priceFormatted: "From ₹38,999",
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1000&q=80",
      url: "/destination/thailand",
      position: "top-left",
    },
    {
      id: "malaysia-6-9",
      name: "Malaysia",
      priceFormatted: "From ₹36,999",
      image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1000&q=80",
      url: "/destination/malaysia",
      position: "bottom-left-1",
    },
    {
      id: "sri-lanka-6-9",
      name: "Sri Lanka",
      priceFormatted: "From ₹38,999",
      image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1000&q=80",
      url: "/destination/sri-lanka",
      position: "bottom-left-2",
    },
    {
      id: "spiti-6-9",
      name: "Spiti Valley",
      priceFormatted: "From ₹28,999",
      image: "/images/spiti/spiti-hero.jpg",
      url: "/destination/spiti/spiti-valley-tour-packages",
      position: "center-tall",
    },
    {
      id: "bali-6-9",
      name: "Bali",
      priceFormatted: "From ₹42,999",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80",
      url: "/destination/bali",
      position: "top-right",
    },
    {
      id: "vietnam-6-9",
      name: "Vietnam",
      priceFormatted: "From ₹44,999",
      image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1000&q=80",
      url: "/destination/vietnam",
      position: "bottom-right",
    },
  ],
  "10+": [
    {
      id: "egypt-10",
      name: "Egypt",
      priceFormatted: "From ₹1,10,000",
      image: "https://images.unsplash.com/photo-1572252009286-268caa47ea56?auto=format&fit=crop&w=1000&q=80",
      url: "/destination/egypt",
      position: "top-left",
    },
    {
      id: "maldives-10",
      name: "Maldives",
      priceFormatted: "From ₹1,85,000",
      image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1000&q=80",
      url: "/destination/maldives",
      position: "bottom-left-1",
    },
    {
      id: "sri-lanka-10",
      name: "Sri Lanka",
      priceFormatted: "From ₹58,999",
      image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1000&q=80",
      url: "/destination/sri-lanka",
      position: "bottom-left-2",
    },
    {
      id: "japan-10",
      name: "Japan",
      priceFormatted: "From ₹1,45,000",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80",
      url: "/destination/japan",
      position: "center-tall",
    },
    {
      id: "vietnam-10",
      name: "Vietnam",
      priceFormatted: "From ₹62,999",
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80",
      url: "/destination/vietnam",
      position: "top-right",
    },
    {
      id: "spiti-10",
      name: "Spiti Valley",
      priceFormatted: "From ₹38,999",
      image: "/images/spiti/spiti-bike.jpg",
      url: "/destination/spiti/spiti-valley-tour-packages",
      position: "bottom-right",
    },
  ],
};

export default function PackagesByDuration() {
  const [activeTab, setActiveTab] = useState<DurationTab>("3-5");

  const currentPackages = packagesByDurationData[activeTab];

  return (
    <section className={styles.section} id="packages-by-duration">
      <div className={styles.container}>
        {/* Header with Title and Duration Filter Tabs */}
        <div className={styles.header}>
          <h2 className={styles.title}>PACKAGES BY DURATION</h2>

          <div className={styles.tabs} role="tablist" aria-label="Duration Filter">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "3-5"}
              className={`${styles.tab} ${activeTab === "3-5" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("3-5")}
            >
              3-5 Days
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "6-9"}
              className={`${styles.tab} ${activeTab === "6-9" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("6-9")}
            >
              6-9 Days
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "10+"}
              className={`${styles.tab} ${activeTab === "10+" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("10+")}
            >
              10+ Days
            </button>
          </div>
        </div>

        {/* Bento Grid Layout exactly replicating screenshot */}
        <div className={styles.bentoGrid} key={activeTab}>
          {currentPackages.map((pkg) => (
            <Link
              key={pkg.id}
              href={pkg.url}
              className={`${styles.card} ${styles[pkg.position]}`}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={pkg.image}
                  alt={`${pkg.name} package`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={80}
                  className={styles.image}
                />
                <div className={styles.overlay} />
              </div>

              <div className={styles.content}>
                <h3 className={styles.name}>{pkg.name}</h3>
                <span className={styles.price}>{pkg.priceFormatted}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
