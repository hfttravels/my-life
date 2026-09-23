"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import styles from "./VideoBannerSlideshow.module.css";

interface VideoSlide {
  id: string;
  destination: string;
  superTagline: string;
  scriptTitle: string;
  subTagline: string;
  price: string;
  duration: string;
  videoUrl: string;
  posterUrl: string;
  url: string;
}

const videoSlides: VideoSlide[] = [
  {
    id: "new-zealand",
    destination: "New Zealand",
    superTagline: "BEYOND THE ORDINARY",
    scriptTitle: "New Zealand",
    subTagline: "For Those Who Dream Bigger",
    price: "INR ₹269990/-",
    duration: "10N-11D",
    videoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Driving_from_Blenheim_to_Havelock_in_the_Marlborough_Region_of_New_Zealand.webm",
    posterUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80",
    url: "/destination/new-zealand",
  },
  {
    id: "switzerland",
    destination: "Switzerland",
    superTagline: "ALPINE MAJESTY",
    scriptTitle: "Switzerland",
    subTagline: "Where Every Vista Is A Postcard",
    price: "INR ₹189990/-",
    duration: "7N-8D",
    videoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/72/Landwasserviadukt%2C_aerial_video.webm",
    posterUrl: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1600&q=80",
    url: "/destination/europe",
  },
  {
    id: "bali",
    destination: "Bali",
    superTagline: "TROPICAL BLISS",
    scriptTitle: "Bali",
    subTagline: "Sunsets, Temples & Island Magic",
    price: "INR ₹42990/-",
    duration: "6N-7D",
    videoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Aerial_views_of_Lovina_Beach%2C_Bali%2C_Indonesia.webm",
    posterUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80",
    url: "/destination/bali",
  },
  {
    id: "thailand",
    destination: "Thailand",
    superTagline: "THE KINGDOM OF WONDERS",
    scriptTitle: "Thailand",
    subTagline: "Golden Temples & Turquoise Waters",
    price: "INR ₹34990/-",
    duration: "6N-7D",
    videoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Drone_footage_of_temple_in_Chiang_Mai%2C_Thailand.webm",
    posterUrl: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1600&q=80",
    url: "/destination/thailand",
  },
  {
    id: "spiti",
    destination: "Spiti Valley",
    superTagline: "THE UNTAMED HIGHLANDS",
    scriptTitle: "Spiti Valley",
    subTagline: "Road Trips Above The Clouds",
    price: "INR ₹16499/-",
    duration: "8N-9D",
    videoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Solis_Viaduct%2C_Schinschlucht_and_Solis_dam%2C_aerial_video.webm",
    posterUrl: "/images/spiti/spiti-hero.jpg",
    url: "/destination/spiti/spiti-valley-tour-packages",
  },
  {
    id: "norway",
    destination: "Norway",
    superTagline: "LAND OF THE MIDNIGHT SUN",
    scriptTitle: "Norway",
    subTagline: "Chasing Aurora & Majestic Fjords",
    price: "INR ₹219990/-",
    duration: "8N-9D",
    videoUrl: "https://upload.wikimedia.org/wikipedia/commons/8/80/Aerial_imagery_of_fjords_and_rivers_in_Arctic_Norway.webm",
    posterUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
    url: "/destination/europe",
  },
];

export default function VideoBannerSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % videoSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + videoSlides.length) % videoSlides.length);
  }, []);

  // Auto-play slideshow every 6.5s unless hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 6500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Play current active video, pause others
  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return;
      if (idx === currentIndex) {
        vid.currentTime = 0;
        vid.play().catch(() => {});
      } else {
        vid.pause();
      }
    });
  }, [currentIndex]);

  const currentSlide = videoSlides[currentIndex];

  return (
    <section className={styles.section} id="panoramic-banner">
      <div className={styles.container}>
        <div
          className={styles.bannerWrapper}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main Clickable Area Redirecting to Destination */}
          <Link
            href={currentSlide.url}
            className={styles.bannerLink}
            aria-label={`View packages for ${currentSlide.destination}`}
          >
            {/* Background Videos for all 6 slides */}
            {videoSlides.map((slide, idx) => (
              <div
                key={slide.id}
                className={`${styles.videoContainer} ${idx === currentIndex ? styles.activeVideo : styles.inactiveVideo}`}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[idx] = el;
                  }}
                  src={slide.videoUrl}
                  poster={slide.posterUrl}
                  muted
                  loop
                  playsInline
                  className={styles.video}
                />
              </div>
            ))}

            {/* Gradient Overlay for Text Readability */}
            <div className={styles.gradientOverlay} />

            {/* Content exactly matching the screenshot layout */}
            <div className={styles.content}>
              <span className={styles.superTagline}>{currentSlide.superTagline}</span>
              <h2 className={styles.scriptTitle}>{currentSlide.scriptTitle}</h2>
              <p className={styles.subTagline}>{currentSlide.subTagline}</p>

              {/* Framed Starting Price Box */}
              <div className={styles.priceBox}>
                <span className={styles.topBadge}>STARTING PRICE</span>
                <div className={styles.priceRow}>
                  <span className={styles.priceText}>{currentSlide.price}</span>
                  <span className={styles.perPerson}>Per Person</span>
                </div>
                <span className={styles.bottomBadge}>{currentSlide.duration}</span>
              </div>
            </div>
          </Link>

          {/* Left Arrow Button */}
          <button
            type="button"
            className={`${styles.arrowBtn} ${styles.prevBtn}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              prevSlide();
            }}
            aria-label="Previous destination video"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            className={`${styles.arrowBtn} ${styles.nextBtn}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              nextSlide();
            }}
            aria-label="Next destination video"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Slide Indicator Dots */}
          <div className={styles.indicators}>
            {videoSlides.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                className={`${styles.dot} ${idx === currentIndex ? styles.activeDot : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                aria-label={`Slide to ${s.destination}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
