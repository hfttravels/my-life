"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "./ReviewsSection.module.css";

export interface ReviewItem {
  id: string;
  name: string;
  image: string;
  rating: number;
  text: string;
  shortText: string;
}

const reviewsData: ReviewItem[] = [
  {
    id: "review-1",
    name: "Yash",
    image: "/images/reviews/review-1.jpg",
    rating: 5,
    text: "The trip was well-planned and perfectly executed. Great coordination, smooth travel, comfortable stay, and beautiful locations. Every moment was enjoyable and stress-free. Highly recommended for anyone looking for a professional and memorable travel experience.",
    shortText: "The trip was well-planned and perfectly executed. Great coordination, smooth travel, comfortable stay, and beautiful locations. Every moment was enjoyable and stress-free. Highly recommended for anyone looking for a professional and memorable travel experience",
  },
  {
    id: "review-2",
    name: "Dishant Soni",
    image: "/images/reviews/review-2.jpg",
    rating: 5,
    text: "Breathtaking Spiti – A Journey to Remember Just returned from an incredible trip to Spiti Valley, and it was everything I hoped for and more. The landscapes were absolutely surreal – from high mountain passes to ancient monasteries and serene villages, every moment felt like a postcard come to life.",
    shortText: "Breathtaking Spiti – A Journey to Remember Just returned from an incredible trip to Spiti Valley, and it was everything I hoped for and more. The landscapes were absolutely surreal – from high mountain passes to ancient monasteries and serene villages, every moment felt like a postcard come to life.",
  },
  {
    id: "review-3",
    name: "suleman ahmad",
    image: "/images/reviews/review-3.jpg",
    rating: 5,
    text: "An Unforgettable Experience! I recently went on a trip to Meghalaya with Hassle Free Travels and it was truly one of the best experiences I've ever had. From the moment I arrived, the Captain Masoom Raza was incredibly welcoming and supportive he handled the trip very well so that everything can be on time, also the team was always attentive.",
    shortText: "An Unforgettable Experience! I recently went on a trip to meghalaya with Hassle Free Travels and it was truly one of the best experiences I've ever had. From the moment I arrived, the Captain \"Masoom Raza\" was incredibly welcoming and supportive he handled the trip very well so that everything can be on time, also th",
  },
  {
    id: "review-4",
    name: "Virender Singh",
    image: "/images/reviews/review-4.jpg",
    rating: 5,
    text: "I recently booked my vacation through Hassle Free Travels, and I must say, it was one of the best travel experiences I've had! From the moment I reached out, their team was super responsive and helpful. They listened to all my preferences and curated an itinerary that perfectly matched what I was looking for. The trip was pure joy.",
    shortText: "I recently booked my vacation through Hassle Free Travels, and I must say, it was one of the best travel experiences I've had! From the moment I reached out, their team was super responsive and helpful. They listened to all my preferences and curated an itinerary that perfectly matched what I was looking for. The trip w",
  },
  {
    id: "review-5",
    name: "Pooja Sharma",
    image: "/images/reviews/review-5.jpg",
    rating: 5,
    text: "Our Bali trip was pure magic! From the private villa stays in Ubud to the sunset beach clubs in Seminyak and the Nusa Penida day tour, every detail was flawlessly arranged. Hassle Free Travels took all the stress out of our international vacation. Can't wait for the next one!",
    shortText: "Our Bali trip was pure magic! From the private villa stays in Ubud to the sunset beach clubs in Seminyak and the Nusa Penida day tour, every detail was flawlessly arranged. Hassle Free Travels took all the stress out of our international vacation.",
  },
  {
    id: "review-6",
    name: "Rohan Mehta",
    image: "/images/reviews/review-6.jpg",
    rating: 5,
    text: "Exploring Vietnam with Hassle Free Travels was phenomenal! The overnight cruise in Ha Long Bay, street food walking tour in Hanoi, and lanterns in Hoi An were unforgettable. The local guides were punctual, fluent, and courteous throughout the entire trip.",
    shortText: "Exploring Vietnam with Hassle Free Travels was phenomenal! The overnight cruise in Ha Long Bay, street food walking tour in Hanoi, and lanterns in Hoi An were unforgettable. The local guides were punctual, fluent, and courteous throughout the entire trip.",
  },
  {
    id: "review-7",
    name: "Ananya Gupta",
    image: "/images/reviews/review-7.jpg",
    rating: 5,
    text: "The Kerala backwaters and Munnar tea hills tour exceeded our expectations in every single way. The luxury houseboat in Alleppey with freshly prepared traditional Kerala meals was heaven on earth. Outstanding customer support from booking to the final drop-off.",
    shortText: "The Kerala backwaters and Munnar tea hills tour exceeded our expectations in every single way. The luxury houseboat in Alleppey with freshly prepared traditional Kerala meals was heaven on earth. Outstanding customer support from booking to the final drop-off.",
  },
  {
    id: "review-8",
    name: "Kunal Verma",
    image: "/images/reviews/review-8.jpg",
    rating: 5,
    text: "Dubai getaway was an absolute blast! The 4x4 desert dune bashing, VIP Burj Khalifa entry, and Dubai Marina luxury yacht cruise were managed seamlessly. Zero delays, prompt 24/7 WhatsApp assistance throughout. Will definitely book our next tour with them!",
    shortText: "Dubai getaway was an absolute blast! The 4x4 desert dune bashing, VIP Burj Khalifa entry, and Dubai Marina luxury yacht cruise were managed seamlessly. Zero delays, prompt 24/7 WhatsApp assistance throughout. Will definitely book our next tour with them!",
  },
];

export default function ReviewsSection() {
  const [activePage, setActivePage] = useState<0 | 1>(0);
  const [selectedReview, setSelectedReview] = useState<ReviewItem | null>(null);

  // Swipe gesture handling
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [mouseStartX, setMouseStartX] = useState<number | null>(null);

  const totalPages = 2; // Page 0 (reviews 1-4), Page 1 (reviews 5-8)

  const handleNext = useCallback(() => {
    setActivePage((prev) => (prev === 0 ? 1 : 0));
  }, []);

  const handlePrev = useCallback(() => {
    setActivePage((prev) => (prev === 1 ? 0 : 1));
  }, []);

  // Touch Swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (diff < -50) {
      // Swiped Left -> go to page 1
      setActivePage(1);
    } else if (diff > 50) {
      // Swiped Right -> go to page 0
      setActivePage(0);
    }
    setTouchStartX(null);
  };

  // Mouse Drag
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setMouseStartX(e.clientX);
  };

  const onMouseUp = (e: React.MouseEvent) => {
    if (!isDragging || mouseStartX === null) return;
    const diff = e.clientX - mouseStartX;
    if (diff < -50) {
      setActivePage(1);
    } else if (diff > 50) {
      setActivePage(0);
    }
    setIsDragging(false);
    setMouseStartX(null);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
    setMouseStartX(null);
  };

  // Group into 2 pages of 4 items each
  const pages = [
    reviewsData.slice(0, 4),
    reviewsData.slice(4, 8),
  ];

  return (
    <section className={styles.section} id="traveller-reviews">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.headerRow}>
          <h2 className={styles.title}>Reviews From Our Travellers</h2>
          
          {/* Top navigation arrows */}
          <div className={styles.navControls}>
            <button
              type="button"
              className={`${styles.navBtn} ${activePage === 0 ? styles.navBtnDisabled : ""}`}
              onClick={handlePrev}
              aria-label="Previous reviews"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              className={`${styles.navBtn} ${activePage === 1 ? styles.navBtnDisabled : ""}`}
              onClick={handleNext}
              aria-label="Next reviews"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Slider with 4 in front and rest 4 after swipe */}
        <div
          ref={containerRef}
          className={styles.carouselWrapper}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
        >
          <div
            className={styles.sliderTrack}
            style={{
              transform: `translateX(-${activePage * 100}%)`,
            }}
          >
            {pages.map((pageReviews, pageIndex) => (
              <div key={pageIndex} className={styles.pageGrid}>
                {pageReviews.map((review) => (
                  <div key={review.id} className={styles.reviewCard}>
                    {/* Left: Traveler Photo */}
                    <div className={styles.imageWrapper}>
                      <Image
                        src={review.image}
                        alt={`${review.name}'s trip review`}
                        fill
                        sizes="(max-width: 768px) 130px, 160px"
                        className={styles.image}
                        draggable={false}
                      />
                    </div>

                    {/* Right: Content */}
                    <div className={styles.content}>
                      {/* 5 Amber/Gold Stars */}
                      <div className={styles.starsRow}>
                        {[...Array(review.rating)].map((_, i) => (
                          <span key={i} className={styles.star}>★</span>
                        ))}
                      </div>

                      {/* Review Text */}
                      <p className={styles.reviewText}>
                        {review.shortText}{" "}
                        <button
                          type="button"
                          className={styles.readMoreBtn}
                          onClick={() => setSelectedReview(review)}
                        >
                          Read more...
                        </button>
                      </p>

                      {/* Reviewer Name */}
                      <div className={styles.authorRow}>
                        <span className={styles.authorName}>{review.name}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className={styles.paginationDots}>
          {[0, 1].map((idx) => (
            <button
              key={idx}
              type="button"
              className={`${styles.dot} ${activePage === idx ? styles.activeDot : ""}`}
              onClick={() => setActivePage(idx as 0 | 1)}
              aria-label={`Go to review page ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Read More Modal */}
      {selectedReview && (
        <div className={styles.modalOverlay} onClick={() => setSelectedReview(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setSelectedReview(null)}
              aria-label="Close review"
            >
              ✕
            </button>
            <div className={styles.modalBody}>
              <div className={styles.modalImageWrapper}>
                <Image
                  src={selectedReview.image}
                  alt={selectedReview.name}
                  fill
                  className={styles.image}
                />
              </div>
              <div className={styles.modalTextContent}>
                <div className={styles.starsRow}>
                  {[...Array(selectedReview.rating)].map((_, i) => (
                    <span key={i} className={styles.star}>★</span>
                  ))}
                </div>
                <h3 className={styles.modalAuthorName}>{selectedReview.name}</h3>
                <p className={styles.modalFullText}>{selectedReview.text}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
