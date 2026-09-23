"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/destination/Destination.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ALL_DESTINATIONS, DestinationData, TourPackage } from "@/data/destinations";
import ItineraryModal from "@/components/destination/ItineraryModal";
import LeadFormModal from "@/components/destination/LeadFormModal";

export interface DbPackageCard {
  id: string;
  slug: string;
  name: string;
  tagline?: string | null;
  nights: number;
  days: number;
  startingPriceInr?: number | null;
  priceNote?: string | null;
  packageType?: string | null;
  categoryLabel?: string | null;
  startCity?: string | null;
  heroImage: string;
  highlights?: string[] | null;
  isFeatured?: boolean;
}

export interface DbBlogPostCard {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category?: string | null;
  readMinutes: number;
  featuredImage?: string | null;
  publishedAt?: string | null;
}

interface DestinationClientProps {
  data: DestinationData;
  dbPackages?: DbPackageCard[];
  dbBlogPosts?: DbBlogPostCard[];
}

export default function DestinationClient({
  data,
  dbPackages,
  dbBlogPosts,
}: DestinationClientProps) {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>("All Packages");
  const [durationFilter, setDurationFilter] = useState<string>("all");
  const [startCityFilter, setStartCityFilter] = useState<string>("all");
  const [selectedItineraryPkg, setSelectedItineraryPkg] = useState<TourPackage | null>(null);
  const [selectedLeadPkg, setSelectedLeadPkg] = useState<TourPackage | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Inline form state
  const [inlineName, setInlineName] = useState("");
  const [inlinePhone, setInlinePhone] = useState("");
  const [inlineSubmitting, setInlineSubmitting] = useState(false);
  const [inlineError, setInlineError] = useState<string | null>(null);
  // Honeypot
  const [inlineWebsite, setInlineWebsite] = useState("");

  const packagesToShow = (dbPackages || []).filter((pkg) => {
    // 1. Duration filter
    let matchesDuration = true;
    if (durationFilter === "short") {
      matchesDuration = pkg.days <= 6;
    } else if (durationFilter === "medium") {
      matchesDuration = pkg.days >= 7 && pkg.days <= 8;
    } else if (durationFilter === "long") {
      matchesDuration = pkg.days >= 9;
    }

    // 2. Category / Type filter
    let matchesCategory = true;
    if (activeCategory && activeCategory !== "All Packages") {
      const catLower = activeCategory.toLowerCase();
      const pkgTypeLower = (pkg.packageType || "").toLowerCase();
      const catLabelLower = (pkg.categoryLabel || "").toLowerCase();
      const nameLower = pkg.name.toLowerCase();
      const taglineLower = (pkg.tagline || "").toLowerCase();

      if (catLower === "group") {
        matchesCategory = pkgTypeLower === "group";
      } else if (catLower === "private") {
        matchesCategory = pkgTypeLower !== "group";
      } else {
        matchesCategory =
          pkgTypeLower === catLower ||
          catLabelLower === catLower ||
          catLabelLower.includes(catLower) ||
          pkgTypeLower.includes(catLower) ||
          nameLower.includes(catLower) ||
          taglineLower.includes(catLower);
      }
    }

    // 3. Start City / Region filter
    let matchesStartCity = true;
    if (startCityFilter && startCityFilter !== "all") {
      const cityLower = startCityFilter.toLowerCase();
      const pkgStartCity = (pkg.startCity || "").toLowerCase();
      const routeLower = (pkg.tagline || "").toLowerCase();
      const catLabelLower = (pkg.categoryLabel || "").toLowerCase();
      const nameLower = pkg.name.toLowerCase();
      const slugLower = pkg.slug.toLowerCase();
      matchesStartCity =
        pkgStartCity.includes(cityLower) ||
        catLabelLower.includes(cityLower) ||
        routeLower.startsWith(cityLower) ||
        routeLower.includes(cityLower) ||
        nameLower.includes(cityLower) ||
        slugLower.includes(cityLower);
    }

    return matchesDuration && matchesCategory && matchesStartCity;
  });

  const handleOpenLead = (pkg?: TourPackage) => {
    setSelectedLeadPkg(pkg || null);
    setIsLeadModalOpen(true);
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918375030889";

  const handleInlineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inlineName || !inlinePhone) return;
    setInlineSubmitting(true);
    setInlineError(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: inlineName,
          phone: inlinePhone,
          destination: data.name,
          destinationSlug: data.id,
          source: "destination_hub_inline",
          sourcePage: typeof window !== "undefined" ? window.location.pathname : "",
          website: inlineWebsite,
        }),
      });

      const result = await res.json();

      if (result.success) {
        if (typeof window !== "undefined" && "dataLayer" in window) {
          (window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer.push({
            event: "lead_submitted",
            destination: data.name,
            source: "inline",
          });
        }
        router.push(`/thank-you?destination=${encodeURIComponent(data.id)}&name=${encodeURIComponent(inlineName)}`);
      } else if (res.status === 503) {
        setInlineError(result.error || "Our system is being set up. Please WhatsApp us.");
      } else {
        setInlineError(result.error || "Something went wrong. Please WhatsApp us.");
      }
    } catch {
      setInlineError("Network error. Please WhatsApp us directly.");
    } finally {
      setInlineSubmitting(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />

      {/* Hero Section */}
      <section
        className={styles.heroSection}
        style={{ backgroundImage: `url('${data.hero.image}')` }}
      >
        <div className={styles.heroOverlay} />
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>{data.hero.badge}</div>
            <h1 className={styles.heroTitle}>{data.hero.title}</h1>
            <p className={styles.heroSubtitle}>{data.hero.subtitle}</p>

            <div className={styles.trustBar}>
              <div className={styles.ratingPill}>{data.hero.ratingText}</div>
              <div className={styles.priceHighlight}>{data.hero.startingPrice}</div>
              <div style={{ color: "#cbd5e1", fontSize: "0.88rem" }}>
                ✓ {data.hero.perks.join(" • ")}
              </div>
            </div>

            <div className={styles.heroCtas}>
              <a href="#packages-section" className={styles.heroPrimaryBtn}>
                Explore Tour Packages ➔
              </a>
              <button
                className={styles.heroSecondaryBtn}
                onClick={() => handleOpenLead()}
              >
                Get Free Custom Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className={styles.breadcrumbBar}>
        <div className="container">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/#destinations">Destinations</Link>
          <span>/</span>
          <span className={styles.breadcrumbActive}>{data.name} Tour Packages</span>
        </div>
      </div>



      {/* Sticky Filter Bar */}

      {data.categories && data.categories.length > 0 && (
        <div className={styles.filterSection}>
          <div className="container">
            <div className={styles.filterControls}>
              <div className={styles.categoryPills}>
                {data.categories.map((cat) => (
                  <button
                    key={cat}
                    className={`${styles.filterPill} ${
                      activeCategory === cat ? styles.activePill : ""
                    }`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
                <select
                  className={styles.filterDurationSelect}
                  value={durationFilter}
                  onChange={(e) => setDurationFilter(e.target.value)}
                  aria-label="Filter by duration"
                >
                  <option value="all">All Durations</option>
                  <option value="short">Short Trips (≤ 6 Days)</option>
                  <option value="medium">Classic Trips (7 - 8 Days)</option>
                  <option value="long">Grand Circuit (9+ Days)</option>
                </select>

                {data.id === "thailand" && (
                  <select
                    className={styles.filterDurationSelect}
                    value={startCityFilter}
                    onChange={(e) => setStartCityFilter(e.target.value)}
                    aria-label="Filter by start city"
                  >
                    <option value="all">All Start Cities</option>
                    <option value="bangkok">Bangkok</option>
                    <option value="chiang mai">Chiang Mai</option>
                    <option value="chiang rai">Chiang Rai</option>
                    <option value="phuket">Phuket</option>
                    <option value="krabi">Krabi</option>
                    <option value="koh samui">Koh Samui</option>
                    <option value="surat thani">Surat Thani</option>
                  </select>
                )}

                {data.id === "japan" && (
                  <select
                    className={styles.filterDurationSelect}
                    value={startCityFilter}
                    onChange={(e) => setStartCityFilter(e.target.value)}
                    aria-label="Filter by start city"
                  >
                    <option value="all">All Start Cities</option>
                    <option value="tokyo">Tokyo</option>
                    <option value="osaka">Osaka</option>
                    <option value="sapporo">Sapporo</option>
                    <option value="naha">Naha</option>
                    <option value="hiroshima">Hiroshima</option>
                  </select>
                )}

                {data.id === "sri-lanka" && (
                  <select
                    className={styles.filterDurationSelect}
                    value={startCityFilter}
                    onChange={(e) => setStartCityFilter(e.target.value)}
                    aria-label="Filter by region or city"
                  >
                    <option value="all">All Regions / Cities</option>
                    <option value="colombo">Colombo</option>
                    <option value="sigiriya">Cultural Triangle / Sigiriya</option>
                    <option value="kandy">Hill Country / Kandy / Ella</option>
                    <option value="galle">South Coast / Galle / Mirissa</option>
                    <option value="trincomalee">East Coast / Trincomalee</option>
                    <option value="jaffna">North / Jaffna</option>
                    <option value="yala">Yala / Wildlife</option>
                  </select>
                )}

                {data.id === "malaysia" && (
                  <select
                    className={styles.filterDurationSelect}
                    value={startCityFilter}
                    onChange={(e) => setStartCityFilter(e.target.value)}
                    aria-label="Filter by region or start city"
                  >
                    <option value="all">All Regions / Start Cities</option>
                    <option value="klia">Kuala Lumpur / KLIA</option>
                    <option value="genting">Genting Highlands</option>
                    <option value="penang">Penang</option>
                    <option value="langkawi">Langkawi</option>
                    <option value="cameron">Cameron Highlands</option>
                    <option value="kinabalu">Sabah / Borneo</option>
                    <option value="kuching">Sarawak / Kuching</option>
                    <option value="singapore">Singapore Combo</option>
                  </select>
                )}

                {data.id === "maldives" && (
                  <select
                    className={styles.filterDurationSelect}
                    value={startCityFilter}
                    onChange={(e) => setStartCityFilter(e.target.value)}
                    aria-label="Filter by island or stay style"
                  >
                    <option value="all">All Islands & Stays</option>
                    <option value="maafushi">Maafushi Island</option>
                    <option value="dhigurah">Dhigurah / South Ari</option>
                    <option value="fulidhoo">Fulidhoo / Vaavu</option>
                    <option value="guraidhoo">Guraidhoo</option>
                    <option value="vaadhoo">Vaadhoo / Sea of Stars</option>
                    <option value="resort">Resort & All-Inclusive</option>
                    <option value="overwater">Overwater Villa</option>
                    <option value="liveaboard">Liveaboard Safari</option>
                  </select>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Packages Grid Section */}
      <section id="packages-section" className={styles.packagesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Curated {data.name} Packages</h2>
              <p className={styles.sectionSubtitle}>
                Handcrafted itineraries with expert guides, handpicked stays &amp; seamless logistics.
              </p>
            </div>
            <div className={styles.packagesCount}>
              Showing <strong>{packagesToShow.length}</strong> available departures
            </div>
          </div>

          <div className={styles.packagesGrid}>
            {packagesToShow.length > 0 ? (
              <>
                {/* Group Packages Section */}
                {packagesToShow.filter(p => p.packageType === "group").length > 0 && (
                  <div style={{ gridColumn: "1 / -1", marginBottom: "1rem" }}>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Fixed Group Departures</h3>
                  </div>
                )}
                {packagesToShow
                  .filter(p => p.packageType === "group")
                  .map((pkg) => (
                    <div key={pkg.id} className={styles.tourCard}>
                      <div className={styles.cardImageWrapper}>
                        <Image
                          src={pkg.heroImage}
                          alt={pkg.name}
                          className={styles.cardImage}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 390px"
                        />
                        <div className={styles.cardBadge}>
                          Group · Fixed Departure
                          {pkg.isFeatured && (
                            <span style={{ background: "#f59e0b", color: "#fff", padding: "2px 6px", borderRadius: "4px", fontSize: "0.7rem", fontWeight: 700, marginLeft: "6px" }}>⭐ FEATURED</span>
                          )}
                        </div>
                        <div className={styles.durationBadge}>⏱️ {pkg.days}D / {pkg.nights}N</div>
                      </div>

                      <div className={styles.cardBody}>
                        <div className={styles.cardTitleRow}>
                          <h3 className={styles.cardTitle}>{pkg.name}</h3>
                        </div>
                        {pkg.tagline && <p className={styles.cardSubtitle}>{pkg.tagline}</p>}

                        {pkg.highlights && pkg.highlights.length > 0 && (
                          <ul className={styles.highlightsList}>
                            {pkg.highlights.slice(0, 3).map((item, idx) => (
                              <li key={idx}>
                                <span>✓</span> {item}
                              </li>
                            ))}
                          </ul>
                        )}

                        <div className={styles.cardFooter}>
                          <div className={styles.priceCol}>
                            <div className={styles.currentPrice}>
                              {pkg.startingPriceInr ? (
                                <>
                                  ₹{pkg.startingPriceInr.toLocaleString("en-IN")}{" "}
                                  <span className={styles.perPerson}>/ person</span>
                                </>
                              ) : (
                                "Price on Request"
                              )}
                            </div>
                            {pkg.priceNote && (
                              <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                                {pkg.priceNote}
                              </div>
                            )}
                          </div>

                          <div className={styles.cardActions} style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                            <Link
                              href={`/destination/${data.id}/${pkg.slug}`}
                              className={styles.detailsBtn}
                              style={{ textAlign: "center", textDecoration: "none", flex: "1 1 auto" }}
                            >
                              View Itinerary
                            </Link>
                            <a
                              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi Hassle Free Travels! I'm interested in the "${pkg.name}" (${pkg.days}D/${pkg.nights}N) package for ${data.name}. Can you share the details and quote?`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.bookCardBtn}
                              style={{
                                background: "#25D366",
                                color: "#ffffff",
                                textDecoration: "none",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "4px",
                                padding: "8px 12px",
                                fontSize: "0.82rem",
                                borderRadius: "8px",
                                fontWeight: 600,
                              }}
                              title="Enquire on WhatsApp"
                            >
                              💬 WhatsApp
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                {/* Private Packages Section */}
                {packagesToShow.filter(p => p.packageType !== "group").length > 0 && (
                  <div style={{ gridColumn: "1 / -1", marginTop: "2rem", marginBottom: "1rem" }}>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Private / FIT Tours</h3>
                  </div>
                )}
                {packagesToShow
                  .filter(p => p.packageType !== "group")
                  .map((pkg) => (
                    <div key={pkg.id} className={styles.tourCard}>
                      <div className={styles.cardImageWrapper}>
                        <Image
                          src={pkg.heroImage}
                          alt={pkg.name}
                          className={styles.cardImage}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 390px"
                        />
                        <div className={styles.cardBadge}>
                          {`Private · ${pkg.categoryLabel || "Tour"}`}
                          {pkg.isFeatured && (
                            <span style={{ background: "#f59e0b", color: "#fff", padding: "2px 6px", borderRadius: "4px", fontSize: "0.7rem", fontWeight: 700, marginLeft: "6px" }}>⭐ FEATURED</span>
                          )}
                        </div>
                        <div className={styles.durationBadge}>⏱️ {pkg.days}D / {pkg.nights}N</div>
                      </div>

                      <div className={styles.cardBody}>
                        <div className={styles.cardTitleRow}>
                          <h3 className={styles.cardTitle}>{pkg.name}</h3>
                        </div>
                        {pkg.tagline && <p className={styles.cardSubtitle}>{pkg.tagline}</p>}

                        {pkg.highlights && pkg.highlights.length > 0 && (
                          <ul className={styles.highlightsList}>
                            {pkg.highlights.slice(0, 3).map((item, idx) => (
                              <li key={idx}>
                                <span>✓</span> {item}
                              </li>
                            ))}
                          </ul>
                        )}

                        <div className={styles.cardFooter}>
                          <div className={styles.priceCol}>
                            <div className={styles.currentPrice}>
                              {pkg.startingPriceInr ? (
                                <>
                                  ₹{pkg.startingPriceInr.toLocaleString("en-IN")}{" "}
                                  <span className={styles.perPerson}>/ person</span>
                                </>
                              ) : (
                                "Price on Request"
                              )}
                            </div>
                            {pkg.priceNote && (
                              <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                                {pkg.priceNote}
                              </div>
                            )}
                          </div>

                          <div className={styles.cardActions} style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                            <Link
                              href={`/destination/${data.id}/${pkg.slug}`}
                              className={styles.detailsBtn}
                              style={{ textAlign: "center", textDecoration: "none", flex: "1 1 auto" }}
                            >
                              View Itinerary
                            </Link>
                            <a
                              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi Hassle Free Travels! I'm interested in the "${pkg.name}" (${pkg.days}D/${pkg.nights}N) package for ${data.name}. Can you share the details and quote?`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.bookCardBtn}
                              style={{
                                background: "#25D366",
                                color: "#ffffff",
                                textDecoration: "none",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "4px",
                                padding: "8px 12px",
                                fontSize: "0.82rem",
                                borderRadius: "8px",
                                fontWeight: 600,
                              }}
                              title="Enquire on WhatsApp"
                            >
                              💬 WhatsApp
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            ) : (
              <div
                style={{
                  gridColumn: "1 / -1",
                  background: "#ffffff",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  padding: "48px 24px",
                  textAlign: "center",
                  maxWidth: "680px",
                  margin: "0 auto",
                }}
              >
                <span style={{ fontSize: "2.5rem" }}>🗺️</span>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 700, margin: "14px 0 8px" }}>
                  Bespoke {data.name} Packages Customized on Request
                </h3>
                <p style={{ color: "#64748b", marginBottom: "24px", lineHeight: 1.6 }}>
                  Our destination specialists craft 100% personalized itineraries for {data.name} based on your dates, group size, and travel preferences.
                </p>
                <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                  <button
                    onClick={() => handleOpenLead()}
                    style={{
                      background: "linear-gradient(135deg, #00A896, #028090)",
                      color: "#fff",
                      border: "none",
                      padding: "14px 28px",
                      borderRadius: "12px",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Request Free Custom Quote ➔
                  </button>
                  <a
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918375030889"}?text=${encodeURIComponent(
                      `Hi Hassle Free Travels! I am interested in customized tour packages for ${data.name}. Please share available options and quotes.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: "#25D366",
                      color: "#fff",
                      border: "none",
                      padding: "14px 24px",
                      borderRadius: "12px",
                      fontWeight: 700,
                      cursor: "pointer",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span>💬</span> WhatsApp Expert
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Instant Callback / Lead Banner */}
      <div className="container">
        <div className={styles.quoteBanner}>
          <div className={styles.quoteBannerInfo}>
            <div
              style={{
                color: "#f59e0b",
                fontWeight: "700",
                fontSize: "0.85rem",
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: "8px",
              }}
            >
              Need a Customized Itinerary?
            </div>
            <h3>Talk to Our {data.name} Travel Expert</h3>
            <p>
              Whether you are planning a corporate offsite, private family tour, or customized
              dates, our local experts will curate the perfect package
              with guaranteed best prices.
            </p>

            <div className={styles.quoteFeatures}>
              <div className={styles.quoteFeatureItem}>✓ 100% Customized Plans</div>
              <div className={styles.quoteFeatureItem}>✓ Instant WhatsApp Call</div>
              <div className={styles.quoteFeatureItem}>✓ Free Itinerary PDF</div>
              <div className={styles.quoteFeatureItem}>✓ Zero Obligation Quote</div>
            </div>
          </div>

          <div className={styles.quoteFormInline}>
            <h4>Get Instant Itinerary on WhatsApp</h4>
            <form onSubmit={handleInlineSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {/* Honeypot */}
              <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
                <input type="text" tabIndex={-1} autoComplete="off" value={inlineWebsite} onChange={(e) => setInlineWebsite(e.target.value)} />
              </div>
              <input
                type="text"
                required
                placeholder="Your Full Name"
                className={styles.formInput}
                value={inlineName}
                onChange={(e) => setInlineName(e.target.value)}
              />
              <input
                type="tel"
                required
                placeholder="Your 10-Digit Mobile Number"
                className={styles.formInput}
                value={inlinePhone}
                onChange={(e) => setInlinePhone(e.target.value)}
              />
              {inlineError && (
                <div style={{ padding: "10px 14px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", color: "#dc2626", fontSize: "0.85rem" }}>
                  {inlineError}{" "}
                  <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi! I'm ${inlineName} and I'm interested in ${data.name} tour packages.`)}`}
                     target="_blank" rel="noopener noreferrer"
                     style={{ color: "#25D366", fontWeight: 600, textDecoration: "underline" }}>WhatsApp us →</a>
                </div>
              )}
              <button type="submit" className={styles.submitBtn} disabled={inlineSubmitting}
                style={inlineSubmitting ? { opacity: 0.7, cursor: "not-allowed" } : {}}>
                {inlineSubmitting ? "Sending..." : "Request Free Callback ➔"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 2026 Trending Treatment & Destination Insights (if available) */}
      {data.trending2026 && (
        <section className={styles.trendingSection}>
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
              <span
                style={{
                  color: "#e11d48",
                  fontWeight: "800",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  fontSize: "0.85rem",
                  background: "#ffe4e6",
                  padding: "4px 14px",
                  borderRadius: "999px",
                  display: "inline-block",
                  marginBottom: "12px",
                }}
              >
                🔥 {data.trending2026.badge}
              </span>
              <h2 className={styles.sectionTitle} style={{ marginTop: "4px" }}>
                {data.trending2026.tagline}
              </h2>
              <p className={styles.sectionSubtitle} style={{ marginBottom: "24px" }}>
                Curated insights on why Indian holidaymakers are flocking to {data.name} this season.
              </p>
            </div>

            <div className={styles.trendingGridTwoCol}>
              {/* Left Column: Why Trending & Driving Forces */}
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div className={styles.trendingCard}>
                  <div className={styles.trendingCardHeader}>
                    <span>📈</span>
                    <h3>Why It’s Trending in 2026</h3>
                  </div>
                  <p className={styles.trendingCardText}>{data.trending2026.whyTrending}</p>
                </div>

                <div className={styles.trendingCard}>
                  <div className={styles.trendingCardHeader}>
                    <span>⚡</span>
                    <h3>What’s Driving Demand Now</h3>
                  </div>
                  <p className={styles.trendingCardText}>{data.trending2026.driver}</p>

                  {data.trending2026.visaNote && (
                    <div className={styles.visaAlertBox}>
                      <span>🛂</span>
                      <div>
                        <strong>Visa Status: </strong>
                        {data.trending2026.visaNote}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Traveler Fit, Best Season & Highlights */}
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div className={styles.trendingCard}>
                  <div className={styles.trendingCardHeader}>
                    <span>👥</span>
                    <h3>Who It’s Best For</h3>
                  </div>
                  <p className={styles.trendingCardText}>
                    <strong>Recommended Travelers: </strong>
                    {data.trending2026.travelerTypes}
                  </p>

                  <div className={styles.trendingMetaGrid}>
                    <div className={styles.trendingMetaBox}>
                      <div className={styles.trendingMetaLabel}>Ideal Duration</div>
                      <div className={styles.trendingMetaValue}>{data.trending2026.duration}</div>
                    </div>
                    <div className={styles.trendingMetaBox}>
                      <div className={styles.trendingMetaLabel}>Best Season</div>
                      <div className={styles.trendingMetaValue}>{data.trending2026.season}</div>
                    </div>
                  </div>

                  {data.trending2026.fromPriceHint && (
                    <div
                      style={{
                        marginTop: "16px",
                        padding: "10px 14px",
                        background: "#f0fdf4",
                        border: "1px solid #bbf7d0",
                        borderRadius: "8px",
                        fontSize: "0.85rem",
                        color: "#166534",
                        fontWeight: "600",
                      }}
                    >
                      💡 {data.trending2026.fromPriceHint}
                    </div>
                  )}
                </div>

                <div className={styles.trendingCard}>
                  <div className={styles.trendingCardHeader}>
                    <span>✨</span>
                    <h3>Key 2026 Experiences</h3>
                  </div>
                  <ul className={styles.trendingHighlightsList}>
                    {data.trending2026.highlights.map((highlight, idx) => (
                      <li key={idx}>
                        <span>✓</span> {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us Section */}
      {data.whyUs && data.whyUs.length > 0 && (
        <section className={styles.whySection}>
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto" }}>
              <span
                style={{
                  color: "#8B2FC9",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  fontSize: "0.85rem",
                }}
              >
                The Hassle Free Travels Advantage
              </span>
              <h2 className={styles.sectionTitle} style={{ marginTop: "6px" }}>
                Why Travel to {data.name} With Us
              </h2>
              <p className={styles.sectionSubtitle}>
                We prioritize your safety, comfort, and experience above everything else.
              </p>
            </div>

            <div className={styles.whyGrid}>
              {data.whyUs.map((item, idx) => (
                <div key={idx} className={styles.whyCard}>
                  <div className={styles.whyIcon}>{item.icon}</div>
                  <h3 className={styles.whyTitle}>{item.title}</h3>
                  <p className={styles.whyDesc}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Top Places to Visit */}
      {data.places && data.places.length > 0 && (
        <section className={styles.placesSection}>
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto" }}>
              <span
                style={{
                  color: "#8B2FC9",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  fontSize: "0.85rem",
                }}
              >
                Iconic Landmarks
              </span>
              <h2 className={styles.sectionTitle} style={{ marginTop: "6px" }}>
                Top Places to Visit in {data.name}
              </h2>
              <p className={styles.sectionSubtitle}>
                Explore the crown jewels and hidden gems of {data.name}.
              </p>
            </div>

            <div className={styles.placesGrid}>
              {data.places.map((place, idx) => (
                <div key={idx} className={styles.placeCard}>
                  <div className={styles.placeImgWrapper}>
                    <Image
                      src={place.image}
                      alt={place.name}
                      className={styles.placeImg}
                      fill
                      sizes="(max-width: 640px) 100vw, 320px"
                    />
                    <div className={styles.placeElevation}>📍 {place.elevation}</div>
                  </div>
                  <div className={styles.placeBody}>
                    <div className={styles.placeTag}>{place.tag}</div>
                    <h3 className={styles.placeName}>{place.name}</h3>
                    <p className={styles.placeDesc}>{place.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Seasonal Travel Guide */}
      {data.seasons && data.seasons.length > 0 && (
        <section className={styles.seasonsSection}>
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto" }}>
              <span
                style={{
                  color: "#f59e0b",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  fontSize: "0.85rem",
                }}
              >
                Seasonal Travel Guide
              </span>
              <h2 className={styles.sectionTitle} style={{ marginTop: "6px" }}>
                Best Time to Visit {data.name}
              </h2>
            </div>

            <div className={styles.seasonsGrid}>
              {data.seasons.map((season, idx) => (
                <div key={idx} className={`${styles.seasonCard} ${season.type === "summer" ? styles.summerCard : styles.winterCard}`}>
                  <span className={styles.seasonBadge}>{season.badge}</span>
                  <h3 className={styles.seasonTitle}>{season.title}</h3>
                  <div className={styles.seasonMonths}>{season.months}</div>
                  <p className={styles.seasonDesc}>{season.description}</p>
                  <ul className={styles.seasonPoints}>
                    {season.points.map((pt, i) => (
                      <li key={i}>✓ {pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Routes Guide */}
      {data.routes && data.routes.length > 0 && (
        <section className={styles.routesSection}>
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto" }}>
              <h2 className={styles.sectionTitle} style={{ marginTop: "6px" }}>
                How to Reach {data.name}
              </h2>
            </div>

            <div className={styles.routesGrid}>
              {data.routes.map((route, idx) => (
                <div key={idx} className={styles.routeCard}>
                  <span className={styles.routeBadge}>{route.badge}</span>
                  <h3 className={styles.routeTitle}>{route.title}</h3>
                  <p className={styles.routeDesc}><strong>{route.path}</strong></p>
                  <p className={styles.routeDesc}>{route.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Traveler Reviews */}
      {data.reviews && data.reviews.length > 0 && (
        <section className={styles.reviewsSection}>
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto" }}>
              <h2 className={styles.sectionTitle} style={{ marginTop: "6px" }}>
                Traveler Stories
              </h2>
            </div>

            <div className={styles.reviewsGrid}>
              {data.reviews.map((rev, idx) => (
                <div key={idx} className={styles.reviewCard}>
                  <div>
                    <div className={styles.reviewRating}>
                      {"★".repeat(rev.rating)}
                    </div>
                    <p className={styles.reviewComment}>&quot;{rev.comment}&quot;</p>
                  </div>

                  <div className={styles.reviewAuthor}>
                    <div className={styles.avatarCircle}>{rev.name[0]}</div>
                    <div className={styles.authorDetails}>
                      <h5>{rev.name}</h5>
                      <p>{rev.city} • {rev.trip}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Travel Guides & Insights Section */}
      {dbBlogPosts && dbBlogPosts.length > 0 && (
        <section className={styles.guidesSection}>
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 24px" }}>
              <div
                style={{
                  color: "#00A896",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "8px",
                }}
              >
                Insider Travel Guides
              </div>
              <h2 className={styles.sectionTitle} style={{ margin: "0 0 10px" }}>
                {data.name} Travel Guides & Tips
              </h2>
              <p className={styles.sectionSubtitle} style={{ margin: 0 }}>
                Expert advice, road trip itineraries, and local secrets curated by our travel specialists.
              </p>
            </div>

            <div className={styles.guidesGrid}>
              {dbBlogPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blogs/${post.slug}`}
                  className={styles.guideCard}
                >
                  <div className={styles.guideImgWrapper}>
                    <Image
                      src={post.featuredImage || data.hero.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className={styles.guideBody}>
                    {post.category && (
                      <div className={styles.guideCategory}>{post.category}</div>
                    )}
                    <h3 className={styles.guideTitle}>{post.title}</h3>
                    <p className={styles.guideExcerpt}>{post.excerpt}</p>
                    <div className={styles.guideFooter}>
                      <span>⏱️ {post.readMinutes} min read</span>
                      <span className={styles.guideReadMore}>Read Guide ➔</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs Section */}
      {data.faqs && data.faqs.length > 0 && (
        <section className={styles.faqSection}>
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto" }}>
              <h2 className={styles.sectionTitle} style={{ marginTop: "6px" }}>
                Frequently Asked Questions
              </h2>
            </div>

            <div className={styles.faqContainer}>
              {data.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`${styles.faqItem} ${isOpen ? styles.faqOpen : ""}`}
                  >
                    <button
                      className={styles.faqQuestion}
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.q}</span>
                      <span className={styles.faqIcon}>{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && <div className={styles.faqAnswer}>{faq.a}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Floating Bottom Booking Bar */}
      <div className={styles.stickyBottomBar}>
        <div className={styles.stickyBarContainer}>
          <div className={styles.stickyInfo}>
            <span className={styles.stickyLabel}>{data.name} Packages starting from</span>
            <span className={styles.stickyPrice}>
              {data.hero.startingPrice.replace("Starts from ", "")} 
            </span>
          </div>

          <div className={styles.stickyActions}>
            <button
              className={styles.callExpertBtn}
              onClick={() => handleOpenLead()}
            >
              📞 Request Callback
            </button>
            <button
              className={styles.queryStickyBtn}
              onClick={() => handleOpenLead()}
            >
              Send Query / Book
            </button>
          </div>
        </div>
      </div>

      {/* Related Destinations (if trending data specifies relatedSlugs) */}
      {data.trending2026?.relatedSlugs && data.trending2026.relatedSlugs.length > 0 && (
        <section className={styles.relatedSection}>
          <div className="container">
            <h2 className={styles.sectionTitle} style={{ fontSize: "1.6rem" }}>
              Explore Related 2026 Trending Destinations
            </h2>
            <p className={styles.sectionSubtitle} style={{ marginBottom: "20px" }}>
              Popular companion itineraries and alternative getaways favored by Indian travellers.
            </p>
            <div className={styles.relatedGrid}>
              {data.trending2026.relatedSlugs.map((slug) => {
                const rel = ALL_DESTINATIONS[slug];
                if (!rel) return null;
                return (
                  <Link href={`/destination/${rel.id}`} key={rel.id} className={styles.relatedCard}>
                    <div className={styles.relatedImgWrapper}>
                      <Image
                        src={rel.hero.image}
                        alt={rel.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 240px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className={styles.relatedBody}>
                      <h4 className={styles.relatedName}>{rel.name}</h4>
                      <p className={styles.relatedTagline}>
                        {rel.trending2026 ? rel.trending2026.tagline : rel.hero.subtitle}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Modals */}
      {selectedItineraryPkg && (
        <ItineraryModal
          pkg={selectedItineraryPkg}
          onClose={() => setSelectedItineraryPkg(null)}
          onBookNow={(pkg) => handleOpenLead(pkg)}
        />
      )}

      {isLeadModalOpen && (
        <LeadFormModal
          pkg={selectedLeadPkg}
          destinationName={data.name}
          destinationSlug={data.id}
          onClose={() => setIsLeadModalOpen(false)}
        />
      )}

      <Footer />

    </div>
  );
}
