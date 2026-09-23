import React from 'react';
import Image from 'next/image';
import styles from './Banner.module.css';

// Using placeholder images. Replace these URLs with your actual destination images.
const destinations = [
  { name: 'SRI LANKA', img: '/dest-beach.jpg' },
  { name: 'BALI', img: '/dest-beach.jpg' },
  { name: 'BHUTAN', img: '/dest-mountain.jpg' },
  { name: 'THAILAND', img: '/dest-beach.jpg' },
  { name: 'VIETNAM', img: '/dest-jungle.jpg' },
  { name: 'EUROPE', img: '/dest-mountain.jpg' },
  { name: 'ANDAMAN', img: '/dest-beach.jpg' },
  { name: 'SPITI VALLEY', img: '/images/spiti/spiti-hero.jpg' },
  { name: 'MEGHALAYA', img: '/dest-jungle.jpg' },
  { name: 'JAPAN', img: '/dest-jungle.jpg' },
  { name: 'GEORGIA', img: '/dest-mountain.jpg' },
];

const Banner = () => {
  return (
    <div className={styles.campaignBanner}>
      {/* 1. Header Section */}
      <div className={styles.bannerHeader}>
        <div className={styles.logoPlaceholder}>
          <span className={styles.brandName}>Hassle Free Travels</span>
          <h1 className={styles.campaignTitle}>
            <span className={styles.christmas}>CHRISTMAS</span>
            <span className={styles.ampersand}>&</span>
            <span className={styles.newYear}>New Year</span>
          </h1>
          <span className={styles.saleTag}>SALE</span>
        </div>
      </div>

      {/* 2. Infinite Marquee Carousel Section */}
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrack}>
          {/* We render the list twice to create a seamless infinite loop */}
          {[...destinations, ...destinations].map((dest, index) => (
            <div className={styles.destinationCard} key={index}>
              <div className={styles.cardImageWrapper}>
                <Image
                  src={dest.img}
                  alt={dest.name}
                  fill
                  sizes="140px"
                />
              </div>
              <span className={styles.destinationName}>{dest.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Footer Badge Section */}
      <div className={styles.bannerFooter}>
        <div className={styles.discountBadge}>
          UP TO ₹10K OFF
        </div>
      </div>
    </div>
  );
};

export default Banner;
