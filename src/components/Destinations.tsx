"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "./Destinations.module.css";
import Link from "next/link";

export interface DestinationItem {
  id: string;
  name: string;
  category: "Domestic" | "International";
  image: string;
  url?: string;
  isWeekend?: boolean;
}

// Full curated destinations list matching exact visual order
const destinationsList: DestinationItem[] = [
  // ── International (Row 1 upfront) ──
  {
    id: "sri-lanka",
    name: "Sri Lanka",
    category: "International",
    image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=600&q=80",
    url: "/destination/sri-lanka",
  },
  {
    id: "vietnam",
    name: "Vietnam",
    category: "International",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80",
    url: "/destination/vietnam",
  },
  {
    id: "bali",
    name: "Bali",
    category: "International",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
    url: "/destination/bali",
  },
  {
    id: "thailand",
    name: "Thailand",
    category: "International",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=600&q=80",
    url: "/destination/thailand",
  },
  {
    id: "almaty",
    name: "Almaty",
    category: "International",
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=600&q=80",
    url: "/destination/almaty",
  },
  {
    id: "bhutan",
    name: "Bhutan",
    category: "International",
    image: "https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=600&q=80",
    url: "/destination/bhutan",
  },
  {
    id: "europe",
    name: "Europe",
    category: "International",
    image: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=600&q=80",
    url: "/destination/europe",
  },
  {
    id: "japan",
    name: "Japan",
    category: "International",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",
    url: "/destination/japan",
  },
  {
    id: "maldives",
    name: "Maldives",
    category: "International",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=75",
    url: "/destination/maldives",
  },
  {
    id: "malaysia",
    name: "Malaysia",
    category: "International",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=600&q=75",
    url: "/destination/malaysia",
  },
  {
    id: "egypt",
    name: "Egypt",
    category: "International",
    image: "https://images.unsplash.com/photo-1572252009286-268caa47ea56?auto=format&fit=crop&w=600&q=75",
    url: "/destination/egypt",
  },
  {
    id: "georgia",
    name: "Georgia",
    category: "International",
    image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=600&q=80",
    url: "/destination/georgia",
  },
  {
    id: "nepal",
    name: "Nepal",
    category: "International",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",
    url: "/destination/nepal",
  },

  // ── Domestic (Row 2 upfront) ──
  {
    id: "meghalaya",
    name: "Meghalaya",
    category: "Domestic",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",
    url: "/destination/meghalaya",
  },
  {
    id: "spiti",
    name: "Spiti Valley",
    category: "Domestic",
    isWeekend: true,
    image: "/images/spiti/spiti-hero.jpg",
    url: "/destination/spiti/spiti-valley-tour-packages",
  },
  {
    id: "ladakh",
    name: "Ladakh",
    category: "Domestic",
    image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=600&q=80",
    url: "/destination/ladakh",
  },
  {
    id: "tawang",
    name: "Tawang",
    category: "Domestic",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80",
    url: "/destination/tawang",
  },
  {
    id: "andaman",
    name: "Andaman",
    category: "Domestic",
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=600&q=80",
    url: "/destination/andaman",
  },
  {
    id: "himachal-pradesh",
    name: "Himachal Pradesh",
    category: "Domestic",
    isWeekend: true,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    url: "/destination/himachal-pradesh",
  },
  {
    id: "manali",
    name: "Manali",
    category: "Domestic",
    isWeekend: true,
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80",
    url: "/destination/manali",
  },
  {
    id: "kerala",
    name: "Kerala",
    category: "Domestic",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80",
    url: "/destination/kerala",
  },
  {
    id: "kashmir",
    name: "Kashmir",
    category: "Domestic",
    image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=600&q=80",
    url: "/destination/kashmir",
  },
  {
    id: "goa",
    name: "Goa",
    category: "Domestic",
    isWeekend: true,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80",
    url: "/destination/goa",
  },
  {
    id: "rishikesh",
    name: "Rishikesh",
    category: "Domestic",
    isWeekend: true,
    image: "https://images.unsplash.com/photo-1602498456745-e9503b30470b?auto=format&fit=crop&w=600&q=80",
    url: "/destination/rishikesh",
  },
  {
    id: "ooty",
    name: "Ooty",
    category: "Domestic",
    isWeekend: true,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=600&q=80",
    url: "/destination/ooty",
  },
  {
    id: "wayanad",
    name: "Wayanad",
    category: "Domestic",
    isWeekend: true,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    url: "/destination/wayanad",
  },
  {
    id: "puri",
    name: "Puri",
    category: "Domestic",
    isWeekend: true,
    image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=600&q=80",
    url: "/destination/puri",
  },
];

type FilterCategory = "All" | "International" | "Domestic" | "Weekend";

interface DestinationsProps {
  initialDestinations?: DestinationItem[];
}

export default function Destinations({ initialDestinations }: DestinationsProps = {}) {
  const [activeTab, setActiveTab] = useState<FilterCategory>("All");
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const baseList = useMemo(() => {
    return initialDestinations && initialDestinations.length > 0
      ? initialDestinations
      : destinationsList;
  }, [initialDestinations]);

  // Two rows logic: In "All", Row 1 is International, Row 2 is Domestic
  // In single-category views, split the list evenly into 2 rows
  const { row1, row2 } = useMemo(() => {
    if (activeTab === "All") {
      const international = baseList.filter((d) => d.category === "International");
      const domestic = baseList.filter((d) => d.category === "Domestic");
      return { row1: international, row2: domestic };
    }

    let filtered: DestinationItem[];
    if (activeTab === "International") {
      filtered = baseList.filter((d) => d.category === "International");
    } else if (activeTab === "Domestic") {
      filtered = baseList.filter((d) => d.category === "Domestic");
    } else {
      // Weekend
      filtered = baseList.filter((d) => d.isWeekend);
    }

    const half = Math.ceil(filtered.length / 2);
    return {
      row1: filtered.slice(0, half),
      row2: filtered.slice(half),
    };
  }, [activeTab, baseList]);

  const updateScrollState = useCallback(() => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    // Reset scroll when tab changes
    el.scrollTo({ left: 0, behavior: "smooth" });
    updateScrollState();

    const handleResize = () => updateScrollState();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeTab, updateScrollState]);

  const scroll = (direction: "left" | "right") => {
    if (!trackRef.current) return;
    const container = trackRef.current;
    const scrollDistance = container.clientWidth * 0.75;
    container.scrollBy({
      left: direction === "left" ? -scrollDistance : scrollDistance,
      behavior: "smooth",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scroll("left");
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scroll("right");
    }
  };

  return (
    <section id="destinations" className={styles.section}>
      <span id="tours" className={styles.anchorTarget} aria-hidden="true" />
      <div className={styles.fullWidthContainer}>
        {/* Header with Title, Tabs, and Arrow Controls */}
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Explore Destinations</h2>
            
            {/* Filter Pills matching exact UI */}
            <div className={styles.tabsContainer} role="tablist" aria-label="Destination Categories">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "All"}
                className={`${styles.tab} ${activeTab === "All" ? styles.activeTab : ""}`}
                onClick={() => setActiveTab("All")}
              >
                <span className={styles.tabIcon}>🌐</span>
                <span>All</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "International"}
                className={`${styles.tab} ${activeTab === "International" ? styles.activeTab : ""}`}
                onClick={() => setActiveTab("International")}
              >
                <span className={styles.tabIcon}>✈️</span>
                <span>International</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "Domestic"}
                className={`${styles.tab} ${activeTab === "Domestic" ? styles.activeTab : ""}`}
                onClick={() => setActiveTab("Domestic")}
              >
                <span className={styles.tabIcon}>🇮🇳</span>
                <span>Domestic</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "Weekend"}
                className={`${styles.tab} ${activeTab === "Weekend" ? styles.activeTab : ""}`}
                onClick={() => setActiveTab("Weekend")}
              >
                <span className={styles.tabIcon}>🚗</span>
                <span>Weekend</span>
              </button>
            </div>
          </div>

          {/* Arrow navigation buttons */}
          <div className={styles.navControls}>
            <button
              type="button"
              className={styles.arrowButton}
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous destinations"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              className={styles.arrowButton}
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Next destinations"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* 2-Row Carousel Wrapper with floating arrows & keyboard/swipe support */}
        <div
          className={styles.carouselWrapper}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          aria-label="Explore Destinations Carousel"
        >
          {/* Floating Left Arrow */}
          <button
            type="button"
            className={`${styles.floatingArrow} ${styles.floatingPrev} ${!canScrollLeft ? styles.arrowHidden : ""}`}
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            tabIndex={-1}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Scrollable Grid Track with 2 synchronized rows */}
          <div
            className={styles.scrollTrack}
            ref={trackRef}
            onScroll={updateScrollState}
          >
            {/* Row 1 Destinations */}
            {row1.map((dest, idx) => (
              <Link
                href={dest.url || `/destination/${dest.id}`}
                key={`r1-${dest.id}`}
                className={styles.destinationCard}
                style={{ gridRow: 1, gridColumn: idx + 1 }}
              >
                <div className={styles.imageOval}>
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    sizes="90px"
                    loading="lazy"
                    quality={80}
                  />
                </div>
                <span className={styles.destinationName}>{dest.name}</span>
              </Link>
            ))}

            {/* Row 2 Destinations */}
            {row2.map((dest, idx) => (
              <Link
                href={dest.url || `/destination/${dest.id}`}
                key={`r2-${dest.id}`}
                className={styles.destinationCard}
                style={{ gridRow: 2, gridColumn: idx + 1 }}
              >
                <div className={styles.imageOval}>
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    sizes="90px"
                    loading="lazy"
                    quality={80}
                  />
                </div>
                <span className={styles.destinationName}>{dest.name}</span>
              </Link>
            ))}
          </div>

          {/* Floating Right Arrow */}
          <button
            type="button"
            className={`${styles.floatingArrow} ${styles.floatingNext} ${!canScrollRight ? styles.arrowHidden : ""}`}
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            tabIndex={-1}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
