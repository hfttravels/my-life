import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Terms of Service | Hassle Free Travels",
  description: "Booking, cancellation, and service terms for Hassle Free Travels packages.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.document}>
          <div className={styles.eyebrow}>Terms of Service</div>
          <h1>Clear terms for smoother trips.</h1>
          <p>
            These terms outline the basics for inquiries, bookings, package
            inclusions, cancellations, and traveler responsibilities.
          </p>
          <h2>Bookings</h2>
          <p>
            Packages are confirmed after availability is verified and the required
            payment is received. Prices may vary by departure date, rooming choice,
            and group size.
          </p>
          <h2>Cancellations</h2>
          <p>
            Cancellation options depend on the package, supplier rules, and time
            remaining before departure. Contact the team for the exact policy before
            confirming your booking.
          </p>
          <h2>Traveler Responsibility</h2>
          <ul>
            <li>Carry valid ID, permits, and travel documents.</li>
            <li>Share medical or dietary needs before departure.</li>
            <li>Follow safety guidance from trip captains and local authorities.</li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
