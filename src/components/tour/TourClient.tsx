"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadFormModal from "@/components/destination/LeadFormModal";
import type {
  Package,
  Destination,
  PackageDay,
  PackageFaq,
  PackageItem,
  BlogPost,
} from "@/db/schema";
import styles from "./Tour.module.css";

interface TourClientProps {
  pkg: Package & {
    destination: Destination;
    itineraryDays: PackageDay[];
    faqs: PackageFaq[];
    items: PackageItem[];
  };
  relatedPackages: (Package & { destination?: Destination })[];
  relatedBlogs?: BlogPost[];
}

export default function TourClient({
  pkg,
  relatedPackages,
  relatedBlogs,
}: TourClientProps) {
  const [openDay, setOpenDay] = useState<number | null>(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918375030889";
  const whatsappText = `Hi Hassle Free Travels! I'm interested in the "${pkg.name}" (${pkg.nights}N/${pkg.days}D) package for ${pkg.destination.name}. Can you share the detailed itinerary and quote?`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

  const inclusions = pkg.items.filter((item) => item.kind === "inclusion");
  const exclusions = pkg.items.filter((item) => item.kind === "exclusion");
  const addons = pkg.items.filter((item) => item.kind === "addon");

  return (
    <div className={styles.pageWrapper}>
      <Header />

      {/* Hero Section */}
      <section
        className={styles.heroSection}
        style={{ backgroundImage: `url('${pkg.heroImage}')` }}
      >
        <div className={styles.heroOverlay} />
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.badgeRow}>
              <span className={styles.heroBadge}>
                {pkg.days} Days / {pkg.nights} Nights • {pkg.packageType.toUpperCase()}
              </span>
              {pkg.isFeatured && (
                <span className={styles.featuredBadge}>⭐ BESTSELLER</span>
              )}
            </div>

            <h1 className={styles.heroTitle}>{pkg.name}</h1>
            {pkg.tagline && <p className={styles.heroSubtitle}>{pkg.tagline}</p>}

            <div className={styles.trustBar}>
              {pkg.startingPriceInr ? (
                <div className={styles.priceHighlight}>
                  Starts from ₹{pkg.startingPriceInr.toLocaleString("en-IN")}{" "}
                  <span className={styles.perPerson}>/ person</span>
                </div>
              ) : (
                <div className={styles.priceHighlight}>Price on Request</div>
              )}
              {pkg.priceNote && (
                <div className={styles.priceNote}>*{pkg.priceNote}</div>
              )}
            </div>

            <div className={styles.heroCtas}>
              <button
                className={styles.primaryBtn}
                onClick={() => setIsLeadModalOpen(true)}
              >
                Get Free Custom Quote ➔
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappHeroBtn}
              >
                <span>💬</span> WhatsApp Expert
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb Bar */}
      <div className={styles.breadcrumbBar}>
        <div className="container">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href={`/destination/${pkg.destination.slug}`}>
            {pkg.destination.name}
          </Link>
          <span>/</span>
          <span className={styles.breadcrumbActive}>{pkg.name}</span>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "40px", paddingBottom: "60px" }}>
        {/* Quick Facts Grid */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Trip Snapshot &amp; Logistics</h2>
          <div className={styles.factsGrid}>
            <div className={styles.factCard}>
              <span className={styles.factIcon}>
                {pkg.packageType === "group" ? "👥" : "🚗"}
              </span>
              <div>
                <div className={styles.factLabel}>Tour Style</div>
                <div className={styles.factValue}>
                  {pkg.packageType === "group"
                    ? `Fixed Group Departure (${pkg.groupSizeMin || 2}–${pkg.groupSizeMax || 16} travelers)`
                    : "Private FIT (Dedicated vehicle & English-speaking guide)"}
                </div>
              </div>
            </div>
            <div className={styles.factCard}>
              <span className={styles.factIcon}>🌱</span>
              <div>
                <div className={styles.factLabel}>Dietary Options</div>
                <div className={styles.factValue}>
                  Indian Vegetarian &amp; Jain Meals on request
                </div>
              </div>
            </div>
            {pkg.mealsSummary && (
              <div className={styles.factCard}>
                <span className={styles.factIcon}>🍽️</span>
                <div>
                  <div className={styles.factLabel}>Meals Included</div>
                  <div className={styles.factValue}>{pkg.mealsSummary}</div>
                </div>
              </div>
            )}
            {pkg.staySummary && (
              <div className={styles.factCard}>
                <span className={styles.factIcon}>🏨</span>
                <div>
                  <div className={styles.factLabel}>Accommodations</div>
                  <div className={styles.factValue}>{pkg.staySummary}</div>
                </div>
              </div>
            )}
            {pkg.transportSummary && (
              <div className={styles.factCard}>
                <span className={styles.factIcon}>🚙</span>
                <div>
                  <div className={styles.factLabel}>Transfers &amp; Transport</div>
                  <div className={styles.factValue}>{pkg.transportSummary}</div>
                </div>
              </div>
            )}
            {pkg.departureCities && pkg.departureCities.length > 0 && (
              <div className={styles.factCard}>
                <span className={styles.factIcon}>🛫</span>
                <div>
                  <div className={styles.factLabel}>Departure Hubs</div>
                  <div className={styles.factValue}>{pkg.departureCities.join(", ")}</div>
                </div>
              </div>
            )}
            {pkg.bestMonths && pkg.bestMonths.length > 0 && (
              <div className={styles.factCard}>
                <span className={styles.factIcon}>📅</span>
                <div>
                  <div className={styles.factLabel}>Best Months to Travel</div>
                  <div className={styles.factValue}>{pkg.bestMonths.join(" • ")}</div>
                </div>
              </div>
            )}
            {pkg.visaNote && (
              <div className={styles.factCard}>
                <span className={styles.factIcon}>🛂</span>
                <div>
                  <div className={styles.factLabel}>Permits &amp; Visa</div>
                  <div className={styles.factValue}>{pkg.visaNote}</div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Highlights Section */}
        {pkg.highlights && pkg.highlights.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Key Tour Highlights</h2>
            <div className={styles.highlightsGrid}>
              {pkg.highlights.map((h, i) => (
                <div key={i} className={styles.highlightCard}>
                  <span className={styles.highlightCheck}>✓</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Day-by-Day Itinerary */}
        {pkg.itineraryDays && pkg.itineraryDays.length > 0 && (
          <section className={styles.section} id="itinerary">
            <div className={styles.sectionHeaderRow}>
              <div>
                <h2 className={styles.sectionTitle}>Day-by-Day Detailed Itinerary</h2>
                <p className={styles.sectionSubtitle}>
                  Expertly paced for comfortable travel, acclimatization, and maximum exploration.
                </p>
              </div>
              <div className={styles.accordionControls}>
                <button
                  type="button"
                  className={styles.controlBtn}
                  onClick={() => setOpenDay(openDay === null ? 1 : null)}
                >
                  {openDay === null ? "Expand Day 1" : "Collapse Open Day"}
                </button>
              </div>
            </div>

            <div className={styles.itineraryList}>
              {pkg.itineraryDays.map((d) => {
                const isOpen = openDay === d.dayNumber;
                return (
                  <div
                    key={d.dayNumber}
                    className={`${styles.itineraryItem} ${isOpen ? styles.itineraryItemOpen : ""}`}
                  >
                    <button
                      type="button"
                      className={styles.itineraryHeader}
                      onClick={() => setOpenDay(isOpen ? null : d.dayNumber)}
                      aria-expanded={isOpen}
                    >
                      <div className={styles.dayBadge}>Day {d.dayNumber}</div>
                      <div className={styles.dayTitle}>{d.title}</div>
                      <span className={styles.accordionIcon}>{isOpen ? "−" : "+"}</span>
                    </button>

                    {isOpen && (
                      <div className={styles.itineraryBody}>
                        <p className={styles.dayDescription}>{d.body}</p>
                        {(d.stay || d.meals) && (
                          <div className={styles.dayMeta}>
                            {d.stay && (
                              <div className={styles.dayMetaPill}>
                                🏨 <strong>Stay:</strong> {d.stay}
                              </div>
                            )}
                            {d.meals && (
                              <div className={styles.dayMetaPill}>
                                🍽️ <strong>Meals:</strong> {d.meals}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Inclusions & Exclusions */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What&apos;s Included &amp; Excluded</h2>
          <div className={styles.itemsTwoCol}>
            {/* Inclusions */}
            <div className={styles.itemsBox}>
              <div className={styles.itemsBoxHeader}>
                <span className={styles.incBadge}>✓ INCLUDED</span>
                <h3>Hassle-Free Inclusions</h3>
              </div>
              <ul className={styles.incList}>
                {inclusions.map((item) => (
                  <li key={item.id}>
                    <span className={styles.checkIcon}>✓</span>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions */}
            <div className={styles.itemsBox}>
              <div className={styles.itemsBoxHeader}>
                <span className={styles.excBadge}>✕ EXCLUDED</span>
                <h3>Not Included</h3>
              </div>
              <ul className={styles.excList}>
                {exclusions.map((item) => (
                  <li key={item.id}>
                    <span className={styles.crossIcon}>✕</span>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Addons if present */}
          {addons.length > 0 && (
            <div className={styles.addonBox}>
              <div className={styles.addonTitle}>⚡ Optional Upgrades &amp; Custom Add-ons</div>
              <div className={styles.addonGrid}>
                {addons.map((item) => (
                  <div key={item.id} className={styles.addonChip}>
                    <span>+</span> {item.label}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* FAQs */}
        {pkg.faqs && pkg.faqs.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <div className={styles.faqContainer}>
              {pkg.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={faq.id}
                    className={`${styles.faqItem} ${isOpen ? styles.faqOpen : ""}`}
                  >
                    <button
                      type="button"
                      className={styles.faqQuestion}
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <span className={styles.faqIcon}>{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && <div className={styles.faqAnswer}>{faq.answer}</div>}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Link back up to Destination Hub */}
        <div className={styles.hubBanner}>
          <div className={styles.hubBannerContent}>
            <h3>Looking for more {pkg.destination.name} options?</h3>
            <p>
              View season guides, weather insights, traveler tips, and companion packages.
            </p>
          </div>
          <Link
            href={`/destination/${pkg.destination.slug}`}
            className={styles.hubLinkBtn}
          >
            Explore {pkg.destination.name} Hub ➔
          </Link>
        </div>

        {/* Related Packages */}
        {relatedPackages.length > 0 && (
          <section className={styles.section} style={{ marginTop: "50px" }}>
            <h2 className={styles.sectionTitle}>Related Curated Tours</h2>
            <div className={styles.relatedGrid}>
              {relatedPackages.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/destination/${pkg.destination.slug}/${rel.slug}`}
                  className={styles.relatedCard}
                >
                  <div className={styles.relatedImgWrapper}>
                    <Image
                      src={rel.heroImage}
                      alt={rel.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 340px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className={styles.relatedBody}>
                    <div className={styles.relatedDuration}>
                      {rel.days}D / {rel.nights}N
                    </div>
                    <h4 className={styles.relatedName}>{rel.name}</h4>
                    {rel.startingPriceInr && (
                      <div className={styles.relatedPrice}>
                        From ₹{rel.startingPriceInr.toLocaleString("en-IN")}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Destination Guides */}
        {relatedBlogs && relatedBlogs.length > 0 && (
          <section className={styles.section} style={{ marginTop: "40px" }}>
            <h2 className={styles.sectionTitle}>
              {pkg.destination.name} Travel Guides & Insights
            </h2>
            <div className={styles.relatedGrid}>
              {relatedBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blogs/${blog.slug}`}
                  className={styles.relatedCard}
                >
                  <div className={styles.relatedImgWrapper}>
                    <Image
                      src={blog.featuredImage || pkg.heroImage}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 340px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className={styles.relatedBody}>
                    <div className={styles.relatedDuration}>
                      ⏱️ {blog.readMinutes} MIN READ • {blog.category?.toUpperCase() || "GUIDE"}
                    </div>
                    <h4 className={styles.relatedName}>{blog.title}</h4>
                    <p
                      style={{
                        fontSize: "0.82rem",
                        color: "#64748b",
                        margin: "6px 0 0",
                        lineHeight: 1.4,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {blog.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Sticky Bottom Bar on Mobile / Screens */}
      <div className={styles.stickyBottomBar}>
        <div className={styles.stickyBarContainer}>
          <div className={styles.stickyInfo}>
            <span className={styles.stickyLabel}>{pkg.name}</span>
            <span className={styles.stickyPrice}>
              {pkg.startingPriceInr
                ? `₹${pkg.startingPriceInr.toLocaleString("en-IN")}`
                : "Custom Quote"}
            </span>
          </div>
          <div className={styles.stickyActions}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.callExpertBtn}
            >
              💬 WhatsApp
            </a>
            <button
              type="button"
              className={styles.queryStickyBtn}
              onClick={() => setIsLeadModalOpen(true)}
            >
              Get Free Quote
            </button>
          </div>
        </div>
      </div>

      {/* Lead Enquiry Modal */}
      {isLeadModalOpen && (
        <LeadFormModal
          pkg={{ id: pkg.id, title: pkg.name, slug: pkg.slug }}
          destinationName={pkg.destination.name}
          destinationSlug={pkg.destination.slug}
          destinationId={pkg.destinationId}
          packageSlug={pkg.slug}
          packageId={pkg.id}
          onClose={() => setIsLeadModalOpen(false)}
        />
      )}

      <Footer />
    </div>
  );
}
