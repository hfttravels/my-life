"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./JourneyInFrames.module.css";

export interface JourneyFrame {
  id: string;
  name: string;
  badge: string;
  image: string;
  url: string;
}

const framesData: JourneyFrame[] = [
  {
    id: "vietnam",
    name: "Vietnam",
    badge: "Vietnam",
    image: "/images/journey/vietnam.jpg",
    url: "/destination/vietnam",
  },
  {
    id: "dubai",
    name: "Dubai",
    badge: "Dubai",
    image: "/images/journey/dubai.jpg",
    url: "/destination/dubai",
  },
  {
    id: "bhutan",
    name: "Bhutan",
    badge: "Bhutan",
    image: "/images/journey/bhutan.jpg",
    url: "/destination/bhutan",
  },
  {
    id: "kerala",
    name: "Kerala",
    badge: "Kerala",
    image: "/images/journey/kerala.jpg",
    url: "/destination/kerala",
  },
  {
    id: "meghalaya",
    name: "Meghalaya",
    badge: "Meghalaya",
    image: "/images/journey/meghalaya.jpg",
    url: "/destination/meghalaya",
  },
  {
    id: "uttarakhand",
    name: "Uttarakhand",
    badge: "Uttarakhand",
    image: "/images/journey/uttarakhand.jpg",
    url: "/destination/uttarakhand",
  },
  {
    id: "bali",
    name: "Bali",
    badge: "Bali",
    image: "/images/journey/bali.jpg",
    url: "/destination/bali",
  },
  {
    id: "spiti",
    name: "Spiti",
    badge: "Spiti",
    image: "/images/journey/spiti.jpg",
    url: "/destination/spiti/spiti-valley-tour-packages",
  },
  {
    id: "ladakh",
    name: "Ladakh",
    badge: "Ladakh",
    image: "/images/journey/ladakh.jpg",
    url: "/destination/ladakh",
  },
];

export default function JourneyInFrames() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Drag-to-scroll state to ensure drag works without triggering link clicks
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);
  const dragThreshold = 8; // pixels moved before considering it a swipe/drag

  const updateScrollButtons = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [updateScrollButtons]);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const tileWidth = 260;
    const amount = direction === "left" ? -tileWidth * 1.5 : tileWidth * 1.5;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  // Mouse Drag handlers
  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsPointerDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollStart(scrollRef.current.scrollLeft);
    setHasDragged(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isPointerDown || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    if (Math.abs(walk) > dragThreshold) {
      setHasDragged(true);
    }
    scrollRef.current.scrollLeft = scrollStart - walk;
  };

  const onMouseUpOrLeave = () => {
    setIsPointerDown(false);
    // Keep hasDragged true for 50ms so an in-flight click event is canceled
    setTimeout(() => {
      setHasDragged(false);
    }, 60);
  };

  return (
    <section className={styles.section} id="journey-in-frames">
      {/* SVG Definition for the panoramic curved arch */}
      <svg width="0" height="0" className={styles.svgClip}>
        <defs>
          <clipPath id="journeyArchClip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 Q 0.5,0.06 1,0 L 1,1 Q 0.5,0.94 0,1 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className={styles.header}>
        <h2 className={styles.title}>JOURNEY IN FRAMES</h2>
        <div className={styles.yellowBar} />
        <p className={styles.subtitle}>Pictures Perfect Moments</p>
      </div>

      <div className={styles.carouselContainer}>
        {/* Navigation Arrows */}
        <button
          type="button"
          className={`${styles.arrowBtn} ${styles.prevBtn} ${!canScrollLeft ? styles.disabledBtn : ""}`}
          onClick={() => handleScroll("left")}
          aria-label="Previous journey frames"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          type="button"
          className={`${styles.arrowBtn} ${styles.nextBtn} ${!canScrollRight ? styles.disabledBtn : ""}`}
          onClick={() => handleScroll("right")}
          aria-label="Next journey frames"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Curved Track Viewport */}
        <div
          ref={scrollRef}
          className={`${styles.scrollTrack} ${isPointerDown ? styles.isDragging : ""}`}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUpOrLeave}
          onMouseLeave={onMouseUpOrLeave}
        >
          <div className={styles.framesGrid}>
            {framesData.map((frame, index) => (
              <Link
                key={frame.id}
                href={frame.url}
                className={styles.frameCard}
                onClick={(e) => {
                  if (hasDragged) {
                    e.preventDefault();
                  }
                }}
                draggable={false}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={frame.image}
                    alt={`${frame.name} travel moments with Hassle Free Travels`}
                    fill
                    sizes="(max-width: 768px) 180px, 240px"
                    className={styles.image}
                    draggable={false}
                    priority={index < 4}
                  />
                  <div className={styles.cardGradient} />

                  {/* Destination Location Pill */}
                  <div className={styles.pillBadge}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.pinIcon}
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{frame.badge}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
