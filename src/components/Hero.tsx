"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Hero.module.css";
import { ALL_DESTINATIONS } from "@/data/destinations";

const destinationAliases = Object.values(ALL_DESTINATIONS).map((destination) => ({
  id: destination.id,
  label: destination.name.toLowerCase(),
}));

export default function Hero() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState("");

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = destination.trim().toLowerCase();
    const match = destinationAliases.find(
      (item) => item.id === query || item.label.includes(query) || query.includes(item.label)
    );

    if (match) {
      const params = new URLSearchParams();
      if (date) params.set("date", date);
      if (travelers) params.set("travelers", travelers);
      const suffix = params.toString() ? `?${params.toString()}` : "";
      router.push(
        match.id === "spiti"
          ? `/india-trips/spiti-valley-tour-packages${suffix}`
          : `/destination/${match.id}${suffix}`
      );
      return;
    }

    router.push("/#destinations");
  };

  return (
    <section className={styles.hero}>
      <div className={styles.background}></div>
      <div className={styles.overlay}></div>
      
      <div className={styles.content}>
        <h1 className={`${styles.title} animate-fade-in`}>
          Discover Your Next <br /> <span>Great Adventure</span>
        </h1>
        <p className={`${styles.subtitle} animate-fade-in`} style={{animationDelay: '0.2s'}}>
          Join thousands of travelers who have explored the world with us. 
          Curated itineraries, expert guides, and unforgettable memories.
        </p>
        
        <form
          className={`${styles.searchBox} animate-fade-in`}
          style={{animationDelay: '0.4s'}}
          onSubmit={handleSearch}
        >
          <div className={styles.inputGroup}>
            <label htmlFor="hero-destination">Destination</label>
            <input
              id="hero-destination"
              type="text"
              placeholder="Where do you want to go?"
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
            />
          </div>
          <div className={styles.divider}></div>
          <div className={styles.inputGroup}>
            <label htmlFor="hero-date">Date</label>
            <input
              id="hero-date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>
          <div className={styles.divider}></div>
          <div className={styles.inputGroup}>
            <label htmlFor="hero-travelers">Travelers</label>
            <input
              id="hero-travelers"
              type="number"
              min="1"
              placeholder="Add guests"
              value={travelers}
              onChange={(event) => setTravelers(event.target.value)}
            />
          </div>
          <button className={styles.searchBtn} type="submit" aria-label="Search trips">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
        </form>
      </div>
    </section>
  );
}
