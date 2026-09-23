"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logoLink}>
          <Image
            src="/images/brand/logo-horizontal.png"
            alt="Hassle Free Travels"
            className={styles.logoImg}
            width={220}
            height={110}
            priority
          />
        </Link>
        
        <nav className={styles.nav}>
          <Link href="/#destinations" className={styles.navLink}>Destinations</Link>
          <Link href="/tours/spiti-valley-tour-packages" className={styles.navLink}>
            Spiti Valley <span style={{ fontSize: "0.7rem", background: "var(--secondary)", color: "#fff", padding: "1px 6px", borderRadius: "4px", marginLeft: "4px", verticalAlign: "middle" }}>HOT</span>
          </Link>
          <Link href="/#tours" className={styles.navLink}>Tours</Link>
          <Link href="/blogs" className={styles.navLink}>Blogs</Link>
          <Link href="/#about" className={styles.navLink}>About Us</Link>
          <Link href="/#contact" className={styles.navLink}>Contact</Link>
        </nav>

        
        <div className={styles.actions}>
          <Link href="/#destinations" className="btn-primary">Book Now</Link>
        </div>
      </div>
    </header>
  );
}
