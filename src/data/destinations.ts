export interface PackageItineraryDay {
  day: number;
  title: string;
  description: string;
  stay: string;
  meals: string;
  altitude?: string;
}

export interface TourPackage {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  nights: number;
  days: number;
  category: string;
  badge: string;
  rating: number;
  reviewCount: number;
  pickupDrop: string;
  route: string;
  originalPrice: number;
  discountedPrice: number;
  image: string;
  highlights: string[];
  inclusions: string[];
  itinerary: PackageItineraryDay[];
}

export interface DestinationFAQ {
  q: string;
  a: string;
}

export interface DestinationPlace {
  name: string;
  tag: string;
  elevation: string;
  description: string;
  image: string;
}

export interface DestinationReview {
  name: string;
  city: string;
  rating: number;
  date: string;
  trip: string;
  comment: string;
}

export interface DestinationHero {
  title: string;
  badge: string;
  subtitle: string;
  ratingText: string;
  startingPrice: string;
  image: string;
  perks: string[];
}

export interface DestinationWhyUs {
  icon: string;
  title: string;
  description: string;
}

export interface DestinationRoute {
  badge: string;
  title: string;
  path: string;
  description: string;
}

export interface DestinationSeason {
  type: "summer" | "winter";
  badge: string;
  title: string;
  months: string;
  description: string;
  points: string[];
}

export interface Trending2026Info {
  badge: string;
  tagline: string;
  whyTrending: string;
  travelerTypes: string;
  season: string;
  duration: string;
  fromPriceHint?: string;
  highlights: string[];
  driver: string;
  visaNote?: string;
  relatedSlugs?: string[];
}

export interface DestinationData {
  id: string;
  name: string;
  type?: "international" | "domestic";
  trending2026?: Trending2026Info;
  hero: DestinationHero;
  categories: string[];
  packages: TourPackage[];
  faqs: DestinationFAQ[];
  places: DestinationPlace[];
  reviews: DestinationReview[];
  whyUs: DestinationWhyUs[];
  seasons: DestinationSeason[];
  routes: DestinationRoute[];
}

// Generates generic package data for quick mock generation
const generateGenericPackages = (destinationName: string, image: string): TourPackage[] => [
  {
    id: `${destinationName.toLowerCase().replace(/\s+/g, '-')}-classic`,
    title: `Classic ${destinationName} Experience`,
    subtitle: `The ultimate 7-day tour covering all highlights of ${destinationName}`,
    duration: "6N / 7D",
    nights: 6,
    days: 7,
    category: "Classic Tours",
    badge: "Bestseller",
    rating: 4.8,
    reviewCount: 450,
    pickupDrop: "Local Airport / Station",
    route: `Arrival → Highlights → Nature → Departure`,
    originalPrice: 35000,
    discountedPrice: 28999,
    image,
    highlights: ["Guided City Tour", "Nature Walks", "Authentic Local Cuisine", "Cultural Highlights"],
    inclusions: ["Airport/Station Transfers", "3/4 Star Accommodations", "Daily Breakfast", "English/Hindi Speaking Guide"],
    itinerary: Array.from({ length: 7 }).map((_, i) => ({
      day: i + 1,
      title: i === 0 ? "Arrival & Welcome" : i === 6 ? "Departure" : "Sightseeing & Exploration",
      description: `Enjoy the best of ${destinationName} with curated experiences.`,
      stay: "Premium Hotel / Resort",
      meals: i === 0 ? "Dinner" : i === 6 ? "Breakfast" : "Breakfast & Dinner"
    }))
  },
  {
    id: `${destinationName.toLowerCase().replace(/\s+/g, '-')}-short`,
    title: `${destinationName} Quick Escape`,
    subtitle: `A refreshing getaway to ${destinationName}`,
    duration: "3N / 4D",
    nights: 3,
    days: 4,
    category: "Short Getaways",
    badge: "Quick Break",
    rating: 4.7,
    reviewCount: 320,
    pickupDrop: "Local Airport / Station",
    route: `Arrival → Top Sights → Departure`,
    originalPrice: 18000,
    discountedPrice: 14500,
    image,
    highlights: ["Fast-paced sightseeing", "Premium stays", "Hassle-free transfers"],
    inclusions: ["Transfers", "Accommodations", "Breakfast"],
    itinerary: Array.from({ length: 4 }).map((_, i) => ({
      day: i + 1,
      title: i === 0 ? "Arrival" : i === 3 ? "Departure" : "Exploration",
      description: `Discover the beauty of ${destinationName}.`,
      stay: "Premium Hotel / Resort",
      meals: "Breakfast"
    }))
  }
];

// Spiti Valley
const spitiData: DestinationData = {
  id: "spiti",
  name: "Spiti Valley",
  type: "domestic",
  hero: {
    title: "Spiti Valley Tour Packages 2026",
    badge: "🏔️ Highest Mountain Passes • Tibetan Culture • Rugged Terrains",
    subtitle: "Experience the untamed magic of the 'Middle Land' between India and Tibet. From thousand-year-old monasteries and high crescent lakes to thrilling 4x4 expeditions and Royal Enfield bike trips.",
    ratingText: "⭐ 4.9 / 5 (5,000+ Traveler Reviews)",
    startingPrice: "Starts from ₹16,499 / person",
    image: "/images/spiti/spiti-hero.jpg",
    perks: ["Oxygen Fitted Vehicles", "100% Acclimatization Safe"]
  },
  categories: ["All Packages", "Road Trips", "Bike Trips", "Backpacking Trips", "Winter Expeditions", "Short Getaways"],
  packages: [
    {
      id: "spiti-circuit-shimla-to-manali",
      title: "Spiti Valley Circuit (Shimla to Manali)",
      subtitle: "The Ultimate 8 Nights Full Circuit Himalayan Road Trip",
      duration: "8N / 9D",
      nights: 8,
      days: 9,
      category: "Road Trips",
      badge: "Bestseller",
      rating: 4.9,
      reviewCount: 1420,
      pickupDrop: "Delhi / Chandigarh",
      route: "Delhi → Narkanda → Sangla → Kalpa → Tabo → Kaza → Chandratal → Manali → Delhi",
      originalPrice: 28999,
      discountedPrice: 22999,
      image: "/images/spiti/spiti-hero.jpg",
      highlights: [
        "Key Monastery & 1000-year-old Dhankar Monastery",
        "World's Highest Post Office in Hikkim",
        "Camping under stars at Chandratal Lake",
      ],
      inclusions: [
        "Comfortable Tempo Traveller / SUV",
        "8 Nights accommodation (Hotels, Homestays & Camps)",
        "16 Meals (8 Breakfasts + 8 Dinners)",
        "Experienced Trip Captain",
        "Emergency Oxygen Cylinder",
      ],
      itinerary: [
        { day: 1, title: "Delhi to Narkanda", description: "Assemble at Delhi in the evening. Board the comfortable AC vehicle.", stay: "Hotel in Narkanda", meals: "Dinner", altitude: "2,708 m" },
        { day: 2, title: "Narkanda to Chitkul", description: "Drive along the mighty Sutlej.", stay: "Resort in Sangla", meals: "Breakfast & Dinner", altitude: "3,450 m" },
        { day: 3, title: "Chitkul to Kalpa", description: "Explore the apple orchards.", stay: "Hotel in Kalpa", meals: "Breakfast & Dinner", altitude: "2,960 m" },
        { day: 4, title: "Kalpa to Kaza", description: "Cross into the barren, Martian moonscapes.", stay: "Hotel in Kaza", meals: "Breakfast & Dinner", altitude: "3,800 m" },
        { day: 5, title: "Hikkim, Komic & Langza", description: "Send postcards from Hikkim.", stay: "Hotel in Kaza", meals: "Breakfast & Dinner", altitude: "4,587 m" },
        { day: 6, title: "Key Monastery & Chicham Bridge", description: "Ascend to Key Monastery.", stay: "Hotel in Kaza", meals: "Breakfast & Dinner", altitude: "4,166 m" },
        { day: 7, title: "Kaza to Chandratal", description: "Trek to the divine crescent-shaped Chandratal Lake.", stay: "Swiss Tents", meals: "Breakfast & Dinner", altitude: "4,300 m" },
        { day: 8, title: "Chandratal to Manali", description: "Drive through Atal Tunnel.", stay: "Hotel in Manali", meals: "Breakfast & Dinner", altitude: "2,050 m" },
        { day: 9, title: "Manali to Delhi", description: "Board the return vehicle.", stay: "Transit", meals: "Breakfast", altitude: "216 m" }
      ]
    }
  ],
  faqs: [
    { q: "What is the best time to visit Spiti Valley?", a: "Mid-May to mid-October for summer, Nov to April for winter." },
    { q: "How does Hassle Free Travels handle AMS?", a: "We ensure gradual acclimatization and carry medical-grade oxygen." }
  ],
  places: [
    { name: "Key Monastery", tag: "Spiritual Marvel", elevation: "4,166 m", description: "Largest Buddhist monastery in Spiti.", image: "/images/spiti/spiti-hero.jpg" },
    { name: "Chandratal Lake", tag: "Glacial Wonder", elevation: "4,300 m", description: "Crescent-shaped high altitude lake.", image: "/images/spiti/chandratal.jpg" }
  ],
  reviews: [
    { name: "Aakash Mehta", city: "Mumbai", rating: 5, date: "July 2025", trip: "Spiti Circuit", comment: "Hands down the most well-organized road trip!" }
  ],
  whyUs: [
    { icon: "🩺", title: "Oxygen Cylinders & First Aid", description: "Every vehicle carries medical oxygen." },
    { icon: "🧗", title: "Certified Trip Captains", description: "Seasoned mountaineers and storytellers." }
  ],
  seasons: [
    { type: "summer", badge: "☀️ Summer Season", title: "May to October", months: "Clear Skies • Open Passes", description: "Peak tourism season.", points: ["Camping operational", "Full circuit open"] },
    { type: "winter", badge: "❄️ Winter Expedition", title: "November to April", months: "Sub-Zero • Snow Leopards", description: "Extreme adventurers only.", points: ["Spot Snow Leopards", "Frozen waterfalls"] }
  ],
  routes: [
    { badge: "Route 1", title: "Via Shimla", path: "Delhi → Shimla → Kinnaur → Kaza", description: "Gradual ascent, best for acclimatization." },
    { badge: "Route 2", title: "Via Manali", path: "Delhi → Manali → Atal Tunnel → Kaza", description: "Fastest route, summer only." }
  ]
};

// Generic generator for untrending legacy destinations
const generateDestinationData = (id: string, name: string, image: string, type: "international" | "domestic" = "international"): DestinationData => ({
  id,
  name,
  type,
  hero: {
    title: `${name} Tour Packages 2026`,
    badge: `✨ Premium Stays • Expert Guides • Seamless Logistics`,
    subtitle: `Discover the breathtaking beauty, rich culture, and incredible landscapes of ${name}. Curated itineraries designed for the modern Indian traveler.`,
    ratingText: "⭐ 4.8 / 5 (2,000+ Traveler Reviews)",
    startingPrice: "Starts from ₹14,999 / person",
    image,
    perks: ["Curated Experiences", "Hassle-Free Booking"]
  },
  categories: ["All Packages", "Classic Tours", "Short Getaways", "Honeymoon", "Adventure"],
  packages: generateGenericPackages(name, image),
  faqs: [
    { q: `What is the best time to visit ${name}?`, a: `The ideal time to visit ${name} depends on the region, but generally spring and autumn offer pleasant weather.` },
    { q: `Do I need a visa for ${name}?`, a: `Visa requirements vary by destination. Hassle Free Travels provides end-to-end visa assistance.` }
  ],
  places: [
    { name: `Iconic Landmark of ${name}`, tag: "Must Visit", elevation: "Varies", description: `One of the most famous and breathtaking locations in ${name}.`, image }
  ],
  reviews: [
    { name: "Sarah Jenkins", city: "Bangalore", rating: 5, date: "August 2025", trip: `${name} Classic`, comment: `Absolutely loved our time in ${name}. The tour was seamlessly organized by Hassle Free Travels.` }
  ],
  whyUs: [
    { icon: "🛡️", title: "Trusted Experts", description: `Years of experience crafting the perfect ${name} itineraries.` },
    { icon: "💎", title: "Premium Quality", description: "Handpicked hotels and certified local guides." }
  ],
  seasons: [
    { type: "summer", badge: "☀️ High Season", title: "Peak Travel Months", months: "Perfect Weather", description: `Experience ${name} at its finest.`, points: ["Great weather", "All attractions open"] },
    { type: "winter", badge: "❄️ Shoulder Season", title: "Off-Peak Travel", months: "Fewer Crowds", description: `Enjoy a quieter, more intimate ${name}.`, points: ["Better rates", "Local festivals"] }
  ],
  routes: [
    { badge: "By Air", title: "Direct & Connecting Flights", path: `Flights to ${name}`, description: "Major airlines offer convenient direct connections from Indian metros." }
  ]
});

// ========================================
// 10 TRENDING 2026 DESTINATIONS
// ========================================

// 1. Thailand (International)
// TODO: Replace with real Thailand photography (e.g., /destinations/thailand.jpg)
const thailandData: DestinationData = {
  id: "thailand",
  name: "Thailand",
  type: "international",
  trending2026: {
    badge: "Trending 2026",
    tagline: "India’s default international holiday in 2026",
    whyTrending: "Highest Indian booking volume in 2026. Cleartrip reported a sharp rise into Bangkok/Phuket; ~2.48M Indian visitors in 2025. Agoda ranked it #1 among visa-free destinations Indians searched.",
    travelerTypes: "First-time outbound families, friend groups, couples, last-minute bookers",
    season: "Nov–Feb peak; also May–Jun school holidays and Diwali/year-end. Bangkok year-round.",
    duration: "5–7 nights (typical 6N/7D)",
    fromPriceHint: "Around ₹80,000 pp including flights for 6N/7D — confirm against live dates",
    highlights: ["Bangkok city & temples", "Pattaya coral island", "Phuket beaches", "Krabi island hopping", "Chiang Rai culture add-on"],
    driver: "Short-haul Asia substitute after West Asia flight disruptions; easy entry + direct flights from Indian metros.",
    visaNote: "Thailand e-visa recommended at https://www.thaievisa.go.th (approx. USD 35, 15-day single entry). Visa-on-arrival also available at BKK/HKT airports.",
    relatedSlugs: ["vietnam", "malaysia"]
  },
  hero: {
    title: "Thailand Tour Packages 2026",
    badge: "🔥 Trending 2026 • India’s #1 International Getaway",
    subtitle: "India’s default international holiday in 2026. From Bangkok's glittering temples to the turquoise waters of Phuket and Krabi, enjoy seamless holidays curated for Indian travellers.",
    ratingText: "⭐ 4.9 / 5 (3,800+ Traveler Reviews)",
    startingPrice: "Starts from ₹31,999 / person",
    image: "/dest-beach.jpg",
    perks: ["Indian Meal Options", "Direct Flights Support", "English/Hindi Speaking Guides"]
  },
  categories: ["All Packages", "Group", "Private", "Adventure", "Beach", "Honeymoon", "Family", "Culinary", "Luxury", "Heritage", "Wellness"],
  packages: generateGenericPackages("Thailand", "/dest-beach.jpg"),
  faqs: [
    { q: "Why is Thailand trending so strongly for Indians in 2026?", a: "With 2026 search and booking reports ranking Thailand #1 among visa-free/easy entry destinations and sharp surges into Bangkok and Phuket, it is the most reliable, high-value international holiday for Indian families and groups." },
    { q: "What is the recommended trip duration for Thailand?", a: "A 5 to 7 nights itinerary (typical 6N/7D) is ideal to combine Bangkok with either Phuket, Pattaya, or Krabi." },
    { q: "Are Indian vegetarian and Jain meals easily available?", a: "Yes, our curated Thailand tours partner with vetted restaurants offering authentic Indian vegetarian, Jain, and non-veg dining." }
  ],
  places: [
    { name: "Phuket & Phi Phi Islands", tag: "Tropical Wonder", elevation: "Sea Level", description: "Breathtaking limestone cliffs rising over emerald-green Andaman waters.", image: "/dest-beach.jpg" },
    { name: "Grand Palace & Bangkok Temples", tag: "Cultural Icon", elevation: "1.5 m", description: "Opulent royal architecture and sacred Buddha shrines in the heart of Thailand.", image: "/dest-jungle.jpg" }
  ],
  reviews: [
    { name: "Ananya Deshmukh", city: "Mumbai", rating: 5, date: "January 2026", trip: "Thailand Classic 6N/7D", comment: "Our family holiday to Bangkok & Phuket was 100% hassle-free. Everything from private transfers to Indian dinners was spot on." }
  ],
  whyUs: [
    { icon: "✈️", title: "Direct Flight Coordinators", description: "Round-the-clock ground assistance connecting seamless metro departures." },
    { icon: "🍛", title: "Indian Food Guaranteed", description: "Handpicked Indian restaurants included on all family tour plans." }
  ],
  seasons: [
    { type: "summer", badge: "☀️ Best Weather", title: "November to February", months: "Pleasant & Sunny", description: "Ideal tropical weather for beach relaxation and sightseeing.", points: ["Calm seas in Andaman", "Festive night markets"] },
    { type: "winter", badge: "🌴 School Holidays & Shoulder", title: "May to June & Diwali", months: "Family Break", description: "Great rates and vibrant shopping breaks across Bangkok and Pattaya.", points: ["Excellent hotel deals", "Year-round indoor entertainment"] }
  ],
  routes: [
    { badge: "By Air", title: "Direct Flights", path: "Delhi / Mumbai / Bangalore / Kolkata → Bangkok / Phuket", description: "Multiple daily non-stop flights connecting Indian hubs in under 4.5 hours." }
  ]
};

// 2. Japan (International)
// TODO: Replace with real Japan photography (e.g., /destinations/japan.jpg)
const japanData: DestinationData = {
  id: "japan",
  name: "Japan",
  type: "international",
  trending2026: {
    badge: "Most searched 2026",
    tagline: "India’s most-searched international destination for summer 2026",
    whyTrending: "Booking.com summer 2026 searches put Tokyo #1. Osaka and Kyoto also entered the top 10. Airbnb India: Tokyo searches +90%, Osaka +85%.",
    travelerTypes: "Millennial couples, multi-gen families, food travellers, anime/J-culture fans",
    season: "Late Mar–Apr cherry blossom (books from previous Sep); Oct–Nov autumn; summer city breaks",
    duration: "8–10 nights (typical Tokyo–Osaka–Kyoto)",
    fromPriceHint: "Around ₹2.8 lakh pp including flights for 8N/9D — enquire for live 2026 departures",
    highlights: ["Tokyo futuristic districts", "Osaka street food", "Kyoto ancient temples & bamboo groves", "Kanazawa heritage", "Hiroshima Peace Memorial"],
    driver: "Favourable Yen value vs Europe + more nonstop flights from Mumbai, Delhi, Bengaluru.",
    relatedSlugs: ["thailand", "vietnam"]
  },
  hero: {
    title: "Japan Tour Packages 2026",
    badge: "🌸 Most Searched 2026 • Cherry Blossoms & Bullet Trains",
    subtitle: "India’s most-searched international destination for 2026. Explore futuristic Tokyo, historic Kyoto, and the street-food capital of Osaka with seamless Shinkansen rail passes.",
    ratingText: "⭐ 4.9 / 5 (1,900+ Traveler Reviews)",
    startingPrice: "Starts from ₹35,999 / person",
    image: "/dest-jungle.jpg",
    perks: ["JR Pass Support", "Bilingual Local Concierge", "Curated Vegetarian Guide"]
  },
  categories: ["All Packages", "Group", "Private", "Adventure", "Honeymoon", "Family", "Culinary", "Spiritual", "Beach", "Pop Culture", "Heritage"],
  packages: generateGenericPackages("Japan", "/dest-jungle.jpg"),
  faqs: [
    { q: "Why is Japan experiencing such massive search growth in 2026?", a: "2026 travel data shows Tokyo topping summer searches with +90% spikes on Airbnb India, driven by favourable Yen currency exchange vs Europe and direct flights from Delhi, Mumbai, and Bengaluru." },
    { q: "When should I book for Cherry Blossom (Sakura) season?", a: "Sakura peak runs late March through mid-April. We recommend booking 5–6 months in advance as luxury ryokans and rail hotels fill rapidly." },
    { q: "Is Japan convenient for Indian vegetarians?", a: "Yes. Our Hassle Free Travels guides provide certified vegetarian and Indian dining maps across Tokyo, Kyoto, and Osaka." }
  ],
  places: [
    { name: "Kyoto Fushimi Inari & Arashiyama", tag: "Heritage Treasure", elevation: "Varies", description: "Thousands of vermillion torii gates winding through sacred cedar hills.", image: "/dest-jungle.jpg" },
    { name: "Tokyo Shibuya & Shinjuku", tag: "Futuristic Wonder", elevation: "40 m", description: "Electric neon skylines, cutting-edge gastronomy, and vibrant anime subcultures.", image: "/dest-mountain.jpg" }
  ],
  reviews: [
    { name: "Rohan & Meera Kapoor", city: "Delhi", rating: 5, date: "April 2026", trip: "Japan Golden Route 9N/10D", comment: "The Shinkansen bullet train transfers and ryokan stays were extraordinary. Hassle Free Travels made visa and navigation so effortless." }
  ],
  whyUs: [
    { icon: "🚅", title: "Seamless Bullet Train Logistics", description: "Pre-reserved Shinkansen seats and luggage forwarding service." },
    { icon: "⛩️", title: "Exclusive Tea Ceremony Access", description: "Private cultural experiences with local Japanese hosts in Kyoto." }
  ],
  seasons: [
    { type: "summer", badge: "🌸 Cherry Blossom & Autumn", title: "Late March–April & Oct–Nov", months: "Sakura & Foliage", description: "The most picturesque seasons with world-famous blossoms and fiery red maples.", points: ["Book early for cherry blossoms", "Crisp, pleasant walking weather"] },
    { type: "winter", badge: "🏮 Summer City Breaks & Festivals", title: "May to August", months: "Vibrant Culture", description: "Exciting traditional summer matsuri festivals, fireworks, and shopping.", points: ["Dynamic nightlife", "Mount Fuji climbing season"] }
  ],
  routes: [
    { badge: "By Air", title: "Non-stop Flights", path: "Delhi / Mumbai / Bengaluru → Tokyo (Haneda / Narita)", description: "Direct connections via ANA, Japan Airlines, and Air India." }
  ]
};

// 3. Vietnam (International)
// TODO: Replace with real Vietnam photography (e.g., /destinations/vietnam.jpg)
const vietnamData: DestinationData = {
  id: "vietnam",
  name: "Vietnam",
  type: "international",
  trending2026: {
    badge: "Fastest growing",
    tagline: "Fastest-growing Indian outbound market",
    whyTrending: "Indian arrivals heading toward ~750,000 after ~50% growth. Phu Quoc jumped into Booking.com summer top 10. Third straight year of double-digit growth.",
    travelerTypes: "Young couples, first-time SEA travellers after Thailand, Instagram/cloud-hunting trips, families to Phu Quoc",
    season: "North (Hanoi, Ha Long, Sa Pa) Oct–Apr; south + Phu Quoc Nov–Apr",
    duration: "6–8 nights",
    fromPriceHint: "Around ₹45,000 pp without flights for 6N/7D — keep existing live package pricing",
    highlights: ["Ha Long Bay overnight cruise", "Hanoi Old Quarter street food", "Hoi An lantern town", "Sa Pa mountain terraces & cloud-hunting", "Phu Quoc island (30-day visa-free)"],
    driver: "Novelty at Thailand-like prices + Phu Quoc visa-free island break for Indian passport holders.",
    visaNote: "Simple E-Visa for mainland; Phu Quoc provides 30-day visa-free entry for direct island stays.",
    relatedSlugs: ["thailand", "malaysia"]
  },
  hero: {
    title: "Vietnam Tour Packages 2026",
    badge: "⚡ Fastest Growing 2026 • Ha Long Cruise & Phu Quoc",
    subtitle: "Fastest-growing Indian outbound market. Cruise the limestone karsts of Ha Long Bay, wander through lantern-lit Hoi An, and unwind in visa-free Phu Quoc island.",
    ratingText: "⭐ 4.8 / 5 (2,600+ Traveler Reviews)",
    startingPrice: "Starts from ₹28,999 / person",
    image: "/dest-jungle.jpg",
    perks: ["5-Star Ha Long Cruise", "Instant E-Visa Assistance", "Indian Friendly Dinners"]
  },
  categories: ["All Packages", "Group", "Private", "Adventure", "Beach", "Honeymoon", "Family", "Culinary", "Luxury", "Heritage", "Hanoi", "Da Nang", "HCMC", "Phu Quoc"],
  packages: [
    {
      id: "vietnam-classic-6n7d",
      title: "Vietnam Highlights & Ha Long Cruise",
      subtitle: "The ultimate 7-day tour from Hanoi & Ha Long Bay to Da Nang & Hoi An",
      duration: "6N / 7D",
      nights: 6,
      days: 7,
      category: "Classic Tours",
      badge: "Bestseller",
      rating: 4.8,
      reviewCount: 520,
      pickupDrop: "Hanoi Airport / Da Nang Airport",
      route: "Hanoi → Ha Long Bay Cruise → Da Nang → Ba Na Hills → Hoi An",
      originalPrice: 52000,
      discountedPrice: 45000,
      image: "/dest-jungle.jpg",
      highlights: ["Overnight 5-Star Ha Long Luxury Cruise", "Golden Bridge at Ba Na Hills", "Hoi An Ancient Lantern Town", "Hanoi Old Quarter Street Tour"],
      inclusions: ["Airport Transfers", "4/5 Star Accommodations", "Daily Breakfast & Cruise Meals", "English Speaking Guide", "E-Visa Support"],
      itinerary: [
        { day: 1, title: "Arrival in Hanoi", description: "Welcome to Hanoi! Private transfer to hotel and evening walking tour of the Old Quarter.", stay: "Hanoi Boutique Hotel", meals: "Dinner" },
        { day: 2, title: "Hanoi to Ha Long Bay Cruise", description: "Board your luxury cruise ship. Kayak through limestone caves and watch sunset over the bay.", stay: "Luxury Bay Cruise", meals: "Breakfast, Lunch & Dinner" },
        { day: 3, title: "Ha Long to Hanoi - Flight to Da Nang", description: "Morning Tai Chi on sundeck, disembark and fly to coastal Da Nang.", stay: "Da Nang Beach Resort", meals: "Breakfast" },
        { day: 4, title: "Ba Na Hills & Golden Hand Bridge", description: "Take the world-record cable car to the iconic Golden Bridge and French Village.", stay: "Da Nang Beach Resort", meals: "Breakfast & Lunch" },
        { day: 5, title: "Hoi An Ancient Town Exploration", description: "Experience basket boat ride in coconut forest and evening lantern boat in Hoi An.", stay: "Hoi An Riverside Resort", meals: "Breakfast" },
        { day: 6, title: "Marble Mountains & Free Day", description: "Explore limestone cave pagodas or relax on An Bang beach.", stay: "Hoi An Riverside Resort", meals: "Breakfast" },
        { day: 7, title: "Departure from Da Nang", description: "Private airport transfer for your flight back home.", stay: "Transit", meals: "Breakfast" }
      ]
    },
    {
      id: "vietnam-short-escape",
      title: "Vietnam North Quick Escape",
      subtitle: "Hanoi & Ha Long Bay 4-day highlights",
      duration: "3N / 4D",
      nights: 3,
      days: 4,
      category: "Short Getaways",
      badge: "Quick Break",
      rating: 4.7,
      reviewCount: 310,
      pickupDrop: "Hanoi Airport",
      route: "Hanoi → Ha Long Bay → Hanoi",
      originalPrice: 22000,
      discountedPrice: 18500,
      image: "/dest-beach.jpg",
      highlights: ["Ha Long Bay Cruise", "Hanoi Street Food", "French Quarter Walk"],
      inclusions: ["Airport Transfers", "Accommodations", "Breakfast & Cruise Meals"],
      itinerary: Array.from({ length: 4 }).map((_, i) => ({
        day: i + 1,
        title: i === 0 ? "Arrival in Hanoi" : i === 3 ? "Departure" : "Ha Long Bay Experience",
        description: "Explore the stunning karst landscapes and rich culture of Northern Vietnam.",
        stay: "Hanoi Hotel / Cruise",
        meals: "Breakfast"
      }))
    }
  ],
  faqs: [
    { q: "Why is Vietnam one of the fastest growing destinations for Indians in 2026?", a: "Arrivals are tracking towards 750,000 following ~50% growth. Indian travellers love the blend of Thailand-like affordability, direct flights, and visa-free access to Phu Quoc island." },
    { q: "Is Phu Quoc visa-free for Indian travellers?", a: "Yes, Indian passport holders arriving directly in Phu Quoc can stay up to 30 days visa-free for an island-only getaway." },
    { q: "What is the best season to explore both North and South Vietnam?", a: "October through April offers crisp weather in the north (Hanoi, Sa Pa, Ha Long) and sunny skies in the central and southern beaches." }
  ],
  places: [
    { name: "Ha Long Bay", tag: "UNESCO Natural Wonder", elevation: "Sea Level", description: "Emerald waters dotted with thousands of dramatic limestone islands.", image: "/dest-beach.jpg" },
    { name: "Hoi An Ancient Town", tag: "Heritage Charm", elevation: "2 m", description: "Picturesque pedestrian town illuminated by handmade silk lanterns at dusk.", image: "/dest-jungle.jpg" }
  ],
  reviews: [
    { name: "Vikram & Sanya Rao", city: "Bengaluru", rating: 5, date: "February 2026", trip: "Vietnam 6N/7D Tour", comment: "The Ha Long Bay cruise was sheer luxury! Booking with Hassle Free Travels gave us transparent rates and instant e-visa approval." }
  ],
  whyUs: [
    { icon: "🛥️", title: "Vetted 5-Star Cruise Partners", description: "Direct allotments on top-rated boutique cruise liners in Ha Long and Lan Ha bays." },
    { icon: "📄", title: "Express E-Visa Clearance", description: "End-to-end guidance with guaranteed compliance for Indian passports." }
  ],
  seasons: [
    { type: "summer", badge: "☀️ Northern Autumn/Spring", title: "October to April", months: "Clear Skies & Cool Breeze", description: "The most comfortable time for trekking Sa Pa and cruising Ha Long.", points: ["Minimal rainfall in North", "Ideal for photography"] },
    { type: "winter", badge: "🌴 Beach & Island Season", title: "November to April", months: "Sunny Southern Coast", description: "Pristine beach weather across Da Nang, Nha Trang, and Phu Quoc.", points: ["Calm warm seas", "Great scuba diving"] }
  ],
  routes: [
    { badge: "By Air", title: "Direct Flights", path: "Delhi / Mumbai / Ahmedabad / Kochi → Hanoi / Ho Chi Minh / Da Nang", description: "Daily non-stop services via VietJet and Vietnam Airlines." }
  ]
};

// 4. Sri Lanka (International)
// TODO: Replace with real Sri Lanka photography (e.g., /destinations/sri-lanka.jpg)
const sriLankaData: DestinationData = {
  id: "sri-lanka",
  name: "Sri Lanka",
  type: "international",
  trending2026: {
    badge: "Easiest getaway",
    tagline: "The easiest foreign holiday Indians can still book last-minute",
    whyTrending: "Atlys Travel Access Report 2026 ranked it #1 of 50 for Indian travellers. Agoda searches +61%. Skyscanner: Jaffna searches +325%. Indian arrivals 530k+ (+27.5%).",
    travelerTypes: "Families, seniors, impulse short-break travellers, multi-gen groups",
    season: "Dec–Apr west/south coast; May–Sep east; hill country most of the year",
    duration: "5–7 nights (typical 6N/7D)",
    fromPriceHint: "Around ₹70,000–80,000 pp including flights — confirm live departures",
    highlights: ["Colombo shopping & dining", "Bentota water sports", "Galle Dutch Fort", "Kandy sacred tooth relic", "Jaffna heritage & culture"],
    driver: "Short flights, compact geography, low effort during 2026 long-haul disruptions.",
    visaNote: "Hassle-free ETA / visa waivers frequently available for Indian citizens.",
    relatedSlugs: ["malaysia", "thailand"]
  },
  hero: {
    title: "Sri Lanka Tour Packages 2026",
    badge: "🏖️ Easiest Getaway 2026 • Ramayana Trail & Southern Beaches",
    subtitle: "The easiest foreign holiday Indians can still book last-minute. Compact geography, scenic hill-country train rides, pristine beaches, and warm island hospitality.",
    ratingText: "⭐ 4.9 / 5 (3,100+ Traveler Reviews)",
    startingPrice: "Starts from ₹35,999 / person",
    image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80",
    perks: ["Private Chauffeur Guide", "Scenic Ella Train Seats", "Beachfront Resorts"]
  },
  categories: ["All Packages", "Group", "Private", "Adventure", "Honeymoon", "Family", "Spiritual", "Wildlife", "Beach", "Culinary", "Wellness"],
  packages: generateGenericPackages("Sri Lanka", "/dest-beach.jpg"),
  faqs: [
    { q: "Why is Sri Lanka ranked #1 for Indian travellers in 2026?", a: "The Atlys Travel Access Report 2026 ranked Sri Lanka #1 of 50 for Indian passport holders due to quick flight times (under 3.5 hrs), simple visa protocols, and high rupee purchasing power." },
    { q: "What are the must-see highlights on a 6N/7D Sri Lanka tour?", a: "Our classic circuit covers Colombo, the cultural triangle/Kandy, the tea plantations of Nuwara Eliya, and the historic coastal ramparts of Galle Fort." },
    { q: "Is Sri Lanka suitable for senior citizens and multi-generational families?", a: "Extremely. Distances between attractions are short, and all our tours feature private AC vehicles with dedicated courteous chauffeur-guides." }
  ],
  places: [
    { name: "Galle Fort", tag: "Colonial Marvel", elevation: "Sea Level", description: "Charming Dutch-colonial fortress overlooking turquoise Indian Ocean surf.", image: "/dest-beach.jpg" },
    { name: "Sigiriya Rock Fortress", tag: "Ancient Wonder", elevation: "349 m", description: "Dramatic 5th-century citadel carved atop a sheer vertical granite boulder.", image: "/dest-jungle.jpg" }
  ],
  reviews: [
    { name: "Dr. Arvind Swaminathan", city: "Chennai", rating: 5, date: "January 2026", trip: "Sri Lanka Family Tour 6N/7D", comment: "Just a 70-minute flight from Chennai! From the Bentota beach villa to Kandy's temples, the chauffeur and coordination were impeccable." }
  ],
  whyUs: [
    { icon: "🚗", title: "Dedicated Private Chauffeurs", description: "Government-certified chauffeur-guides fluent in English and Hindi." },
    { icon: "🚂", title: "Guaranteed Ella Train Tickets", description: "Pre-reserved first-class panoramic window seats on the scenic hill railway." }
  ],
  seasons: [
    { type: "summer", badge: "☀️ West & South Coast Peak", title: "December to April", months: "Sunny Beach Weather", description: "Ideal for whale watching in Mirissa, Galle Fort, and Bentota sands.", points: ["Calm sea conditions", "Perfect for coastal villas"] },
    { type: "winter", badge: "🌊 East Coast & Hill Escapes", title: "May to September", months: "Trincomalee & Highlands", description: "Golden sands on the East Coast and misty, refreshing tea estates.", points: ["Surfing in Arugam Bay", "Lush green plantations"] }
  ],
  routes: [
    { badge: "By Air", title: "Direct Flights", path: "Chennai / Bangalore / Mumbai / Delhi / Hyderabad → Colombo (CMB) & Jaffna", description: "Short hops from 70 minutes (Chennai) to 3.5 hours (Delhi) via SriLankan Airlines & IndiGo." }
  ]
};

// 5. Malaysia (International)
// TODO: Replace with real Malaysia photography (e.g., /destinations/malaysia.jpg)
const malaysiaData: DestinationData = {
  id: "malaysia",
  name: "Malaysia",
  type: "international",
  trending2026: {
    badge: "Visa-free 2026",
    tagline: "Visit Malaysia Year 2026 + visa-free until 31 Dec 2026",
    whyTrending: "Visa-free 30 days for Indians through 31 Dec 2026 (MDAC required). Agoda #2 visa-free search destination. Airbnb KL searches +50%. Kuala Lumpur was #8 on Booking.com summer searches.",
    travelerTypes: "Multi-gen families, Genting/theme-park groups, shopping travellers, halal-friendly food seekers",
    season: "Year-round; school holidays and year-end strongest. Langkawi/west coast slightly easier Jun–Aug.",
    duration: "5–7 nights (KL + Langkawi or Genting)",
    highlights: ["Petronas Twin Towers", "Batu Caves limestone shrine", "Langkawi cable car & beaches", "Penang UNESCO street food", "Genting Highlands theme parks"],
    driver: "Visit Malaysia Year 2026 campaign + visa waiver that currently ends 31 Dec 2026.",
    visaNote: "Visa-free up to 30 days; Malaysia Digital Arrival Card (MDAC) mandatory within 3 days of arrival.",
    relatedSlugs: ["thailand", "vietnam"]
  },
  hero: {
    title: "Malaysia Tour Packages 2026",
    badge: "🎉 Visa-Free 2026 • Visit Malaysia Year",
    subtitle: "Visit Malaysia Year 2026 with 30-day visa-free entry for Indian citizens. Experience Kuala Lumpur’s vibrant skyline, Genting theme parks, and the tropical paradise of Langkawi.",
    ratingText: "⭐ 4.8 / 5 (2,400+ Traveler Reviews)",
    startingPrice: "Starts from ₹31,999 / person",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80",
    perks: ["Visa-Free Hassle Free Entry", "Theme Park Passes Included", "City Center 4-Star Stays"]
  },
  categories: ["All Packages", "Group", "Private", "Adventure", "Honeymoon", "Family", "Beach", "Culinary", "Luxury", "Wildlife"],
  packages: generateGenericPackages("Malaysia", "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80"),
  faqs: [
    { q: "Is Malaysia truly visa-free for Indian passport holders in 2026?", a: "Yes! Indian passport holders enjoy visa-free entry up to 30 days through 31 December 2026. You only need to submit the simple digital MDAC card within 3 days before departure." },
    { q: "What are the recommended combination destinations within Malaysia?", a: "The most popular itinerary combines 3 nights in Kuala Lumpur with Genting Highlands day tour, followed by 2–3 nights in duty-free Langkawi island or heritage Penang." },
    { q: "Is Malaysia convenient for family travel with kids and elderly parents?", a: "Malaysia offers some of the best family infrastructure in Asia, from Genting SkyWorlds theme park to smooth highway transfers and world-class shopping malls." }
  ],
  places: [
    { name: "Petronas Twin Towers & KLCC", tag: "Modern Icon", elevation: "Varies", description: "The world's tallest twin towers reigning over Kuala Lumpur's vibrant downtown.", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80" },
    { name: "Batu Caves", tag: "Spiritual Marvel", elevation: "100 m", description: "Monumental golden statue of Lord Murugan and 272 vibrant rainbow steps leading into limestone caverns.", image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80" }
  ],
  reviews: [
    { name: "Nitin Singhania", city: "Kolkata", rating: 5, date: "March 2026", trip: "Malaysia Family Special 6N/7D", comment: "No visa hassles at all! The kids loved Genting SkyWorlds and shopping in Bukit Bintang was fabulous. Superbly organized." }
  ],
  whyUs: [
    { icon: "🛂", title: "MDAC Digital Card Assistance", description: "Our team assists with your mandatory arrival card filing at zero extra charge." },
    { icon: "🎢", title: "Direct Theme Park Ticketing", description: "Skip-the-line passes for Genting SkyWorlds, Sunway Lagoon, and Langkawi Cable Car." }
  ],
  seasons: [
    { type: "summer", badge: "☀️ Year-Round Tropical Destination", title: "January to December", months: "Tropical Warmth", description: "Langkawi and West Coast offer great sunshine throughout the year.", points: ["Excellent shopping festivals", "Great year-end festive energy"] },
    { type: "winter", badge: "🛍️ School Holidays Peak", title: "May to June & November", months: "Family Fun", description: "School vacation favorite with special events and theme park promotions.", points: ["Ideal for theme park vacations", "Lively street food scene"] }
  ],
  routes: [
    {
      badge: "By Air",
      title: "Direct Flights",
      path: "Delhi / Mumbai / Bengaluru / Chennai / Kochi → Kuala Lumpur (KUL)",
      description: "Direct flights in 3.5 to 5.5 hours via Malaysia Airlines, AirAsia, Batik Air, and IndiGo."
    }
  ]
};

// 5.5 Maldives (International)
const maldivesData: DestinationData = {
  id: "maldives",
  name: "Maldives",
  type: "international",
  trending2026: {
    badge: "Free VOA 2026",
    tagline: "Turquoise Atolls, Guesthouse Adventures & Overwater Luxury",
    whyTrending: "Free 30-day Visa on Arrival for Indian passport holders with zero pre-application fees. The local island guesthouse revolution has made the Maldives accessible for young travellers (18–35), while iconic overwater villas remain India's #1 honeymoon choice.",
    travelerTypes: "Young travellers (18–35), honeymooners, couples, scuba divers, ocean wildlife enthusiasts",
    season: "Nov–Apr (dry northeast monsoon, calm seas & best underwater visibility); Oct–Mar (peak bioluminescence)",
    duration: "4–7 nights (typical 5N/6D)",
    fromPriceHint: "Starts from ₹25,999 pp ($299 USD) land only twin share for 4D/3N; from ₹33,999 pp for 5D/4N",
    highlights: [
      "Swim with whale sharks in South Ari Atoll (world's top year-round site)",
      "Snorkel with reef manta rays in pristine Vaavu Atoll",
      "Witness glowing bioluminescent 'Sea of Stars' beaches on Vaadhoo",
      "Overwater villa & luxury all-inclusive resort retreats with seaplane flights",
      "Private sandbank picnics amidst endless cyan lagoons",
      "Indian vegetarian & Jain dining confirmed on all circuits"
    ],
    driver: "Free 30-day visa on arrival + 2-4 hour direct flights from Mumbai, Delhi, Bengaluru & Kochi.",
    visaNote: "Free 30-day visa on arrival at Malé Velana International Airport (MLE). No pre-application required.",
    relatedSlugs: ["sri-lanka", "thailand", "malaysia"]
  },
  hero: {
    title: "Maldives Tour Packages 2026",
    badge: "🏝️ Free 30-Day VOA 2026 • Whale Sharks & Overwater Villas",
    subtitle: "Experience the turquoise atolls of the Maldives without the hassles. From budget-friendly local island adventures on Maafushi to iconic luxury overwater resorts with seaplane transfers.",
    ratingText: "⭐ 4.9 / 5 (3,800+ Traveler Reviews)",
    startingPrice: "Starts from ₹25,999 / person",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
    perks: ["Free 30-Day Visa on Arrival", "Indian Vegetarian/Jain Friendly", "Verified Speedboat & Seaplane Logistics"]
  },
  categories: ["All Packages", "Guesthouse", "Resort", "Honeymoon", "Dive & Snorkel", "Whale Shark", "All-Inclusive", "Liveaboard"],
  packages: generateGenericPackages("Maldives", "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80"),
  faqs: [
    {
      q: "What is the visa policy for Indian travellers visiting the Maldives in 2026?",
      a: "Indian passport holders receive a free 30-day Visa on Arrival at Malé Velana International Airport (MLE). You only need a passport valid for at least 6 months, a confirmed hotel or guesthouse voucher, return flight tickets, and to complete the free online IMUGA traveler declaration within 96 hours before arrival."
    },
    {
      q: "Can I travel to the Maldives on a budget without staying at an expensive resort?",
      a: "Yes! Since the Maldivian government permitted local island guesthouses, islands like Maafushi, Dhigurah, and Fulidhoo offer boutique beachfront stays starting from just ₹25,999 to ₹33,999 ($299–$399 USD) per person, sharing the exact same turquoise waters, reef snorkelling, and whale shark excursions as luxury resorts."
    },
    {
      q: "Are Indian vegetarian and Jain meal options available on these tours?",
      a: "Yes. All Hassle Free Travels Maldives packages coordinate verified Indian vegetarian and Jain-friendly dining options with our partner guesthouses and resort chefs upon advance request."
    },
    {
      q: "When is the best season to see whale sharks, manta rays, and bioluminescence?",
      a: "Whale sharks inhabit South Ari Atoll (Dhigurah) year-round, with peak water visibility from November to April. Manta rays in Vaavu Atoll peak between January and May. Bioluminescent 'Sea of Stars' blooms are most vibrant between October and March."
    }
  ],
  places: [
    {
      name: "Maafushi Island",
      tag: "Local Island Hub",
      elevation: "Sea Level",
      description: "The capital of Maldives budget travel featuring vibrant bikini beaches, water sports, and direct reef excursions.",
      image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=80"
    },
    {
      name: "Dhigurah Island & South Ari",
      tag: "Whale Shark Haven",
      elevation: "Sea Level",
      description: "Picturesque 3km slender island fringed by white sands, home to the world's most reliable year-round whale shark nursery.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80"
    },
    {
      name: "Vaadhoo Island (Raa Atoll)",
      tag: "Sea of Stars",
      elevation: "Sea Level",
      description: "World-famous beach where bioluminescent phytoplankton illuminate the shoreline like a glowing blue galaxy at night.",
      image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80"
    }
  ],
  reviews: [
    {
      name: "Aditya & Ritu Verma",
      city: "Mumbai",
      rating: 5,
      date: "February 2026",
      trip: "Maldives Classic Honeymoon 4N/5D",
      comment: "Our overwater bungalow was breathtaking! The private sandbank dinner at sunset was pure magic. Hassle Free Travels coordinated our speedboat transfers and vegetarian meals flawlessly."
    },
    {
      name: "Karan Johar & Group",
      city: "Bengaluru",
      rating: 5,
      date: "January 2026",
      trip: "Maldives Local Island Whale Shark 5N/6D",
      comment: "Snorkelling right beside a 25-foot whale shark off Dhigurah was the highlight of our lives! Unbelievable value compared to private resorts."
    }
  ],
  whyUs: [
    { icon: "🚤", title: "Guaranteed Airport Transfers", description: "Pre-arranged private speedboats and seaplanes waiting at MLE airport." },
    { icon: "🥗", title: "Indian Vegetarian & Jain Assurance", description: "Vetted kitchen coordinators providing wholesome vegetarian meals throughout." }
  ],
  seasons: [
    {
      type: "summer",
      badge: "☀️ Dry Peak Season",
      title: "November to April",
      months: "Calm Seas & High Visibility",
      description: "The classic sunny season with glass-like waters, optimal for diving, sandbanks, and overwater villa stays.",
      points: ["Best underwater visibility for snorkelling", "Calmest sea conditions for speedboat transfers"]
    },
    {
      type: "winter",
      badge: "✨ Bioluminescence & Manta Peak",
      title: "October to March",
      months: "Glowing Shorelines & Wildlife",
      description: "Optimal conditions for night bioluminescent walks on Vaadhoo and manta ray congregations in Vaavu Atoll.",
      points: ["Peak Sea of Stars bioluminescent blooms", "Superb manta ray and turtle encounters"]
    }
  ],
  routes: [
    {
      badge: "By Air",
      title: "Non-stop Flights to Malé (MLE)",
      path: "Mumbai / Delhi / Bengaluru / Kochi → Malé (MLE)",
      description: "Direct flights in just 2 to 4 hours via IndiGo, Air India, and Vistara."
    }
  ]
};

// 6. Goa (Domestic)
// TODO: Replace with real Goa photography (e.g., /destinations/goa.jpg)
const goaData: DestinationData = {
  id: "goa",
  name: "Goa",
  type: "domestic",
  trending2026: {
    badge: "#1 festive 2026",
    tagline: "India’s default domestic holiday",
    whyTrending: "Agoda #1 domestic search for both Rakshabandhan and Janmashtami 2026 long weekends. Family summer searches +29%. Thrillophilia searches +134%.",
    travelerTypes: "Families in resort belts, couples/friends in North Goa, slower South Goa trips; ranks for both solo and groups",
    season: "Oct–Mar peak; festive long weekends; monsoon no longer fully off-season",
    duration: "3–5 nights long weekend; 5–7 nights holiday",
    highlights: ["Calangute–Baga beach life", "Palolem peaceful sands", "Colva & South Goa heritage", "Old Goa Portuguese churches", "Spice plantations & backwaters"],
    driver: "Reliable no-visa beach break while international fares/routes stay messy.",
    relatedSlugs: ["wayanad", "puri", "rishikesh"]
  },
  hero: {
    title: "Goa Tour Packages 2026",
    badge: "🏖️ #1 Festive Break 2026 • Sun, Sand & Portuguese Heritage",
    subtitle: "India’s default domestic holiday. Whether you want lively North Goa beach clubs, serene South Goa luxury resorts, or lush monsoon spice estates, explore Goa without the hassles.",
    ratingText: "⭐ 4.9 / 5 (4,500+ Traveler Reviews)",
    startingPrice: "Starts from ₹14,500 / person",
    image: "/dest-beach.jpg",
    perks: ["Private Airport Pickup", "Curated Luxury Villas", "24x7 Local Trip Support"]
  },
  categories: ["All Packages", "Short Getaways", "Classic Tours", "Luxury Resorts", "Long Weekend Breaks"],
  packages: generateGenericPackages("Goa", "/dest-beach.jpg"),
  faqs: [
    { q: "Why is Goa trending so heavily across 2026 long weekends?", a: "Search reports show Goa capturing the #1 domestic spot for Rakshabandhan and Janmashtami long weekends, with Thrillophilia reporting a +134% search surge as travellers choose dependable beach breaks over unpredictable international airfares." },
    { q: "Which part of Goa is better: North or South Goa?", a: "North Goa (Candolim, Anjuna, Vagator) is famous for vibrant cafes, markets, and nightlife. South Goa (Benaulim, Palolem, Cavelossim) offers peaceful 5-star beachfront retreats and heritage Portuguese estates." },
    { q: "Is Goa worth visiting during the monsoon season?", a: "Yes! Goa's monsoon is now a major travel trend for travellers seeking dramatic emerald landscapes, overflowing Dudhsagar waterfalls, and tranquil boutique stays." }
  ],
  places: [
    { name: "Old Goa Churches (Basilica of Bom Jesus)", tag: "UNESCO Heritage", elevation: "10 m", description: "Magnificent 16th-century baroque architecture preserving sacred relics.", image: "/dest-jungle.jpg" },
    { name: "Palolem & Butterfly Beach", tag: "Scenic Paradise", elevation: "Sea Level", description: "Crescent-shaped white sand bay lined with swaying coconut groves and dolphin cruises.", image: "/dest-beach.jpg" }
  ],
  reviews: [
    { name: "Pooja & Sameer Joshi", city: "Pune", rating: 5, date: "August 2026", trip: "Goa Long Weekend 4N/5D", comment: "The South Goa private villa and driver Hassle Free Travels arranged was perfection. No airport taxi haggling, just pure relaxation." }
  ],
  whyUs: [
    { icon: "🏖️", title: "Handpicked Resort Partnerships", description: "Preferred rates and complimentary room upgrades at vetted 4-star and 5-star beachfront hotels." },
    { icon: "🚗", title: "Fixed-Price Private Transfers", description: "Guaranteed AC cabs with polite drivers for the entire trip duration." }
  ],
  seasons: [
    { type: "summer", badge: "☀️ Sunshine & Celebrations", title: "October to March", months: "Clear Skies & Breezy", description: "Peak season for water sports, beach shacks, and vibrant festive parties.", points: ["Water sports in full swing", "All shacks and night markets open"] },
    { type: "winter", badge: "🌧️ Lush Monsoon Greenery", title: "June to September", months: "Monsoon Serenity", description: "Verdant green countryside, gushing waterfalls, and peaceful quiet shores.", points: ["Quiet romantic getaways", "Best luxury villa rates"] }
  ],
  routes: [
    { badge: "By Air", title: "Direct Flights", path: "All Indian Metros → Dabolim (GOI) / Mopa Manohar International (GOX)", description: "Dozens of daily flights connecting every major Indian airport." }
  ]
};

// 7. Rishikesh (Domestic)
// TODO: Replace with real Rishikesh photography (e.g., /destinations/rishikesh.jpg)
const rishikeshData: DestinationData = {
  id: "rishikesh",
  name: "Rishikesh",
  type: "domestic",
  trending2026: {
    badge: "+200% searches",
    tagline: "2026’s biggest domestic search breakout",
    whyTrending: "Booking.com monsoon searches jumped from #18 to #3, +200% YoY. Summer #5. Agoda family searches +22%.",
    travelerTypes: "Wellness travellers, young couples, spiritual groups, Delhi-NCR weekend groups",
    season: "Year-round. Rafting Sep–Jun. Monsoon 2026 boosted searches instead of killing them.",
    duration: "2–4 nights weekend; 5–7 nights wellness",
    highlights: ["Triveni Ghat evening maha aarti", "Beatles Ashram murals", "White-water Ganga rafting", "World-renowned yoga & sound healing", "Tapovan cafes & suspension bridges", "Haridwar spiritual combo"],
    driver: "Experience-led travel — yoga + rafting + aarti in one short North India trip.",
    relatedSlugs: ["goa", "ooty", "wayanad"]
  },
  hero: {
    title: "Rishikesh Tour Packages 2026",
    badge: "🧘 +200% Searches 2026 • Yoga, Rafting & Ganga Aarti",
    subtitle: "2026’s biggest domestic search breakout. Discover the Yoga Capital of the World with white-water rapids, sacred evening aartis on the Ganges, and serene Himalayan wellness retreats.",
    ratingText: "⭐ 4.9 / 5 (2,800+ Traveler Reviews)",
    startingPrice: "Starts from ₹14,500 / person",
    image: "/dest-jungle.jpg",
    perks: ["Certified Rafting Instructors", "VIP Ganga Aarti Seating", "Riverside Camp Stays"]
  },
  categories: ["All Packages", "Short Getaways", "Adventure & Rafting", "Spiritual & Yoga", "Luxury Riverside Resorts"],
  packages: generateGenericPackages("Rishikesh", "/dest-jungle.jpg"),
  faqs: [
    { q: "Why is Rishikesh seeing such explosive search growth in 2026?", a: "Booking.com revealed Rishikesh surged by +200% YoY jumping to #3 for domestic monsoon searches. The unique blend of adrenaline rafting, spiritual Ganga aarti, and scenic wellness cafes makes it unbeatable." },
    { q: "When is the white-water rafting season open in Rishikesh?", a: "Rafting is active from mid-September through June. During peak monsoon (July–August), travellers visit for yoga retreats, misty nature walks, and temple circuits." },
    { q: "How easy is it to reach Rishikesh from Delhi?", a: "Just 4 to 5 hours via the smooth Delhi–Dehradun expressway, or a fast 35-minute flight to Dehradun Jolly Grant Airport (20 km away)." }
  ],
  places: [
    { name: "Triveni Ghat", tag: "Spiritual Core", elevation: "340 m", description: "Enchanting evening Maha Aarti with synchronized brass lamps and chanting on the sacred Ganges.", image: "/dest-jungle.jpg" },
    { name: "Beatles Ashram (Chaurasi Kutia)", tag: "Art & Heritage", elevation: "360 m", description: "Iconic meditation domes and vibrant street art where the Beatles stayed in 1968.", image: "/dest-mountain.jpg" }
  ],
  reviews: [
    { name: "Gaurav Bansal", city: "Gurugram", rating: 5, date: "May 2026", trip: "Rishikesh Adventure Weekend 3N/4D", comment: "The 16 km Shivpuri rafting and our riverside resort in Tapovan exceeded expectations. Hassle Free Travels managed everything perfectly." }
  ],
  whyUs: [
    { icon: "🌊", title: "Safety-First River Expeditions", description: "Grade III/IV certified river captains with imported safety gear." },
    { icon: "🪔", title: "Special Ganga Aarti Access", description: "Reserved seating arrangements for families during crowded evening ceremonies." }
  ],
  seasons: [
    { type: "summer", badge: "🚣 Adventure & Rafting Peak", title: "September to June", months: "Clear Waters & Sunshine", description: "Peak season for white-water rafting, bungee jumping, and riverside camping.", points: ["Optimal river flow", "Campfires and outdoor stargazing"] },
    { type: "winter", badge: "🌿 Monsoon Wellness Season", title: "July to August", months: "Misty Valleys", description: "Verdant green hills, peaceful yoga retreats, and spiritual temple visits.", points: ["Deep meditation and yoga camps", "Budget-friendly luxury resorts"] }
  ],
  routes: [
    { badge: "By Air / Road", title: "Flight or Expressway", path: "Delhi / Mumbai / Bengaluru → Dehradun Airport (DED) or Expressway drive from Delhi", description: "25 minutes from Dehradun airport; 4.5 hours drive from Delhi NCR." }
  ]
};

// 8. Ooty (Domestic)
// TODO: Replace with real Ooty photography (e.g., /destinations/ooty.jpg)
const ootyData: DestinationData = {
  id: "ooty",
  name: "Ooty",
  type: "domestic",
  trending2026: {
    badge: "Coolcation 2026",
    tagline: "Summer 2026 coolcation leader",
    whyTrending: "Booking.com May–Jun 2026: 3rd most-searched domestic destination, behind only Mumbai and Bengaluru. Ahead of Darjeeling, Rishikesh, Munnar, Manali.",
    travelerTypes: "South Indian families from Chennai, Bengaluru, Hyderabad; couples on tea-estate stays",
    season: "Apr–Jun busiest; Sep–Nov second peak",
    duration: "3–5 nights, often with Coonoor",
    highlights: ["Government Botanical Gardens", "Ooty Lake boating", "Doddabetta Peak views", "Heritage tea factories & tastings", "Nilgiri Mountain Railway toy train"],
    driver: "Heat escape / coolcation searches from Southern and Western metro cities.",
    relatedSlugs: ["wayanad", "goa", "puri"]
  },
  hero: {
    title: "Ooty Tour Packages 2026",
    badge: "☕ Coolcation Leader 2026 • Queen of Hill Stations",
    subtitle: "Summer 2026 coolcation leader. Outranking Northern hill retreats in search demand, Ooty offers mist-kissed tea estates, colonial cottages, and the historic Nilgiri Mountain Toy Train.",
    ratingText: "⭐ 4.8 / 5 (2,200+ Traveler Reviews)",
    startingPrice: "Starts from ₹14,500 / person",
    image: "/dest-mountain.jpg",
    perks: ["Toy Train Ticket Support", "Colonial Tea Bungalow Stays", "Private Ghat Road Drivers"]
  },
  categories: ["All Packages", "Short Getaways", "Classic Tours", "Tea Estate Retreats", "Honeymoon Specials"],
  packages: generateGenericPackages("Ooty", "/dest-mountain.jpg"),
  faqs: [
    { q: "Why is Ooty leading 'Coolcation' domestic searches in 2026?", a: "Booking.com reports put Ooty as the 3rd most-searched domestic destination for May–June 2026, ahead of Darjeeling, Munnar, and Manali, as travellers seek pleasant temperatures within comfortable driving distance of Southern metros." },
    { q: "Is Coonoor included in the Ooty itinerary?", a: "Yes, our classic 4N/5D itinerary includes a scenic excursion to Coonoor covering Sim's Park, Dolphin's Nose, and tea factory tastings." },
    { q: "Can we experience the UNESCO Nilgiri Mountain Toy Train?", a: "Absolutely. Hassle Free Travels coordinates advance reservations for the legendary toy train ride between Ooty and Coonoor." }
  ],
  places: [
    { name: "Nilgiri Mountain Railway", tag: "UNESCO Heritage", elevation: "2,240 m", description: "Charming vintage steam and diesel locomotives chugging across viaducts and tea slopes.", image: "/dest-mountain.jpg" },
    { name: "Doddabetta Peak & Tea Estates", tag: "Panoramic Vista", elevation: "2,637 m", description: "The highest peak in the Nilgiri Mountains offering sweeping views over misty green valleys.", image: "/dest-jungle.jpg" }
  ],
  reviews: [
    { name: "Deepak & Shilpa Nair", city: "Bengaluru", rating: 5, date: "June 2026", trip: "Ooty & Coonoor 4N/5D", comment: "The heritage tea estate stay was magical. Our driver navigated the 36 hairpin bends with utmost care and confidence." }
  ],
  whyUs: [
    { icon: "🚂", title: "Toy Train Reservation Assistance", description: "Helping secure coveted UNESCO toy train seats ahead of peak summer rush." },
    { icon: "🏡", title: "Heritage Heritage Homestays", description: "Curated colonial tea bungalows with sprawling manicured gardens and fireplaces." }
  ],
  seasons: [
    { type: "summer", badge: "☀️ Coolcation Summer Peak", title: "April to June", months: "Pleasant 15°C – 25°C", description: "The premier escape from South India's summer heat with blooming gardens.", points: ["Annual flower shows", "Boating and outdoor walks"] },
    { type: "winter", badge: "☕ Autumn & Misty Winter", title: "September to February", months: "Chilly & Romantic", description: "Crisp mountain air, winter mist, and cozy evenings beside log fires.", points: ["Ideal for honeymoon couples", "Clear valley views"] }
  ],
  routes: [
    { badge: "By Road / Air", title: "Road Trip or Flight", path: "Bengaluru / Chennai / Hyderabad → Coimbatore Airport (CJB) → 3 hr scenic drive to Ooty", description: "85 km drive from Coimbatore; 6 hours pleasant highway drive from Bengaluru." }
  ]
};

// 9. Puri (Domestic)
// TODO: Replace with real Puri photography (e.g., /destinations/puri.jpg)
const puriData: DestinationData = {
  id: "puri",
  name: "Puri",
  type: "domestic",
  trending2026: {
    badge: "Fastest family growth",
    tagline: "Faith + beach in one short trip",
    whyTrending: "Agoda family searches for May–Jun 2026 +68% (highest jump they tracked). #3 domestic destination for Rakshabandhan weekend after Goa and Mumbai.",
    travelerTypes: "Multi-gen families, pilgrimage groups",
    season: "Oct–Feb leisure peak; Rath Yatra + school holidays create summer spikes",
    duration: "2–4 nights; 4–5 with Konark + Bhubaneswar",
    highlights: ["Shree Jagannath Temple darshan", "Puri Golden Beach (Blue Flag certified)", "Konark Sun Temple architectural marvel", "Chilika Lake migratory birds & dolphins"],
    driver: "Spiritual coast that does not need flying abroad; inward wanderlust.",
    relatedSlugs: ["goa", "rishikesh", "wayanad"]
  },
  hero: {
    title: "Puri Tour Packages 2026",
    badge: "🕉️ Fastest Family Growth 2026 • Jagannath Temple & Golden Beach",
    subtitle: "Faith + beach in one short trip. Experience the divine sanctity of Jagannath Temple, the architectural splendour of Konark Sun Temple, and the Blue Flag sands of Golden Beach.",
    ratingText: "⭐ 4.9 / 5 (3,400+ Traveler Reviews)",
    startingPrice: "Starts from ₹14,500 / person",
    image: "/dest-beach.jpg",
    perks: ["Special Darshan Coordination", "Blue Flag Beach Resorts", "Comfortable AC Coaches"]
  },
  categories: ["All Packages", "Spiritual Tours", "Family Special", "Short Getaways", "Golden Triangle Odisha"],
  packages: generateGenericPackages("Puri", "/dest-beach.jpg"),
  faqs: [
    { q: "Why did family searches for Puri surge +68% in 2026?", a: "Agoda tracked a +68% spike in family searches for May–June 2026, making Puri the fastest-growing family pilgrimage and beach combo for Indian multi-generational groups." },
    { q: "How are the beach facilities in Puri?", a: "Puri's Golden Beach is Blue Flag certified, featuring pristine clean sands, certified lifeguards, paved walking promenades, and family-friendly beach shacks." },
    { q: "Can we cover Konark and Chilika Lake from Puri?", a: "Yes, our 4N/5D Golden Triangle Odisha package effortlessly combines Puri, the Konark Sun Temple, and boat safari on Chilika Lake." }
  ],
  places: [
    { name: "Shree Jagannath Temple", tag: "Sacred Dhama", elevation: "Sea Level", description: "One of the sacred Char Dham pilgrimage sites, legendary for ancient rituals and mahaprasad.", image: "/dest-mountain.jpg" },
    { name: "Konark Sun Temple", tag: "UNESCO Monument", elevation: "Sea Level", description: "Monumental 13th-century chariot of the Sun God carved with exquisite stone wheels and sculptures.", image: "/dest-beach.jpg" }
  ],
  reviews: [
    { name: "Manoranjan & Sunita Patnaik", city: "Kolkata", rating: 5, date: "January 2026", trip: "Puri & Konark 4N/5D", comment: "We took my elderly parents. Hassle Free Travels arranged seamless darshan assistance and a superb beach hotel in Puri." }
  ],
  whyUs: [
    { icon: "🕉️", title: "Temple Protocol Assistance", description: "Guidance through temple gates and authentic Mahaprasad arrangements." },
    { icon: "🏖️", title: "Blue Flag Beach Properties", description: "Clean, peaceful beach resorts safe for children and senior citizens." }
  ],
  seasons: [
    { type: "summer", badge: "☀️ Pleasant Winter Peak", title: "October to February", months: "Breezy & Sunny", description: "The premier time for beach strolls, sightseeing, and bird watching at Chilika.", points: ["Comfortable daytime temple visits", "Irrawaddy dolphin sightings"] },
    { type: "winter", badge: "🚩 Rath Yatra & Summer Festivities", title: "June to July & Holidays", months: "Spiritual Fervour", description: "Witness the monumental Chariot Festival and lively coastal atmosphere.", points: ["Grand cultural celebrations", "Book well in advance"] }
  ],
  routes: [
    { badge: "By Air / Train", title: "Flight or Rail", path: "Bhubaneswar Airport (BBI) → 1 hour expressway drive to Puri (60 km)", description: "Direct flights to Bhubaneswar from Delhi, Mumbai, Kolkata, Bengaluru, and Chennai." }
  ]
};

// 10. Wayanad (Domestic)
// TODO: Replace with real Wayanad photography (e.g., /destinations/wayanad.jpg)
const wayanadData: DestinationData = {
  id: "wayanad",
  name: "Wayanad",
  type: "domestic",
  trending2026: {
    badge: "Family nature 2026",
    tagline: "Kerala’s 2026 family-nature breakout",
    whyTrending: "Agoda family searches +40% for May–Jun 2026. Group-travel nature alternative to Nainital/Mussoorie/Shimla. Pair with Munnar (Booking.com summer #6).",
    travelerTypes: "Families from Bengaluru, Hyderabad, Kochi; couples wanting wildlife and monsoon green",
    season: "Sep–May main; monsoon now a planned waterfall/spice-estate season",
    duration: "3–5 nights Wayanad; 5–7 with Munnar or Kozhikode",
    highlights: ["Edakkal prehistoric cave carvings", "Banasura Sagar earth dam", "Soochipara & Meenmutty waterfalls", "Muthanga & Tholpetty wildlife safari", "Vythiri tea-estate boutique stays"],
    driver: "Cooler, greener family holiday that feels less crowded than Goa or Manali.",
    relatedSlugs: ["ooty", "goa", "rishikesh"]
  },
  hero: {
    title: "Wayanad Tour Packages 2026",
    badge: "🌿 Family Nature 2026 • Waterfalls & Wildlife Safaris",
    subtitle: "Kerala’s 2026 family-nature breakout. A serene alternative to crowded hill stations, Wayanad offers lush spice plantations, prehistoric caves, and misty jungle treehouses.",
    ratingText: "⭐ 4.9 / 5 (2,700+ Traveler Reviews)",
    startingPrice: "Starts from ₹14,500 / person",
    image: "/dest-jungle.jpg",
    perks: ["Private Plantation Stays", "Jeep Safari Booking Support", "Scenic Forest Drives"]
  },
  categories: ["All Packages", "Short Getaways", "Classic Tours", "Nature & Wildlife", "Plantation Stays"],
  packages: generateGenericPackages("Wayanad", "/dest-jungle.jpg"),
  faqs: [
    { q: "Why is Wayanad emerging as a top nature breakout in 2026?", a: "Agoda tracked a +40% increase in family searches for May–June 2026. Travellers appreciate its cool mist, pristine waterfalls, and unhurried spice-estate atmosphere compared to high-density hill stations." },
    { q: "Can Wayanad be paired with Munnar or Kozhikode?", a: "Yes, many guests fly into Kozhikode (Calicut), enjoy Malabar food, and then spend 4 nights in Wayanad, or combine both Wayanad and Munnar across 6 nights." },
    { q: "Are treehouses and private pool villas available in Wayanad?", a: "Hassle Free Travels specializes in boutique plantation resorts, treehouse stays, and private cottages nestled in coffee estates." }
  ],
  places: [
    { name: "Edakkal Caves", tag: "Prehistoric Marvel", elevation: "1,200 m", description: "Ancient rock shelter containing petroglyphs and Stone Age carvings dating back thousands of years.", image: "/dest-jungle.jpg" },
    { name: "Banasura Sagar Dam", tag: "Scenic Wonder", elevation: "680 m", description: "The largest earth dam in India surrounded by misty mountain peaks and boat speedways.", image: "/dest-mountain.jpg" }
  ],
  reviews: [
    { name: "Harish & Kavita Nambiar", city: "Hyderabad", rating: 5, date: "April 2026", trip: "Wayanad Nature Escape 4N/5D", comment: "The spice plantation villa in Vythiri was out of a fairy tale. The kids loved the Muthanga elephant safari. Seamless booking with Hassle Free Travels." }
  ],
  whyUs: [
    { icon: "☕", title: "Direct Plantation Ties", description: "Exclusive allotments at private coffee and spice plantations away from tourist buses." },
    { icon: "🚙", title: "Dedicated Mountain Chauffeurs", description: "Experienced Kerala drivers who know every scenic overlook and waterfall trail." }
  ],
  seasons: [
    { type: "summer", badge: "☀️ Best Sightseeing Season", title: "September to May", months: "Crisp & Pleasant", description: "Ideal for trekking Chembra Peak, outdoor cave explorations, and wildlife safaris.", points: ["Wildlife active in sanctuaries", "All waterfall trails open"] },
    { type: "winter", badge: "🌧️ Rejuvenating Monsoon Green", title: "June to August", months: "Lush Rain & Mist", description: "Spectacular misty landscapes, full waterfalls, and authentic Ayurvedic wellness.", points: ["Enchanting waterfall views", "Special seasonal monsoon offers"] }
  ],
  routes: [
    { badge: "By Road / Air", title: "Calicut Airport or Road Trip", path: "Kozhikode Airport (CCJ) → 2.5 hr drive to Wayanad; or 6 hr drive from Bengaluru", description: "Direct flights to Calicut from all Gulf hubs and Indian metros; popular scenic drive via Bandipur from Bengaluru." }
  ]
};

// ========================================
// ALL DESTINATIONS REGISTRY
// ========================================

const egyptData: DestinationData = {
  id: "egypt",
  name: "Egypt",
  type: "international",
  trending2026: {
    badge: "Trending 2026",
    tagline: "Pyramids, Nile Cruises & the Red Sea",
    whyTrending: "A timeless destination combining ancient wonders with luxury Nile cruises and Red Sea resorts. Voted a top seller for young travelers in 2026.",
    travelerTypes: "Couples, friends, and multi-gen families seeking history and adventure",
    season: "Oct–Apr for ideal weather",
    duration: "7-11 nights depending on cruise",
    highlights: ["Giza Pyramids & Sphinx", "Nile Cruise (Luxor to Aswan)", "Abu Simbel Excursion", "Red Sea Snorkelling in Hurghada"],
    driver: "World-class monuments paired with excellent value luxury and seamless e-visa.",
    relatedSlugs: ["thailand", "sri-lanka", "japan"]
  },
  hero: {
    title: "Egypt Tour Packages 2026",
    badge: "🐪 Pyramids • Nile Cruises • Red Sea",
    subtitle: "Explore Egypt in 2026 with Hassle Free Travels. Guaranteed Nile Cruises, Pyramids, Abu Simbel, and curated Indian vegetarian food options.",
    ratingText: "⭐ 4.9 / 5 (3,200+ Traveler Reviews)",
    startingPrice: "Starts from ₹82,999 / person",
    image: "https://images.unsplash.com/photo-1572252009286-268caa47ea56?auto=format&fit=crop&w=1200&q=80",
    perks: ["4★ & 5★ Nile Cruises", "Private Egyptologist Guides", "Indian Veg/Jain Meals Available"]
  },
  categories: ["All Packages", "Group Tours", "Nile Cruises", "Private Tours", "Luxury", "Twin-Country"],
  packages: [], // Handled dynamically in page.tsx
  faqs: [
    { q: "Are Indian vegetarian and Jain meals available on Egypt tours?", a: "Yes! Hassle Free Travels coordinates vetted Indian and local vegetarian/Jain meal options on all our Egypt itineraries, including on Nile cruises." },
    { q: "What is the visa process for Indian passport holders?", a: "Indian passport holders can obtain an Egypt tourist visa on arrival at Cairo International Airport (USD 25) or apply for an e-visa in advance." },
    { q: "Are international flights included?", a: "These are land-only packages. We do include domestic flights within Egypt (e.g., Cairo to Luxor/Aswan) as specified in each itinerary." }
  ],
  places: [
    { name: "Giza Pyramids", tag: "Ancient Wonder", elevation: "Sea Level", description: "The last surviving wonder of the ancient world, guarded by the Great Sphinx.", image: "https://images.unsplash.com/photo-1539667468225-eebb663053e6?auto=format&fit=crop&w=1200&q=80" },
    { name: "Nile River", tag: "Lifeline of Egypt", elevation: "Sea Level", description: "Sail between Luxor and Aswan on a luxury cruise, stopping at majestic riverside temples.", image: "https://images.unsplash.com/photo-1582299849206-383792cbcc28?auto=format&fit=crop&w=1200&q=80" },
    { name: "Abu Simbel", tag: "Monumental Temple", elevation: "Sea Level", description: "The awe-inspiring twin temples of Ramesses II and Nefertari, carved into a mountainside.", image: "https://images.unsplash.com/photo-1601217036662-799a4e9b9961?auto=format&fit=crop&w=1200&q=80" }
  ],
  reviews: [
    { name: "Rajat & Priya Verma", city: "Mumbai", rating: 5, date: "February 2026", trip: "Egypt Classic Highlights 9D", comment: "The Nile cruise was spectacular and our private guide made the history come alive. Thank you for accommodating our Jain food requests perfectly." }
  ],
  whyUs: [
    { icon: "🏺", title: "Expert Egyptologists", description: "Tour the ancient monuments with highly educated and licensed local guides." },
    { icon: "🚢", title: "Premium Nile Cruises", description: "Guaranteed top-tier cruise cabins with curated meal options and stunning views." }
  ],
  seasons: [
    { type: "winter", badge: "🐪 Prime Season", title: "October to April", months: "Cool & Pleasant", description: "The best time to explore Upper Egypt and the Sahara without the extreme summer heat.", points: ["Perfect for temple exploration", "Ideal Nile cruising weather"] },
    { type: "summer", badge: "☀️ Summer Heat", title: "May to September", months: "Hot & Dry", description: "Temperatures soar, but this is an excellent time for Red Sea beach resorts and snorkeling in Hurghada or Sharm El-Sheikh.", points: ["Great for diving & snorkeling", "Fewer crowds at monuments"] }
  ],
  routes: [
    { badge: "By Air", title: "Flights to Cairo", path: "India → Cairo International Airport (CAI)", description: "Direct flights and easy connections via Middle Eastern hubs (Dubai, Doha, Abu Dhabi) to Cairo." }
  ]
};

export const ALL_DESTINATIONS: Record<string, DestinationData> = {
  // 10 Trending 2026 Destinations
  "egypt": egyptData,
  "thailand": thailandData,
  "japan": japanData,
  "vietnam": vietnamData,
  "sri-lanka": sriLankaData,
  "malaysia": malaysiaData,
  "maldives": maldivesData,
  "goa": goaData,
  "rishikesh": rishikeshData,
  "ooty": ootyData,
  "puri": puriData,
  "wayanad": wayanadData,

  // Existing & Untouched Legacy Destinations
  "spiti": spitiData,
  "bali": generateDestinationData("bali", "Bali", "/dest-beach.jpg", "international"),
  "europe": generateDestinationData("europe", "Europe", "/dest-mountain.jpg", "international"),
  "bhutan": generateDestinationData("bhutan", "Bhutan", "/dest-mountain.jpg", "international"),
  "nepal": generateDestinationData("nepal", "Nepal", "/dest-mountain.jpg", "international"),
  "almaty": generateDestinationData("almaty", "Almaty", "/dest-mountain.jpg", "international"),
  "georgia": generateDestinationData("georgia", "Georgia", "/dest-jungle.jpg", "international"),
  "kerala": generateDestinationData("kerala", "Kerala", "/dest-jungle.jpg", "domestic"),
  "kashmir": generateDestinationData("kashmir", "Kashmir", "/dest-mountain.jpg", "domestic"),
  "manali": generateDestinationData("manali", "Manali", "/images/spiti/spiti-bike.jpg", "domestic"),
  "meghalaya": generateDestinationData("meghalaya", "Meghalaya", "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80", "domestic"),
  "ladakh": generateDestinationData("ladakh", "Ladakh", "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=600&q=80", "domestic"),
  "tawang": generateDestinationData("tawang", "Tawang", "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80", "domestic"),
  "andaman": generateDestinationData("andaman", "Andaman", "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=600&q=80", "domestic"),
  "himachal-pradesh": generateDestinationData("himachal-pradesh", "Himachal Pradesh", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80", "domestic"),
  "mauritius": generateDestinationData("mauritius", "Mauritius", "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80", "international"),
  "new-zealand": generateDestinationData("new-zealand", "New Zealand", "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80", "international"),
  "dubai": generateDestinationData("dubai", "Dubai", "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80", "international"),
  "uttarakhand": generateDestinationData("uttarakhand", "Uttarakhand", "https://images.unsplash.com/photo-1602498456745-e9503b30470b?auto=format&fit=crop&w=1200&q=80", "domestic"),
};
