"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Footer.module.css";
import Link from "next/link";

export default function Footer() {
  const [nlEmail, setNlEmail] = useState("");
  const [nlStatus, setNlStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [nlError, setNlError] = useState("");
  // Honeypot
  const [nlWebsite, setNlWebsite] = useState("");

  const handleNewsletterSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!nlEmail) return;
    setNlStatus("sending");
    setNlError("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Newsletter Subscriber",
          phone: "0000000000",
          email: nlEmail,
          sourcePage: "footer-newsletter",
          website: nlWebsite,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setNlStatus("done");
      } else {
        setNlStatus("error");
        setNlError(data.error || "Could not subscribe. Try again.");
      }
    } catch {
      setNlStatus("error");
      setNlError("Network error. Please try again.");
    }
  };

  return (
    <footer className={styles.footer} id="contact">
      <div className={`container ${styles.container}`}>
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <Link href="/">
              <Image
                src="/images/brand/logo-horizontal.png"
                alt="Hassle Free Travels"
                className={styles.footerLogo}
                width={240}
                height={120}
              />
            </Link>
            <p className={styles.description}>
              We unravel your travel. Your trusted partner in creating unforgettable experiences around the globe.
            </p>
            <div className={styles.socials}>
              <Link href="/#destinations" className={styles.socialIcon} aria-label="Explore destinations">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
              </Link>
              <Link href="/blogs" className={styles.socialIcon} aria-label="Read the travel blog">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z"></path></svg>
              </Link>
              <Link href="/#contact" className={styles.socialIcon} aria-label="Contact Hassle Free Travels">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a2 2 0 0 1-2.06 0L2 7"></path></svg>
              </Link>
            </div>
          </div>
          
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Company</h4>
            <ul className={styles.linkList}>
              <li><Link href="/#about">About Us</Link></li>
              <li><Link href="/#destinations">Destinations</Link></li>
              <li><Link href="/blogs">Blog</Link></li>
              <li><Link href="/#contact">Contact</Link></li>
            </ul>
          </div>

          
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Support</h4>
            <ul className={styles.linkList}>
              <li><Link href="/#contact">Help Center</Link></li>
              <li><Link href="/blogs/packing-tips-for-high-altitude-trips">Safety Information</Link></li>
              <li><Link href="/terms">Cancellation Options</Link></li>
            </ul>
          </div>
          
          <div className={styles.newsletterCol}>
            <h4 className={styles.colTitle}>Newsletter</h4>
            <p className={styles.newsletterDesc}>
              {nlStatus === "done"
                ? "You are on the list. Fresh travel ideas are headed your way."
                : "Subscribe for the latest travel news & offers."}
            </p>
            {nlStatus !== "done" && (
              <form className={styles.form} onSubmit={handleNewsletterSubmit}>
                {/* Honeypot */}
                <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
                  <input type="text" tabIndex={-1} autoComplete="off" value={nlWebsite} onChange={(e) => setNlWebsite(e.target.value)} />
                </div>
                <input
                  type="email"
                  placeholder="Email address"
                  className={styles.input}
                  required
                  value={nlEmail}
                  onChange={(e) => setNlEmail(e.target.value)}
                />
                <button type="submit" className={styles.submitBtn} disabled={nlStatus === "sending"}>
                  {nlStatus === "sending" ? "..." : "Subscribe"}
                </button>
              </form>
            )}
            {nlStatus === "error" && nlError && (
              <p style={{ color: "#ef4444", fontSize: "0.78rem", marginTop: "6px" }}>{nlError}</p>
            )}
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Hassle Free Travels. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
