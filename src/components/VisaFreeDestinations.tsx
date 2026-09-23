"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./VisaFreeDestinations.module.css";

interface VisaFreeItem {
  id: string;
  tagline: string;
  name: string;
  image: string;
  url: string;
}

const visaFreeList: VisaFreeItem[] = [
  {
    id: "maldives",
    tagline: "CREATE MEMORIES IN",
    name: "Maldives",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=800&q=80",
    url: "/destination/maldives",
  },
  {
    id: "sri-lanka",
    tagline: "FALL IN LOVE WITH",
    name: "Sri Lanka",
    image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80",
    url: "/destination/sri-lanka",
  },
  {
    id: "malaysia",
    tagline: "THE HIDDEN GEM OF ASIA",
    name: "Malaysia",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80",
    url: "/destination/malaysia",
  },
  {
    id: "thailand",
    tagline: "THE KINGDOM OF",
    name: "Thailand",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80",
    url: "/destination/thailand",
  },
  {
    id: "mauritius",
    tagline: "THE INCREDIBLE ISLAND",
    name: "Mauritius",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    url: "/destination/mauritius",
  },
  {
    id: "bhutan",
    tagline: "HIMALAYAN PARADISE",
    name: "Bhutan",
    image: "https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=800&q=80",
    url: "/destination/bhutan",
  },
  {
    id: "nepal",
    tagline: "ROOF OF THE WORLD",
    name: "Nepal",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    url: "/destination/nepal",
  },
  {
    id: "almaty",
    tagline: "WONDERS OF CENTRAL ASIA",
    name: "Almaty",
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80",
    url: "/destination/almaty",
  },
];

export default function VisaFreeDestinations() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  }, []);

  useEffect(() => {
    updateScrollState();
    const handleResize = () => updateScrollState();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateScrollState]);

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
    <section className={styles.section} id="visa-free-destinations">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>VISA FREE DESTINATIONS</h2>
          
          <div className={styles.navControls}>
            <button
              type="button"
              className={styles.arrowButton}
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous visa free destinations"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              className={styles.arrowButton}
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Next visa free destinations"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        <div
          className={styles.track}
          ref={trackRef}
          onScroll={updateScrollState}
        >
          {visaFreeList.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              className={styles.tile}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={item.image}
                  alt={`${item.name} visa free destination`}
                  fill
                  sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 240px"
                  quality={80}
                  className={styles.image}
                />
                <div className={styles.overlay} />
              </div>

              <div className={styles.content}>
                <span className={styles.tagline}>{item.tagline}</span>
                <h3 className={styles.name}>{item.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
