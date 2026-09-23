"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ThankYouClientProps {
  destinationName: string;
  destinationSlug: string;
  userName: string;
  relatedDestinations: { id: string; name: string; tagline: string }[];
}

export default function ThankYouClient({
  destinationName,
  userName,
  relatedDestinations,
}: ThankYouClientProps) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918375030889";
  const whatsappMessage = `Hi Hassle Free Travels! I just submitted an enquiry${
    destinationName ? ` for ${destinationName}` : ""
  }. Looking forward to hearing from you!`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  useEffect(() => {
    // GA4 / dataLayer conversion event
    if (typeof window !== "undefined" && "dataLayer" in window) {
      (window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer.push({
        event: "generate_lead",
        destination: destinationName || "unknown",
        source: "thank_you_page",
      });
    }

    // Meta Pixel Lead event (if pixel loaded)
    if (typeof window !== "undefined" && "fbq" in window) {
      (window as unknown as { fbq: (...args: unknown[]) => void }).fbq(
        "track",
        "Lead",
        { content_name: destinationName || "General Enquiry" }
      );
    }
  }, [destinationName]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #f0fdfa 0%, #ffffff 50%)",
          padding: "80px 20px 60px",
        }}
      >
        <div style={{ maxWidth: "680px", width: "100%", textAlign: "center" }}>
          {/* Success Icon */}
          <div
            style={{
              width: "88px",
              height: "88px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #00A896, #028090)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              fontSize: "2.5rem",
              color: "#fff",
              boxShadow: "0 12px 30px rgba(0, 168, 150, 0.3)",
            }}
          >
            ✓
          </div>

          <h1
            style={{
              fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
              fontWeight: 800,
              color: "#0f172a",
              marginBottom: "12px",
              lineHeight: 1.2,
            }}
          >
            {userName ? `Thank You, ${userName}!` : "Thank You!"}
          </h1>

          <p
            style={{
              fontSize: "1.05rem",
              color: "#475569",
              lineHeight: 1.65,
              maxWidth: "520px",
              margin: "0 auto 32px",
            }}
          >
            Your{destinationName ? ` ${destinationName}` : ""} travel enquiry has been received.
            Our destination specialist will reach you within{" "}
            <strong style={{ color: "#00A896" }}>15 minutes</strong> via WhatsApp or call with
            a personalized itinerary and best-price quote.
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              justifyContent: "center",
              marginBottom: "48px",
            }}
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#25D366",
                color: "#fff",
                padding: "14px 28px",
                borderRadius: "12px",
                fontWeight: 700,
                fontSize: "1rem",
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(37, 211, 102, 0.35)",
                transition: "all 0.2s ease",
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>📱</span>
              Chat on WhatsApp
            </a>

            <a
              href={`tel:+${whatsappNumber}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#05668D",
                color: "#fff",
                padding: "14px 28px",
                borderRadius: "12px",
                fontWeight: 700,
                fontSize: "1rem",
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(5, 102, 141, 0.3)",
                transition: "all 0.2s ease",
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>📞</span>
              Call Us Now
            </a>
          </div>

          {/* Related Destinations */}
          {relatedDestinations.length > 0 && (
            <div style={{ marginBottom: "32px" }}>
              <h2
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: "#0f172a",
                  marginBottom: "16px",
                }}
              >
                Explore More Destinations
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "12px",
                }}
              >
                {relatedDestinations.map((d) => (
                  <Link
                    key={d.id}
                    href={`/destination/${d.id}`}
                    style={{
                      display: "block",
                      padding: "16px",
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "1rem" }}>
                      {d.name}
                    </div>
                    <div
                      style={{
                        fontSize: "0.82rem",
                        color: "#64748b",
                        marginTop: "4px",
                        lineHeight: 1.4,
                      }}
                    >
                      {d.tagline.length > 60 ? d.tagline.slice(0, 60) + "…" : d.tagline}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to Home */}
          <Link
            href="/"
            style={{
              color: "#00A896",
              fontWeight: 600,
              fontSize: "0.95rem",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
