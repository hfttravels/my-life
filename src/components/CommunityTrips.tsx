"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./CommunityTrips.module.css";

interface GroupTrip {
  id: string;
  name: string;
  duration: string;
  pickupDrop: string;
  originalPrice: number;
  discountedPrice: number;
  image: string;
  url: string;
  departureDay: number; // day of the month
}

// 10 real group departure packages strictly from the website
const communityTripsData: GroupTrip[] = [
  {
    id: "thailand-group",
    name: "Thailand Full Moon & Island Hopping Group Tour | Bangkok, Phuket & Phi Phi",
    duration: "6N / 7D",
    pickupDrop: "Phuket Airport (HKT)",
    originalPrice: 45999,
    discountedPrice: 41999,
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80",
    url: "/destination/thailand/thailand-highlights-group-8d",
    departureDay: 24,
  },
  {
    id: "spiti-group",
    name: "Spiti Valley Full Circuit Group Departure | Highest Passes & Moon Lake",
    duration: "8N / 9D",
    pickupDrop: "Delhi / Chandigarh",
    originalPrice: 32999,
    discountedPrice: 28999,
    image: "/images/spiti/spiti-hero.jpg",
    url: "/destination/spiti/spiti-valley-tour-packages",
    departureDay: 26,
  },
  {
    id: "vietnam-group",
    name: "Vietnam Classic Highlights Group Tour | Hanoi, Ha Long Cruise & Hoi An",
    duration: "8N / 9D",
    pickupDrop: "Hanoi Airport (HAN)",
    originalPrice: 72999,
    discountedPrice: 64999,
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
    url: "/destination/vietnam/vietnam-classic-group-10d",
    departureDay: 25,
  },
  {
    id: "sri-lanka-group",
    name: "Scenic Sri Lanka Group Trip | Sigiriya Rock, Kandy & Bentota Beaches",
    duration: "6N / 7D",
    pickupDrop: "Colombo Airport (CMB)",
    originalPrice: 42999,
    discountedPrice: 38999,
    image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80",
    url: "/destination/sri-lanka",
    departureDay: 27,
  },
  {
    id: "bhutan-group",
    name: "Bhutan Himalayan Road Trip | Tiger's Nest, Thimphu & Phobjikha Valley",
    duration: "7N / 8D",
    pickupDrop: "Bagdogra Airport (IXB)",
    originalPrice: 56999,
    discountedPrice: 47999,
    image: "https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=800&q=80",
    url: "/destination/bhutan",
    departureDay: 26,
  },
  {
    id: "manali-group",
    name: "Himachal Explorer Group Trip | Manali, Kasol & Tosh Valley",
    duration: "4N / 5D",
    pickupDrop: "Delhi / Chandigarh",
    originalPrice: 18499,
    discountedPrice: 14999,
    image: "/images/spiti/spiti-bike.jpg",
    url: "/destination/manali",
    departureDay: 25,
  },
  {
    id: "malaysia-group",
    name: "Malaysia City & Rainforest Group Adventure | KL, Genting & Langkawi",
    duration: "6N / 7D",
    pickupDrop: "Kuala Lumpur (KUL)",
    originalPrice: 49999,
    discountedPrice: 42999,
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80",
    url: "/destination/malaysia",
    departureDay: 28,
  },
  {
    id: "kashmir-group",
    name: "Kashmir Paradise Group Tour | Dal Lake Houseboat, Gulmarg & Pahalgam",
    duration: "5N / 6D",
    pickupDrop: "Srinagar Airport (SXR)",
    originalPrice: 28999,
    discountedPrice: 23999,
    image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=800&q=80",
    url: "/destination/kashmir",
    departureDay: 24,
  },
  {
    id: "bali-group",
    name: "Bali Tropical Backpacking Tour | Ubud Waterfalls, Volcano & Nusa Penida",
    duration: "6N / 7D",
    pickupDrop: "Denpasar Airport (DPS)",
    originalPrice: 49999,
    discountedPrice: 42999,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    url: "/destination/bali",
    departureDay: 29,
  },
  {
    id: "egypt-group",
    name: "Egypt Ancient Wonders Group Expedition | Pyramids, Nile Cruise & Cairo",
    duration: "8N / 9D",
    pickupDrop: "Cairo Airport (CAI)",
    originalPrice: 89999,
    discountedPrice: 76999,
    image: "https://images.unsplash.com/photo-1572252009286-268caa47ea56?auto=format&fit=crop&w=800&q=80",
    url: "/destination/egypt",
    departureDay: 27,
  },
];

const monthsList = [
  { label: "SEP '26", monthShort: "Sept" },
  { label: "OCT '26", monthShort: "Oct" },
  { label: "NOV '26", monthShort: "Nov" },
  { label: "DEC '26", monthShort: "Dec" },
  { label: "JAN '27", monthShort: "Jan" },
  { label: "FEB '27", monthShort: "Feb" },
  { label: "MAR '27", monthShort: "Mar" },
  { label: "APR '27", monthShort: "Apr" },
  { label: "MAY '27", monthShort: "May" },
  { label: "JUN '27", monthShort: "Jun" },
];

export default function CommunityTrips() {
  const [activeMonthIdx, setActiveMonthIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const selectedMonth = monthsList[activeMonthIdx];

  const updateScrollButtons = useCallback(() => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  }, []);

  useEffect(() => {
    updateScrollButtons();
    const handleResize = () => updateScrollButtons();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateScrollButtons]);

  const scroll = (direction: "left" | "right") => {
    if (!trackRef.current) return;
    const container = trackRef.current;
    const scrollAmount = container.clientWidth * 0.75;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className={styles.section} id="community-trips">
      <div className={styles.container}>
        {/* Header Title */}
        <div className={styles.header}>
          <h2 className={styles.title}>Upcoming Community Trips</h2>

          {/* Month Pills Filter */}
          <div className={styles.monthTabs} role="tablist" aria-label="Filter Trips by Month">
            {monthsList.map((m, idx) => (
              <button
                key={m.label}
                type="button"
                role="tab"
                aria-selected={activeMonthIdx === idx}
                className={`${styles.monthTab} ${activeMonthIdx === idx ? styles.activeMonthTab : ""}`}
                onClick={() => setActiveMonthIdx(idx)}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Wrapper */}
        <div className={styles.carouselWrapper}>
          {/* Floating Left Button */}
          <button
            type="button"
            className={`${styles.floatingArrow} ${styles.prevArrow} ${!canScrollLeft ? styles.arrowHidden : ""}`}
            onClick={() => scroll("left")}
            aria-label="Previous community trips"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Scrollable Track */}
          <div
            className={styles.track}
            ref={trackRef}
            onScroll={updateScrollButtons}
          >
            {communityTripsData.map((trip) => (
              <Link
                key={trip.id}
                href={trip.url}
                className={styles.card}
              >
                {/* Yellow Price Badge */}
                <div className={styles.priceBadge}>
                  <span className={styles.strikePrice}>₹{trip.originalPrice.toLocaleString("en-IN")}</span>
                  <span className={styles.mainPrice}>₹{trip.discountedPrice.toLocaleString("en-IN")} Onwards</span>
                </div>

                {/* Background Image */}
                <div className={styles.imageWrapper}>
                  <Image
                    src={trip.image}
                    alt={trip.name}
                    fill
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 33vw, 20vw"
                    quality={80}
                    className={styles.image}
                  />
                  <div className={styles.overlay} />
                </div>

                {/* Content at Bottom */}
                <div className={styles.content}>
                  <h3 className={styles.tripName} title={trip.name}>
                    {trip.name}
                  </h3>

                  {/* Row 1: Duration & Pickup/Drop */}
                  <div className={styles.metaRow}>
                    <span className={styles.metaItem}>
                      <svg className={styles.metaIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {trip.duration}
                    </span>

                    <span className={`${styles.metaItem} ${styles.pickupDrop}`}>
                      <svg className={styles.metaIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {trip.pickupDrop}
                    </span>
                  </div>

                  {/* Row 2: Departure Date */}
                  <div className={styles.dateRow}>
                    <span className={styles.dateItem}>
                      <svg className={styles.metaIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                        <line x1="16" x2="16" y1="2" y2="6" />
                        <line x1="8" x2="8" y1="2" y2="6" />
                        <line x1="3" x2="21" y1="10" y2="10" />
                      </svg>
                      {trip.departureDay} {selectedMonth.monthShort}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Floating Right Button */}
          <button
            type="button"
            className={`${styles.floatingArrow} ${styles.nextArrow} ${!canScrollRight ? styles.arrowHidden : ""}`}
            onClick={() => scroll("right")}
            aria-label="Next community trips"
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
