import fs from "fs";
import path from "path";

export const USD_TO_INR = 84;

export function roundToMarketingPrice(inr) {
  return Math.ceil(inr / 1000) * 1000 - 1; // e.g. 33516 -> 33999
}

export const DEFAULT_MALDIVES_VISA_NOTE =
  "Free 30-day visa on arrival at Malé Velana International Airport (MLE) for Indian passport holders. No pre-application required; valid passport (6+ months validity), confirmed hotel booking/resort voucher, and return ticket required. Official portal: https://www.immigration.gov.mv";

const IMAGES = {
  overwater_villa: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
  resort_pool: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
  luxury_water_bungalow: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
  maafushi_beach: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=80",
  sandbank_bliss: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  whale_shark: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
  manta_ray: "https://images.unsplash.com/photo-1560275619-4ccb50a14b9d?auto=format&fit=crop&w=1200&q=80",
  coral_dive: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=1200&q=80",
  bioluminescence: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
  liveaboard_safari: "https://images.unsplash.com/photo-1500930287596-c1ecaa373bb2?auto=format&fit=crop&w=1200&q=80",
  sunset_cruise: "https://images.unsplash.com/photo-1510414842594-a61752a33f10?auto=format&fit=crop&w=1200&q=80",
  seaplane: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
  guesthouse_island: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1200&q=80",
  male_waterfront: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80"
};

// Map each FIT package (index 0 to 17) to metadata
const PKG_CONFIGS = [
  // 1: FIT #1
  {
    slug: "maldives-budget-guesthouse-explorer-5d",
    name: "Maldives Budget Guesthouse Explorer",
    days: 5,
    nights: 4,
    packageType: "adventure",
    categoryLabel: "Guesthouse",
    route: "Maafushi + Malé",
    islands: ["Maafushi", "Malé"],
    startCity: "Malé (MLE)",
    endCity: "Malé (MLE)",
    priceFromUSD: 399,
    hotelCategory: "3★ Beachfront Guesthouse on Maafushi",
    stayStyle: "Guesthouse",
    transferType: "Speedboat",
    isFeatured: true,
    heroImage: IMAGES.maafushi_beach,
    bestMonths: ["November", "December", "January", "February", "March", "April"],
    staySummary: "3N Maafushi 3★ Guesthouse, 1N Malé Hotel",
    mealsSummary: "Daily Breakfast, Welcome Dinner Day 1, Sandbank Picnic Lunch Day 3",
    transportSummary: "Return Speedboat Transfers (Airport–Maafushi–Airport)",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Kochi", "Direct flights to Malé (MLE)"],
    relatedSlugs: [
      "maldives-island-hopping-adventure-7d",
      "maldives-snorkel-sandbank-bliss-4d",
      "maldives-local-island-whale-shark-6d"
    ]
  },
  // 2: FIT #2
  {
    slug: "maldives-island-hopping-adventure-7d",
    name: "Maldives Island Hopping Adventure",
    days: 7,
    nights: 6,
    packageType: "adventure",
    categoryLabel: "Island Hopping",
    route: "Maafushi + Dhigurah + Fulidhoo + Malé",
    islands: ["Maafushi", "Dhigurah", "Fulidhoo", "Malé"],
    startCity: "Malé (MLE)",
    endCity: "Malé (MLE)",
    priceFromUSD: 699,
    hotelCategory: "3★ Handpicked Island Guesthouses across 3 Atolls",
    stayStyle: "Guesthouse",
    transferType: "Speedboat",
    isFeatured: true,
    heroImage: IMAGES.guesthouse_island,
    bestMonths: ["November", "December", "January", "February", "March", "April"],
    staySummary: "2N Maafushi 3★, 2N Dhigurah 3★, 1N Fulidhoo 3★, 1N Malé Hotel",
    mealsSummary: "Daily Breakfast, Welcome Dinner Day 1, Sandbank Picnic Day 3, Catch Dinner Day 4, Farewell Dinner Day 6",
    transportSummary: "All Inter-Atoll Speedboat Transfers",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Kochi", "Direct flights to Malé (MLE)"],
    relatedSlugs: [
      "maldives-multi-atoll-explorer-8d",
      "maldives-budget-guesthouse-explorer-5d",
      "maldives-local-island-whale-shark-6d"
    ]
  },
  // 3: FIT #3
  {
    slug: "maldives-classic-honeymoon-5d",
    name: "Maldives Classic Honeymoon & Couples",
    days: 5,
    nights: 4,
    packageType: "honeymoon",
    categoryLabel: "Honeymoon",
    route: "Overwater Bungalow Resort Island",
    islands: ["Private Resort Island", "Malé"],
    startCity: "Malé (MLE)",
    endCity: "Malé (MLE)",
    priceFromUSD: 899,
    hotelCategory: "Overwater Bungalow at Private Resort Island (or similar)",
    stayStyle: "Overwater villa",
    transferType: "Speedboat",
    isFeatured: true,
    heroImage: IMAGES.overwater_villa,
    bestMonths: ["November", "December", "January", "February", "March", "April"],
    staySummary: "4 Nights Overwater Bungalow on Private Resort Island",
    mealsSummary: "Daily Breakfast, Welcome Dinner Day 1, Sandbank Picnic Lunch Day 3, Farewell Dinner Day 4",
    transportSummary: "Return Private Speedboat Transfers",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Kochi", "Direct flights to Malé (MLE)"],
    relatedSlugs: [
      "maldives-overwater-villa-honeymoon-6d",
      "maldives-all-inclusive-resort-escape-7d",
      "maldives-luxury-guesthouse-spa-6d"
    ]
  },
  // 4: FIT #4
  {
    slug: "maldives-all-inclusive-resort-escape-7d",
    name: "Maldives All-Inclusive Resort Escape",
    days: 7,
    nights: 6,
    packageType: "honeymoon",
    categoryLabel: "All-Inclusive Resort",
    route: "Atmosphere Kanifushi or OBLU Select Sangeli (or similar)",
    islands: ["Lhaviyani / North Malé Atoll Resort Island"],
    startCity: "Malé (MLE)",
    endCity: "Malé (MLE)",
    priceFromUSD: 1499,
    hotelCategory: "Luxury 5★ Beach Villa or Water Villa (Atmosphere Kanifushi or OBLU Select Sangeli or similar)",
    stayStyle: "Resort",
    transferType: "Seaplane",
    isFeatured: true,
    heroImage: IMAGES.luxury_water_bungalow,
    bestMonths: ["November", "December", "January", "February", "March", "April", "July", "August"],
    staySummary: "6 Nights All-Inclusive Luxury Resort Villa",
    mealsSummary: "All-Inclusive: Unlimited Breakfast, Lunch, Dinner, Gourmet Snacks & Beverages (Indian Veg Buffet available)",
    transportSummary: "Scenic Return Seaplane Transfers Included (MLE–Resort–MLE)",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Kochi", "Direct flights to Malé (MLE)"],
    relatedSlugs: [
      "maldives-overwater-villa-honeymoon-6d",
      "maldives-classic-honeymoon-5d",
      "maldives-luxury-guesthouse-spa-6d"
    ]
  },
  // 5: FIT #5
  {
    slug: "maldives-local-island-whale-shark-6d",
    name: "Maldives Local Island Hopping with Whale Sharks",
    days: 6,
    nights: 5,
    packageType: "adventure",
    categoryLabel: "Whale Shark",
    route: "Maafushi + Dhigurah + Malé",
    islands: ["Maafushi", "Dhigurah", "Malé"],
    startCity: "Malé (MLE)",
    endCity: "Malé (MLE)",
    priceFromUSD: 599,
    hotelCategory: "3★ Beach Guesthouses on Maafushi & Dhigurah",
    stayStyle: "Guesthouse",
    transferType: "Speedboat",
    isFeatured: false,
    heroImage: IMAGES.whale_shark,
    bestMonths: ["Year-round", "November", "December", "January", "February", "March", "April"],
    staySummary: "2N Maafushi 3★, 2N Dhigurah 3★, 1N Malé Hotel",
    mealsSummary: "Daily Breakfast, Welcome Dinner Day 1, Sandbank Sunset Snack Day 3, Catch Dinner Day 4, Farewell Dinner Day 5",
    transportSummary: "All Inter-Island Speedboat Transfers",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Kochi", "Direct flights to Malé (MLE)"],
    relatedSlugs: [
      "maldives-whale-shark-safari-5d",
      "maldives-island-hopping-adventure-7d",
      "maldives-dive-snorkel-discovery-6d"
    ]
  },
  // 6: FIT #6
  {
    slug: "maldives-dive-snorkel-discovery-6d",
    name: "Maldives Dive & Snorkel Discovery",
    days: 6,
    nights: 5,
    packageType: "adventure",
    categoryLabel: "Dive & Snorkel",
    route: "Maafushi + 1N Liveaboard + South Ari",
    islands: ["Maafushi", "Vaavu Atoll", "Malé"],
    startCity: "Malé (MLE)",
    endCity: "Malé (MLE)",
    priceFromUSD: 749,
    hotelCategory: "3★ Maafushi Guesthouse + 1N Liveaboard Vessel",
    stayStyle: "Liveaboard / Guesthouse",
    transferType: "Speedboat",
    isFeatured: false,
    heroImage: IMAGES.coral_dive,
    bestMonths: ["November", "December", "January", "February", "March", "April", "May"],
    staySummary: "4N Maafushi 3★ Guesthouse, 1N Shared Cabin Liveaboard Vessel",
    mealsSummary: "Daily Breakfast, Welcome Dinner Day 1, Sandbank Picnic Lunch Day 3, Liveaboard Lunch & Dinner Day 4, Liveaboard Breakfast Day 5, Farewell Dinner Day 5",
    transportSummary: "All Speedboat Transfers & Liveaboard Transit",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Kochi", "Direct flights to Malé (MLE)"],
    relatedSlugs: [
      "maldives-liveaboard-dive-safari-7d",
      "maldives-manta-ray-reef-7d",
      "maldives-coral-reef-conservation-dive-6d"
    ]
  },
  // 7: FIT #7
  {
    slug: "maldives-whale-shark-safari-5d",
    name: "Maldives Whale Shark Safari",
    days: 5,
    nights: 4,
    packageType: "adventure",
    categoryLabel: "Whale Shark",
    route: "Dhigurah (South Ari Atoll) + Malé",
    islands: ["Dhigurah", "Malé"],
    startCity: "Malé (MLE)",
    endCity: "Malé (MLE)",
    priceFromUSD: 649,
    hotelCategory: "3★ Guesthouse on Dhigurah Island",
    stayStyle: "Guesthouse",
    transferType: "Speedboat",
    isFeatured: true,
    heroImage: IMAGES.whale_shark,
    bestMonths: ["Year-round", "November", "December", "January", "February", "March", "April"],
    staySummary: "3N Dhigurah 3★ Guesthouse, 1N Malé Hotel",
    mealsSummary: "Daily Breakfast, Welcome Dinner Day 1, Sandbank Picnic Lunch Day 3, Farewell Dinner Day 4",
    transportSummary: "Return Speedboat Transfers (MLE–Dhigurah–MLE)",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Kochi", "Direct flights to Malé (MLE)"],
    relatedSlugs: [
      "maldives-local-island-whale-shark-6d",
      "maldives-island-hopping-adventure-7d",
      "maldives-dive-snorkel-discovery-6d"
    ]
  },
  // 8: FIT #8
  {
    slug: "maldives-eco-community-discovery-7d",
    name: "Maldives Eco & Community Discovery",
    days: 7,
    nights: 6,
    packageType: "adventure",
    categoryLabel: "Eco & Community",
    route: "Maafushi + Fulidhoo + Malé",
    islands: ["Maafushi", "Fulidhoo", "Malé"],
    startCity: "Malé (MLE)",
    endCity: "Malé (MLE)",
    priceFromUSD: 649,
    hotelCategory: "3★ Eco-Certified Guesthouses",
    stayStyle: "Guesthouse",
    transferType: "Speedboat",
    isFeatured: false,
    heroImage: IMAGES.guesthouse_island,
    bestMonths: ["November", "December", "January", "February", "March", "April"],
    staySummary: "2N Maafushi Eco-Guesthouse, 2N Fulidhoo Island Guesthouse, 2N Malé Guesthouse",
    mealsSummary: "Daily Breakfast, Welcome Dinner Day 1, Community Family Dinner Day 2, Catch Dinner Day 3, Sandbank Picnic Lunch Day 6, Farewell Dinner Day 6 (Veg/Vegan throughout)",
    transportSummary: "All Speedboat Transfers + Eco Kayaking",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Kochi", "Direct flights to Malé (MLE)"],
    relatedSlugs: [
      "maldives-coral-reef-conservation-dive-6d",
      "maldives-island-hopping-adventure-7d",
      "maldives-manta-ray-reef-7d"
    ]
  },
  // 9: FIT #9
  {
    slug: "maldives-luxury-guesthouse-spa-6d",
    name: "Maldives Luxury Guesthouse & Spa",
    days: 6,
    nights: 5,
    packageType: "honeymoon",
    categoryLabel: "Honeymoon",
    route: "Maafushi 4★ Guesthouse + Malé",
    islands: ["Maafushi", "Malé"],
    startCity: "Malé (MLE)",
    endCity: "Malé (MLE)",
    priceFromUSD: 799,
    hotelCategory: "4★ Premium Guesthouse (Upgraded Sea-View / Beach Access Rooms)",
    stayStyle: "Guesthouse",
    transferType: "Speedboat",
    isFeatured: false,
    heroImage: IMAGES.resort_pool,
    bestMonths: ["November", "December", "January", "February", "March", "April"],
    staySummary: "4N 4★ Premium Maafushi Guesthouse, 1N Malé Hotel",
    mealsSummary: "Daily Breakfast, Welcome Dinner Day 1, Sandbank Picnic Lunch Day 3, Catch Dinner Day 4, Farewell Dinner Day 5",
    transportSummary: "Private Return Speedboat Transfers + Private Sunset Cruise",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Kochi", "Direct flights to Malé (MLE)"],
    relatedSlugs: [
      "maldives-classic-honeymoon-5d",
      "maldives-overwater-villa-honeymoon-6d",
      "maldives-budget-guesthouse-explorer-5d"
    ]
  },
  // 10: FIT #10
  {
    slug: "maldives-multi-atoll-explorer-8d",
    name: "Maldives Multi-Atoll Explorer",
    days: 8,
    nights: 7,
    packageType: "adventure",
    categoryLabel: "Multi-Atoll",
    route: "Kaafu + South Ari + Vaavu + North Malé",
    islands: ["Maafushi", "Dhigurah", "Fulidhoo", "Malé"],
    startCity: "Malé (MLE)",
    endCity: "Malé (MLE)",
    priceFromUSD: 899,
    hotelCategory: "3★ Island Guesthouses across 4 Atolls",
    stayStyle: "Guesthouse",
    transferType: "Speedboat",
    isFeatured: false,
    heroImage: IMAGES.sandbank_bliss,
    bestMonths: ["November", "December", "January", "February", "March", "April"],
    staySummary: "2N Maafushi 3★, 2N Dhigurah 3★, 2N Fulidhoo 3★, 1N Malé Hotel",
    mealsSummary: "Daily Breakfast, Welcome Dinner Day 1, Catch Dinner Day 4, Farewell Dinner Day 6, Day 7 Dinner",
    transportSummary: "All Inter-Atoll Speedboat Transfers across 4 Atolls",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Kochi", "Direct flights to Malé (MLE)"],
    relatedSlugs: [
      "maldives-island-hopping-adventure-7d",
      "maldives-manta-ray-reef-7d",
      "maldives-liveaboard-dive-safari-7d"
    ]
  },
  // 11: FIT #11
  {
    slug: "maldives-bioluminescence-night-wonders-5d",
    name: "Maldives Bioluminescence & Night Wonders",
    days: 5,
    nights: 4,
    packageType: "adventure",
    categoryLabel: "Bioluminescence",
    route: "Vaadhoo Island (Raa Atoll) + Malé",
    islands: ["Vaadhoo (Raa Atoll)", "Malé"],
    startCity: "Malé (MLE)",
    endCity: "Malé (MLE)",
    priceFromUSD: 499,
    hotelCategory: "3★ Guesthouse on Vaadhoo Island (Sea of Stars beach)",
    stayStyle: "Guesthouse",
    transferType: "Domestic flight",
    isFeatured: false,
    heroImage: IMAGES.bioluminescence,
    bestMonths: ["October", "November", "December", "January", "February", "March"],
    staySummary: "3N Vaadhoo Island 3★ Guesthouse, 1N Malé Hotel",
    mealsSummary: "Daily Breakfast, Welcome Dinner Day 1, Sandbank Picnic Lunch Day 3, Farewell Dinner Day 4",
    transportSummary: "Domestic Return Flight (Malé–Ifuru–Malé) + Speedboat Transfers Included",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Kochi", "Direct flights to Malé (MLE)"],
    relatedSlugs: [
      "maldives-guesthouse-hopping-bioluminescence-6d",
      "maldives-budget-guesthouse-explorer-5d",
      "maldives-snorkel-sandbank-bliss-4d"
    ]
  },
  // 12: FIT #12
  {
    slug: "maldives-snorkel-sandbank-bliss-4d",
    name: "Maldives Snorkel & Sandbank Bliss",
    days: 4,
    nights: 3,
    packageType: "adventure",
    categoryLabel: "Short Getaway",
    route: "Maafushi + Malé",
    islands: ["Maafushi", "Malé"],
    startCity: "Malé (MLE)",
    endCity: "Malé (MLE)",
    priceFromUSD: 299,
    hotelCategory: "3★ Beach Guesthouse on Maafushi",
    stayStyle: "Guesthouse",
    transferType: "Speedboat",
    isFeatured: false,
    heroImage: IMAGES.sandbank_bliss,
    bestMonths: ["November", "December", "January", "February", "March", "April", "June", "July", "August"],
    staySummary: "2N Maafushi 3★ Guesthouse, 1N Malé Hotel",
    mealsSummary: "Daily Breakfast, Welcome Dinner Day 1, Sandbank Picnic Lunch Day 3, Farewell Dinner Day 3",
    transportSummary: "Return Speedboat Transfers (Airport–Maafushi–Airport)",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Kochi", "Direct flights to Malé (MLE)"],
    relatedSlugs: [
      "maldives-budget-guesthouse-explorer-5d",
      "maldives-classic-honeymoon-5d",
      "maldives-kuoni-classic-5d"
    ]
  },
  // 13: FIT #13
  {
    slug: "maldives-overwater-villa-honeymoon-6d",
    name: "Maldives Overwater Villa Honeymoon",
    days: 6,
    nights: 5,
    packageType: "honeymoon",
    categoryLabel: "Overwater Villa",
    route: "Overwater Villa Resort (Nika Island or Kuredu or similar)",
    islands: ["Private Resort Island (Crown & Champa or similar)"],
    startCity: "Malé (MLE)",
    endCity: "Malé (MLE)",
    priceFromUSD: 1299,
    hotelCategory: "Luxury Overwater Villa (Nika Island or Kuredu or similar)",
    stayStyle: "Overwater villa",
    transferType: "Seaplane",
    isFeatured: true,
    heroImage: IMAGES.overwater_villa,
    bestMonths: ["November", "December", "January", "February", "March", "April"],
    staySummary: "5 Nights Luxury Overwater Villa with Lagoon Access",
    mealsSummary: "Daily Breakfast, Welcome Dinner Day 1, Private Sandbank Dinner Day 4, Catch Dinner Day 5",
    transportSummary: "Return Seaplane Transfers Included (MLE–Resort–MLE)",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Kochi", "Direct flights to Malé (MLE)"],
    relatedSlugs: [
      "maldives-classic-honeymoon-5d",
      "maldives-all-inclusive-resort-escape-7d",
      "maldives-luxury-guesthouse-spa-6d"
    ]
  },
  // 14: FIT #14 (Note: Public title scrubbed of Kuoni branding)
  {
    slug: "maldives-kuoni-classic-5d",
    name: "Maldives Classic",
    days: 5,
    nights: 4,
    packageType: "adventure",
    categoryLabel: "Classic",
    route: "Maafushi + Malé",
    islands: ["Maafushi", "Malé"],
    startCity: "Malé (MLE)",
    endCity: "Malé (MLE)",
    priceFromUSD: 549,
    hotelCategory: "3★ Vetted Beach Guesthouse on Maafushi",
    stayStyle: "Guesthouse",
    transferType: "Speedboat",
    isFeatured: false,
    heroImage: IMAGES.sunset_cruise,
    bestMonths: ["November", "December", "January", "February", "March", "April"],
    staySummary: "3N Maafushi 3★ Guesthouse, 1N Malé Hotel",
    mealsSummary: "Daily Breakfast, Welcome Dinner Day 1, Sandbank Picnic Lunch Day 3, Catch Dinner Day 3, Farewell Dinner Day 4",
    transportSummary: "Return Speedboat Transfers (Airport–Maafushi–Airport)",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Kochi", "Direct flights to Malé (MLE)"],
    relatedSlugs: [
      "maldives-budget-guesthouse-explorer-5d",
      "maldives-snorkel-sandbank-bliss-4d",
      "maldives-guesthouse-hopping-bioluminescence-6d"
    ]
  },
  // 15: FIT #15
  {
    slug: "maldives-manta-ray-reef-7d",
    name: "Maldives Manta Ray & Reef",
    days: 7,
    nights: 6,
    packageType: "adventure",
    categoryLabel: "Manta Ray",
    route: "Fulidhoo (Vaavu Atoll) + Maafushi + Malé",
    islands: ["Fulidhoo", "Maafushi", "Malé"],
    startCity: "Malé (MLE)",
    endCity: "Malé (MLE)",
    priceFromUSD: 849,
    hotelCategory: "3★ Island Guesthouses on Fulidhoo & Maafushi",
    stayStyle: "Guesthouse",
    transferType: "Speedboat",
    isFeatured: false,
    heroImage: IMAGES.manta_ray,
    bestMonths: ["January", "February", "March", "April", "May", "November", "December"],
    staySummary: "4N Fulidhoo Island Guesthouse, 1N Maafushi 3★, 1N Malé Hotel",
    mealsSummary: "Daily Breakfast, Welcome Dinner Day 1, Sandbank Picnic Lunch Day 4, Farewell Dinner Day 6",
    transportSummary: "All Speedboat Transfers (MLE–Fulidhoo–Maafushi–Malé)",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Kochi", "Direct flights to Malé (MLE)"],
    relatedSlugs: [
      "maldives-dive-snorkel-discovery-6d",
      "maldives-liveaboard-dive-safari-7d",
      "maldives-whale-shark-safari-5d"
    ]
  },
  // 16: FIT #16
  {
    slug: "maldives-coral-reef-conservation-dive-6d",
    name: "Maldives Coral Reef Conservation & Dive",
    days: 6,
    nights: 5,
    packageType: "adventure",
    categoryLabel: "Conservation & Dive",
    route: "Maafushi + South Ari + Malé",
    islands: ["Maafushi", "South Ari Atoll", "Malé"],
    startCity: "Malé (MLE)",
    endCity: "Malé (MLE)",
    priceFromUSD: 699,
    hotelCategory: "3★ Eco-Certified Guesthouse on Maafushi",
    stayStyle: "Guesthouse",
    transferType: "Speedboat",
    isFeatured: false,
    heroImage: IMAGES.coral_dive,
    bestMonths: ["November", "December", "January", "February", "March", "April"],
    staySummary: "4N Eco-Certified Guesthouse Maafushi, 1N Malé Hotel",
    mealsSummary: "Daily Breakfast, Welcome Dinner Day 1, Community Dinner Day 2, Sandbank Picnic Lunch Day 4, Farewell Dinner Day 5 (Veg/Vegan throughout)",
    transportSummary: "All Speedboat Transfers + South Ari Excursion Speedboat",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Kochi", "Direct flights to Malé (MLE)"],
    relatedSlugs: [
      "maldives-eco-community-discovery-7d",
      "maldives-dive-snorkel-discovery-6d",
      "maldives-local-island-whale-shark-6d"
    ]
  },
  // 17: FIT #17
  {
    slug: "maldives-guesthouse-hopping-bioluminescence-6d",
    name: "Maldives Guesthouse Hopping with Bioluminescence",
    days: 6,
    nights: 5,
    packageType: "adventure",
    categoryLabel: "Bioluminescence",
    route: "Maafushi + Guraidhoo + Malé",
    islands: ["Maafushi", "Guraidhoo", "Malé"],
    startCity: "Malé (MLE)",
    endCity: "Malé (MLE)",
    priceFromUSD: 549,
    hotelCategory: "3★ Beach Guesthouses on Maafushi & Guraidhoo",
    stayStyle: "Guesthouse",
    transferType: "Speedboat",
    isFeatured: false,
    heroImage: IMAGES.bioluminescence,
    bestMonths: ["October", "November", "December", "January", "February", "March"],
    staySummary: "2N Maafushi 3★, 2N Guraidhoo 3★, 1N Malé Hotel",
    mealsSummary: "Daily Breakfast, Welcome Dinner Day 1, Sandbank Picnic Lunch Day 3, Catch Dinner Day 4, Farewell Dinner Day 5",
    transportSummary: "All Speedboat Transfers (MLE–Maafushi–Guraidhoo–MLE)",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Kochi", "Direct flights to Malé (MLE)"],
    relatedSlugs: [
      "maldives-bioluminescence-night-wonders-5d",
      "maldives-budget-guesthouse-explorer-5d",
      "maldives-island-hopping-adventure-7d"
    ]
  },
  // 18: FIT #18
  {
    slug: "maldives-liveaboard-dive-safari-7d",
    name: "Maldives Liveaboard Dive Safari",
    days: 7,
    nights: 6,
    packageType: "adventure",
    categoryLabel: "Liveaboard Dive",
    route: "Kaafu → South Ari → Vaavu → Rasdhoo → Baa",
    islands: ["Liveaboard Cruise (Kaafu, South Ari, Vaavu, Rasdhoo, Baa)"],
    startCity: "Malé Harbour (MLE)",
    endCity: "Malé Harbour (MLE)",
    priceFromUSD: 1199,
    hotelCategory: "Dedicated Dive Liveaboard Vessel (En-suite Shared Cabin)",
    stayStyle: "Liveaboard",
    transferType: "Liveaboard vessel",
    isFeatured: false,
    diveRequired: "PADI Open Water certification REQUIRED for diving; Discover Scuba (DSD) available as add-on for non-certified travelers",
    heroImage: IMAGES.liveaboard_safari,
    bestMonths: ["November", "December", "January", "February", "March", "April", "May"],
    staySummary: "6 Nights Aboard Dedicated Dive Liveaboard Vessel (Shared En-Suite Cabin)",
    mealsSummary: "Full Board on Boat: All Breakfasts, Lunches & Dinners on board (Veg/Jain option available)",
    transportSummary: "Harbour Speedboat Transfers + 6 Nights Liveaboard Cruising across 5 Atolls",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Kochi", "Direct flights to Malé (MLE)"],
    relatedSlugs: [
      "maldives-dive-snorkel-discovery-6d",
      "maldives-manta-ray-reef-7d",
      "maldives-multi-atoll-explorer-8d"
    ]
  }
];

export function cleanBrandVoice(text) {
  if (!text) return "";
  let cleaned = text
    .replace(/Maldives Getaway representative/g, "Hassle Free Travels representative")
    .replace(/Maldives Getaway/g, "Hassle Free Travels")
    .replace(/CCR Tours representative/g, "Hassle Free Travels resort coordinator")
    .replace(/CCR Tours \(Crown & Champa\)/g, "Hassle Free Travels")
    .replace(/CCR Tours/g, "Hassle Free Travels")
    .replace(/Atmosphere Core representative/g, "Hassle Free Travels resort coordinator")
    .replace(/Atmosphere Core/g, "Hassle Free Travels")
    .replace(/Atmosphere Kanifushi/g, "Atmosphere Kanifushi (or similar 5★)")
    .replace(/OBLU Select Sangeli/g, "OBLU Select Sangeli (or similar 5★)")
    .replace(/Voyages Maldives representative/g, "Hassle Free Travels representative")
    .replace(/Voyages Maldives/g, "Hassle Free Travels")
    .replace(/Maldives Scuba Tours representative/g, "Hassle Free Travels dive coordinator")
    .replace(/Maldives Scuba Tours/g, "Hassle Free Travels dive team")
    .replace(/MST representative/g, "Hassle Free Travels dive coordinator")
    .replace(/MST dive centre/g, "our PADI 5-star partner dive centre")
    .replace(/MST/g, "Hassle Free Travels dive team")
    .replace(/Maldives Eco Adventures representative/g, "Hassle Free Travels eco guide")
    .replace(/Maldives Eco Adventures/g, "Hassle Free Travels eco team")
    .replace(/MEA representative/g, "Hassle Free Travels eco coordinator")
    .replace(/MEA's coral nursery/g, "our partner marine biology coral nursery")
    .replace(/arranged by MEA/g, "arranged by Hassle Free Travels")
    .replace(/MEA/g, "Hassle Free Travels")
    .replace(/Maldives Finest representative/g, "Hassle Free Travels representative")
    .replace(/Maldives Finest \(Sun Travel\)/g, "Hassle Free Travels")
    .replace(/Maldives Finest/g, "Hassle Free Travels")
    .replace(/Maldives Resorts & Travel representative/g, "Hassle Free Travels coordinator")
    .replace(/Maldives Resorts & Travel/g, "Hassle Free Travels")
    .replace(/Maldives Resorts/g, "Hassle Free Travels")
    .replace(/MRT representative/g, "Hassle Free Travels coordinator")
    .replace(/MRT/g, "Hassle Free Travels")
    .replace(/Maldives Travel & Tours \(MTT\)/g, "Hassle Free Travels")
    .replace(/Maldives Travel & Tours representative/g, "Hassle Free Travels representative")
    .replace(/Maldives Travel & Tours/g, "Hassle Free Travels")
    .replace(/MTT representative/g, "Hassle Free Travels representative")
    .replace(/MTT/g, "Hassle Free Travels")
    .replace(/Kuoni Maldives representative/g, "Hassle Free Travels tour manager")
    .replace(/Kuoni Maldives/g, "Hassle Free Travels")
    .replace(/Kuoni brand recognition for Indian agents/g, "Handcrafted itinerary with verified central stays and seamless transfers")
    .replace(/Kuoni brand — well-known to Indian travel agents/g, "Hassle Free Travels quality guarantee — fully vetted local island stays")
    .replace(/\(reduces cold-start friction\)/g, "")
    .replace(/Kuoni/g, "Hassle Free Travels")
    .replace(/Crown & Champa resort \(Nika Island or Kuredu\)/g, "Crown & Champa luxury resort island (Nika Island, Kuredu, or similar)")
    .replace(/Crown & Champa resort/g, "luxury private resort island (or similar)")
    .replace(/Crown & Champa/g, "Crown & Champa (or similar)")
    .replace(/DMC representative/g, "Hassle Free Travels representative")
    .replace(/arranged by DMC/g, "pre-arranged by Hassle Free Travels")
    .replace(/each DMC/g, "our destination desk")
    .replace(/DMC/g, "local partner")
    .replace(/https?:\/\/[^\s\)]+/g, "")
    .replace(/Source:\s*/g, "")
    // Ensure wildlife sightings are not phrased as guaranteed
    .replace(/guaranteed sightings/gi, "high-probability seasonal sightings")
    .replace(/guaranteed encounters/gi, "typical encounters")
    .trim();

  return cleaned;
}

export function buildPackages() {
  const mdPath = path.resolve("Maldives-packages-hft.md");
  const content = fs.readFileSync(mdPath, "utf-8");

  // Split into package sections: "### FIT #"
  const sections = content.split(/\n(?=### FIT #\d+\s+—)/).slice(1);
  if (sections.length !== 18) {
    throw new Error(`Expected 18 package sections, found ${sections.length}`);
  }

  const resultPackages = [];

  for (let idx = 0; idx < sections.length; idx++) {
    const rawSection = sections[idx];
    const sectionText = rawSection.split(/\n## HFT CMS Mapping Table/)[0];
    const config = PKG_CONFIGS[idx];

    // Extract DMC & source URL for internal CMS fields
    const dmcMatch = sectionText.match(/\*\*DMC:\*\*\s*([^\n]+)/);
    const urlMatch = sectionText.match(/\*\*(?:Product )?URL:\*\*\s*([^\n]+)/);
    const sourceDmc = dmcMatch ? dmcMatch[1].trim() : "Hassle Free Travels Partner";
    const sourceUrl = urlMatch ? urlMatch[1].trim() : "";

    // Extract days
    const dayRegex = /\*\*Day\s+(\d+)\s+—\s+([^\n*]+)\*\*([\s\S]*?)(?=\*\*Day\s+\d+\s+—|\*\*Inclusions:\*\*|$)/g;
    const itineraryDays = [];
    let match;

    while ((match = dayRegex.exec(sectionText)) !== null) {
      const dayNumber = parseInt(match[1], 10);
      const title = cleanBrandVoice(match[2].trim());
      const rawBodyAndMeta = match[3];

      let meals = "Breakfast";
      let stay = config.staySummary ? config.staySummary.split(",")[0].trim() : "Island stay";

      const mealsMatch = rawBodyAndMeta.match(/Meals:\s*([^\n·]+)/i);
      if (mealsMatch) {
        meals = mealsMatch[1].replace(/Source:.*$/, "").trim();
      }

      // If overnight island is mentioned in body
      const overnightMatch = rawBodyAndMeta.match(/Overnight\s+([^\n.]+)/i);
      if (overnightMatch) {
        stay = overnightMatch[1].replace(/Source:.*$/, "").trim();
      }

      let body = rawBodyAndMeta
        .replace(/Meals:[\s\S]*$/, "")
        .replace(/Source:.*$/gm, "")
        .trim();

      body = cleanBrandVoice(body);

      // Ensure "or similar" is applied to luxury resort mentions
      if (body.includes("Kanifushi") && !body.includes("or similar")) {
        body = body.replace(/Kanifushi/g, "Kanifushi (or similar 5★)");
      }
      if (body.includes("OBLU") && !body.includes("or similar")) {
        body = body.replace(/OBLU/g, "OBLU (or similar 5★)");
      }
      if (body.includes("Nika Island") && !body.includes("or similar")) {
        body = body.replace(/Nika Island/g, "Nika Island (or similar 5★)");
      }
      if (body.includes("Kuredu") && !body.includes("or similar")) {
        body = body.replace(/Kuredu/g, "Kuredu (or similar 4★/5★)");
      }

      itineraryDays.push({
        dayNumber,
        title: `Day ${dayNumber} — ${title}`,
        body,
        meals,
        stay
      });
    }

    // Extract Highlights
    let highlights = [];
    const hlMatch = sectionText.match(/\*\*Highlights:\*\*([\s\S]*?)(?=\*\*Full Itinerary:\*\*|\*\*Day 1 —)/i);
    if (hlMatch) {
      const hlLines = hlMatch[1].split("\n").filter(l => l.trim().startsWith("-"));
      highlights = hlLines.map(l => cleanBrandVoice(l.replace(/^-\s*/, "").trim())).filter(Boolean);
    }
    if (highlights.length === 0) {
      highlights = itineraryDays.slice(0, 4).map(d => d.title.replace(/^Day \d+\s+—\s+/, ""));
    }

    // Extract Inclusions
    let inclusions = [];
    const incBlockMatch = sectionText.match(/\*\*Inclusions:\*\*\s*([\s\S]*?)(?=\*\*Exclusions:\*\*)/i);
    if (incBlockMatch) {
      const incContent = incBlockMatch[1].trim();
      if (incContent.includes("\n-")) {
        inclusions = incContent.split("\n")
          .filter(l => l.trim().startsWith("-"))
          .map(l => cleanBrandVoice(l.replace(/^-\s*/, "").trim()))
          .filter(Boolean);
      } else {
        inclusions = incContent.split(";")
          .map(s => cleanBrandVoice(s.replace(/^\*\*Inclusions:\*\*\s*/, "").trim()))
          .filter(Boolean);
      }
    }

    // Extract Exclusions
    let exclusions = [];
    const excBlockMatch = sectionText.match(/\*\*Exclusions:\*\*\s*([\s\S]*?)(?=\*\*Visa note:\*\*|\*\*Why trending 2026:\*\*|$)/i);
    if (excBlockMatch) {
      const excContent = excBlockMatch[1].trim();
      if (excContent.includes("\n-")) {
        exclusions = excContent.split("\n")
          .filter(l => l.trim().startsWith("-"))
          .map(l => cleanBrandVoice(l.replace(/^-\s*/, "").trim()))
          .filter(Boolean);
      } else {
        exclusions = excContent.split(";")
          .map(s => cleanBrandVoice(s.replace(/^\*\*Exclusions:\*\*\s*/, "").trim()))
          .filter(Boolean);
      }
    }

    // Standardize essential inclusions/exclusions notes
    if (!inclusions.some(i => i.toLowerCase().includes("vegetarian") || i.toLowerCase().includes("jain"))) {
      inclusions.push("Indian vegetarian & Jain meal options coordinated on advance request");
    }
    if (!exclusions.some(e => e.toLowerCase().includes("international flights"))) {
      exclusions.unshift("International flights to/from Malé (MLE)");
    }
    if (!exclusions.some(e => e.toLowerCase().includes("alcoholic")) && config.categoryLabel !== "All-Inclusive Resort") {
      exclusions.push("Alcoholic beverages (strictly unavailable on local guesthouse islands; permitted only at private resorts / liveaboard)");
    }

    // Special inclusions verification
    if (config.slug === "maldives-bioluminescence-night-wonders-5d") {
      if (!inclusions.some(i => i.toLowerCase().includes("domestic flight"))) {
        inclusions.push("Domestic return flights (Malé–Ifuru–Malé) included");
      }
    }
    if (config.slug === "maldives-all-inclusive-resort-escape-7d" || config.slug === "maldives-overwater-villa-honeymoon-6d") {
      if (!inclusions.some(i => i.toLowerCase().includes("seaplane"))) {
        inclusions.push("Roundtrip scenic seaplane transfers (Malé–Resort–Malé) included");
      }
    }
    if (config.slug === "maldives-liveaboard-dive-safari-7d") {
      if (!inclusions.some(i => i.toLowerCase().includes("up to 18 dives"))) {
        inclusions.push("Up to 18 guided boat dives across 5 atolls with tanks, weights and dive guide");
      }
      if (!exclusions.some(e => e.toLowerCase().includes("equipment rental"))) {
        exclusions.push("Dive equipment rental (BCD, regulator, wetsuit, dive computer available for hire on board)");
      }
    }

    const TAGLINES = {
      "maldives-budget-guesthouse-explorer-5d": "Maafushi Island budget getaway with house reef snorkelling, sandbank picnic & dolphin cruise",
      "maldives-island-hopping-adventure-7d": "Explore Maafushi, Dhigurah & Fulidhoo with South Ari whale sharks & Vaavu manta rays",
      "maldives-classic-honeymoon-5d": "Romantic overwater bungalow stay with sunset cruise, private sandbank & couples spa",
      "maldives-all-inclusive-resort-escape-7d": "Premium all-inclusive escape with scenic seaplane transfers & unlimited watersports",
      "maldives-local-island-whale-shark-6d": "Local island hopping with world-renowned South Ari Atoll whale shark encounters",
      "maldives-dive-snorkel-discovery-6d": "Certified reef dives, overnight liveaboard stay & whale shark snorkelling safari",
      "maldives-whale-shark-safari-5d": "Three dedicated whale shark excursions based on idyllic Dhigurah Island",
      "maldives-eco-community-discovery-7d": "Coral restoration certification, traditional fishing village stay & guided eco-kayaking",
      "maldives-luxury-guesthouse-spa-6d": "4★ beachfront guesthouse indulgence with couples spa, private sunset cruise & sandbank picnic",
      "maldives-multi-atoll-explorer-8d": "Comprehensive 4-atoll expedition across Kaafu, South Ari, Vaavu and North Malé",
      "maldives-bioluminescence-night-wonders-5d": "Witness the magical Sea of Stars on Vaadhoo Island with domestic flights included",
      "maldives-snorkel-sandbank-bliss-4d": "The ultimate 4-day tropical add-on with house reef snorkelling & sandbank picnic",
      "maldives-overwater-villa-honeymoon-6d": "Seaplane arrival to a private overwater villa with romantic sunset sandbank dinner",
      "maldives-kuoni-classic-5d": "Classic Maafushi island discovery with dolphin cruise, water sports & Malé tour",
      "maldives-manta-ray-reef-7d": "Three manta ray snorkel excursions in pristine Vaavu Atoll plus whale shark day trip",
      "maldives-coral-reef-conservation-dive-6d": "Coral reef restoration project, PADI Discover Scuba diving & marine biology walks",
      "maldives-guesthouse-hopping-bioluminescence-6d": "Two-island guesthouse escape across Maafushi and Guraidhoo with bioluminescence walks",
      "maldives-liveaboard-dive-safari-7d": "6 nights liveaboard cruise with up to 18 dives across 5 legendary atolls"
    };
    const tagline = TAGLINES[config.slug] || `Explore ${config.route} in the tropical Maldives`;

    const priceFromINR = roundToMarketingPrice(config.priceFromUSD * USD_TO_INR);
    const priceNote = "From · per person · twin share · land only · international flights extra";
    const visaNote = DEFAULT_MALDIVES_VISA_NOTE;

    const seoTitle = `${config.name} (${config.days}D/${config.nights}N) | Hassle Free Travels`;
    const seoDescription = `${config.name} (${config.days} Days / ${config.nights} Nights) Maldives tour: ${config.route}. From ₹${priceFromINR.toLocaleString("en-IN")} ($${config.priceFromUSD} USD) twin share. Free 30-day visa on arrival for Indians. Book with Hassle Free Travels.`;

    resultPackages.push({
      slug: config.slug,
      destinationSlug: "maldives",
      name: config.name,
      tagline,
      days: config.days,
      nights: config.nights,
      packageType: config.packageType,
      categoryLabel: config.categoryLabel,
      route: config.route,
      islands: config.islands,
      startCity: config.startCity,
      endCity: config.endCity,
      startAirport: "MLE",
      endAirport: "MLE",
      stayStyle: config.stayStyle,
      transferType: config.transferType,
      priceFromUSD: config.priceFromUSD,
      priceFromINR,
      priceUnit: "per person (twin share)",
      priceNote,
      hotelCategory: config.hotelCategory,
      bestMonths: config.bestMonths,
      highlights,
      itineraryDays,
      inclusions,
      exclusions,
      visaNote,
      isGroup: false, // 0 fixed group departures
      diveRequired: config.diveRequired,
      audience: "Couples, Honeymooners, Young Travellers (18–35), Snorkelers & Divers",
      isFeatured: config.isFeatured,
      relatedSlugs: config.relatedSlugs,
      heroImage: config.heroImage,
      seoTitle,
      seoDescription,
      mealsSummary: config.mealsSummary,
      staySummary: config.staySummary,
      transportSummary: config.transportSummary,
      departureCities: config.departureCities,
      sourceDmc,
      sourceUrl
    });
  }

  return resultPackages;
}

export function generateTsFile() {
  const packages = buildPackages();

  const tsContent = `// Auto-generated by scripts/build-maldives-packages.mjs
// Do not edit manually - run 'node scripts/build-maldives-packages.mjs' to regenerate

export interface MaldivesDay {
  dayNumber: number;
  title: string;
  body: string;
  meals?: string;
  stay?: string;
}

export interface MaldivesPackage {
  slug: string;
  destinationSlug: "maldives";
  name: string;
  tagline: string;
  days: number;
  nights: number;
  packageType: string;
  categoryLabel: string;
  route: string;
  islands: string[];
  startCity: string;
  endCity: string;
  startAirport: string;
  endAirport: string;
  stayStyle: string;
  transferType: string;
  priceFromUSD: number;
  priceFromINR: number;
  priceUnit: string;
  priceNote: string;
  hotelCategory: string;
  bestMonths: string[];
  highlights: string[];
  itineraryDays: MaldivesDay[];
  inclusions: string[];
  exclusions: string[];
  visaNote: string;
  isGroup: boolean;
  diveRequired?: string;
  audience?: string;
  isFeatured: boolean;
  relatedSlugs: string[];
  heroImage: string;
  seoTitle: string;
  seoDescription: string;
  mealsSummary?: string;
  staySummary?: string;
  transportSummary?: string;
  departureCities?: string[];
  sourceDmc?: string;
  sourceUrl?: string;
}

export const USD_TO_INR = 84;

export function roundToMarketingPrice(inr: number): number {
  return Math.ceil(inr / 1000) * 1000 - 1; // e.g. 33516 -> 33999
}

export const DEFAULT_MALDIVES_VISA_NOTE =
  "Free 30-day visa on arrival at Malé Velana International Airport (MLE) for Indian passport holders. No pre-application required; valid passport (6+ months validity), confirmed hotel booking/resort voucher, and return ticket required. Official portal: https://www.immigration.gov.mv";

export const MALDIVES_PACKAGES: MaldivesPackage[] = ${JSON.stringify(packages, null, 2)};

export function getMaldivesPackageBySlug(slug: string): MaldivesPackage | undefined {
  const clean = slug.toLowerCase();
  return MALDIVES_PACKAGES.find(
    (pkg) => pkg.slug === clean
  );
}

export function getMaldivesFeaturedPackages(): MaldivesPackage[] {
  return MALDIVES_PACKAGES.filter((pkg) => pkg.isFeatured);
}
`;

  const targetPath = path.resolve("src/data/maldives-packages.ts");
  fs.writeFileSync(targetPath, tsContent, "utf-8");
  console.log("Successfully generated " + targetPath + " with " + packages.length + " packages!");
}

generateTsFile();
