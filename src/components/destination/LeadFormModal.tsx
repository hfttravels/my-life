"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./DestinationModals.module.css";
import { TourPackage } from "@/data/destinations";

interface LeadFormModalProps {
  pkg?: (TourPackage | { id?: string; title: string; slug?: string }) | null;
  destinationName?: string;
  destinationSlug?: string;
  destinationId?: string;
  packageSlug?: string;
  packageId?: string;
  onClose: () => void;
}

export default function LeadFormModal({
  pkg,
  destinationName = "your chosen destination",
  destinationSlug = "",
  destinationId = "",
  packageSlug = "",
  packageId = "",
  onClose,
}: LeadFormModalProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [departureCity, setDepartureCity] = useState("Delhi");
  const [travelMonth, setTravelMonth] = useState("May - June 2026");
  const [travelers, setTravelers] = useState("2");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Honeypot field — invisible to real users, bots fill it
  const [website, setWebsite] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const targetPkgSlug = packageSlug || (pkg as { slug?: string })?.slug || "";
  const targetPkgId = packageId || (pkg as { id?: string })?.id || undefined;
  const numTravelers = parseInt(travelers, 10) || 2;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const { getVisitorId, getSessionId, getUtmParameters } = await import("@/lib/analytics/tracker");
      const utms = getUtmParameters();
      const visitorId = getVisitorId();
      const sessionId = getSessionId();

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email: email || undefined,
          destination: destinationName,
          destinationSlug: destinationSlug || undefined,
          destinationId: destinationId || undefined,
          packageId: targetPkgId,
          packageSlug: targetPkgSlug || undefined,
          departureCity: departureCity || undefined,
          travelDate: travelMonth,
          paxAdults: numTravelers,
          tripType: "custom",
          source: targetPkgSlug ? "package_page" : "modal",
          message: `Departure: ${departureCity}, Travelers: ${travelers}${
            pkg ? `, Package: ${pkg.title}` : ""
          }`,
          sourcePage: typeof window !== "undefined" ? window.location.pathname : "",
          visitorId,
          sessionId,
          utmSource: utms['utm_source'],
          utmMedium: utms['utm_medium'],
          utmCampaign: utms['utm_campaign'],
          utmTerm: utms['utm_term'],
          utmContent: utms['utm_content'],
          website, // honeypot
        }),
      });

      const data = await res.json();

      if (data.success) {
        // Fire dataLayer event for Google Ads / GA4
        if (typeof window !== "undefined" && "dataLayer" in window) {
          (window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer.push({
            event: "lead_submitted",
            destination: destinationName,
            package: targetPkgSlug || undefined,
            source: "modal",
          });
        }

        // Redirect to thank-you page
        const destParam = destinationSlug || destinationName?.toLowerCase().replace(/\s+/g, "-") || "";
        const queryParams = new URLSearchParams();
        if (destParam) queryParams.set("destination", destParam);
        if (targetPkgSlug) queryParams.set("package", targetPkgSlug);
        if (name) queryParams.set("name", name);
        router.push(`/thank-you?${queryParams.toString()}`);
      } else {
        setError(data.error || "Something went wrong. Please try again or WhatsApp us.");
      }
    } catch {
      setError("Network error. Please check your connection or WhatsApp us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918375030889";
  const whatsappTarget = targetPkgSlug || destinationName;
  const whatsappMessage = `Hi Hassle Free Travels! I'm ${name || "interested"} and want to know about ${whatsappTarget} tour packages.${
    travelMonth ? ` Preferred travel: ${travelMonth}.` : ""
  }`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.formModalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.formHeader}>
          <button
            className={styles.closeButton}
            onClick={onClose}
            style={{ position: "absolute", right: "20px", top: "20px" }}
            aria-label="Close"
          >
            ✕
          </button>
          <h3>Get Custom Itinerary &amp; Quote</h3>
          <p>
            {pkg
              ? `Inquiring for: ${pkg.title}`
              : `Plan your customized ${destinationName} journey with Hassle Free Travels`}
          </p>
        </div>

        <form className={styles.leadForm} onSubmit={handleSubmit}>
          {/* Honeypot — hidden from humans, bots fill it */}
          <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
            <label htmlFor="lead-website">Website</label>
            <input
              id="lead-website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lead-name">Your Full Name *</label>
            <input
              id="lead-name"
              type="text"
              required
              className={styles.formInput}
              placeholder="e.g. Rahul Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="lead-phone">Phone Number (WhatsApp) *</label>
              <input
                id="lead-phone"
                type="tel"
                required
                className={styles.formInput}
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lead-email">Email Address</label>
              <input
                id="lead-email"
                type="email"
                className={styles.formInput}
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="lead-city">Departure City</label>
              <select
                id="lead-city"
                className={styles.formSelect}
                value={departureCity}
                onChange={(e) => setDepartureCity(e.target.value)}
              >
                <option value="Delhi">Delhi NCR</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bangalore">Bengaluru</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Chennai">Chennai</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Pune">Pune</option>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Other">Other City</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="lead-travelers">Number of Travelers</label>
              <select
                id="lead-travelers"
                className={styles.formSelect}
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
              >
                <option value="1 (Solo)">1 Traveler (Solo)</option>
                <option value="2">2 Travelers (Couple / Friends)</option>
                <option value="3-5">3 - 5 Travelers (Family / Group)</option>
                <option value="6+">6+ Travelers (Large Group / Corporate)</option>
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lead-month">Tentative Month of Travel</label>
            <select
              id="lead-month"
              className={styles.formSelect}
              value={travelMonth}
              onChange={(e) => setTravelMonth(e.target.value)}
            >
              <option value="April - May 2026">April - May 2026 (Spring / Summer)</option>
              <option value="June 2026">June 2026 (School Holidays / Coolcation)</option>
              <option value="July - August 2026">July - August 2026 (Monsoon Escapes)</option>
              <option value="September - October 2026">September - October 2026 (Festive Long Weekends)</option>
              <option value="November - December 2026">November - December 2026 (Diwali &amp; New Year)</option>
              <option value="Flexible 2026">Flexible / Need Expert Suggestion</option>
            </select>
          </div>

          {error && (
            <div style={{
              padding: "12px 16px",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "8px",
              color: "#dc2626",
              fontSize: "0.88rem",
              lineHeight: 1.5,
            }}>
              {error}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginLeft: "8px",
                  color: "#25D366",
                  fontWeight: 600,
                  textDecoration: "underline",
                }}
              >
                WhatsApp us →
              </a>
            </div>
          )}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
            style={isSubmitting ? { opacity: 0.7, cursor: "not-allowed" } : {}}
          >
            {isSubmitting ? "Sending..." : `Request Free WhatsApp Itinerary & Quote ➔`}
          </button>
          <p className={styles.privacyText}>
            🔒 100% Privacy Guaranteed. Instant WhatsApp callback. Zero booking pressure.
          </p>
        </form>
      </div>
    </div>
  );
}
