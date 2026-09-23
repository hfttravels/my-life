"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./EnquiryBanner.module.css";
import LeadFormModal from "@/components/destination/LeadFormModal";

export default function EnquiryBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className={styles.section} id="enquiry-banner">
        <div className={styles.container}>
          <div className={styles.banner}>
            {/* Background Image: Aerial turquoise ocean with hand holding phone mockup */}
            <div className={styles.imageWrapper}>
              <Image
                src="/images/enquiry-banner.jpg"
                alt="Plan your next adventure with Hassle Free Travels"
                fill
                priority
                quality={90}
                className={styles.bgImage}
                sizes="(max-width: 1280px) 100vw, 1200px"
              />
              <div className={styles.gradientOverlay} />
            </div>

            {/* Left Content Area matching screenshot */}
            <div className={styles.content}>
              <h2 className={styles.title}>Dreaming of your next Adventure?</h2>
              <p className={styles.subtitle}>Hit us up!</p>
              
              <button
                type="button"
                className={styles.ctaButton}
                onClick={() => setIsModalOpen(true)}
                id="connect-now-btn"
              >
                Connect Now
              </button>
            </div>

            {/* Clickable overlay over right side to also trigger modal */}
            <button
              type="button"
              className={styles.phoneClickArea}
              onClick={() => setIsModalOpen(true)}
              aria-label="Open enquiry form"
            />
          </div>
        </div>
      </section>

      {/* Pop-up Enquiry Form Modal */}
      {isModalOpen && (
        <LeadFormModal
          destinationName="your dream getaway"
          packageSlug="custom-itinerary"
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
