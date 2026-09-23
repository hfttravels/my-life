import styles from "./ReviewsBanner.module.css";

const googleReviewsUrl = process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL || "";
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918375030889";

export default function ReviewsBanner() {
  return (
    <div className={styles.banner}>
      <div className={styles.container}>
        <div className={styles.reviewItem}>
          <span className={styles.icon} style={{ background: "linear-gradient(135deg, #00A896, #028090)", fontSize: "1.1rem" }} aria-hidden="true">
            📍
          </span>
          <div className={styles.content}>
            <div className={styles.rating} style={{ fontSize: "0.92rem" }}>
              Shimla-Based Travel Agency
            </div>
            <div className={styles.count}>Custom &amp; Group Tours Since 2018</div>
          </div>
        </div>

        {googleReviewsUrl ? (
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.reviewItem}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <span className={`${styles.icon} ${styles.googleIcon}`} aria-hidden="true">G</span>
            <div className={styles.content}>
              <div className={styles.rating}>
                <span className={styles.star}>★</span> Rated by Travellers
              </div>
              <div className={styles.count} style={{ textDecoration: "underline", textUnderlineOffset: "2px" }}>
                Read reviews on Google →
              </div>
            </div>
          </a>
        ) : (
          <div className={styles.reviewItem}>
            <span className={`${styles.icon} ${styles.googleIcon}`} aria-hidden="true">G</span>
            <div className={styles.content}>
              <div className={styles.rating}>
                <span className={styles.star}>★</span> Rated by Travellers
              </div>
              <div className={styles.count}>Trusted by families &amp; groups</div>
            </div>
          </div>
        )}

        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi Hassle Free Travels! I'd like to know more about your tour packages.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.reviewItem}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <span
            className={styles.icon}
            style={{ background: "#25D366", fontSize: "1.1rem" }}
            aria-hidden="true"
          >
            💬
          </span>
          <div className={styles.content}>
            <div className={styles.rating} style={{ fontSize: "0.92rem" }}>
              Chat With Us
            </div>
            <div className={styles.count} style={{ textDecoration: "underline", textUnderlineOffset: "2px" }}>
              WhatsApp for instant help →
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
