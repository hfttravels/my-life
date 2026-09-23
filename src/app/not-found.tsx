import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Hassle Free Travels",
  description: "The page you are looking for does not exist. Browse our destinations or contact us for help planning your trip.",
};

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918375030889";

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "100px 20px 60px",
          background: "linear-gradient(180deg, #f0fdfa 0%, #ffffff 60%)",
        }}
      >
        <div style={{ maxWidth: "560px", width: "100%", textAlign: "center" }}>
          {/* 404 Badge */}
          <div
            style={{
              fontSize: "5rem",
              fontWeight: 800,
              color: "#00A896",
              lineHeight: 1,
              marginBottom: "8px",
              letterSpacing: "-2px",
              opacity: 0.15,
            }}
          >
            404
          </div>

          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #F4A261, #E76F51)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "-20px auto 20px",
              fontSize: "1.8rem",
              boxShadow: "0 8px 20px rgba(244, 162, 97, 0.3)",
            }}
          >
            🧭
          </div>

          <h1
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              fontWeight: 800,
              color: "#0f172a",
              marginBottom: "12px",
            }}
          >
            This Page Took a Wrong Turn
          </h1>

          <p
            style={{
              fontSize: "1rem",
              color: "#475569",
              lineHeight: 1.65,
              marginBottom: "32px",
            }}
          >
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on the right trail.
          </p>

          {/* Navigation Links */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              justifyContent: "center",
              marginBottom: "24px",
            }}
          >
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "linear-gradient(135deg, #00A896, #028090)",
                color: "#fff",
                padding: "14px 28px",
                borderRadius: "12px",
                fontWeight: 700,
                fontSize: "0.95rem",
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(0, 168, 150, 0.3)",
              }}
            >
              🏠 Back to Home
            </Link>

            <Link
              href="/#destinations"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#05668D",
                color: "#fff",
                padding: "14px 28px",
                borderRadius: "12px",
                fontWeight: 700,
                fontSize: "0.95rem",
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(5, 102, 141, 0.3)",
              }}
            >
              🌍 Explore Destinations
            </Link>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              justifyContent: "center",
              fontSize: "0.9rem",
            }}
          >
            <Link
              href="/india-trips/spiti-valley-tour-packages"
              style={{ color: "#00A896", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "3px" }}
            >
              Spiti Valley Packages
            </Link>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi! I need help finding a page on your website.")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#25D366", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "3px" }}
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
