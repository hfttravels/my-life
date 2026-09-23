import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy | Hassle Free Travels",
  description: "How Hassle Free Travels collects, uses, and protects traveler information.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.document}>
          <div className={styles.eyebrow}>Privacy Policy</div>
          <h1>Your privacy matters.</h1>
          <p>
            Hassle Free Travels uses traveler information only to plan trips,
            respond to inquiries, process bookings, and improve our service.
          </p>
          <h2>Information We Collect</h2>
          <ul>
            <li>Name, phone number, email address, and destination preferences.</li>
            <li>Trip dates, group size, package interest, and support requests.</li>
            <li>Basic website usage data used to improve performance and content.</li>
          </ul>
          <h2>How We Use It</h2>
          <p>
            We use this information to contact you about your inquiry, personalize
            itineraries, share relevant offers, and provide booking support.
          </p>
          <h2>Data Protection</h2>
          <p>
            We do not sell personal information. Access is limited to team members
            and service partners who need it to deliver your travel experience.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
