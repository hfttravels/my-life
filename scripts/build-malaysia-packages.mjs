import fs from "fs";
import path from "path";

export const USD_TO_INR = 84;

export function roundToMarketingPrice(inr) {
  return Math.ceil(inr / 1000) * 1000 - 1; // e.g. 58716 -> 58999
}

export const DEFAULT_MALAYSIA_VISA_NOTE =
  "Visa-free stay up to 30 days for Indian passport holders (India–Malaysia bilateral arrangement, extended through 2026). Travellers must submit the mandatory Malaysia Digital Arrival Card (MDAC) online within 3 days prior to arrival. Verify current status and updates at https://www.imi.gov.my before departure.";

export const COMBO_SINGAPORE_VISA_NOTE =
  "Malaysia: Visa-free stay up to 30 days for Indian passport holders (complete MDAC within 3 days before arrival at https://www.imi.gov.my). Singapore: Verify current Singapore entry visa and SG Arrival Card requirements at https://www.ica.gov.sg prior to departure.";

const IMAGES = {
  kl_petronas: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80",
  batu_caves: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
  genting: "https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=1200&q=80",
  penang_street: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=1200&q=80",
  langkawi_beach: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
  langkawi_skycab: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
  cameron_tea: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80",
  borneo_rainforest: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
  mt_kinabalu: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  sarawak_river: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80",
  singapore_skyline: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
  honeymoon_resort: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
  luxury_villa: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
  family_fun: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80"
};

// Map each package index (0 to 19) to metadata
const PKG_CONFIGS = [
  // 1: Rank 1
  {
    slug: "malaysia-highlights-beaches-8d",
    name: "Malaysia Highlights & Beaches Group Tour",
    categoryLabel: "Group",
    packageType: "group",
    route: "KL → Genting → Penang → Langkawi",
    startCity: "Kuala Lumpur (KLIA)",
    endCity: "Langkawi (LGK)",
    priceFromUSD: 699,
    hotelCategory: "3★ Hotels (4★ supplement USD 120 pp available)",
    isFeatured: true,
    heroImage: IMAGES.kl_petronas,
    bestMonths: ["January", "February", "March", "April", "July", "August", "December"],
    departureStyle: "Fixed-date SIC — Every Friday year-round (extra Tuesdays Dec–Jan & Mar–Apr)",
    groupSize: "Min 2 / Max 20 pax (guaranteed from 2 pax)",
    relatedSlugs: [
      "malaysia-classic-discovery-6d",
      "malaysia-classic-private-7d",
      "malaysia-multi-city-private-10d"
    ],
    staySummary: "2N Kuala Lumpur 3★, 1N Genting Highlands 3★, 2N Penang 3★, 2N Langkawi 3★",
    mealsSummary: "Daily Breakfast, Welcome Dinner in KL, Street Food Dinner in Penang, Farewell Dinner in Langkawi",
    transportSummary: "Private A/C Coach throughout + High-Speed Penang–Langkawi Ferry",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Kochi", "Hyderabad"],
    customHighlights: [
      "Guaranteed Friday fixed departures throughout 2026 (extra Tuesdays in peak months)",
      "Petronas Twin Towers Skybridge & Observation Deck tickets included (Levels 41 & 86)",
      "Batu Caves 272-step climb and monumental Lord Murugan 43m golden statue",
      "Genting Skyway cable car ascent to Resorts World at 1,800 meters",
      "Georgetown UNESCO World Heritage street art & Gurney Drive hawker food trail",
      "Penang Hill funicular railway and Kek Lok Si Temple pagoda of 10,000 Buddhas",
      "Langkawi SkyCab cable car, SkyBridge & Kilim Karst Geoforest mangrove cruise",
      "Verified Indian vegetarian dining options confirmed with advance notice"
    ]
  },
  // 2: Rank 2
  {
    slug: "malaysia-classic-discovery-6d",
    name: "Malaysia Classic Discovery Group Tour",
    categoryLabel: "Group",
    packageType: "group",
    route: "KL → Genting Day Trip → Penang",
    startCity: "Kuala Lumpur (KLIA)",
    endCity: "Penang (PEN) or KLIA",
    priceFromUSD: 549,
    hotelCategory: "3★ Hotels (4★ supplement USD 95 pp available)",
    isFeatured: true,
    heroImage: IMAGES.batu_caves,
    bestMonths: ["Year-round", "June", "July", "August", "December", "January"],
    departureStyle: "Fixed-date SIC — Every Saturday year-round (extra Wednesdays Jun–Aug & Dec–Jan)",
    groupSize: "Min 2 / Max 18 pax (guaranteed from 2 pax)",
    relatedSlugs: [
      "malaysia-highlights-beaches-8d",
      "malaysia-classic-private-7d",
      "penang-heritage-food-trail-private-5d"
    ],
    staySummary: "3N Kuala Lumpur 3★, 2N Penang 3★ (4★ upgrade supplement USD 95 pp)",
    mealsSummary: "Daily Breakfast, Street Food Dinner at Gurney Drive Penang",
    transportSummary: "Private A/C Coach throughout + Return Genting Skyway Cable Car",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Kochi", "Hyderabad"],
    customHighlights: [
      "Guaranteed Saturday departures throughout 2026 (extra Wednesdays Jun–Aug & Dec–Jan)",
      "Batu Caves sacred limestone cavern temple and 43m golden Murugan statue",
      "Petronas Twin Towers Skybridge & Observation Deck pre-arranged tickets",
      "Genting Highlands scenic day trip via the 3.4km Genting Skyway cable car",
      "Penang Georgetown UNESCO heritage walk, Armenian Street murals & Chew Jetty",
      "Penang Hill funicular railway climb & Kek Lok Si Temple pagoda of 10,000 Buddhas",
      "Famous Gurney Drive street food evening with vegetarian choices highlighted"
    ]
  },
  // 3: FIT 1
  {
    slug: "malaysia-classic-private-7d",
    name: "Malaysia Classic Private Tour",
    categoryLabel: "Private",
    packageType: "custom",
    route: "KL → Genting → Penang → Langkawi",
    startCity: "Kuala Lumpur (KLIA)",
    endCity: "Langkawi (LGK) or Penang (PEN)",
    priceFromUSD: 850,
    hotelCategory: "3★ Hotels (4★ supplement from USD 1,050 pp)",
    isFeatured: true,
    heroImage: IMAGES.langkawi_skycab,
    bestMonths: ["Year-round", "January", "February", "March", "July", "August"],
    departureStyle: "Private departure daily (min 2 pax)",
    groupSize: "Private vehicle for your group (2–6 pax)",
    relatedSlugs: [
      "malaysia-highlights-beaches-8d",
      "penang-langkawi-beach-private-6d",
      "malaysia-multi-city-private-10d"
    ],
    staySummary: "3N Kuala Lumpur 3★, 2N Penang 3★, 1N Langkawi 3★ (or similar)",
    mealsSummary: "Daily Breakfast, Welcome Dinner Day 1, Street Food Dinner Day 4",
    transportSummary: "Dedicated Private A/C Car/Van with English-speaking chauffeur throughout + Penang–Langkawi Ferry",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Direct flights to KLIA"]
  },
  // 4: FIT 2
  {
    slug: "malaysia-singapore-combo-private-10d",
    name: "Malaysia & Singapore Combo Private Tour",
    categoryLabel: "Private",
    packageType: "custom",
    route: "KL → Genting → Penang → Langkawi → Singapore",
    startCity: "Kuala Lumpur (KLIA)",
    endCity: "Singapore (SIN)",
    priceFromUSD: 1290,
    hotelCategory: "3★ City & Island Hotels (4★ from USD 1,580 pp)",
    isFeatured: true,
    heroImage: IMAGES.singapore_skyline,
    bestMonths: ["Year-round", "November", "December", "January", "February", "June", "July"],
    departureStyle: "Private departure daily (min 2 pax)",
    groupSize: "Private tour for your party (2–8 pax)",
    relatedSlugs: [
      "kl-singapore-train-private-5d",
      "malaysia-highlights-beaches-8d",
      "malaysia-multi-city-private-10d"
    ],
    staySummary: "2N Kuala Lumpur 3★, 1N Genting 3★, 2N Penang 3★, 2N Langkawi 3★, 2N Singapore 3★",
    mealsSummary: "Daily Breakfast, Welcome Dinner Day 1, Street Food Dinner Day 4",
    transportSummary: "Private A/C transfers in Malaysia & Singapore + Penang–Langkawi Ferry (LGK–SIN flight extra)",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Kolkata", "Hyderabad"]
  },
  // 5: FIT 3
  {
    slug: "borneo-wildlife-adventure-private-8d",
    name: "Borneo Wildlife & Adventure Private Tour",
    categoryLabel: "Wildlife",
    packageType: "adventure",
    route: "Kota Kinabalu → Sepilok → Kinabatangan River → Mt Kinabalu Park",
    startCity: "Kota Kinabalu (BKI)",
    endCity: "Kota Kinabalu (BKI)",
    priceFromUSD: 1150,
    hotelCategory: "3★ City Hotels & Nature Eco-Lodges",
    isFeatured: true,
    heroImage: IMAGES.borneo_rainforest,
    bestMonths: ["March", "April", "May", "June", "July", "August", "September", "October"],
    departureStyle: "Private departure daily (min 2 pax)",
    groupSize: "Private tour (2–6 pax)",
    relatedSlugs: [
      "borneo-orangutan-beach-private-7d",
      "sabah-kinabalu-trek-beach-private-6d",
      "sarawak-longhouse-rainforest-private-6d"
    ],
    staySummary: "3N Kota Kinabalu 3★, 1N Sepilok Jungle Lodge, 2N Kinabatangan River Lodge, 1N Kundasang Highland Lodge",
    mealsSummary: "Daily Breakfast, 3 Lunches, 3 Dinners at River & Jungle Lodges",
    transportSummary: "Private A/C 4WD/Van in Sabah + Motorized River Safari Boats (BKI–Sandakan flights extra)",
    departureCities: ["Direct flights to Kuala Lumpur with connection to Kota Kinabalu (BKI)"]
  },
  // 6: FIT 4
  {
    slug: "penang-heritage-food-trail-private-5d",
    name: "Penang Heritage & Food Trail Private Tour",
    categoryLabel: "Culinary",
    packageType: "custom",
    route: "Georgetown → Penang Hill → Batu Ferringhi → Balik Pulau",
    startCity: "Penang (PEN)",
    endCity: "Penang (PEN)",
    priceFromUSD: 620,
    hotelCategory: "Boutique 3★/4★ Heritage Hotels in Georgetown",
    isFeatured: false,
    heroImage: IMAGES.penang_street,
    bestMonths: ["Year-round", "November", "December", "January", "February", "July", "August"],
    departureStyle: "Private departure daily (min 2 pax)",
    groupSize: "Private tour with specialist culinary guide (2–4 pax)",
    relatedSlugs: [
      "penang-langkawi-beach-private-6d",
      "malaysia-classic-private-7d",
      "malaysia-responsible-community-private-7d"
    ],
    staySummary: "4 Nights Boutique Heritage Hotel in UNESCO Georgetown",
    mealsSummary: "Daily Breakfast, 2 Guided Street Food Walks, Hands-on Batik Session Refreshments",
    transportSummary: "Private A/C Car with Specialist Heritage & Culinary Guide + Penang Hill Funicular",
    departureCities: ["Direct flights to Penang or seamless connection via KLIA"]
  },
  // 7: FIT 5
  {
    slug: "cameron-highlands-rainforest-private-4d",
    name: "Cameron Highlands & Rainforest Retreat Private Tour",
    categoryLabel: "Adventure",
    packageType: "custom",
    route: "KLIA → Tanah Rata → BOH Tea Estate → Mossy Forest → KLIA",
    startCity: "Kuala Lumpur (KLIA)",
    endCity: "Kuala Lumpur (KLIA)",
    priceFromUSD: 480,
    hotelCategory: "3★ Highland Resorts & Tea Plantation Lodges",
    isFeatured: false,
    heroImage: IMAGES.cameron_tea,
    bestMonths: ["Year-round", "March", "April", "May", "June", "July", "August"],
    departureStyle: "Private departure daily (min 2 pax)",
    groupSize: "Private vehicle & nature guide (2–4 pax)",
    relatedSlugs: [
      "kl-genting-short-break-private-4d",
      "malaysia-multi-city-private-10d",
      "malaysia-responsible-community-private-7d"
    ],
    staySummary: "3 Nights Curated Highland Resort in Cameron Highlands (Tanah Rata)",
    mealsSummary: "Daily Breakfast, Welcome Dinner Day 1, Traditional Highland Steamboat Dinner Day 3",
    transportSummary: "Private A/C Vehicle throughout + 4WD Jeep Excursion into Mossy Forest",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Kochi", "Direct flights to KLIA"]
  },
  // 8: FIT 6
  {
    slug: "langkawi-island-escape-private-5d",
    name: "Langkawi Island Escape Private Tour",
    categoryLabel: "Beach",
    packageType: "custom",
    route: "Pantai Cenang → Kilim Geoforest → Datai Bay → Kuah",
    startCity: "Langkawi (LGK)",
    endCity: "Langkawi (LGK)",
    priceFromUSD: 720,
    hotelCategory: "4★ Beachfront Resort (5★ supplement USD 180 pp available)",
    isFeatured: false,
    heroImage: IMAGES.langkawi_beach,
    bestMonths: ["December", "January", "February", "March", "April", "May", "July", "August"],
    departureStyle: "Private departure daily (min 2 pax)",
    groupSize: "Private tour (2–4 pax)",
    relatedSlugs: [
      "penang-langkawi-beach-private-6d",
      "malaysia-honeymoon-private-8d",
      "malaysia-highlights-beaches-8d"
    ],
    staySummary: "4 Nights 4★ Beachfront Resort in Langkawi (Pantai Cenang / Tengah)",
    mealsSummary: "Daily Breakfast, Welcome Dinner Day 1, Luxury Sunset Cruise BBQ Dinner Day 3",
    transportSummary: "Private A/C Chauffeur Car + Private Mangrove Boat Charter + Catamaran Sunset Cruise",
    departureCities: ["Direct flights to Langkawi (LGK) or seamless short hop from KLIA/Penang"]
  },
  // 9: FIT 7
  {
    slug: "malaysia-honeymoon-private-8d",
    name: "Malaysia Romantic Honeymoon Private Tour",
    categoryLabel: "Honeymoon",
    packageType: "honeymoon",
    route: "Kuala Lumpur → Georgetown Heritage → Langkawi Island Luxury",
    startCity: "Kuala Lumpur (KLIA)",
    endCity: "Langkawi (LGK)",
    priceFromUSD: 1380,
    hotelCategory: "4★ City & Heritage + 5★ Langkawi Luxury Beach Resort",
    isFeatured: true,
    heroImage: IMAGES.honeymoon_resort,
    bestMonths: ["Year-round", "November", "December", "January", "February", "March", "April", "May"],
    departureStyle: "Private departure daily for couples",
    groupSize: "Private 2 pax couples getaway",
    relatedSlugs: [
      "langkawi-island-escape-private-5d",
      "malaysia-luxury-private-9d",
      "malaysia-classic-private-7d"
    ],
    staySummary: "3N Kuala Lumpur 4★, 2N Georgetown Heritage Boutique 4★, 2N Langkawi 5★ Luxury Beach Resort",
    mealsSummary: "Daily Breakfast, Candlelight Dinner in KL, Street Food Walk in Penang, Private Sunset Cruise Dinner",
    transportSummary: "Private Executive A/C Car throughout + First-Class Ferry + Private Luxury Boat Excursions",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Kolkata", "Hyderabad"]
  },
  // 10: FIT 8
  {
    slug: "kl-city-break-private-4d",
    name: "Kuala Lumpur City Break Private Tour",
    categoryLabel: "Private",
    packageType: "custom",
    route: "KLCC → Batu Caves → Sunway Lagoon → Bukit Bintang",
    startCity: "Kuala Lumpur (KLIA)",
    endCity: "Kuala Lumpur (KLIA)",
    priceFromUSD: 380,
    hotelCategory: "3★ City Center Hotel (Bukit Bintang / KLCC)",
    isFeatured: false,
    heroImage: IMAGES.kl_petronas,
    bestMonths: ["Year-round", "January", "February", "March", "June", "July", "August", "December"],
    departureStyle: "Private departure daily (min 2 pax)",
    groupSize: "Private tour (2–6 pax)",
    relatedSlugs: [
      "kl-genting-short-break-private-4d",
      "malaysia-family-fun-private-7d",
      "cameron-highlands-rainforest-private-4d"
    ],
    staySummary: "3 Nights 3★ City Hotel in Bukit Bintang / KLCC",
    mealsSummary: "Daily Breakfast, Welcome Dinner Day 1 (Indian vegetarian options confirmed)",
    transportSummary: "Private A/C Airport Transfers & City Sightseeing Car with Driver",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Kochi", "Hyderabad", "Tiruchirappalli"]
  },
  // 11: FIT 9
  {
    slug: "sabah-kinabalu-trek-beach-private-6d",
    name: "Sabah Mt Kinabalu Trek & Beach Private Tour",
    categoryLabel: "Adventure",
    packageType: "adventure",
    route: "Kota Kinabalu → Kinabalu Park → Laban Rata → Poring Hot Springs",
    startCity: "Kota Kinabalu (BKI)",
    endCity: "Kota Kinabalu (BKI)",
    priceFromUSD: 980,
    hotelCategory: "3★ KK Hotel + Mountain Lodge (Laban Rata)",
    isFeatured: false,
    heroImage: IMAGES.mt_kinabalu,
    bestMonths: ["March", "April", "May", "June", "July", "August", "September"],
    departureStyle: "Private departure daily (min 2 pax)",
    groupSize: "Private trek with certified mountain guide (2–4 pax)",
    relatedSlugs: [
      "borneo-wildlife-adventure-private-8d",
      "borneo-orangutan-beach-private-7d",
      "sarawak-longhouse-rainforest-private-6d"
    ],
    staySummary: "2N Kota Kinabalu 3★, 1N Laban Rata Mountain Resthouse, 1N Poring Hot Springs Eco-Lodge, 1N KK 3★",
    mealsSummary: "Daily Breakfast, Mountain Climbing Packed Lunches & Buffet Dinners at Laban Rata",
    transportSummary: "Private A/C Transfers in Sabah + Certified Mountain Guide & Porter",
    departureCities: ["Flight connections to Kota Kinabalu (BKI) via KLIA or Singapore"]
  },
  // 12: FIT 10
  {
    slug: "malaysia-family-fun-private-7d",
    name: "Malaysia Family Fun & Theme Parks Private Tour",
    categoryLabel: "Family",
    packageType: "family",
    route: "Kuala Lumpur → Sunway Lagoon → Genting Highlands → Penang",
    startCity: "Kuala Lumpur (KLIA)",
    endCity: "Penang (PEN)",
    priceFromUSD: 780,
    hotelCategory: "4★ Family Hotels & Resorts (Kids under 12 at 70% rate)",
    isFeatured: false,
    heroImage: IMAGES.family_fun,
    bestMonths: ["Year-round", "May", "June", "July", "October", "November", "December"],
    departureStyle: "Private departure daily (min 2 adults)",
    groupSize: "Private family vehicle (family rooms / inter-connecting on request)",
    relatedSlugs: [
      "malaysia-classic-private-7d",
      "kl-city-break-private-4d",
      "malaysia-multi-city-private-10d"
    ],
    staySummary: "3N Kuala Lumpur 4★, 1N Genting Highlands 4★, 2N Penang 4★ Beachfront",
    mealsSummary: "Daily Breakfast, Welcome Dinner Day 1, Street Food Dinner in Penang",
    transportSummary: "Spacious Private A/C Family Van with Chauffeur throughout + Theme Park Transfers",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Kolkata", "Hyderabad"]
  },
  // 13: FIT 11
  {
    slug: "sarawak-longhouse-rainforest-private-6d",
    name: "Sarawak Iban Longhouse & Rainforest Private Tour",
    categoryLabel: "Adventure",
    packageType: "adventure",
    route: "Kuching → Semenggoh Orangutans → Batang Ai → Iban Longhouse",
    startCity: "Kuching (KCH)",
    endCity: "Kuching (KCH)",
    priceFromUSD: 890,
    hotelCategory: "3★ Kuching City Hotel + Authentic Iban Longhouse Homestay",
    isFeatured: false,
    heroImage: IMAGES.sarawak_river,
    bestMonths: ["April", "May", "June", "July", "August", "September", "October"],
    departureStyle: "Private departure daily (min 2 pax)",
    groupSize: "Private cultural journey (2–6 pax)",
    relatedSlugs: [
      "borneo-wildlife-adventure-private-8d",
      "malaysia-responsible-community-private-7d",
      "borneo-orangutan-beach-private-7d"
    ],
    staySummary: "3N Kuching 3★ Riverside Hotel, 2N Traditional Iban Longhouse Homestay (Batang Ai)",
    mealsSummary: "Daily Breakfast, 3 Traditional Lunches & 2 Longhouse Community Dinners",
    transportSummary: "Private A/C Van in Sarawak + Motorized Native Longboat Journey on Batang Ai Reservoir",
    departureCities: ["Connecting flights to Kuching (KCH) via Kuala Lumpur (KUL) or Singapore (SIN)"]
  },
  // 14: FIT 12
  {
    slug: "kl-singapore-train-private-5d",
    name: "Kuala Lumpur to Singapore by Train Private Tour",
    categoryLabel: "Private",
    packageType: "custom",
    route: "Kuala Lumpur → Malacca → Johor Bahru (ETS Train) → Singapore",
    startCity: "Kuala Lumpur (KLIA)",
    endCity: "Singapore (SIN)",
    priceFromUSD: 680,
    hotelCategory: "3★ City Hotels in KL, Malacca & Singapore",
    isFeatured: false,
    heroImage: IMAGES.singapore_skyline,
    bestMonths: ["Year-round", "November", "December", "January", "February", "July", "August"],
    departureStyle: "Private departure daily (min 2 pax)",
    groupSize: "Private tour (2–4 pax)",
    relatedSlugs: [
      "malaysia-singapore-combo-private-10d",
      "kl-city-break-private-4d",
      "malaysia-classic-private-7d"
    ],
    staySummary: "2N Kuala Lumpur 3★, 1N Malacca 3★ Heritage Hotel, 1N Singapore 3★",
    mealsSummary: "Daily Breakfast, Welcome Dinner in KL, Nyonya Heritage Dinner in Malacca",
    transportSummary: "Private A/C Car in Malaysia + Reserved High-Speed ETS Rail Tickets + Private Singapore Transfers",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Hyderabad", "Direct flight to KLIA"]
  },
  // 15: FIT 13
  {
    slug: "penang-langkawi-beach-private-6d",
    name: "Penang & Langkawi Beach Escape Private Tour",
    categoryLabel: "Beach",
    packageType: "custom",
    route: "Penang Heritage → Batu Ferringhi → Langkawi Island Hopping",
    startCity: "Penang (PEN)",
    endCity: "Langkawi (LGK)",
    priceFromUSD: 690,
    hotelCategory: "3★ Georgetown Hotel & 4★ Langkawi Beach Resort",
    isFeatured: false,
    heroImage: IMAGES.langkawi_beach,
    bestMonths: ["November", "December", "January", "February", "March", "April", "May"],
    departureStyle: "Private departure daily (min 2 pax)",
    groupSize: "Private tour (2–6 pax)",
    relatedSlugs: [
      "langkawi-island-escape-private-5d",
      "penang-heritage-food-trail-private-5d",
      "malaysia-classic-private-7d"
    ],
    staySummary: "3N Penang 3★ (Georgetown/Batu Ferringhi), 2N Langkawi 4★ Beach Resort",
    mealsSummary: "Daily Breakfast, Street Food Dinner at Gurney Drive Day 1",
    transportSummary: "Private A/C Chauffeur Vehicle in Penang & Langkawi + High-Speed Ferry Connection",
    departureCities: ["Direct flights to Penang (PEN) or easy connection via KLIA"]
  },
  // 16: FIT 14
  {
    slug: "malaysia-responsible-community-private-7d",
    name: "Malaysia Responsible Community & Eco Private Tour",
    categoryLabel: "Adventure",
    packageType: "custom",
    route: "KL → Orang Asli Village → Cameron Organic Farms → Penang Heritage",
    startCity: "Kuala Lumpur (KLIA)",
    endCity: "Penang (PEN)",
    priceFromUSD: 920,
    hotelCategory: "Eco-Lodges & Community-Approved Heritage Homestays",
    isFeatured: false,
    heroImage: IMAGES.cameron_tea,
    bestMonths: ["Year-round", "March", "April", "May", "June", "July", "August", "September"],
    departureStyle: "Private departure daily (min 2 pax)",
    groupSize: "Small private eco tour (2–6 pax)",
    relatedSlugs: [
      "cameron-highlands-rainforest-private-4d",
      "penang-heritage-food-trail-private-5d",
      "sarawak-longhouse-rainforest-private-6d"
    ],
    staySummary: "2N Kuala Lumpur 3★ Eco-Hotel, 2N Cameron Highlands Eco-Lodge, 2N Penang Heritage 3★",
    mealsSummary: "Daily Breakfast, 100% Curated Plant-Based / Vegetarian & Vegan Friendly Meals throughout",
    transportSummary: "Private Low-Emission A/C Vehicle throughout + Certified Community Indigenous Guides",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Kochi", "Hyderabad"]
  },
  // 17: FIT 15
  {
    slug: "malaysia-luxury-private-9d",
    name: "Malaysia Luxury Collection Private Tour",
    categoryLabel: "Luxury",
    packageType: "luxury",
    route: "Kuala Lumpur (Mandarin Oriental) → Penang (E&O) → Langkawi (The Datai)",
    startCity: "Kuala Lumpur (KLIA)",
    endCity: "Langkawi (LGK)",
    priceFromUSD: 2200,
    hotelCategory: "5★ Ultra-Luxury Hotels & Private Beachfront Villas (or similar)",
    isFeatured: false,
    heroImage: IMAGES.luxury_villa,
    bestMonths: ["Year-round", "November", "December", "January", "February", "March", "April"],
    departureStyle: "Private departure daily",
    groupSize: "VIP Private Tour (2–4 pax)",
    relatedSlugs: [
      "malaysia-honeymoon-private-8d",
      "langkawi-island-escape-private-5d",
      "malaysia-multi-city-private-10d"
    ],
    staySummary: "3N Mandarin Oriental KL, 2N Eastern & Oriental (E&O) Hotel Penang, 3N The Datai Langkawi (or similar 5★)",
    mealsSummary: "Gourmet Daily Breakfast, Fine Dining Welcome Dinner, Curated Seafood Sunset Dinner",
    transportSummary: "Chauffeur-Driven Mercedes/Vellfire throughout + Business Class Ferry / Private Speedboat",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Hyderabad", "Direct flight to KLIA"]
  },
  // 18: FIT 16
  {
    slug: "malaysia-multi-city-private-10d",
    name: "Malaysia Multi-City Grand Private Tour",
    categoryLabel: "Private",
    packageType: "custom",
    route: "KL → Genting → Cameron Highlands → Penang → Langkawi",
    startCity: "Kuala Lumpur (KLIA)",
    endCity: "Langkawi (LGK)",
    priceFromUSD: 1180,
    hotelCategory: "3★ / 4★ City, Highland & Beachfront Resorts",
    isFeatured: false,
    heroImage: IMAGES.batu_caves,
    bestMonths: ["Year-round", "December", "January", "February", "March", "July", "August"],
    departureStyle: "Private departure daily (min 2 pax)",
    groupSize: "Private tour (2–6 pax)",
    relatedSlugs: [
      "malaysia-highlights-beaches-8d",
      "malaysia-classic-private-7d",
      "cameron-highlands-rainforest-private-4d"
    ],
    staySummary: "2N Kuala Lumpur 3★, 1N Genting 3★, 2N Cameron Highlands 3★, 2N Penang 3★, 2N Langkawi 3★",
    mealsSummary: "Daily Breakfast, Welcome Dinner Day 1, Steamboat Dinner Day 4, Farewell Dinner Day 9",
    transportSummary: "Private A/C Vehicle throughout Peninsular Malaysia + High-Speed Langkawi Ferry",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Kolkata", "Hyderabad"]
  },
  // 19: FIT 17
  {
    slug: "kl-genting-short-break-private-4d",
    name: "Kuala Lumpur & Genting Short Break Private Tour",
    categoryLabel: "Private",
    packageType: "custom",
    route: "KLCC → Batu Caves → Genting Highlands (Overnight) → KLIA",
    startCity: "Kuala Lumpur (KLIA)",
    endCity: "Kuala Lumpur (KLIA)",
    priceFromUSD: 420,
    hotelCategory: "3★ City & Highland Hotels",
    isFeatured: false,
    heroImage: IMAGES.genting,
    bestMonths: ["Year-round", "May", "June", "July", "August", "November", "December"],
    departureStyle: "Private departure daily (min 2 pax)",
    groupSize: "Private tour (2–6 pax)",
    relatedSlugs: [
      "kl-city-break-private-4d",
      "malaysia-classic-discovery-6d",
      "malaysia-family-fun-private-7d"
    ],
    staySummary: "2 Nights Kuala Lumpur 3★, 1 Night Genting Highlands 3★ (First World / Resorts World)",
    mealsSummary: "Daily Breakfast, Welcome Dinner Day 1",
    transportSummary: "Private A/C Chauffeur Vehicle throughout + Return Genting Skyway Cable Car Passes",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Kochi", "Hyderabad"]
  },
  // 20: FIT 18
  {
    slug: "borneo-orangutan-beach-private-7d",
    name: "Borneo Orangutan & Beach Escape Private Tour",
    categoryLabel: "Wildlife",
    packageType: "adventure",
    route: "Kota Kinabalu → Sepilok Rehabilitation Centre → Kinabatangan → Gaya Island Beach",
    startCity: "Kota Kinabalu (BKI)",
    endCity: "Kota Kinabalu (BKI)",
    priceFromUSD: 1050,
    hotelCategory: "3★ City Hotel, Jungle River Lodge & Tropical Beach Resort",
    isFeatured: false,
    heroImage: IMAGES.borneo_rainforest,
    bestMonths: ["March", "April", "May", "June", "July", "August", "September", "October"],
    departureStyle: "Private departure daily (min 2 pax)",
    groupSize: "Private wildlife & beach journey (2–6 pax)",
    relatedSlugs: [
      "borneo-wildlife-adventure-private-8d",
      "sabah-kinabalu-trek-beach-private-6d",
      "langkawi-island-escape-private-5d"
    ],
    staySummary: "2N Kota Kinabalu 3★, 1N Sepilok Jungle Lodge, 1N Kinabatangan River Lodge, 2N Gaya Island / Beach Resort",
    mealsSummary: "Daily Breakfast, 2 Lunches & 2 Dinners at Jungle Eco-Lodges",
    transportSummary: "Private A/C Transfers in Sabah + Wildlife River Safari Boats + Island Speedboat Ferry (KK–Sandakan flight extra)",
    departureCities: ["Connecting flights to Kota Kinabalu (BKI) via KLIA or Singapore"]
  }
];

// Clean text helper to strip DMC names and rewrite to HFT brand voice
function cleanBrandVoice(text) {
  if (!text) return "";
  let cleaned = text
    .replace(/Asian Overland Services \(AOS\)/g, "Hassle Free Travels local operations")
    .replace(/Asian Overland Services/g, "Hassle Free Travels")
    .replace(/Mayflower Acme Tours/g, "Hassle Free Travels")
    .replace(/Mayflower guide/g, "Hassle Free Travels licensed local guide")
    .replace(/Mayflower/g, "Hassle Free Travels")
    .replace(/Destination Asia Malaysia/g, "Hassle Free Travels")
    .replace(/Destination Asia/g, "Hassle Free Travels")
    .replace(/Asian Trails Malaysia/g, "Hassle Free Travels")
    .replace(/Asian Trails/g, "Hassle Free Travels")
    .replace(/Diethelm Travel Malaysia/g, "Hassle Free Travels")
    .replace(/Diethelm Travel/g, "Hassle Free Travels")
    .replace(/Diethelm/g, "Hassle Free Travels")
    .replace(/Reliance Travel Malaysia/g, "Hassle Free Travels")
    .replace(/Reliance Travel/g, "Hassle Free Travels")
    .replace(/Reliance/g, "Hassle Free Travels")
    .replace(/Borneo Eco Tours/g, "Hassle Free Travels accredited eco partners")
    .replace(/Exotissimo Travel Malaysia/g, "Hassle Free Travels")
    .replace(/Exotissimo/g, "Hassle Free Travels")
    .replace(/Khiri Travel Malaysia/g, "Hassle Free Travels")
    .replace(/Khiri Travel/g, "Hassle Free Travels")
    .replace(/Khiri/g, "Hassle Free Travels")
    .replace(/Tour East Malaysia \(Kuoni Group\)/g, "Hassle Free Travels")
    .replace(/Tour East Malaysia/g, "Hassle Free Travels")
    .replace(/Tour East/g, "Hassle Free Travels")
    .replace(/AOS guide/g, "Hassle Free Travels tour manager")
    .replace(/AOS India trade page/g, "Hassle Free Travels destination desk")
    .replace(/AOS India trade FAQ/g, "Hassle Free Travels destination specialists")
    .replace(/AOS India series page/g, "Hassle Free Travels India departures")
    .replace(/AOS group tours page/g, "Hassle Free Travels tours")
    .replace(/AOS agent rate sheet/g, "our partner tariff")
    .replace(/AOS/g, "Hassle Free Travels")
    .replace(/Kuoni brand recognition for Indian agents/g, "Handcrafted itinerary with verified central stays and seamless transfers")
    .replace(/Tour East Malaysia \(Kuoni Group\)/g, "Hassle Free Travels")
    .replace(/Tour East Malaysia/g, "Hassle Free Travels")
    .replace(/Tour East/g, "Hassle Free Travels")
    .replace(/Kuoni Group/g, "Hassle Free Travels")
    .replace(/Kuoni/g, "Hassle Free Travels")
    .replace(/one DMC group/g, "Hassle Free Travels")
    .replace(/DMC/g, "local partner")
    .replace(/MOTAC-licensed/g, "Government MOTAC-licensed")
    .replace(/https?:\/\/[^\s\)]+/g, "")
    .replace(/Source:\s*/g, "")
    .trim();

  return cleaned;
}

// Parse markdown file and build packages array
export function buildPackages() {
  const mdPath = path.resolve("Malaysia-packages-hft.md");
  const content = fs.readFileSync(mdPath, "utf-8");

  // Split into package sections
  const sections = content.split(/\n(?=### (?:Rank|FIT) )/).slice(1);
  if (sections.length !== 20) {
    throw new Error(`Expected 20 package sections, found ${sections.length}`);
  }

  const resultPackages = [];

  for (let idx = 0; idx < sections.length; idx++) {
    const rawSection = sections[idx];
    const sectionText = rawSection.split(/\n## 3\./)[0]; // strip section 3 if last section
    const config = PKG_CONFIGS[idx];

    // Extract DMC & source URL for internal CMS fields
    const dmcMatch = sectionText.match(/\*\*DMC:\*\*\s*([^\n]+)/);
    const urlMatch = sectionText.match(/\*\*(?:Product )?URL:\*\*\s*([^\n]+)/);
    const sourceDmc = dmcMatch ? dmcMatch[1].trim() : "Hassle Free Travels Partner";
    const sourceUrl = urlMatch ? urlMatch[1].trim() : "";

    // Extract days
    const dayRegex = /\*\*Day\s+(\d+)\s+—\s+([^\n*]+)\*\*([\s\S]*?)(?=\*\*Day\s+\d+\s+—|#### Inclusions|\*\*Inclusions:\*\*|$)/g;
    const itineraryDays = [];
    let match;

    while ((match = dayRegex.exec(sectionText)) !== null) {
      const dayNumber = parseInt(match[1], 10);
      const title = cleanBrandVoice(match[2].trim());
      const rawBodyAndMeta = match[3];

      // Extract meals & overnight from day body
      let meals = "Breakfast";
      let stay = config.staySummary ? config.staySummary.split(",")[0].trim() : "Handpicked hotel";

      const mealsMatch = rawBodyAndMeta.match(/Meals:\s*([^\n·]+)/i);
      if (mealsMatch) {
        meals = mealsMatch[1].replace(/Source:.*$/, "").trim();
      }

      const overnightMatch = rawBodyAndMeta.match(/Overnight:\s*([^\n]+)/i);
      if (overnightMatch) {
        stay = overnightMatch[1].replace(/Source:.*$/, "").trim();
        if (stay === "—") stay = "Departure flight";
      }

      // Clean body text
      let body = rawBodyAndMeta
        .replace(/Meals:[\s\S]*$/, "")
        .replace(/Source:.*$/gm, "")
        .trim();

      body = cleanBrandVoice(body);

      // Ensure "or similar" is applied to luxury hotel mentions if present
      if (body.includes("Mandarin Oriental") && !body.includes("or similar")) {
        body = body.replace(/Mandarin Oriental/g, "Mandarin Oriental (or similar 5★)");
      }
      if (body.includes("Eastern & Oriental") && !body.includes("or similar")) {
        body = body.replace(/Eastern & Oriental/g, "Eastern & Oriental (or similar 5★)");
      }
      if (body.includes("The Datai") && !body.includes("or similar")) {
        body = body.replace(/The Datai/g, "The Datai (or similar 5★)");
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
    let highlights = config.customHighlights || [];
    if (highlights.length === 0) {
      const hlMatch = sectionText.match(/(\*\*Highlights:\*\*|#### Why this is a top seller)[\s\S]*?(?=#### Full Day-by-Day|\*\*Day 1 —)/i);
      if (hlMatch) {
        const hlLines = hlMatch[0].split("\n").filter(l => l.trim().startsWith("-"));
        highlights = hlLines.map(l => cleanBrandVoice(l.replace(/^-\s*/, "").trim())).filter(Boolean);
      }
    }
    if (highlights.length === 0) {
      // derive 4-5 highlights from itinerary
      highlights = itineraryDays.slice(0, 4).map(d => d.title.replace(/^Day \d+\s+—\s+/, ""));
    }

    // Extract Inclusions
    let inclusions = [];
    const incBlockMatch = sectionText.match(/(?:#### Inclusions|\*\*Inclusions:\*\*)\s*([\s\S]*?)(?=(?:#### Exclusions|\*\*Exclusions:\*\*))/i);
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
    const excBlockMatch = sectionText.match(/(?:#### Exclusions|\*\*Exclusions:\*\*)\s*([\s\S]*?)(?=(?:#### Visa Note|\*\*Visa note:\*\*|#### Why this is a top seller|\*\*Why trending 2026:\*\*|$))/i);
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

    // Mandatory standard exclusions check
    const standardExclusions = [
      "International flights to/from India",
      "Personal expenses, room service, laundry, telephone charges, and tips for driver/guide",
      "Travel and medical insurance"
    ];
    standardExclusions.forEach(se => {
      if (!exclusions.some(e => e.toLowerCase().includes(se.toLowerCase().slice(0, 15)))) {
        exclusions.push(se);
      }
    });

    // Determine Visa Note
    const isComboSingapore = config.slug.includes("singapore");
    const visaNote = isComboSingapore ? COMBO_SINGAPORE_VISA_NOTE : DEFAULT_MALAYSIA_VISA_NOTE;

    // Days & Nights
    const days = itineraryDays.length;
    const nights = days - 1;

    // Pricing
    const priceFromUSD = config.priceFromUSD;
    const priceFromINR = roundToMarketingPrice(priceFromUSD * USD_TO_INR);

    // Audience / Marketing
    const isGroup = config.packageType === "group";
    const audience = isGroup
      ? "Young Indian group travellers, friends & solo explorers seeking guaranteed departures with Indian-friendly vegetarian dining and guided sightseeing."
      : "Couples, families, and private groups seeking flexible start times, dedicated private vehicle, verified stays, and stress-free Malaysia travel.";

    const priceNote = "From · per person · twin share · land only · international flights extra";

    const seoTitle = `${config.name} (${days}D/${nights}N) | Hassle Free Travels`;
    const seoDescription = `Handcrafted ${days}D/${nights}N Malaysia holiday: ${config.route}. 30-day visa-free for Indian passports, verified stays, Indian veg dining options & seamless WhatsApp booking.`;

    resultPackages.push({
      slug: config.slug,
      destinationSlug: "malaysia",
      name: config.name,
      tagline: config.route,
      days,
      nights,
      packageType: config.packageType,
      categoryLabel: config.categoryLabel,
      route: config.route,
      startCity: config.startCity,
      endCity: config.endCity,
      priceFromUSD,
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
      isGroup,
      groupSize: config.groupSize,
      departureStyle: config.departureStyle,
      audience,
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

  const tsContent = `// Auto-generated by scripts/build-malaysia-packages.mjs
// Do not edit manually - run 'node scripts/build-malaysia-packages.mjs' to regenerate

export interface MalaysiaDay {
  dayNumber: number;
  title: string;
  body: string;
  meals?: string;
  stay?: string;
}

export interface MalaysiaPackage {
  slug: string;
  destinationSlug: "malaysia";
  name: string;
  tagline: string;
  days: number;
  nights: number;
  packageType: string;
  categoryLabel: string;
  route: string;
  startCity: string;
  endCity: string;
  priceFromUSD: number;
  priceFromINR: number;
  priceUnit: string;
  priceNote: string;
  hotelCategory: string;
  bestMonths: string[];
  highlights: string[];
  itineraryDays: MalaysiaDay[];
  inclusions: string[];
  exclusions: string[];
  visaNote: string;
  isGroup: boolean;
  groupSize?: string;
  departureStyle?: string;
  sampleDates?: string;
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
  return Math.ceil(inr / 1000) * 1000 - 1; // e.g. 58716 -> 58999
}

export const DEFAULT_MALAYSIA_VISA_NOTE =
  "Visa-free stay up to 30 days for Indian passport holders (India–Malaysia bilateral arrangement, extended through 2026). Travellers must submit the mandatory Malaysia Digital Arrival Card (MDAC) online within 3 days prior to arrival. Verify current status and updates at https://www.imi.gov.my before departure.";

export const COMBO_SINGAPORE_VISA_NOTE =
  "Malaysia: Visa-free stay up to 30 days for Indian passport holders (complete MDAC within 3 days before arrival at https://www.imi.gov.my). Singapore: Verify current Singapore entry visa and SG Arrival Card requirements at https://www.ica.gov.sg prior to departure.";

export const MALAYSIA_PACKAGES: MalaysiaPackage[] = ${JSON.stringify(packages, null, 2)};

export function getMalaysiaPackageBySlug(slug: string): MalaysiaPackage | undefined {
  // Support both canonical slug and alias without -private- (e.g. malaysia-singapore-combo-10d)
  const clean = slug.toLowerCase();
  return MALAYSIA_PACKAGES.find(
    (pkg) =>
      pkg.slug === clean ||
      pkg.slug.replace("-private-", "-") === clean ||
      clean.replace("-private-", "-") === pkg.slug.replace("-private-", "-")
  );
}

export function getMalaysiaFeaturedPackages(): MalaysiaPackage[] {
  return MALAYSIA_PACKAGES.filter((pkg) => pkg.isFeatured);
}
`;

  const targetPath = path.resolve("src/data/malaysia-packages.ts");
  fs.writeFileSync(targetPath, tsContent, "utf-8");
  console.log("Successfully generated " + targetPath + " with " + packages.length + " packages!");
}

generateTsFile();
