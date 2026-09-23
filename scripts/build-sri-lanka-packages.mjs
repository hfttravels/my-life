import fs from "fs";
import path from "path";

export const USD_TO_INR = 84;

export function roundToMarketingPrice(inr) {
  return Math.ceil(inr / 1000) * 1000 - 1; // e.g. 75516 -> 75999
}

const DEFAULT_SRI_LANKA_VISA_NOTE =
  "Electronic Travel Authorisation (ETA) required for Indian passport holders. Apply online before departure at https://www.eta.gov.lk. Fee: USD 35 per person (children under 12 also require an ETA). Processing time: instant to 24 hours. No visa-on-arrival for Indian passport holders. Hassle Free Travels assists with ETA application guidance.";

const packages = [
  // ─────────────────────────────────────────────────────────────
  // 1. Group 1 — Sri Lanka Grand Tour (10D / 9N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "sri-lanka-grand-tour-10d",
    destinationSlug: "sri-lanka",
    name: "Sri Lanka Grand Tour Group Departure",
    tagline: "Colombo → Sigiriya → Polonnaruwa → Kandy → Nuwara Eliya → Ella → Yala → Galle",
    days: 10,
    nights: 9,
    packageType: "group",
    categoryLabel: "Group",
    route: "Colombo → Sigiriya → Polonnaruwa → Kandy → Nuwara Eliya → Ella → Yala → Galle",
    startCity: "Colombo",
    endCity: "Colombo",
    priceFromUSD: 899,
    priceFromINR: roundToMarketingPrice(899 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "3★ City Hotels & Scenic Lodges (4★ supplement USD 150 pp available)",
    bestMonths: ["January", "February", "March", "April", "July", "August", "December"],
    highlights: [
      "Guaranteed fixed-date Saturday departures (extra Wednesdays Dec–Mar & Jul–Aug) — travel with fellow explorers",
      "Sigiriya Rock Fortress climb past the ancient Cloud Maidens frescoes & Mirror Wall",
      "Minneriya National Park safari to witness Asian elephant herds in their natural habitat",
      "Scenic hill country train ride from Kandy to Nanu Oya through misty mountain tea estates (2nd class reserved seats included)",
      "Two wildlife jeep safaris in Yala National Park Block 1 (known for the world's highest leopard density)",
      "Explore UNESCO medieval capital Polonnaruwa & the sacred Temple of the Tooth in Kandy",
      "Stroll the historic cobblestone ramparts and ocean bastions of 16th-century Galle Dutch Fort"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Arrive Colombo — Meet & Greet, Galle Face Green Sunset Walk & Welcome Briefing",
        body: "Arrive at Bandaranaike International Airport (CMB) in Colombo. Complete customs and immigration, where you will be warmly met by your Hassle Free Travels local English-speaking tour coordinator. Board your comfortable private air-conditioned coach for a smooth transfer to your hotel in Colombo city centre. In the late afternoon, enjoy an orientation stroll along the iconic Galle Face Green seaside promenade overlooking the Indian Ocean. Browse popular coastal street snacks including kottu roti and vegetable samosas. Gather in the evening for a comprehensive tour orientation briefing followed by a curated welcome dinner with Indian vegetarian options confirmed.",
        meals: "Dinner (Welcome dinner; Indian vegetarian set available)",
        stay: "Fairway Colombo / Cinnamon Red Colombo (or similar 3★)"
      },
      {
        dayNumber: 2,
        title: "Colombo Highlights — Gangaramaya Temple, Pettah Bazaar & Dutch Hospital Precinct",
        body: "Begin your morning at Gangaramaya Temple, Colombo's foremost Buddhist sanctuary featuring an eclectic blend of Sri Lankan, Thai, Indian, and Chinese architecture, followed by the tranquil Seema Malaka floating temple on Beira Lake. Tour the colonial-era National Museum of Colombo before venturing into vibrant Pettah Bazaar—Colombo's historic market district packed with spice stalls, textiles, and the striking red-and-white brickwork of Jami Ul-Alfar Mosque. In the afternoon, explore Colombo Fort and relax at the colonial Dutch Hospital Shopping Precinct. Evening at leisure.",
        meals: "Breakfast, Lunch",
        stay: "Fairway Colombo / Cinnamon Red Colombo (or similar 3★)"
      },
      {
        dayNumber: 3,
        title: "Colombo to Sigiriya — Dambulla Cave Temple Complex & Sigiriya Rock Fortress",
        body: "Depart Colombo by air-conditioned coach into Sri Lanka's Cultural Triangle (approx. 4 hours). En route, visit the UNESCO World Heritage Dambulla Cave Temple—a breathtaking complex of five sacred cavern sanctuaries housing over 150 Buddha statues and 2,100 square meters of centuries-old religious murals. Check into your Sigiriya resort, and in the afternoon ascend the majestic 5th-century Sigiriya Rock Fortress (UNESCO World Heritage Site). Climb 1,200 steps past the world-famous frescoes of the celestial maidens and the colossal carved Lion's Paws to reach the royal citadel ruins at the summit for 360-degree jungle views.",
        meals: "Breakfast, Lunch",
        stay: "Camellia Resort Sigiriya / Hotel Sigiriya (or similar 3★)"
      },
      {
        dayNumber: 4,
        title: "Polonnaruwa Medieval Capital & Minneriya National Park Elephant Safari",
        body: "Step back into the 12th century as you explore the UNESCO-listed ancient city of Polonnaruwa. Marvel at the colossal Gal Vihara rock temple—where four serene Buddha figures are carved from a single granite face—the Royal Palace complex, and the Rankoth Vehera stupa. In the afternoon, board an open 4x4 safari jeep for an exhilarating wildlife drive through Minneriya National Park. Minneriya is famed for 'The Gathering' of wild Asian elephants around its ancient reservoir, along with sambar deer, painted storks, and marsh crocodiles.",
        meals: "Breakfast, Lunch",
        stay: "Camellia Resort Sigiriya / Hotel Sigiriya (or similar 3★)"
      },
      {
        dayNumber: 5,
        title: "Sigiriya to Kandy — Pidurangala Viewpoint, Temple of the Tooth & Cultural Show",
        body: "Enjoy an early morning trek up Pidurangala Rock for an iconic sunrise view directly framing Sigiriya Rock Fortress against the mist-covered plains. Transfer south toward Kandy (approx. 2.5 hours). Upon arrival in the royal hill capital, visit the sacred Temple of the Tooth Relic (Sri Dalada Maligawa), Sri Lanka's most venerated Buddhist pilgrimage destination. Stroll around tranquil Kandy Lake and wander through the 147-acre Royal Botanical Gardens at Peradeniya with its famed orchid pavilion and giant bamboo avenue. Conclude the evening with an energetic Kandyan cultural dance and drumming performance.",
        meals: "Breakfast, Dinner",
        stay: "Topaz Hotel Kandy / Hotel Suisse Kandy (or similar 3★)"
      },
      {
        dayNumber: 6,
        title: "Kandy to Nuwara Eliya — Scenic Highland Train & Pedro Tea Estate",
        body: "Board the world-famous scenic train from Kandy to Nanu Oya (approx. 3 hours; reserved 2nd-class seats included). Marvel at dramatic mountain valleys, gushing cascades, and emerald tea carpets rolling beneath misty ridges. Disembark in Nuwara Eliya, the 'Little England' of Sri Lanka. Stop at Ramboda Falls viewpoint and visit a working highland tea estate and factory for a guided masterclass on tea picking, drying, rolling, and tasting. Enjoy an evening walk around Gregory Lake and Hakgala gardens.",
        meals: "Breakfast, Lunch",
        stay: "Galway Heights / Heaven Seven Nuwara Eliya (or similar 3★)"
      },
      {
        dayNumber: 7,
        title: "Nuwara Eliya to Ella — Nine Arch Bridge, Little Adam's Peak & Ravana Falls",
        body: "Travel through scenic mountain roads toward the laid-back hill town of Ella. Walk along pine-lined trails to the world-famous Nine Arch Bridge at Demodara, timing your arrival as the train rumbles across this majestic colonial stone viaduct framed by steep tea hills. Take an easy 1.5-hour hike up Little Adam's Peak for sweeping views of Ella Gap. In the afternoon, pause at roaring Ravana Falls—associated with the epic Ramayana legend—and soak up the relaxed cafe atmosphere in Ella village.",
        meals: "Breakfast",
        stay: "Morning Dew Ella / Oak Ray Ella Gap (or similar 3★)"
      },
      {
        dayNumber: 8,
        title: "Ella to Yala National Park — Buduruwagala Sculptures & Afternoon Leopard Safari",
        body: "Descend from the central highlands into the southern plains (approx. 2.5 hours). En route, discover Buduruwagala, a secluded 9th-century Buddhist cliff site featuring seven colossal rock carvings. Continue to Yala National Park, Sri Lanka's premier wildlife reserve. Check into your safari lodge and embark on an afternoon 4x4 jeep safari in Yala Block 1. Yala hosts one of the highest leopard densities on earth alongside sloth bears, wild boars, mugger crocodiles, and colorful waterbirds.",
        meals: "Breakfast, Lunch",
        stay: "Elephant Reach Yala / Chandrika Hotel Tissamaharama (or similar 3★)"
      },
      {
        dayNumber: 9,
        title: "Yala to Galle — Early Morning Safari, Galle Fort Ramparts & Farewell Dinner",
        body: "Head out at dawn for a second game drive in Yala during peak wildlife activity hours. Return to the lodge for a hearty breakfast before driving west along the southern coastline to Galle (approx. 2 hours). In the afternoon, take a guided walking tour across the ramparts of UNESCO-listed Galle Fort, built by the Portuguese and expanded by the Dutch in the 1600s. Explore cobblestone streets, heritage churches, boutique cafes, and Galle Lighthouse. Enjoy free time on Unawatuna beach followed by a festive farewell group dinner.",
        meals: "Breakfast, Dinner (Farewell dinner; Indian veg set available)",
        stay: "Lady Hill Galle / Tartaruga Beach Hotel Unawatuna (or similar 3★)"
      },
      {
        dayNumber: 10,
        title: "Galle to Colombo — Kosgoda Sea Turtle Sanctuary & Airport Drop",
        body: "After breakfast, depart Galle toward Colombo along the Southern Expressway (approx. 2.5 hours). Pause at the Kosgoda Sea Turtle Conservation Project to learn about ethical marine conservation and observe rescued sea turtle hatchlings. Transfer directly to Bandaranaike International Airport (CMB) in time for your onward evening flight home to India, filled with memories of the Pearl of the Indian Ocean.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "9 nights accommodation on twin-share basis in curated 3★ hotels & scenic lodges (4★ upgrade supplement available)",
      "Daily breakfast at hotels, 5 lunches (Days 2–6), welcome dinner (Day 1), and farewell dinner (Day 9)",
      "All transfers, sightseeing, and inter-city travel in a private air-conditioned coach with English-speaking national guide",
      "Kandy to Nanu Oya scenic hill country train ticket (2nd class reserved seats)",
      "Sigiriya Rock Fortress, Dambulla Cave Temple, Polonnaruwa, Temple of the Tooth, Peradeniya Gardens, Pedro Tea Factory, Nine Arch Bridge, Ravana Falls, Buduruwagala & Galle Fort entrance fees",
      "Minneriya National Park 4x4 safari (shared jeep & park entrance fees)",
      "Yala National Park Block 1 4x4 safari — 2 game drives included (shared jeep & park entrance fees)",
      "Kosgoda Sea Turtle Conservation visit (seasonal release observation)",
      "Kandyan cultural dance and drumming performance tickets",
      "All applicable local government taxes and toll charges"
    ],
    exclusions: [
      "International roundtrip airfare to/from Colombo (CMB)",
      "Sri Lanka Electronic Travel Authorisation (ETA) visa fee (USD 35 pp, applied online at https://www.eta.gov.lk)",
      "Travel and medical insurance",
      "Hindi-speaking guide supplement (available on private request)",
      "Jain meal supplement (advance notice required; surcharge may apply)",
      "Optional evening Yala game drive or personal adventure activities",
      "Personal expenses, laundry, telephone calls, camera fees, and tips for driver/guide",
      "4★ hotel accommodation supplement (USD 150 per person)"
    ],
    visaNote: DEFAULT_SRI_LANKA_VISA_NOTE,
    isGroup: true,
    groupSize: "Min 2 / Max 20 pax (guaranteed from 2 pax)",
    departureStyle: "Fixed-date SIC — Every Saturday year-round (extra Wednesdays Dec–Mar & Jul–Aug)",
    sampleDates: "Every Saturday departure throughout 2026",
    audience: "Young Indian travellers, couples, and friends seeking the ultimate, hassle-free 10-day loop of Sri Lanka's top cultural, scenic, and wildlife icons",
    isFeatured: true,
    relatedSlugs: [
      "sri-lanka-discovery-8d",
      "sri-lanka-classic-private-8d",
      "sri-lanka-ramayana-trail-8d"
    ],
    heroImage: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Sri Lanka Grand Tour 10D/9N Group Tour | Colombo to Galle | Hassle Free Travels",
    seoDescription: "Join Hassle Free Travels for the 10-day Sri Lanka Grand Tour. Sigiriya Rock, Kandy scenic train, Minneriya & Yala safaris, Galle Fort, and verified Indian food options.",
    mealsSummary: "Daily Breakfast, 5 Lunches, 2 Dinners (Welcome & Farewell Dinners with Indian Veg options)",
    staySummary: "2N Colombo 3★, 2N Sigiriya 3★, 1N Kandy 3★, 1N Nuwara Eliya 3★, 1N Ella 3★, 1N Yala 3★, 1N Galle 3★ (or similar)",
    transportSummary: "Private A/C Coach throughout + Reserved 2nd-Class Kandy–Nanu Oya Scenic Train",
    departureCities: ["Delhi", "Mumbai", "Chennai", "Bengaluru", "Hyderabad", "Direct flight connections to Colombo (CMB)"]
  },

  // ─────────────────────────────────────────────────────────────
  // 2. Group 2 — Sri Lanka Discovery (8D / 7N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "sri-lanka-discovery-8d",
    destinationSlug: "sri-lanka",
    name: "Sri Lanka Discovery Group Tour",
    tagline: "Colombo → Sigiriya → Kandy → Nuwara Eliya → Ella → Mirissa",
    days: 8,
    nights: 7,
    packageType: "group",
    categoryLabel: "Group",
    route: "Colombo → Sigiriya → Kandy → Nuwara Eliya → Ella → Mirissa",
    startCity: "Colombo",
    endCity: "Colombo",
    priceFromUSD: 749,
    priceFromINR: roundToMarketingPrice(749 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "3★ Value City & Heritage Hotels (4★ supplement USD 120 pp available)",
    bestMonths: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    highlights: [
      "Fixed Friday departures year-round — guaranteed departure from just 2 travelers",
      "Indian vegetarian and Jain meals included in the base package with zero surcharge",
      "Hindi & English-speaking local tour guide throughout the journey",
      "Pinnawala Elephant Sanctuary visit to observe morning river bathing and ethical feeding",
      "Sigiriya Rock Fortress early-morning climb & ancient Polonnaruwa quadrangle",
      "Horton Plains cloud forest trek to the sheer 870m precipice at World's End",
      "Relax on golden Mirissa beach with sunset views from iconic Parrot Rock"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Arrive Colombo — Welcome by Hindi-Speaking Host, Galle Face Green & Indian Dinner",
        body: "Arrive at Bandaranaike International Airport (CMB) in Colombo, where you will be met by your Hassle Free Travels Hindi and English-speaking tour coordinator. Transfer to your Colombo hotel by comfortable air-conditioned coach. In the evening, enjoy a refreshing sunset walk along Galle Face Green promenade overlooking the Indian Ocean. Sample famous street snacks like vegetable kottu and pol roti. Gather tonight for an authentic Indian vegetarian/Jain welcome dinner in Colombo.",
        meals: "Dinner (Indian vegetarian/Jain buffet)",
        stay: "Fairway Colombo / ME Colombo (or similar 3★)"
      },
      {
        dayNumber: 2,
        title: "Colombo to Pinnawala, Dambulla Caves & Sigiriya",
        body: "Depart Colombo early and head toward the Cultural Triangle. Stop en route at Pinnawala Elephant Sanctuary, a government-run haven for orphaned and rescued wild elephants; observe the herd bathing together in the river (at 10:00 AM) and witness feeding time (no riding permitted). Continue to the UNESCO World Heritage Dambulla Cave Temple to marvel at 153 Buddha statues and centuries-old ceiling frescoes inside five rock chambers. Arrive in Sigiriya and check in.",
        meals: "Breakfast, Lunch",
        stay: "Camellia Resort / Fresco Water Villa Sigiriya (or similar 3★)"
      },
      {
        dayNumber: 3,
        title: "Sigiriya Rock Fortress & Polonnaruwa Ancient Citadel",
        body: "Set out early (07:00 AM) to climb the 5th-century Sigiriya Rock Fortress before the midday heat. Admire the water gardens, the ancient frescoes of the Cloud Maidens, and the Lion Terrace before standing atop King Kasyapa's royal palace platform. In the afternoon, explore Polonnaruwa (UNESCO), ancient capital of the Chola and Sinhalese kings. Tour the Gal Vihara rock statues, the Lotus Pond, and Rankoth Vehera stupa.",
        meals: "Breakfast, Lunch",
        stay: "Camellia Resort / Fresco Water Villa Sigiriya (or similar 3★)"
      },
      {
        dayNumber: 4,
        title: "Sigiriya to Kandy — Minneriya/Kaudulla Elephant Safari & Temple of the Tooth",
        body: "Embark on an open jeep safari in Minneriya or Kaudulla National Park (chosen based on live herd movements) to observe herds of wild Asian elephants and diverse wetland birds. Continue your drive south to the hill capital of Kandy (approx. 2.5 hours). Visit the sacred Temple of the Tooth Relic (Sri Dalada Maligawa) to witness the evening puja ceremony, followed by an evening Kandyan cultural show with fire-walking and traditional drumming.",
        meals: "Breakfast, Dinner",
        stay: "Topaz Hotel Kandy / Senani Hotel Kandy (or similar 3★)"
      },
      {
        dayNumber: 5,
        title: "Kandy to Nuwara Eliya — Peradeniya Gardens, Ramboda & Seetha Amman Temple",
        body: "Explore the lush Royal Botanical Gardens at Peradeniya, home to over 4,000 species of flora and towering royal palms. Take a scenic drive into the central highlands via Ramboda Pass with stops at cascading waterfalls. Tour the Mackwoods Labookellie Tea Estate to witness tea processing and sample authentic Ceylon tea. Visit the sacred Seetha Amman Temple in Sita Eliya—the historic spot where Sita was held in Ashoka Vatika, holding great spiritual reverence for Indian travellers.",
        meals: "Breakfast, Lunch",
        stay: "Galway Heights / Oak Ray Summer Hill Breeze (or similar 3★)"
      },
      {
        dayNumber: 6,
        title: "Nuwara Eliya to Ella — Horton Plains World's End Trek & Nine Arch Bridge",
        body: "Rise early for a breathtaking trek through Horton Plains National Park (UNESCO World Heritage Site), walking through montane cloud forests to the dramatic 870-meter vertical drop of World's End and scenic Baker's Falls. Drive to Ella village in the afternoon. Stroll through emerald tea estates to the iconic colonial-era Nine Arch Bridge, timing your arrival for the afternoon train crossing, followed by a sunset walk up Little Adam's Peak.",
        meals: "Breakfast",
        stay: "Morning Dew Ella / Ella Flower Garden Resort (or similar 3★)"
      },
      {
        dayNumber: 7,
        title: "Ella to Mirissa — Ravana Falls & South Coast Beach Sunset",
        body: "Stop at the roaring 25-meter Ravana Falls for photographs before winding down the mountains toward the southern coast (approx. 3 hours). Arrive at the golden crescent of Mirissa Beach. Enjoy free time for swimming in the turquoise waters or relaxing beneath swaying coconut palms. Walk out to Parrot Rock at low tide for panoramic sunset views over Mirissa Bay. Gather for a beachside farewell dinner featuring vegetarian and Jain delicacies.",
        meals: "Breakfast, Dinner (Farewell dinner with vegetarian/Jain specials)",
        stay: "Paradise Beach Club Mirissa / Mandara Resort (or similar 3★)"
      },
      {
        dayNumber: 8,
        title: "Mirissa to Colombo Airport — Optional Whale Watching & Departure",
        body: "Morning at leisure, or embark on an optional whale watching boat excursion (Nov–Apr season; approx. USD 35 pp, blue whales and dolphins frequent Mirissa's waters). Transfer via the Southern Expressway directly to Colombo Bandaranaike International Airport (CMB) for your flight back home.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "7 nights accommodation in vetted 3★ hotels on twin-share basis (4★ supplement available)",
      "Daily breakfast at hotels, 4 lunches (Days 2–5), welcome dinner (Day 1), and farewell dinner (Day 7)",
      "Indian vegetarian and Jain meals included in base price without surcharge",
      "All transfers and excursions by private air-conditioned coach with Hindi and English-speaking guide throughout",
      "Pinnawala Elephant Sanctuary, Dambulla Cave Temple, Sigiriya Rock, Polonnaruwa, Horton Plains, Temple of Tooth, Peradeniya Gardens, Mackwoods Tea Factory, Nine Arch Bridge, and Ravana Falls entrance tickets",
      "Minneriya/Kaudulla National Park 4x4 safari (jeep and entry fees)",
      "Kandyan cultural dance and drumming performance tickets",
      "All local taxes, highway tolls, and driver allowances"
    ],
    exclusions: [
      "International flights between India and Colombo (CMB)",
      "Sri Lanka ETA visa fee (USD 35 pp, apply at https://www.eta.gov.lk)",
      "Travel insurance",
      "Optional whale watching excursion in Mirissa (approx. USD 35 pp during Nov–Apr)",
      "Optional Gregory Lake boating or personal adventure sports",
      "Personal expenses, laundry, tips, and drinks",
      "4★ hotel upgrade supplement (USD 120 per person)"
    ],
    visaNote: DEFAULT_SRI_LANKA_VISA_NOTE,
    isGroup: true,
    groupSize: "Min 2 / Max 16 pax (guaranteed departure from 2 pax)",
    departureStyle: "Fixed-date SIC — Every Friday year-round",
    sampleDates: "Every Friday departure throughout 2026",
    audience: "Indian youth, college groups, and value-conscious travellers looking for guaranteed Indian food, Hindi guidance, and the best of Sri Lanka in 8 days",
    isFeatured: true,
    relatedSlugs: [
      "sri-lanka-grand-tour-10d",
      "sri-lanka-classic-private-8d",
      "sri-lanka-ramayana-trail-8d"
    ],
    heroImage: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Sri Lanka Discovery 8D/7N Group Tour | Veg & Jain Meals Included | Hassle Free Travels",
    seoDescription: "Book the 8-day Sri Lanka Discovery group tour with Hassle Free Travels. Friday departures, Hindi guide, 100% Indian vegetarian & Jain meals, Sigiriya, Kandy, Ella & Mirissa.",
    mealsSummary: "Daily Breakfast, 4 Lunches, 2 Dinners (100% Vegetarian & Jain-friendly meals included in base)",
    staySummary: "1N Colombo 3★, 2N Sigiriya 3★, 1N Kandy 3★, 1N Nuwara Eliya 3★, 1N Ella 3★, 1N Mirissa 3★ (or similar)",
    transportSummary: "Private Air-Conditioned Coach + Hindi & English Speaking Tour Guide",
    departureCities: ["Delhi", "Mumbai", "Chennai", "Bengaluru", "Kolkata", "Direct flights to Colombo (CMB)"]
  },

  // ─────────────────────────────────────────────────────────────
  // 3. FIT 1 — Sri Lanka Classic Private (8D / 7N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "sri-lanka-classic-private-8d",
    destinationSlug: "sri-lanka",
    name: "Sri Lanka Classic Private Chauffeur Tour",
    tagline: "Colombo → Sigiriya → Kandy → Ella → Yala → Galle",
    days: 8,
    nights: 7,
    packageType: "custom",
    categoryLabel: "Private",
    route: "Colombo → Sigiriya → Kandy → Ella → Yala → Galle",
    startCity: "Colombo",
    endCity: "Colombo",
    priceFromUSD: 950,
    priceFromINR: roundToMarketingPrice(950 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "3★ Handpicked Hotels (4★ from USD 1,150 pp)",
    bestMonths: ["November", "December", "January", "February", "March", "April"],
    highlights: [
      "Private dedicated air-conditioned vehicle & certified English-speaking chauffeur-guide throughout",
      "Flexible pacing tailored to your preferences — start times and photo stops at your control",
      "Climb Sigiriya Rock Citadel & explore Dambulla Cave Temples in one day",
      "World-famous scenic train journey through misty tea mountains from Kandy to Ella",
      "Yala National Park 4x4 leopard safari in Block 1",
      "Walking tour across UNESCO-listed 16th-century Galle Fort ramparts",
      "Indian vegetarian and Jain meals coordinated upon request"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Arrive Colombo — Private Chauffeur Meet & Greet, Evening at Leisure",
        body: "Arrive at Bandaranaike International Airport (CMB) in Colombo. Meet your private English-speaking chauffeur-guide at the arrival hall and transfer directly to your central hotel in a private air-conditioned vehicle. Spend your evening at leisure strolling along Galle Face Green or unwinding at your hotel.",
        meals: "None",
        stay: "Fairway Colombo / Cinnamon Red (or similar 3★)"
      },
      {
        dayNumber: 2,
        title: "Colombo City Exploration — Gangaramaya Temple & Historic Kelaniya",
        body: "Embark on a private guided city tour covering Gangaramaya Buddhist Temple, Seema Malaka on Beira Lake, the National Museum, and the vibrant Pettah market lanes. In the afternoon, visit Kelaniya Raja Maha Vihara, one of Sri Lanka's most sacred Buddhist shrines, historically associated with the Buddha's third visit and the coronation of King Vibhishana in the Ramayana.",
        meals: "Breakfast",
        stay: "Fairway Colombo / Cinnamon Red (or similar 3★)"
      },
      {
        dayNumber: 3,
        title: "Colombo to Sigiriya — Dambulla Cave Temple & Sigiriya Rock Fortress",
        body: "Drive north into the Cultural Triangle (approx. 4 hours). Tour the UNESCO-listed Dambulla Cave Temple with its magnificent Buddha murals across five ancient cavern chambers. Arrive in Sigiriya and conquer the 1,200 steps of Sigiriya Rock Fortress to view the Cloud Maidens frescoes, Mirror Wall, and summit ruins.",
        meals: "Breakfast, Lunch",
        stay: "Camellia Resort / Hotel Sigiriya (or similar 3★)"
      },
      {
        dayNumber: 4,
        title: "Polonnaruwa Ancient City & Minneriya Elephant Safari",
        body: "Discover the 12th-century stone palaces and stupas of Polonnaruwa, highlighting the Gal Vihara rock statues. In the afternoon, embark on an open 4x4 jeep safari in Minneriya National Park to observe herds of wild Asian elephants grazing around the reservoir.",
        meals: "Breakfast, Lunch",
        stay: "Camellia Resort / Hotel Sigiriya (or similar 3★)"
      },
      {
        dayNumber: 5,
        title: "Sigiriya to Kandy — Temple of the Tooth & Cultural Show",
        body: "Drive to the royal hill capital of Kandy (approx. 2.5 hours). Tour the Temple of the Tooth Relic (Sri Dalada Maligawa), explore the exotic flora at Peradeniya Royal Botanical Gardens, walk around Kandy Lake, and attend an evening Kandyan cultural dance performance.",
        meals: "Breakfast, Dinner",
        stay: "Topaz Hotel / Hotel Suisse Kandy (or similar 3★)"
      },
      {
        dayNumber: 6,
        title: "Kandy to Ella by Scenic Train — Nine Arch Bridge Walk",
        body: "Board the legendary scenic train from Kandy to Ella (approx. 6 hours). Wind past emerald tea hills, waterfalls, and mountain tunnels on one of Asia's most spectacular rail journeys. Check in at Ella and walk to the iconic Nine Arch Bridge.",
        meals: "Breakfast",
        stay: "Morning Dew Ella / Oak Ray Ella Gap (or similar 3★)"
      },
      {
        dayNumber: 7,
        title: "Ella to Yala National Park — Little Adam's Peak & Leopard Safari",
        body: "Hike up Little Adam's Peak for sunrise views over Ella Gap. Drive to Yala (approx. 2.5 hours) and embark on an afternoon 4x4 safari in Yala National Park Block 1 to spot leopards, sloth bears, wild elephants, and spotted deer.",
        meals: "Breakfast, Lunch",
        stay: "Elephant Reach Yala / Chandrika Hotel (or similar 3★)"
      },
      {
        dayNumber: 8,
        title: "Yala to Colombo via Galle Fort — Departure",
        body: "Enjoy an early morning wildlife safari in Yala. Drive along the scenic southern coast with a stop at Galle Fort to walk the ramparts and lighthouse. Continue via the Southern Expressway to Colombo airport (CMB) for your departure flight.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "7 nights accommodation in 3★ hotels on twin-share basis (4★ upgrade from USD 1,150 pp)",
      "Daily breakfast at hotels and meals as detailed in the itinerary",
      "Private dedicated air-conditioned vehicle with English-speaking chauffeur-guide for the entire duration",
      "All entrance fees for Sigiriya Rock, Dambulla Caves, Polonnaruwa, Temple of the Tooth, and Peradeniya Gardens",
      "Minneriya National Park 4x4 safari and 2 Yala Block 1 safaris (shared jeep & park entrance fees)",
      "Scenic Kandy to Ella train ticket",
      "Kandyan cultural dance tickets and local government taxes"
    ],
    exclusions: [
      "International flights to/from Colombo",
      "Sri Lanka ETA visa (USD 35 pp at https://www.eta.gov.lk)",
      "Travel insurance and tips for chauffeur-guide",
      "Personal expenses, camera fees, and optional activities",
      "4★ hotel supplement (USD 200 pp)"
    ],
    visaNote: DEFAULT_SRI_LANKA_VISA_NOTE,
    isGroup: false,
    groupSize: "Min 2 pax (Private FIT)",
    departureStyle: "Private daily departures on request (minimum 2 travelers)",
    sampleDates: "Daily departures year-round",
    audience: "Couples, small families, and friends desiring the classic Sri Lanka loop with private vehicle autonomy and flexible timing",
    isFeatured: true,
    relatedSlugs: [
      "sri-lanka-grand-tour-10d",
      "sri-lanka-honeymoon-escape-9d",
      "sri-lanka-wildlife-safari-7d"
    ],
    heroImage: "https://images.unsplash.com/photo-1588258524675-c6191b29a250?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Sri Lanka Classic Private Tour 8D/7N | Chauffeur Guide | Hassle Free Travels",
    seoDescription: "Explore Sri Lanka in private comfort with Hassle Free Travels. 8-day private car circuit: Sigiriya, Kandy, scenic train, Yala safari, and Galle Fort.",
    mealsSummary: "Daily Breakfast, 3 Lunches, 1 Dinner",
    staySummary: "2N Colombo 3★, 2N Sigiriya 3★, 1N Kandy 3★, 1N Ella 3★, 1N Yala 3★ (or similar)",
    transportSummary: "Private Dedicated A/C Sedan/SUV + Kandy to Ella Train",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Connecting to Colombo (CMB)"]
  },

  // ─────────────────────────────────────────────────────────────
  // 4. FIT 2 — Sri Lanka Honeymoon Escape (9D / 8N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "sri-lanka-honeymoon-escape-9d",
    destinationSlug: "sri-lanka",
    name: "Sri Lanka Romantic Honeymoon Escape",
    tagline: "Colombo → Sigiriya → Kandy → Nuwara Eliya → Ella → Mirissa",
    days: 9,
    nights: 8,
    packageType: "honeymoon",
    categoryLabel: "Honeymoon",
    route: "Colombo → Sigiriya → Kandy → Nuwara Eliya → Ella → Mirissa",
    startCity: "Colombo",
    endCity: "Colombo",
    priceFromUSD: 1450,
    priceFromINR: roundToMarketingPrice(1450 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "4★ Boutique & Heritage Villas (5★ luxury from USD 2,100 pp)",
    bestMonths: ["November", "December", "January", "February", "March", "April"],
    highlights: [
      "Curated boutique eco-villas and heritage colonial hideaways throughout",
      "Private candlelit dinners arranged on 4 special evenings (rooftop, garden, beach)",
      "VIP airport meet & greet with fresh flower garlands and private luxury car transfer",
      "Early-morning private guided sunrise climb of Sigiriya Rock Fortress",
      "Scenic hill country train with reserved 1st-class observation car seats",
      "Complimentary 60-minute couples spa massage sessions at 3 boutique properties",
      "Romantic beachfront stay in Mirissa with optional seasonal whale watching"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Arrive Colombo — VIP Welcome, Boutique Hotel & Oceanfront Sunset Dinner",
        body: "VIP arrival meet and greet at Colombo airport with flower garlands. Private transfer to a luxury boutique heritage hotel in Colombo Fort. In-room welcome amenity with fresh flowers and chilled tropical sparkling juice. In the evening, enjoy a private candlelit sunset dinner overlooking the Indian Ocean.",
        meals: "Dinner (Private romantic dinner)",
        stay: "The Galle Face Hotel / Uga Residence Colombo (or similar 4★/5★ boutique)"
      },
      {
        dayNumber: 2,
        title: "Colombo to Sigiriya — Dambulla Caves & Infinity Pool Resort",
        body: "Travel by private car to the Cultural Triangle, stopping at Dambulla Cave Temple. Check into an eco-luxury lodge featuring an infinity pool with dramatic views of Sigiriya Rock. Enjoy an included 60-minute couples Ayurvedic massage at the resort spa.",
        meals: "Breakfast",
        stay: "Aliya Resort & Spa / Water Garden Sigiriya (or similar 4★ boutique)"
      },
      {
        dayNumber: 3,
        title: "Sigiriya Private Sunrise Ascent & Candlelit Garden Dinner",
        body: "Begin at dawn (05:30 AM) with a private guide to climb Sigiriya Rock before other visitors arrive. Celebrate at the summit with fresh tropical fruit juices while admiring the sunrise across the jungle canopy. Relax by the pool in the afternoon and dine under lantern-lit trees at a private candlelit garden dinner.",
        meals: "Breakfast, Dinner (Private candlelit garden dinner)",
        stay: "Aliya Resort & Spa / Water Garden Sigiriya (or similar 4★ boutique)"
      },
      {
        dayNumber: 4,
        title: "Sigiriya to Kandy — Private Minneriya Safari & Lakeside Heritage Stay",
        body: "Embark on a private jeep safari through Minneriya National Park to watch wild elephants. Drive to Kandy and attend the evening puja ceremony at the Temple of the Tooth. Check into a heritage boutique hotel overlooking Kandy Lake.",
        meals: "Breakfast, Lunch",
        stay: "The Kandy House / Amaya Hills Kandy (or similar 4★ boutique)"
      },
      {
        dayNumber: 5,
        title: "Kandy to Nuwara Eliya — 1st-Class Scenic Train & Couples Spa",
        body: "Morning stroll in Peradeniya Botanical Gardens. Board the scenic train to Nanu Oya in reserved 1st-class observation seats. Check into a colonial-era hill station boutique retreat. Enjoy your second included 60-minute couples spa session.",
        meals: "Breakfast",
        stay: "Jetwing St. Andrew's / The Grand Hotel Nuwara Eliya (or similar 4★ heritage)"
      },
      {
        dayNumber: 6,
        title: "Nuwara Eliya to Ella — Tea Plantation Walk & Nine Arch Bridge Sunset",
        body: "Private walk through a lush tea plantation with tea master tasting. Scenic drive to Ella via Horton Plains' World's End overlook. Stroll to Nine Arch Bridge at sunset and stay at an intimate boutique villa.",
        meals: "Breakfast, Lunch",
        stay: "98 Acres Resort & Spa / Zion View Ella (or similar boutique)"
      },
      {
        dayNumber: 7,
        title: "Ella to Mirissa — Ravana Falls & Beachfront Villa Sunset",
        body: "Stop at Ravana Falls before continuing south to Mirissa. Check into a boutique beachfront resort with direct beach access. Spend the afternoon lounging on private sunbeds. In the evening, savor an intimate private candlelit beach dinner with toes in the sand.",
        meals: "Breakfast, Dinner (Candlelit dinner on the beach)",
        stay: "Sri Sharavi Yurt & Villa / Triple O Six Mirissa (or similar 4★ boutique)"
      },
      {
        dayNumber: 8,
        title: "Mirissa — Whale Watching Excursion & Third Couples Spa Session",
        body: "Set sail on a morning whale watching cruise (Nov–Apr season; spot blue whales and dolphins). Afternoon at leisure on the beach followed by a rejuvenating 60-minute couples spa therapy. Farewell private celebration dinner.",
        meals: "Breakfast, Dinner (Private farewell dinner)",
        stay: "Sri Sharavi Yurt & Villa / Triple O Six Mirissa (or similar 4★ boutique)"
      },
      {
        dayNumber: 9,
        title: "Mirissa to Galle Fort Ramparts & Colombo Airport",
        body: "Explore the romantic cobblestone alleyways of Galle Fort. Browse boutique jewelry and artisan shops before your private highway transfer to Colombo airport for your departure flight.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "8 nights accommodation in handpicked 4★ boutique hotels and luxury heritage villas (5★ upgrade available)",
      "Daily gourmet breakfast, 2 lunches, and 4 curated private candlelit dinners (Days 1, 3, 7, and 8)",
      "Three 60-minute couples spa massage sessions (Sigiriya, Nuwara Eliya, Mirissa)",
      "Flower-decorated rooms and special welcome amenities at every resort",
      "Private dedicated luxury air-conditioned sedan/SUV with experienced chauffeur-guide",
      "Private 4x4 jeep safari in Minneriya National Park and seasonal whale watching boat tickets in Mirissa",
      "1st-class reserved observation seats on the Kandy to Nanu Oya scenic train",
      "All entrance fees and local taxes"
    ],
    exclusions: [
      "International airfare",
      "Sri Lanka ETA visa (USD 35 pp at https://www.eta.gov.lk)",
      "Travel insurance and gratuities",
      "Whale watching if travelling outside the Nov–Apr season (replaced with coastal lagoon cruise)",
      "5★ luxury hotel supplement (from USD 650 pp)"
    ],
    visaNote: DEFAULT_SRI_LANKA_VISA_NOTE,
    isGroup: false,
    groupSize: "2 pax (Private Couples Tour)",
    departureStyle: "Daily private departures year-round",
    sampleDates: "Daily private bookings",
    audience: "Honeymooners, couples celebrating anniversaries, and romantic travellers seeking luxury, intimacy, and personalized experiences",
    isFeatured: true,
    relatedSlugs: [
      "sri-lanka-classic-private-8d",
      "sri-lanka-luxury-cruise-land-9d",
      "sri-lanka-ayurveda-wellness-8d"
    ],
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Sri Lanka Honeymoon Tour 9D/8N | Candlelit Dinners & Spa | Hassle Free Travels",
    seoDescription: "Romantic 9-day Sri Lanka honeymoon with Hassle Free Travels. Boutique villas, couples spa, candlelit beach dinners, scenic train, and Mirissa coastline.",
    mealsSummary: "Daily Gourmet Breakfast, 2 Lunches, 4 Romantic Candlelit Dinners",
    staySummary: "1N Colombo 4★, 2N Sigiriya Boutique, 1N Kandy Boutique, 1N Nuwara Eliya Heritage, 1N Ella Boutique, 2N Mirissa Beach Villa",
    transportSummary: "Private Luxury A/C Vehicle + 1st-Class Scenic Train",
    departureCities: ["Mumbai", "Delhi", "Bengaluru", "Chennai", "Kolkata", "Connecting to Colombo (CMB)"]
  },

  // ─────────────────────────────────────────────────────────────
  // 5. FIT 3 — Sri Lanka Family Adventure (10D / 9N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "sri-lanka-family-adventure-10d",
    destinationSlug: "sri-lanka",
    name: "Sri Lanka Family Adventure Tour",
    tagline: "Colombo → Pinnawala → Sigiriya → Kandy → Nuwara Eliya → Ella → Yala → Galle",
    days: 10,
    nights: 9,
    packageType: "family",
    categoryLabel: "Family",
    route: "Colombo → Pinnawala → Sigiriya → Kandy → Nuwara Eliya → Ella → Yala → Galle",
    startCity: "Colombo",
    endCity: "Colombo",
    priceFromUSD: 880,
    priceFromINR: roundToMarketingPrice(880 * USD_TO_INR),
    priceUnit: "per person (twin/triple share)",
    priceNote: "From · per person · land only · child under 12 pays 70% of adult cost",
    hotelCategory: "3★/4★ Family-Friendly Resorts with Swimming Pools",
    bestMonths: ["November", "December", "January", "February", "March", "April"],
    highlights: [
      "Child-friendly pacing with comfortable drive times (under 3 hours per stretch)",
      "Pinnawala Elephant Sanctuary — watch herd bathing and bottle-feeding in an ethical setting",
      "Sigiriya Rock or gentler Pidurangala alternative for younger children",
      "Open-top 4x4 elephant jeep safari in Minneriya and leopard safari in Yala",
      "Kosgoda Sea Turtle Conservation visit — hold and release baby turtles into the ocean",
      "Galle Fort interactive treasure hunt activity designed for kids and teens",
      "Indian vegetarian and kid-friendly meal options guaranteed throughout"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Arrive Colombo — Airport Pickup, Hotel Check-in & Kite Flying at Galle Face Green",
        body: "Arrive in Colombo where your dedicated family chauffeur-guide welcomes you with cool towels and bottled water. Transfer to your family hotel. Spend the late afternoon at Galle Face Green where children can fly colorful kites and enjoy ocean breezes while parents relax with street-side snacks.",
        meals: "None",
        stay: "Fairway Colombo / Cinnamon Red (or similar 3★/4★)"
      },
      {
        dayNumber: 2,
        title: "Colombo Highlights — Gangaramaya Temple Museum & Viharamahadevi Park",
        body: "Tour Gangaramaya Temple, fascinating for children with its eclectic museum of vintage cars, clocks, and statues. Run and play in Viharamahadevi Park's open playgrounds and visit the National Museum before a relaxing afternoon by the pool.",
        meals: "Breakfast",
        stay: "Fairway Colombo / Cinnamon Red (or similar 3★/4★)"
      },
      {
        dayNumber: 3,
        title: "Colombo to Pinnawala & Sigiriya — Elephant Bathing & Dambulla Caves",
        body: "Drive to Pinnawala Elephant Sanctuary. Kids will love watching the gentle giants splash in the Ma Oya river during morning bath time and drinking milk from giant bottles under keeper supervision. Continue to Dambulla Cave Temple and check into your family resort in Sigiriya.",
        meals: "Breakfast, Lunch",
        stay: "Camellia Resort / Fresco Water Villa (or similar 3★)"
      },
      {
        dayNumber: 4,
        title: "Sigiriya Rock (or Pidurangala Option) & Minneriya Elephant Safari",
        body: "Ascend the iconic Sigiriya Rock (a gentler hike up Pidurangala is offered for younger children under 8). In the afternoon, head out on an exciting 4x4 open jeep safari in Minneriya National Park, where wild elephant herds roam close to the vehicles.",
        meals: "Breakfast, Lunch",
        stay: "Camellia Resort / Fresco Water Villa (or similar 3★)"
      },
      {
        dayNumber: 5,
        title: "Sigiriya to Kandy — Polonnaruwa Ruins & Temple of the Tooth",
        body: "Explore the ancient ruins of Polonnaruwa where kids can spot wild monkeys around ancient stone palaces. Drive to Kandy, visit the Temple of the Tooth, and take a paddle boat ride on Kandy Lake.",
        meals: "Breakfast",
        stay: "Topaz Hotel / Hotel Suisse Kandy (or similar 3★)"
      },
      {
        dayNumber: 6,
        title: "Kandy to Nuwara Eliya — Peradeniya Gardens & Gregory Lake Boating",
        body: "Stroll through the Royal Botanical Gardens at Peradeniya to marvel at giant bamboo groves and fruit bat colonies. Drive up into tea country, tour a working tea factory, and enjoy swan paddle boating on Gregory Lake in Nuwara Eliya.",
        meals: "Breakfast, Lunch",
        stay: "Galway Heights / Summer Hill Breeze (or similar 3★)"
      },
      {
        dayNumber: 7,
        title: "Nuwara Eliya to Ella — World's End Walk & Ravana Falls",
        body: "Morning visit to Horton Plains for the 9km nature walk to World's End (suitable for kids 8+). Drive to Ella to see the Nine Arch Bridge and splash in the shallow rock pools at the base of Ravana Falls.",
        meals: "Breakfast",
        stay: "Morning Dew Ella / Oak Ray Ella Gap (or similar 3★)"
      },
      {
        dayNumber: 8,
        title: "Ella to Yala National Park — Easy Little Adam's Peak & Wildlife Safari",
        body: "Easy 45-minute family hike up Little Adam's Peak. Drive down to Yala National Park and embark on an afternoon 4x4 game drive to spot spotted deer, peacocks, water buffalos, crocodiles, and elusive leopards.",
        meals: "Breakfast, Lunch",
        stay: "Elephant Reach Yala / Chandrika Hotel (or similar 3★)"
      },
      {
        dayNumber: 9,
        title: "Yala to Galle — Morning Safari, Turtle Hatchery & Fort Treasure Hunt",
        body: "Dawn safari in Yala, then drive west to Galle. Stop at Kosgoda Turtle Hatchery where children can see newborn hatchlings and help release them into the ocean (seasonal). In Galle Fort, participate in a fun 1.5-hour guide-led historic treasure hunt.",
        meals: "Breakfast, Dinner",
        stay: "Lady Hill Galle / Tartaruga Beach Resort (or similar 3★)"
      },
      {
        dayNumber: 10,
        title: "Galle to Colombo Airport — Unawatuna Beach & Departure",
        body: "Morning swim in the calm shallow waters of Unawatuna Bay. Drive along the expressway to Colombo airport (CMB) for your journey home.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "9 nights accommodation in family-friendly 3★/4★ resorts with swimming pools",
      "Daily breakfast, 4 lunches, and 1 special family dinner",
      "Child discount: Children under 12 pay 70% of adult land cost",
      "Private dedicated air-conditioned spacious van with experienced family-friendly chauffeur-guide",
      "Pinnawala Elephant Sanctuary, Sigiriya Rock, Dambulla Caves, Polonnaruwa, Temple of Tooth, Peradeniya, and Horton Plains entrance fees",
      "Minneriya and Yala 4x4 open jeep safaris with park tickets",
      "Kosgoda Sea Turtle Hatchery entrance and Galle Fort family treasure hunt activity"
    ],
    exclusions: [
      "International flights to/from Colombo",
      "Sri Lanka ETA visa (USD 35 per person; children also require an ETA)",
      "Travel insurance and gratuities",
      "Personal expenses and optional lake water sports"
    ],
    visaNote: DEFAULT_SRI_LANKA_VISA_NOTE,
    isGroup: false,
    groupSize: "Min 2 adults + children (Private Family Tour)",
    departureStyle: "Daily private departures on request",
    sampleDates: "Daily private bookings",
    audience: "Families with kids and multi-generational groups looking for balanced driving times, wildlife encounters, and kid-approved activities",
    isFeatured: false,
    relatedSlugs: [
      "sri-lanka-classic-private-8d",
      "sri-lanka-wildlife-safari-7d",
      "sri-lanka-grand-tour-10d"
    ],
    heroImage: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Sri Lanka Family Tour 10D/9N | Wildlife & Beach Adventure | Hassle Free Travels",
    seoDescription: "Book the ultimate 10-day Sri Lanka family adventure with Hassle Free Travels. Pinnawala elephants, Sigiriya, Minneriya & Yala safaris, turtle hatchery & Galle Fort.",
    mealsSummary: "Daily Breakfast, 4 Lunches, 1 Dinner",
    staySummary: "2N Colombo 3★, 2N Sigiriya 3★, 1N Kandy 3★, 1N Nuwara Eliya 3★, 1N Ella 3★, 1N Yala 3★, 1N Galle 3★",
    transportSummary: "Private Spacious A/C Family Van with Chauffeur-Guide",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Hyderabad", "Flights to Colombo (CMB)"]
  },

  // ─────────────────────────────────────────────────────────────
  // 6. FIT 4 — Sri Lanka Wildlife & Safari (7D / 6N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "sri-lanka-wildlife-safari-7d",
    destinationSlug: "sri-lanka",
    name: "Sri Lanka Wildlife & Safari Expedition",
    tagline: "Udawalawe → Sinharaja Rainforest → Yala National Park → Mirissa",
    days: 7,
    nights: 6,
    packageType: "adventure",
    categoryLabel: "Wildlife",
    route: "Udawalawe → Sinharaja → Yala → Mirissa",
    startCity: "Colombo",
    endCity: "Colombo",
    priceFromUSD: 820,
    priceFromINR: roundToMarketingPrice(820 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "Wilderness Eco-Lodges & Safari Camps (max 6 pax per vehicle)",
    bestMonths: ["February", "March", "April", "May", "June", "July", "August", "September", "October"],
    highlights: [
      "Accompanied by an expert naturalist guide throughout (not a standard driver-guide)",
      "Udawalawe National Park — guaranteed wild Asian elephant viewing and Elephant Transit Home",
      "Sinharaja Rainforest (UNESCO) — guided treks for endemic bird species and rare reptiles",
      "Two dedicated 4x4 game drives in Yala National Park Block 1 for leopard and sloth bear tracking",
      "Stay in eco-lodges and luxury wilderness safari tents adjoining national parks",
      "Relax at Mirissa Beach with optional seasonal blue whale watching"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Colombo to Udawalawe National Park — Afternoon Elephant Safari",
        body: "Meet your expert naturalist at Colombo airport and drive south directly to Udawalawe National Park (approx. 4 hours). Check into an eco-lodge bordering the park. In the afternoon, embark on a private 4x4 jeep safari across open grasslands where a resident herd of 500+ wild elephants, water buffalos, and crested serpent eagles thrive.",
        meals: "Dinner",
        stay: "Grand Udawalawe Safari Resort / Kalu's Hideaway (or similar eco-lodge)"
      },
      {
        dayNumber: 2,
        title: "Udawalawe Full Day — Dawn Safari & Elephant Transit Home",
        body: "Early morning safari (06:00 AM) during prime wildlife photography light. Visit the Elephant Transit Home to watch rescued orphan elephant calves being nurtured and bottle-fed before their return to the wild. Enjoy an afternoon game drive focusing on jackals and raptors.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Grand Udawalawe Safari Resort / Kalu's Hideaway (or similar eco-lodge)"
      },
      {
        dayNumber: 3,
        title: "Udawalawe to Sinharaja Rainforest — Guided Canopy Trek",
        body: "Drive into the Sinharaja Rainforest UNESCO biosphere reserve (approx. 2.5 hours). Venture on an afternoon guided trek with a specialist ornithologist to spot endemic bird species including the Sri Lanka blue magpie, red-faced malkoha, and purple-faced langur monkeys.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "The Rainforest Ecolodge / Sinharaja Adventure Resort"
      },
      {
        dayNumber: 4,
        title: "Sinharaja Jungle Trek to Yala National Park",
        body: "Deep forest morning trek to pristine jungle waterfalls with chances to observe rare amphibians and giant squirrels. Drive to Yala National Park buffer zone (approx. 3 hours) and settle into your wilderness camp. Optional night nature walk.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Elephant Reach Yala / Big Game Camp Yala"
      },
      {
        dayNumber: 5,
        title: "Yala National Park Full Day — Dawn & Sunset Safaris",
        body: "Pre-dawn start (05:30 AM) entering Yala Block 1 for peak leopard tracking along rocky outcrops and waterholes. Return to camp for lunch and midday rest. In the late afternoon, set out on a second safari seeking elusive sloth bears, marsh crocodiles, and Asian elephants at dusk.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Elephant Reach Yala / Big Game Camp Yala"
      },
      {
        dayNumber: 6,
        title: "Yala to Mirissa — Final Morning Safari & Coastal Relaxation",
        body: "Enjoy a final early morning safari in Yala. Transfer to the southern coast at Mirissa (approx. 2 hours). Spend a relaxing afternoon swimming, snorkelling, and catching the sunset from Parrot Rock. Farewell dinner.",
        meals: "Breakfast, Dinner",
        stay: "Paradise Beach Club Mirissa / Triple O Six"
      },
      {
        dayNumber: 7,
        title: "Mirissa to Colombo Airport — Optional Whale Watching & Departure",
        body: "Optional early morning blue whale watching cruise in Mirissa (Nov–Apr). Transfer to Colombo airport (CMB) via the highway for your flight home.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "6 nights accommodation in premium eco-lodges and wilderness safari camps",
      "All meals from Dinner Day 1 through Breakfast Day 7 (full board Days 2–5)",
      "Dedicated professional naturalist guide and private 4x4 safari jeeps",
      "Park entrance fees and permits for Udawalawe (2 safaris), Sinharaja (2 guided treks), and Yala (2 safaris)",
      "Elephant Transit Home entry fee and government wildlife conservation taxes"
    ],
    exclusions: [
      "International airfare",
      "Sri Lanka ETA visa (USD 35 pp)",
      "Travel insurance and tips for tracker/naturalist",
      "Optional Mirissa whale watching cruise (approx. USD 35 pp)"
    ],
    visaNote: DEFAULT_SRI_LANKA_VISA_NOTE,
    isGroup: false,
    groupSize: "Private (max 6 pax per vehicle for optimal viewing)",
    departureStyle: "Daily private departures on request",
    sampleDates: "Daily departures February–October",
    audience: "Wildlife photographers, birdwatchers, conservation enthusiasts, and nature lovers seeking dedicated naturalist guidance",
    isFeatured: false,
    relatedSlugs: [
      "sri-lanka-classic-private-8d",
      "sri-lanka-grand-tour-10d",
      "sri-lanka-adventure-trekking-8d"
    ],
    heroImage: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Sri Lanka Wildlife Safari 7D/6N | Yala Leopards & Udawalawe | Hassle Free Travels",
    seoDescription: "Track leopards and wild elephants with Hassle Free Travels on a 7-day Sri Lanka wildlife safari. Udawalawe, Sinharaja Rainforest & Yala National Park.",
    mealsSummary: "All Meals Included Days 2–5, Breakfast & Dinners on Arrival/Departure",
    staySummary: "2N Udawalawe Eco-Lodge, 1N Sinharaja Rainforest Lodge, 2N Yala Safari Camp, 1N Mirissa Beach Resort",
    transportSummary: "Private A/C Transport + Customized Open 4x4 Safari Jeeps",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Direct flights to Colombo (CMB)"]
  },

  // ─────────────────────────────────────────────────────────────
  // 7. FIT 5 — Sri Lanka Ramayana Trail (8D / 7N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "sri-lanka-ramayana-trail-8d",
    destinationSlug: "sri-lanka",
    name: "Sri Lanka Ramayana Trail Spiritual Circuit",
    tagline: "Colombo → Chilaw → Sigiriya → Kandy → Nuwara Eliya → Ella",
    days: 8,
    nights: 7,
    packageType: "spiritual",
    categoryLabel: "Spiritual",
    route: "Colombo → Chilaw → Sigiriya → Kandy → Nuwara Eliya → Ella → Colombo",
    startCity: "Colombo",
    endCity: "Colombo",
    priceFromUSD: 799,
    priceFromINR: roundToMarketingPrice(799 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "3★ Handpicked Hotels with 100% Pure Veg/Jain Dining",
    bestMonths: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    highlights: [
      "Comprehensive sacred Ramayana pilgrimage connecting all pivotal historic shrines",
      "100% Pure vegetarian and Jain dining coordinated throughout with zero surcharge",
      "Hindi-speaking guide steeped in Ramayana mythology and temple traditions",
      "Seetha Amman Temple & Ashoka Vatika (Hakgala) in Nuwara Eliya where Sita was held captive",
      "Divurumpola Temple — the sacred site where Sita Devi underwent Agni Pariksha",
      "Ravana's Cave & Ravana Falls in Ella",
      "Kelaniya Raja Maha Vihara where Vibhishana was crowned King of Lanka by Lakshmana",
      "Munneswaram and Manavari Shiva temples in Chilaw where Lord Rama prayed"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Arrive Colombo — Kelaniya Temple (Vibhishana's Palace) & Pure Veg Dinner",
        body: "Arrive at Bandaranaike International Airport in Colombo and meet your Hindi-speaking spiritual tour guide. Transfer to your hotel. In the evening, visit Kelaniya Raja Maha Vihara, where according to the Ramayana, Vibhishana was crowned King of Lanka by Lakshmana following Ravana's defeat. Attend the evening puja and enjoy a pure vegetarian welcome dinner.",
        meals: "Dinner (Pure vegetarian / Jain)",
        stay: "Fairway Colombo / Pegasus Reef (or similar 3★)"
      },
      {
        dayNumber: 2,
        title: "Colombo to Chilaw — Munneswaram & Manavari Temples",
        body: "Drive north along the coast to Chilaw to visit Munneswaram Temple, one of Sri Lanka's five ancient Pancha Ishwarams where Lord Rama prayed to Lord Shiva to atone for killing Ravana. Continue to nearby Manavari Temple, where the first lingam established by Lord Rama (Ramalingam) is consecrated. Overnight in Chilaw/Negombo.",
        meals: "Breakfast, Lunch",
        stay: "Pegasus Reef / Goldi Sands Negombo (or similar 3★)"
      },
      {
        dayNumber: 3,
        title: "Chilaw to Sigiriya & Dambulla Caves",
        body: "Drive inland to the Cultural Triangle. Visit Sigiriya Rock, believed in regional folklore to have served as one of Ravana's aerial palace citadels. Visit Dambulla Cave Temple and admire its peaceful Buddhist sanctuaries.",
        meals: "Breakfast, Lunch",
        stay: "Camellia Resort / Fresco Water Villa (or similar 3★)"
      },
      {
        dayNumber: 4,
        title: "Sigiriya to Kandy — Maha Vishnu Devale & Temple of the Tooth",
        body: "Travel to Kandy and visit the sacred Maha Vishnu Devale, one of the four guardian shrines of Sri Lanka dedicated to Lord Vishnu. Tour the Temple of the Tooth Relic and historic Embekke Devale known for intricate wood carvings.",
        meals: "Breakfast",
        stay: "Topaz Hotel / Hotel Suisse Kandy (or similar 3★)"
      },
      {
        dayNumber: 5,
        title: "Kandy to Nuwara Eliya — Seetha Amman Temple & Ashoka Vatika (Hakgala)",
        body: "Ascend through tea country to Nuwara Eliya. Visit Seetha Amman Temple in Sita Eliya, the exact spot where Sita Devi was held captive by Ravana; see the indentations on the rock believed to be Hanuman's footprints. Explore Hakgala Botanical Gardens, identified as the legendary Ashoka Vatika where Hanuman first met Sita.",
        meals: "Breakfast, Lunch",
        stay: "Galway Heights / Heaven Seven Nuwara Eliya (or similar 3★)"
      },
      {
        dayNumber: 6,
        title: "Nuwara Eliya to Ella — Divurumpola (Agni Pariksha) & Ravana's Cave",
        body: "Visit Divurumpola Temple, the emotionally revered site where Sita underwent the Agni Pariksha (trial by fire) to prove her chastity. Continue to Ella to see Ravana's Cave nestled in mountain slopes and the cascading waters of Ravana Falls.",
        meals: "Breakfast, Lunch",
        stay: "Morning Dew Ella / Oak Ray Ella Gap (or similar 3★)"
      },
      {
        dayNumber: 7,
        title: "Ella to Colombo via Ruwanwelisaya or Kataragama",
        body: "Journey from Ella back toward Colombo with a choice of visit: either the massive Ruwanwelisaya stupa in the north, or the sacred multi-faith shrine of Kataragama dedicated to Lord Murugan. Arrive in Colombo for a pure vegetarian farewell dinner.",
        meals: "Breakfast, Dinner (Pure vegetarian / Jain)",
        stay: "Fairway Colombo / Cinnamon Red (or similar 3★)"
      },
      {
        dayNumber: 8,
        title: "Colombo to Airport — Departure",
        body: "After breakfast, transfer to Colombo airport (CMB) for your onward flight back to India.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "7 nights accommodation in 3★ hotels with pure vegetarian & Jain kitchen options",
      "Pure vegetarian/Jain breakfast, lunches, and dinners as specified in the itinerary",
      "Private air-conditioned car/coach with fluent Hindi-speaking chauffeur-guide throughout",
      "All temple entrance fees, pooja offerings assistance, and site entrance tickets",
      "All toll charges, parking, and government taxes"
    ],
    exclusions: [
      "International flights India ↔ Colombo",
      "Sri Lanka ETA visa fee (USD 35 pp at https://www.eta.gov.lk)",
      "Travel insurance and personal pooja expenses/dakshina",
      "Personal expenses and tips"
    ],
    visaNote: DEFAULT_SRI_LANKA_VISA_NOTE,
    isGroup: false,
    groupSize: "Min 2 pax (Private Pilgrimage)",
    departureStyle: "Daily departures year-round (spiritual circuit not weather-dependent)",
    sampleDates: "Daily private bookings on request",
    audience: "Indian families, seniors, devotees, and cultural travellers wishing to experience the sacred Ramayana epic come alive",
    isFeatured: true,
    relatedSlugs: [
      "sri-lanka-discovery-8d",
      "sri-lanka-spiritual-circuit-9d",
      "sri-lanka-classic-private-8d"
    ],
    heroImage: "https://images.unsplash.com/photo-1620619767323-b95a89183081?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Sri Lanka Ramayana Trail Tour 8D/7N | Pure Veg & Jain | Hassle Free Travels",
    seoDescription: "Follow the sacred Ramayana Trail in Sri Lanka with Hassle Free Travels. Seetha Amman, Ashoka Vatika, Divurumpola, Ravana Cave, Hindi guide & pure veg meals.",
    mealsSummary: "100% Pure Vegetarian & Jain Meals throughout the circuit",
    staySummary: "2N Colombo 3★, 1N Chilaw/Negombo 3★, 1N Sigiriya 3★, 1N Kandy 3★, 1N Nuwara Eliya 3★, 1N Ella 3★",
    transportSummary: "Private Dedicated A/C Vehicle + Hindi-Speaking Guide",
    departureCities: ["Delhi", "Mumbai", "Chennai", "Bengaluru", "Hyderabad", "Direct flights to Colombo (CMB)"]
  },

  // ─────────────────────────────────────────────────────────────
  // 8. FIT 6 — Sri Lanka North–South Express (12D / 11N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "sri-lanka-north-south-express-12d",
    destinationSlug: "sri-lanka",
    name: "Sri Lanka North-to-South Express Expedition",
    tagline: "Jaffna → Anuradhapura → Sigiriya → Kandy → Nuwara Eliya → Yala → Galle",
    days: 12,
    nights: 11,
    packageType: "custom",
    categoryLabel: "Private",
    route: "Jaffna → Anuradhapura → Sigiriya → Kandy → Nuwara Eliya → Yala → Galle",
    startCity: "Colombo",
    endCity: "Colombo",
    priceFromUSD: 1150,
    priceFromINR: roundToMarketingPrice(1150 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "3★/4★ Mix (Full 4★ upgrade from USD 1,450 pp)",
    bestMonths: ["November", "December", "January", "February", "March", "April"],
    highlights: [
      "The definitive Sri Lanka grand tour spanning Tamil northern heritage to southern colonial coasts",
      "Jaffna Peninsula — Nallur Kandaswamy Kovil, historic Jaffna Fort, and Nainativu Island boat trip",
      "Sacred city of Anuradhapura (UNESCO) & Sri Maha Bodhi, the world's oldest documented planted tree",
      "Mihintale — the cradle of Buddhism in Sri Lanka",
      "Sigiriya Rock Fortress, Dambulla Caves, and medieval Polonnaruwa",
      "Kandy hill capital, Nuwara Eliya tea estates, and Ella mountain viewpoints",
      "Yala National Park leopard safaris and UNESCO Galle Dutch Fort ramparts"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Arrive Colombo & Connect to Jaffna — Nallur Temple Evening Puja",
        body: "Arrive at Colombo (CMB) and connect to Jaffna via domestic flight or express train (domestic connection extra). Check into your Jaffna hotel and attend the magnificent evening puja ceremony with sacred chanting at Nallur Kandaswamy Temple, one of Sri Lanka's most sacred Hindu complexes.",
        meals: "None",
        stay: "Jetwing Jaffna / Fox Jaffna (or similar 3★/4★)"
      },
      {
        dayNumber: 2,
        title: "Jaffna Cultural Exploration — Jaffna Fort & Nainativu Island",
        body: "Explore the 17th-century star-shaped Jaffna Fort and the restored Jaffna Public Library. Take a scenic ferry ride across the sea to Nainativu Island to visit the ancient Nagapooshani Amman Temple and Nagadeepa Vihara. Relax at Casuarina Beach in the late afternoon.",
        meals: "Breakfast, Lunch",
        stay: "Jetwing Jaffna / Fox Jaffna (or similar 3★/4★)"
      },
      {
        dayNumber: 3,
        title: "Jaffna to Anuradhapura — Ancient Sacred Capital & Sri Maha Bodhi",
        body: "Drive south across Elephant Pass to the UNESCO World Heritage Sacred City of Anuradhapura (approx. 3.5 hours). Pay homage at the sacred Jaya Sri Maha Bodhi (planted in 288 BC), and stand in awe of Ruwanwelisaya and Jetavanaramaya stupas.",
        meals: "Breakfast, Lunch",
        stay: "Rajarata Hotel / The Lake Forest Anuradhapura (or similar 3★)"
      },
      {
        dayNumber: 4,
        title: "Anuradhapura to Mihintale & Sigiriya Rock",
        body: "Climb the 1,840 granite steps of Mihintale mountain sanctuary, where Buddhism was first introduced to the island in 247 BC. Drive to Sigiriya and climb the 5th-century Rock Citadel to witness the Cloud Maidens frescoes and royal palace terrace.",
        meals: "Breakfast, Lunch",
        stay: "Camellia Resort / Hotel Sigiriya (or similar 3★)"
      },
      {
        dayNumber: 5,
        title: "Polonnaruwa Medieval Capital & Minneriya Elephant Safari",
        body: "Tour the royal ruins and Gal Vihara rock sculptures in Polonnaruwa. In the afternoon, embark on an open 4x4 jeep safari in Minneriya National Park to observe wild elephants.",
        meals: "Breakfast, Lunch",
        stay: "Camellia Resort / Hotel Sigiriya (or similar 3★)"
      },
      {
        dayNumber: 6,
        title: "Sigiriya to Dambulla & Kandy — Temple of the Tooth",
        body: "Tour Dambulla Cave Temple murals and continue to Kandy. Visit the sacred Temple of the Tooth Relic, stroll around Kandy Lake, and enjoy an evening Kandyan cultural show.",
        meals: "Breakfast, Dinner",
        stay: "Topaz Hotel / Hotel Suisse Kandy (or similar 3★)"
      },
      {
        dayNumber: 7,
        title: "Kandy to Nuwara Eliya — Peradeniya Gardens & Tea Estates",
        body: "Walk through the Royal Botanical Gardens at Peradeniya. Drive into the central highlands, tour an authentic tea factory with tea tasting, and visit Seetha Amman Temple in Nuwara Eliya.",
        meals: "Breakfast, Lunch",
        stay: "Galway Heights / Summer Hill Breeze (or similar 3★)"
      },
      {
        dayNumber: 8,
        title: "Nuwara Eliya to Ella — Horton Plains & Nine Arch Bridge",
        body: "Morning nature trek to World's End precipice in Horton Plains National Park. Travel to Ella to admire the colonial Nine Arch Bridge and roaring Ravana Falls.",
        meals: "Breakfast",
        stay: "Morning Dew Ella / Oak Ray Ella Gap (or similar 3★)"
      },
      {
        dayNumber: 9,
        title: "Ella to Yala National Park — Afternoon Leopard Safari",
        body: "Trek up Little Adam's Peak for sunrise panoramic views. Drive down into the southern plains to Yala National Park for an afternoon 4x4 game drive in search of leopards and sloth bears.",
        meals: "Breakfast, Lunch",
        stay: "Elephant Reach Yala / Chandrika Hotel (or similar 3★)"
      },
      {
        dayNumber: 10,
        title: "Yala National Park Full Day Wildlife Safaris",
        body: "Experience dual game drives in Yala Block 1—one at sunrise and one in the late afternoon—maximizing your opportunities to encounter leopards, wild elephants, crocodiles, and exotic birdlife.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Elephant Reach Yala / Chandrika Hotel (or similar 3★)"
      },
      {
        dayNumber: 11,
        title: "Yala to Galle Fort & Unawatuna Beach",
        body: "Drive along the southern coastline to Galle. Walk the ramparts of UNESCO Galle Dutch Fort, see the maritime museum and lighthouse, and spend a relaxing afternoon on Unawatuna beach.",
        meals: "Breakfast",
        stay: "Lady Hill Galle / Tartaruga Beach Hotel (or similar 3★)"
      },
      {
        dayNumber: 12,
        title: "Galle to Kosgoda Turtle Hatchery & Colombo Airport Departure",
        body: "Visit Kosgoda Turtle Conservation Project on your drive north. Transfer along the Southern Expressway directly to Colombo airport (CMB) for your onward flight.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "11 nights accommodation in 3★/4★ hotels on twin-share basis (Full 4★ upgrade available)",
      "Daily breakfast at hotels, 8 lunches, and 2 dinners",
      "Private dedicated air-conditioned car/van with English-speaking chauffeur-guide throughout",
      "Nainativu Island ferry boat tickets",
      "All entrance fees: Jaffna Fort, Anuradhapura, Mihintale, Sigiriya Rock, Dambulla Caves, Polonnaruwa, Temple of Tooth, Peradeniya, Horton Plains, Kosgoda Turtle Hatchery, and Galle Fort",
      "Minneriya National Park 4x4 safari and 2 Yala National Park 4x4 safaris (jeep and entry fees included)",
      "All local taxes, highway tolls, and driver allowances"
    ],
    exclusions: [
      "International flights and domestic Colombo–Jaffna connection",
      "Sri Lanka ETA visa fee (USD 35 pp at https://www.eta.gov.lk)",
      "Travel insurance, tips, and personal expenses",
      "Full 4★ hotel supplement (USD 300 pp)"
    ],
    visaNote: DEFAULT_SRI_LANKA_VISA_NOTE,
    isGroup: false,
    groupSize: "Min 2 pax (Private Circuit)",
    departureStyle: "Daily private departures on request",
    sampleDates: "Daily departures November–April",
    audience: "Travellers seeking an in-depth, all-encompassing expedition across both the Tamil North and Buddhist South of Sri Lanka",
    isFeatured: true,
    relatedSlugs: [
      "sri-lanka-grand-tour-10d",
      "sri-lanka-classic-private-8d",
      "sri-lanka-ramayana-trail-8d"
    ],
    heroImage: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Sri Lanka North to South 12D/11N Tour | Jaffna to Galle | Hassle Free Travels",
    seoDescription: "The ultimate 12-day Sri Lanka journey with Hassle Free Travels: Jaffna, Anuradhapura, Sigiriya, Kandy, Horton Plains, Yala safaris, and Galle Fort.",
    mealsSummary: "Daily Breakfast, 8 Lunches, 2 Dinners",
    staySummary: "2N Jaffna 3★/4★, 1N Anuradhapura 3★, 2N Sigiriya 3★, 1N Kandy 3★, 1N Nuwara Eliya 3★, 1N Ella 3★, 2N Yala 3★, 1N Galle 3★",
    transportSummary: "Private Dedicated A/C Vehicle throughout",
    departureCities: ["Chennai", "Bengaluru", "Mumbai", "Delhi", "Hyderabad", "Flights to Colombo (CMB)"]
  },

  // ─────────────────────────────────────────────────────────────
  // 9. FIT 7 — Colombo & Galle Short Break (5D / 4N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "sri-lanka-colombo-galle-short-break-5d",
    destinationSlug: "sri-lanka",
    name: "Colombo & Galle Coastal Short Break",
    tagline: "Colombo → Galle Fort → Unawatuna & Mirissa Beaches",
    days: 5,
    nights: 4,
    packageType: "custom",
    categoryLabel: "Private",
    route: "Colombo → Galle Fort → Unawatuna → Mirissa → Colombo",
    startCity: "Colombo",
    endCity: "Colombo",
    priceFromUSD: 420,
    priceFromINR: roundToMarketingPrice(420 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "3★ City & Coastal Beach Hotels",
    bestMonths: ["November", "December", "January", "February", "March", "April"],
    highlights: [
      "Compact 5-day escape — ideal for extended weekends or seamless add-on to Maldives trips",
      "Colombo city highlights: Gangaramaya Temple, Pettah Bazaar, and Dutch Hospital dining",
      "UNESCO Galle Dutch Fort walking tour: cobblestone lanes, ramparts, and iconic lighthouse",
      "Beach relaxation on golden Unawatuna and Mirissa sands with sunset at Parrot Rock",
      "Visit Kosgoda Sea Turtle Conservation sanctuary",
      "Private air-conditioned car and chauffeur throughout"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Arrive Colombo — Airport Pickup & Dutch Hospital Evening",
        body: "Arrive at Colombo airport (CMB). Meet your private chauffeur and transfer to your Colombo city hotel. Spend the evening strolling Galle Face Green and dining in the historic colonial courtyard of the Dutch Hospital Precinct.",
        meals: "None",
        stay: "Fairway Colombo / Cinnamon Red (or similar 3★)"
      },
      {
        dayNumber: 2,
        title: "Colombo City Discovery Tour",
        body: "Tour Gangaramaya Temple, Seema Malaka on Beira Lake, the National Museum, Independence Square, and the bustling lanes of Pettah Bazaar. Afternoon visit to sacred Kelaniya Temple.",
        meals: "Breakfast, Lunch",
        stay: "Fairway Colombo / Cinnamon Red (or similar 3★)"
      },
      {
        dayNumber: 3,
        title: "Colombo to Galle Fort & Unawatuna Beach",
        body: "Drive south via the Southern Expressway (approx. 1.5 hours) to UNESCO-listed Galle Fort. Walk the fortifications, visit the Dutch Reformed Church, and see the lighthouse. Spend the afternoon swimming on Unawatuna Beach.",
        meals: "Breakfast",
        stay: "Lady Hill Galle / Tartaruga Beach Hotel (or similar 3★)"
      },
      {
        dayNumber: 4,
        title: "Galle to Mirissa — Turtle Sanctuary & Sunset at Parrot Rock",
        body: "Visit the Kosgoda Turtle Hatchery to observe conservation efforts. Relax on Mirissa Beach in the afternoon, climb Parrot Rock for panoramic sunset views, and enjoy seaside dining.",
        meals: "Breakfast",
        stay: "Paradise Beach Club Mirissa / Triple O Six (or similar 3★)"
      },
      {
        dayNumber: 5,
        title: "Mirissa to Colombo Airport Departure",
        body: "After a leisurely tropical breakfast, transfer via the highway directly to Colombo airport (CMB) for your return flight home.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "4 nights accommodation in 3★ hotels on twin-share basis",
      "Daily breakfast and 1 lunch in Colombo",
      "Private dedicated air-conditioned car with English-speaking chauffeur-guide",
      "Galle Fort walking tour, Kelaniya Temple, and Kosgoda Turtle Hatchery entrance fees",
      "All expressway tolls, parking fees, and taxes"
    ],
    exclusions: [
      "International flights to/from Colombo",
      "Sri Lanka ETA visa fee (USD 35 pp at https://www.eta.gov.lk)",
      "Optional whale watching boat excursion in Mirissa",
      "Travel insurance and tips"
    ],
    visaNote: DEFAULT_SRI_LANKA_VISA_NOTE,
    isGroup: false,
    groupSize: "Min 2 pax (Private Short Break)",
    departureStyle: "Daily private departures year-round",
    sampleDates: "Daily departures on request",
    audience: "Long-weekend travellers, couples, and working professionals looking for a quick Sri Lanka seaside escape or Maldives combo",
    isFeatured: false,
    relatedSlugs: [
      "sri-lanka-galle-south-coast-6d",
      "sri-lanka-classic-private-8d",
      "sri-lanka-discovery-8d"
    ],
    heroImage: "https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Colombo & Galle Short Break 5D/4N | Coastal Tour | Hassle Free Travels",
    seoDescription: "Quick 5-day Sri Lanka coastal getaway with Hassle Free Travels. Explore Colombo city, UNESCO Galle Fort, Unawatuna Beach, and Mirissa sunset.",
    mealsSummary: "Daily Breakfast, 1 Lunch",
    staySummary: "2N Colombo 3★, 1N Galle 3★, 1N Mirissa 3★",
    transportSummary: "Private Dedicated A/C Sedan + Highway Transfers",
    departureCities: ["Chennai (70 min flight)", "Bengaluru", "Kochi", "Mumbai", "Delhi", "Flights to Colombo (CMB)"]
  },

  // ─────────────────────────────────────────────────────────────
  // 10. FIT 8 — Sri Lanka Hill Country & Tea Trail (7D / 6N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "sri-lanka-hill-country-tea-trail-7d",
    destinationSlug: "sri-lanka",
    name: "Sri Lanka Hill Country & Tea Trail Journey",
    tagline: "Kandy → Knuckles Range → Nuwara Eliya → Working Tea Bungalow → Ella",
    days: 7,
    nights: 6,
    packageType: "custom",
    categoryLabel: "Private",
    route: "Kandy → Knuckles → Nuwara Eliya → Tea Bungalow → Ella → Colombo",
    startCity: "Colombo",
    endCity: "Colombo",
    priceFromUSD: 750,
    priceFromINR: roundToMarketingPrice(750 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "3★ Hotels + 1 Night Colonial Working Tea Bungalow",
    bestMonths: ["December", "January", "February", "March", "April"],
    highlights: [
      "Dedicated highland retreat focusing on tea plantations, misty peaks, and fresh mountain air",
      "Overnight stay in an authentic colonial-era working tea planter's bungalow with veranda views",
      "Full journey on the scenic highland train from Kandy to Nanu Oya (reserved seats)",
      "Half-day guided trek into UNESCO Knuckles Mountain Range cloud forests",
      "Adam's Peak (Sri Pada) pilgrimage climb (Dec–May) OR Horton Plains World's End (Jun–Nov)",
      "Guided tours and comparative tea tastings across 3 renowned tea estates",
      "Panoramic vistas from Lipton's Seat (1,970m) where Sir Thomas Lipton surveyed his empire"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Arrive Colombo to Kandy — Hill Capital Arrival & Temple of the Tooth",
        body: "Meet your private chauffeur at Colombo airport and drive directly into the misty hills toward Kandy (approx. 3 hours). In the evening, attend the sacred puja ceremony at the Temple of the Tooth Relic.",
        meals: "None",
        stay: "Topaz Hotel / Hotel Suisse Kandy (or similar 3★)"
      },
      {
        dayNumber: 2,
        title: "Kandy & Knuckles Mountain Range Guided Trek",
        body: "Morning walk through Peradeniya Royal Botanical Gardens. In the afternoon, head into the UNESCO Knuckles Mountain Range for a 4-hour guided hike through cloud forests, cascading waterfalls, and tea villages.",
        meals: "Breakfast, Lunch",
        stay: "Topaz Hotel / Hotel Suisse Kandy (or similar 3★)"
      },
      {
        dayNumber: 3,
        title: "Kandy to Nuwara Eliya by Scenic Train & Mackwoods Tea Tour",
        body: "Board the morning scenic train from Kandy to Nanu Oya. Wind past emerald valleys and waterfalls into Nuwara Eliya. Visit Mackwoods Labookellie Tea Estate for a factory tour, picking demonstration, and tasting.",
        meals: "Breakfast, Lunch",
        stay: "Galway Heights / Summer Hill Breeze (or similar 3★)"
      },
      {
        dayNumber: 4,
        title: "Adam's Peak (Dec–May) OR Horton Plains Cloud Forest (Jun–Nov)",
        body: "During pilgrimage season (Dec–May), take a pre-dawn climb up Adam's Peak (5,500 steps) for a spiritual sunrise above the clouds. During Jun–Nov, enjoy a scenic 9km hike through Horton Plains to the sheer precipice of World's End and Baker's Falls.",
        meals: "Breakfast",
        stay: "Galway Heights / Summer Hill Breeze (or similar 3★)"
      },
      {
        dayNumber: 5,
        title: "Nuwara Eliya to Working Tea Bungalow Stay (Ella / Haputale)",
        body: "Tour Pedro Tea Estate before driving to Haputale/Ella. Check into a heritage colonial tea planter's bungalow set amidst rolling tea bushes. Enjoy high tea on the veranda and a tea-pairing dinner.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Heritage Tea Bungalow / Melheim Resort (or similar planter's bungalow)"
      },
      {
        dayNumber: 6,
        title: "Ella — Nine Arch Bridge, Little Adam's Peak & Lipton's Seat",
        body: "Ascend to Lipton's Seat at 1,970m elevation for panoramic views of tea hills stretching to the south coast. Walk to Nine Arch Bridge and hike Little Adam's Peak before dinner.",
        meals: "Breakfast, Lunch",
        stay: "Morning Dew Ella / Oak Ray Ella Gap (or similar 3★)"
      },
      {
        dayNumber: 7,
        title: "Ella to Colombo Airport Departure",
        body: "Enjoy breakfast overlooking the tea hills before your drive back to Colombo airport (CMB) via the Southern Expressway for your departure flight.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "6 nights accommodation (5 nights 3★ hotels + 1 night authentic colonial working tea bungalow)",
      "Daily breakfast, 4 lunches, and 1 tea-pairing dinner at the bungalow",
      "Private dedicated air-conditioned vehicle with English-speaking chauffeur-guide",
      "Kandy to Nanu Oya scenic train reserved tickets",
      "Knuckles Mountain Range guided trek and naturalist fees",
      "All tea estate tours and comparative tea tasting sessions",
      "Horton Plains or Adam's Peak permits and local taxes"
    ],
    exclusions: [
      "International flights to/from Colombo",
      "Sri Lanka ETA visa fee (USD 35 pp at https://www.eta.gov.lk)",
      "Travel insurance and tips",
      "Personal hiking gear and torch rental for Adam's Peak"
    ],
    visaNote: DEFAULT_SRI_LANKA_VISA_NOTE,
    isGroup: false,
    groupSize: "Min 2 pax (Private Highland Tour)",
    departureStyle: "Daily private departures year-round",
    sampleDates: "Daily private departures",
    audience: "Tea connoisseurs, nature enthusiasts, photographers, and couples seeking cool mountain climes and scenic railways",
    isFeatured: false,
    relatedSlugs: [
      "sri-lanka-classic-private-8d",
      "sri-lanka-adventure-trekking-8d",
      "sri-lanka-grand-tour-10d"
    ],
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Sri Lanka Hill Country & Tea Trail 7D/6N | Planter Bungalow | Hassle Free Travels",
    seoDescription: "Experience Sri Lanka's tea highlands with Hassle Free Travels. Stay in a working tea bungalow, take the scenic train, trek Knuckles Range and visit Lipton's Seat.",
    mealsSummary: "Daily Breakfast, 4 Lunches, 1 Tea-Pairing Dinner",
    staySummary: "2N Kandy 3★, 2N Nuwara Eliya 3★, 1N Working Tea Bungalow, 1N Ella 3★",
    transportSummary: "Private Dedicated A/C Vehicle + Kandy–Nanu Oya Scenic Train",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Hyderabad", "Direct flights to Colombo (CMB)"]
  },

  // ─────────────────────────────────────────────────────────────
  // 11. FIT 9 — Sri Lanka East Coast & Trincomalee (8D / 7N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "sri-lanka-east-coast-trincomalee-8d",
    destinationSlug: "sri-lanka",
    name: "Sri Lanka East Coast & Trincomalee Discovery",
    tagline: "Trincomalee → Pigeon Island → Passekudah → Arugam Bay → Yala",
    days: 8,
    nights: 7,
    packageType: "adventure",
    categoryLabel: "Beach",
    route: "Trincomalee → Nilaveli → Passekudah → Batticaloa → Arugam Bay → Yala",
    startCity: "Colombo",
    endCity: "Colombo",
    priceFromUSD: 780,
    priceFromINR: roundToMarketingPrice(780 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "3★ Beach Resorts & Coastal Hotels",
    bestMonths: ["May", "June", "July", "August", "September"],
    highlights: [
      "The premier May–September itinerary when Sri Lanka's east coast enjoys dry, sunny beach weather",
      "Trincomalee — Fort Frederick and cliff-top Koneswaram Hindu Kovil above the ocean",
      "Pigeon Island National Park boat safari — snorkel with reef sharks and sea turtles",
      "Passekudah Bay — crystal-clear turquoise shallow waters safe for walking out hundreds of meters",
      "Batticaloa Lagoon boat ride through fishing villages and singing fish waters",
      "Arugam Bay — Asia's celebrated surf haven with optional beginner surf lessons",
      "Yala National Park leopard jeep safari on your return circuit"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Colombo to Trincomalee — East Coast Crossing & Harbour Sunset",
        body: "Meet your private chauffeur at Colombo airport and journey across to Trincomalee on the east coast (approx. 5 hours). Check into your coastal resort and take in the sunset across Trincomalee's natural deep-water harbour.",
        meals: "None",
        stay: "Trinco Blu by Cinnamon / Anantamaa Trincomalee (or similar 3★)"
      },
      {
        dayNumber: 2,
        title: "Trincomalee Heritage & Whale Watching",
        body: "Visit Fort Frederick and Koneswaram Temple (Thirukonamalai), perched high on Swami Rock cliff overlooking the Indian Ocean. In May–September, take a morning boat ride to spot blue whales and sperm whales in the calm east coast waters.",
        meals: "Breakfast, Lunch",
        stay: "Trinco Blu by Cinnamon / Anantamaa Trincomalee (or similar 3★)"
      },
      {
        dayNumber: 3,
        title: "Nilaveli Beach & Pigeon Island National Park Snorkelling",
        body: "Relax on the golden sands of Nilaveli Beach. Board a boat to Pigeon Island National Park for world-class snorkelling among live coral reefs, gentle blacktip reef sharks, and sea turtles.",
        meals: "Breakfast, Lunch",
        stay: "Nilaveli Beach Hotel / Pigeon Island Beach Resort (or similar 3★)"
      },
      {
        dayNumber: 4,
        title: "Nilaveli to Passekudah Shallow Lagoon",
        body: "Drive south along the eastern coastline to Passekudah (approx. 2.5 hours). Known for its calm, shallow, turquoise lagoon, Passekudah allows swimmers and non-swimmers to walk safely into the warm sea for hundreds of meters.",
        meals: "Breakfast",
        stay: "Amaya Beach Passekudah / Uga Bay (or similar 3★/4★)"
      },
      {
        dayNumber: 5,
        title: "Passekudah to Batticaloa Lagoon & Heritage Fort",
        body: "Explore Batticaloa Fort and embark on a traditional boat ride through Batticaloa Lagoon, famous for birdwatching and the acoustic phenomenon of the 'singing fish' near Kallady Bridge.",
        meals: "Breakfast, Lunch",
        stay: "East Lagoon Batticaloa / Hotel Sudu Araliya (or similar 3★)"
      },
      {
        dayNumber: 6,
        title: "Batticaloa to Arugam Bay Surf Haven",
        body: "Drive to Arugam Bay (approx. 2 hours), renowned globally as one of the world's premier right-hand surf point breaks (May–Oct). Take an optional beginner surf lesson or enjoy an afternoon boat safari through Pottuvil Lagoon.",
        meals: "Breakfast",
        stay: "The Blue Wave Hotel / Bay Vista Arugam Bay (or similar 3★)"
      },
      {
        dayNumber: 7,
        title: "Arugam Bay to Yala National Park Leopard Safari",
        body: "Morning beach time before driving south to Yala National Park (approx. 2 hours). Embark on an afternoon 4x4 jeep safari in Yala Block 1 to track leopards, elephants, and sloth bears.",
        meals: "Breakfast, Lunch",
        stay: "Elephant Reach Yala / Chandrika Hotel (or similar 3★)"
      },
      {
        dayNumber: 8,
        title: "Yala to Colombo Airport Departure",
        body: "Dawn safari in Yala before returning via the Southern Expressway to Colombo airport (CMB) for your evening flight home.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "7 nights accommodation in 3★ beach resorts and coastal hotels on twin-share basis",
      "Daily breakfast and 4 lunches",
      "Private air-conditioned vehicle with English-speaking chauffeur-guide throughout",
      "Pigeon Island National Park boat transfer, snorkelling gear, and entrance permits",
      "Batticaloa and Pottuvil Lagoon boat safaris",
      "Yala National Park 4x4 safari (jeep and entry fees included)",
      "All expressway tolls, park taxes, and allowances"
    ],
    exclusions: [
      "International flights to/from Colombo",
      "Sri Lanka ETA visa fee (USD 35 pp at https://www.eta.gov.lk)",
      "Optional surf lessons and board rentals at Arugam Bay",
      "Optional whale watching boat in Trincomalee (approx. USD 35 pp)",
      "Travel insurance and tips"
    ],
    visaNote: DEFAULT_SRI_LANKA_VISA_NOTE,
    isGroup: false,
    groupSize: "Min 2 pax (Private East Coast Tour)",
    departureStyle: "Daily private departures May–September",
    sampleDates: "Daily departures May–September",
    audience: "Beach lovers, surfers, snorkelers, and summer holidaymakers seeking sunshine on Sri Lanka's east coast when the west coast receives monsoon rains",
    isFeatured: false,
    relatedSlugs: [
      "sri-lanka-surf-beach-7d",
      "sri-lanka-classic-private-8d",
      "sri-lanka-south-backwaters-7d"
    ],
    heroImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Sri Lanka East Coast & Trincomalee 8D/7N | Pigeon Island | Hassle Free Travels",
    seoDescription: "Discover Sri Lanka's sunny East Coast with Hassle Free Travels (May–Sep). Trincomalee, Pigeon Island reef sharks, Passekudah lagoon, Arugam Bay & Yala safari.",
    mealsSummary: "Daily Breakfast, 4 Lunches",
    staySummary: "2N Trincomalee 3★, 1N Nilaveli Beach 3★, 1N Passekudah 3★, 1N Batticaloa 3★, 1N Arugam Bay 3★, 1N Yala 3★",
    transportSummary: "Private Dedicated A/C Vehicle throughout",
    departureCities: ["Chennai", "Bengaluru", "Mumbai", "Delhi", "Hyderabad", "Direct flights to Colombo (CMB)"]
  },

  // ─────────────────────────────────────────────────────────────
  // 12. FIT 10 — Sri Lanka Luxury 2-Night Cruise + Land (9D / 8N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "sri-lanka-luxury-cruise-land-9d",
    destinationSlug: "sri-lanka",
    name: "Sri Lanka Luxury 2-Night Catamaran Cruise & 5★ Land Tour",
    tagline: "Colombo → Sigiriya → Kandy → 2N Luxury Catamaran Cruise → Galle Fort",
    days: 9,
    nights: 8,
    packageType: "honeymoon",
    categoryLabel: "Honeymoon",
    route: "Colombo → Sigiriya → Kandy → Trincomalee/Nilaveli (Cruise) → Galle Fort",
    startCity: "Colombo",
    endCity: "Colombo",
    priceFromUSD: 2200,
    priceFromINR: roundToMarketingPrice(2200 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "5★ Luxury Resorts + 2 Nights Private Cabin on Luxury Catamaran",
    bestMonths: ["January", "February", "March", "April"],
    highlights: [
      "2-night luxury sailing catamaran cruise in calm eastern waters with all meals on board",
      "Private ocean-view cabin with en-suite bathroom on board the sailing yacht",
      "5★ luxury heritage and jungle resorts on land (Cinnamon Lodge, Jetwing Kandy, Galle Fort Villa)",
      "Exclusive private sunrise ascent of Sigiriya Rock Fortress with champagne breakfast",
      "Private after-hours temple access at the Temple of the Tooth in Kandy",
      "Snorkelling with sea turtles, dolphin watching, and sunset sundowners on deck",
      "Stay in an exclusive private heritage villa inside UNESCO-listed Galle Fort"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Arrive Colombo — VIP Airport Reception & 5★ Luxury Welcome",
        body: "VIP airport meet & greet with luggage assistance. Private luxury car transfer to a premier 5★ Colombo hotel. Indulge in an exquisite welcome dinner overlooking the ocean.",
        meals: "Dinner (5★ Gourmet Welcome Dinner)",
        stay: "The Kingsbury / Cinnamon Grand Colombo (5★ Luxury)"
      },
      {
        dayNumber: 2,
        title: "Colombo to Sigiriya — Dambulla Caves & 5★ Jungle Lodge",
        body: "Private transfer to the Cultural Triangle. Tour Dambulla Cave Temples before checking into a luxury jungle lodge. Enjoy an included 60-minute couples Ayurvedic spa treatment.",
        meals: "Breakfast",
        stay: "Water Garden Sigiriya / Jetwing Vil Uyana (5★ Luxury)"
      },
      {
        dayNumber: 3,
        title: "Private Sigiriya Sunrise Climb & Luxury Relaxation",
        body: "Private early morning climb of Sigiriya Rock Citadel before public opening hours. Summit celebration with fresh tropical juices. Return for a leisurely afternoon by your private villa pool.",
        meals: "Breakfast, Dinner (Private candlelit dinner)",
        stay: "Water Garden Sigiriya / Jetwing Vil Uyana (5★ Luxury)"
      },
      {
        dayNumber: 4,
        title: "Sigiriya to Kandy — Minneriya Safari & Private Temple Access",
        body: "Private 4x4 elephant safari in Minneriya. Drive to Kandy and experience specially arranged after-hours entry at the sacred Temple of the Tooth. Check into a 5★ luxury mountain retreat.",
        meals: "Breakfast, Lunch",
        stay: "Amaya Hills Kandy / Earl's Regency Kandy (5★ Luxury)"
      },
      {
        dayNumber: 5,
        title: "Kandy to Trincomalee — Embark 2-Night Luxury Catamaran Cruise",
        body: "Transfer to Trincomalee harbour. Embark your luxury ocean catamaran yacht. Settle into your private en-suite cabin. Sail toward Pigeon Island for afternoon snorkelling. Savor sunset cocktails on deck and a gourmet chef-prepared seafood dinner under the stars.",
        meals: "Breakfast, Lunch, Dinner (Full board on catamaran)",
        stay: "Luxury Ocean Catamaran (Private En-Suite Cabin)"
      },
      {
        dayNumber: 6,
        title: "Catamaran Cruise Day 2 — Whale Watching, Kayaking & Coral Reefs",
        body: "Wake to the sunrise on open water. Morning dolphin and seasonal whale watching. Anchor near Nilaveli Beach for paddleboarding, kayaking, and coral reef snorkelling. Evening sundowner cocktails on deck.",
        meals: "Breakfast, Lunch, Dinner (Full board on catamaran)",
        stay: "Luxury Ocean Catamaran (Private En-Suite Cabin)"
      },
      {
        dayNumber: 7,
        title: "Disembark Catamaran to Galle Fort Heritage Villa",
        body: "Disembark at Trincomalee and transfer comfortably in a private luxury vehicle to Galle Fort on the south coast. Check into a private 17th-century colonial villa inside the fort walls. Sunset rampart stroll.",
        meals: "Breakfast, Dinner",
        stay: "Galle Fort Hotel / Fort Bazaar Galle (5★ Boutique Heritage)"
      },
      {
        dayNumber: 8,
        title: "Galle Fort Immersion & Unawatuna Private Beach Club",
        body: "Private guided historical walking tour of Galle Fort ramparts and museums. Afternoon at a private beach club in Unawatuna with couples spa therapy. Grand farewell private dinner.",
        meals: "Breakfast, Dinner (Private Farewell Dinner)",
        stay: "Galle Fort Hotel / Fort Bazaar Galle (5★ Boutique Heritage)"
      },
      {
        dayNumber: 9,
        title: "Galle to Colombo Airport Departure",
        body: "Private highway transfer from Galle Fort directly to Colombo airport (CMB) for your flight home in ultimate style.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "6 nights accommodation in luxury 5★ resorts and heritage villas + 2 nights private cabin on a luxury sailing catamaran",
      "All meals on board the catamaran yacht (Days 5–7), daily gourmet breakfast on land, and 4 special dinners",
      "Private dedicated luxury air-conditioned SUV with premier chauffeur-guide throughout land travel",
      "All water sports equipment on the catamaran (snorkelling gear, stand-up paddleboards, kayaks)",
      "Private Minneriya elephant safari and all entrance fees",
      "Three couples spa sessions across land properties and all taxes"
    ],
    exclusions: [
      "International business/economy flights to Colombo",
      "Sri Lanka ETA visa fee (USD 35 pp at https://www.eta.gov.lk)",
      "Premium champagne and spirits on board the catamaran (wine and beer included)",
      "Travel insurance and tips"
    ],
    visaNote: DEFAULT_SRI_LANKA_VISA_NOTE,
    isGroup: false,
    groupSize: "2 pax (Private Luxury Honeymoon / Anniversary)",
    departureStyle: "Private departures on request January–April (calm sea season)",
    sampleDates: "Weekly private departures January–April",
    audience: "High-net-worth honeymooners, luxury anniversary couples, and travellers seeking a Maldives-equivalent sailing experience combined with cultural exploration",
    isFeatured: false,
    relatedSlugs: [
      "sri-lanka-honeymoon-escape-9d",
      "sri-lanka-classic-private-8d",
      "sri-lanka-ayurveda-wellness-8d"
    ],
    heroImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Sri Lanka Luxury Cruise & Land Tour 9D/8N | 5★ Catamaran | Hassle Free Travels",
    seoDescription: "Sail Sri Lanka on a 2-night luxury catamaran combined with 5★ land resorts. Sigiriya sunrise, Kandy, Galle Fort, and dolphin watching with Hassle Free Travels.",
    mealsSummary: "Full Board on Catamaran Cruise, Gourmet Breakfast & Dinners on Land",
    staySummary: "1N Colombo 5★, 2N Sigiriya 5★, 1N Kandy 5★, 2N Luxury Catamaran Cruise, 2N Galle Fort 5★ Villa",
    transportSummary: "Private Luxury SUV on Land + Ocean Sailing Catamaran",
    departureCities: ["Mumbai", "Delhi", "Bengaluru", "Chennai", "Direct flights to Colombo (CMB)"]
  },

  // ─────────────────────────────────────────────────────────────
  // 13. FIT 11 — Sri Lanka Adventure & Trekking (8D / 7N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "sri-lanka-adventure-trekking-8d",
    destinationSlug: "sri-lanka",
    name: "Sri Lanka Adventure & Wilderness Trekking",
    tagline: "Kitulgala Rafting → 2-Day Knuckles Trek → Adam's Peak → Ella Rock → Sinharaja",
    days: 8,
    nights: 7,
    packageType: "adventure",
    categoryLabel: "Adventure",
    route: "Kitulgala → Knuckles → Adam's Peak → Horton Plains → Ella Rock → Sinharaja",
    startCity: "Colombo",
    endCity: "Colombo",
    priceFromUSD: 860,
    priceFromINR: roundToMarketingPrice(860 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "3★ Adventure Hotels & Rustic Mountain Trekking Lodges",
    bestMonths: ["December", "January", "February", "March", "April"],
    highlights: [
      "White-water rafting on the Kelani River in Kitulgala (Grade 2–3 rapids)",
      "2-day guided wilderness trek through UNESCO Knuckles Mountain Range cloud forests",
      "Pre-dawn pilgrimage climb of sacred Adam's Peak (Sri Pada) via 5,500 torchlit steps",
      "World's End 870m cliff drop trek in Horton Plains National Park",
      "Full-day ascent of challenging Ella Rock for breathtaking mountain vistas",
      "Deep forest naturalist trek through UNESCO Sinharaja Rainforest",
      "Dedicated wilderness mountain guides and complete safety equipment"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Colombo to Kitulgala — Kelani River White-Water Rafting",
        body: "Pick up from Colombo airport and transfer directly to Kitulgala (approx. 2.5 hours). Complete safety briefing and embark on white-water rafting along the Kelani River through exhilarating Grade 2 and 3 rapids. Overnight at an eco-guesthouse on the riverbank.",
        meals: "Dinner",
        stay: "Kitulgala Rest House / Plantation Hotel (or similar adventure lodge)"
      },
      {
        dayNumber: 2,
        title: "Kitulgala to Knuckles Mountain Range Trek (Day 1)",
        body: "Transfer to Knuckles Mountain Range. Begin Day 1 of your 2-day wilderness trek traversing Riverston to Corbett's Gap trail (approx. 12km, 5–6 hours). Walk through endemic cloud forests and past cascading mountain streams. Stay at a remote mountain guesthouse.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Knuckles Trekking Camp / Sir John's Bungalow (or similar)"
      },
      {
        dayNumber: 3,
        title: "Knuckles Trek (Day 2) to Kandy",
        body: "Complete Day 2 of the Knuckles trek covering the Mini World's End ridge trail (approx. 8km, 4 hours). Drive to Kandy, visit the sacred Temple of the Tooth Relic, and rest up for upcoming climbs.",
        meals: "Breakfast, Lunch",
        stay: "Topaz Hotel / Hotel Suisse Kandy (or similar 3★)"
      },
      {
        dayNumber: 4,
        title: "Kandy to Adam's Peak Base (Dalhousie) — Midnight Pilgrimage Climb",
        body: "Drive to Dalhousie at the foot of Adam's Peak (approx. 3 hours). Rest during the afternoon. At midnight, begin the iconic pilgrimage ascent of Adam's Peak (Sri Pada)—climbing 5,500 torch-lit steps to reach the sacred summit footprint for an unforgettable sunrise above the clouds.",
        meals: "Breakfast, Dinner",
        stay: "Punsisi Rest / Grand Adam's Peak Dalhousie (or similar)"
      },
      {
        dayNumber: 5,
        title: "Adam's Peak Descent to Horton Plains National Park",
        body: "Descend the mountain at dawn and enjoy a warm breakfast. Drive to Horton Plains National Park for an afternoon 9km trek across the misty montane plateau to the World's End precipice and Baker's Falls.",
        meals: "Breakfast, Lunch",
        stay: "Galway Heights / Summer Hill Breeze Nuwara Eliya (or similar 3★)"
      },
      {
        dayNumber: 6,
        title: "Nuwara Eliya to Ella Rock Summit Trek",
        body: "Travel to Ella and undertake the challenging full-day hike up Ella Rock (approx. 6 hours return). Scramble through eucalyptus forests and tea trails to the summit cliffs for jaw-dropping views of Ella Gap.",
        meals: "Breakfast, Lunch",
        stay: "Morning Dew Ella / Oak Ray Ella Gap (or similar 3★)"
      },
      {
        dayNumber: 7,
        title: "Ella to Sinharaja Rainforest Wilderness Trek",
        body: "Drive south to Sinharaja Rainforest (approx. 3 hours). Embark on a guided deep-jungle trek with an expert naturalist, discovering rare reptiles, giant squirrels, and endemic orchids.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "The Rainforest Ecolodge / Sinharaja Adventure Resort"
      },
      {
        dayNumber: 8,
        title: "Sinharaja Morning Trek to Colombo Airport Departure",
        body: "Take a final morning walk through the rainforest canopy. Transfer via the expressway directly to Colombo airport (CMB) for your departure flight.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "7 nights accommodation in adventure guesthouses and 3★ eco-lodges",
      "Meals as listed in the itinerary (daily breakfast, 5 lunches, 4 dinners)",
      "White-water rafting session in Kitulgala with certified instructors and safety gear",
      "Certified local mountain guides for Knuckles Range (2 days), Adam's Peak, Ella Rock, and Sinharaja",
      "All national park permits, entrance fees, and local taxes",
      "Private dedicated air-conditioned vehicle throughout"
    ],
    exclusions: [
      "International flights to/from Colombo",
      "Sri Lanka ETA visa fee (USD 35 pp at https://www.eta.gov.lk)",
      "Personal hiking boots, trekking poles, rain gear, and headlamps",
      "Travel and medical/rescue insurance"
    ],
    visaNote: DEFAULT_SRI_LANKA_VISA_NOTE,
    isGroup: false,
    groupSize: "Min 2 pax (Private Adventure)",
    departureStyle: "Daily private departures December–April",
    sampleDates: "Daily private bookings during dry trekking season",
    audience: "Active youth, trekking enthusiasts, backpackers, and fitness lovers seeking adrenaline, steep ascents, and untamed nature",
    isFeatured: false,
    relatedSlugs: [
      "sri-lanka-hill-country-tea-trail-7d",
      "sri-lanka-wildlife-safari-7d",
      "sri-lanka-classic-private-8d"
    ],
    heroImage: "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Sri Lanka Adventure & Trekking 8D/7N | Adam's Peak & Knuckles | Hassle Free Travels",
    seoDescription: "Conquer Sri Lanka's greatest trails with Hassle Free Travels: Kitulgala rafting, 2-day Knuckles trek, Adam's Peak midnight climb, Ella Rock, and Sinharaja.",
    mealsSummary: "Daily Breakfast, 5 Lunches, 4 Dinners",
    staySummary: "1N Kitulgala Eco-Lodge, 1N Knuckles Camp, 1N Kandy 3★, 1N Adam's Peak Guesthouse, 1N Nuwara Eliya 3★, 1N Ella 3★, 1N Sinharaja Lodge",
    transportSummary: "Private Dedicated A/C Transport + Specialist Mountain Guides",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Hyderabad", "Direct flights to Colombo (CMB)"]
  },

  // ─────────────────────────────────────────────────────────────
  // 14. FIT 12 — Sri Lanka Food & Culture Trail (7D / 6N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "sri-lanka-food-culture-trail-7d",
    destinationSlug: "sri-lanka",
    name: "Sri Lanka Culinary & Cultural Heritage Trail",
    tagline: "Colombo Street Food → Matale Spice Garden → Kandy Markets → Nuwara Eliya",
    days: 7,
    nights: 6,
    packageType: "custom",
    categoryLabel: "Culinary",
    route: "Colombo → Matale → Kandy → Jaffna (Optional) → Nuwara Eliya → Colombo",
    startCity: "Colombo",
    endCity: "Colombo",
    priceFromUSD: 820,
    priceFromINR: roundToMarketingPrice(820 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "3★/4★ Boutique Hotels with Culinary Programs",
    bestMonths: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    highlights: [
      "Guided evening street food trail in Colombo: kottu roti, pol roti, hoppers & spicy dhal",
      "Hands-on half-day Sri Lankan home cooking class: coconut sambol, clay-pot curries, and watalappan",
      "Matale Ayurvedic spice garden tour: cinnamon harvesting, cardamoms, cloves, and nutmeg",
      "Guided sensory walk through Kandy's municipal produce and spice markets",
      "Jaffna cuisine immersion: distinct northern curries, palmyra delicacies, and sweets",
      "Single-estate masterclass tea tasting across 3 different high-grown elevation estates",
      "Dedicated vegetarian, vegan, and Jain adaptations available at all cooking stops"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Arrive Colombo — Street Food Walk & Hopper Tasting",
        body: "Arrive in Colombo and meet your foodie guide. In the evening, embark on a walking street food exploration through Pettah and Galle Face. Taste steaming egg and vegetarian hoppers, kottu roti, pol sambol, and fresh king coconut water.",
        meals: "Dinner (Street Food Safari)",
        stay: "Fairway Colombo / ME Colombo (or similar 3★/4★)"
      },
      {
        dayNumber: 2,
        title: "Colombo Traditional Cooking Class & Colonial Fort Walk",
        body: "Join a local chef at a home kitchen for an intimate cooking class. Learn how to scrape fresh coconuts, temper whole spices, and cook authentic Sri Lankan vegetable curries in earthenware pots. Enjoy your feast for lunch. Afternoon tour of Colombo Fort and Gangaramaya Temple.",
        meals: "Breakfast, Lunch (Cooking class creation)",
        stay: "Fairway Colombo / ME Colombo (or similar 3★/4★)"
      },
      {
        dayNumber: 3,
        title: "Colombo to Matale Spice Garden & Kandy Market Walk",
        body: "Travel to Matale to explore an organic spice garden. Learn about the culinary and Ayurvedic uses of authentic Ceylon cinnamon, vanilla, and peppercorns. Drive to Kandy and take a guided walk through the municipal vegetable and spice bazaar.",
        meals: "Breakfast, Lunch",
        stay: "Topaz Hotel / Hotel Suisse Kandy (or similar 3★)"
      },
      {
        dayNumber: 4,
        title: "Kandy Cultural Immersion & Temple of the Tooth",
        body: "Visit the sacred Temple of the Tooth Relic, followed by an exploration of traditional Kandyan sweetmakers making kavum, kokis, and jaggery treats. Evening Kandyan cultural performance.",
        meals: "Breakfast, Lunch",
        stay: "Topaz Hotel / Hotel Suisse Kandy (or similar 3★)"
      },
      {
        dayNumber: 5,
        title: "Kandy to Highland Tea Country — 3-Estate Tasting Tour",
        body: "Scenic drive into Nuwara Eliya's tea hills. Visit three renowned tea estates to contrast single-estate flavor profiles, processing techniques, and grades from green tea to silver tips. Savor a tea-infused dinner.",
        meals: "Breakfast, Dinner (Tea-infused dinner)",
        stay: "Galway Heights / The Grand Hotel Nuwara Eliya (or similar 3★/4★)"
      },
      {
        dayNumber: 6,
        title: "Nuwara Eliya Colonial High Tea & Ramboda Falls",
        body: "Enjoy a traditional British-colonial high tea experience on the lawns of Nuwara Eliya. Take a walk around Gregory Lake and drive down toward the western foothills via Ramboda Falls.",
        meals: "Breakfast, High Tea",
        stay: "Fairway Colombo / Mount Lavinia Hotel (or similar)"
      },
      {
        dayNumber: 7,
        title: "Colombo Souvenir Spice Shopping & Airport Drop",
        body: "Last-minute gourmet shopping for vacuum-sealed organic Ceylon cinnamon, tea gift packs, and local preserves before your airport transfer for your departure flight.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "6 nights accommodation in vetted 3★/4★ hotels with culinary heritage",
      "Daily breakfast, 1 street food dinner safari, 1 hands-on cooking class with lunch, 1 tea-pairing dinner, and colonial high tea",
      "Private dedicated air-conditioned vehicle with English-speaking foodie chauffeur-guide",
      "Cooking class fees, ingredients, and recipe booklet",
      "All spice garden, tea factory, temple, and market entrance fees"
    ],
    exclusions: [
      "International flights and optional domestic flights to Jaffna",
      "Sri Lanka ETA visa fee (USD 35 pp at https://www.eta.gov.lk)",
      "Travel insurance and tips",
      "Personal spice and tea retail purchases"
    ],
    visaNote: DEFAULT_SRI_LANKA_VISA_NOTE,
    isGroup: false,
    groupSize: "Min 2 pax (Private Culinary Tour)",
    departureStyle: "Daily private departures year-round",
    sampleDates: "Daily private bookings",
    audience: "Food lovers, home cooks, culture seekers, and culinary travellers wishing to discover the vibrant spices and regional curries of Sri Lanka",
    isFeatured: false,
    relatedSlugs: [
      "sri-lanka-classic-private-8d",
      "sri-lanka-ramayana-trail-8d",
      "sri-lanka-hill-country-tea-trail-7d"
    ],
    heroImage: "https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Sri Lanka Food & Culture Tour 7D/6N | Cooking & Spices | Hassle Free Travels",
    seoDescription: "Taste your way through Sri Lanka with Hassle Free Travels. Colombo street food, hands-on curry cooking class, Matale spice gardens, and tea masterclasses.",
    mealsSummary: "Daily Breakfast, 3 Lunches (including Cooking Class), 2 Specialty Dinners",
    staySummary: "2N Colombo 3★, 2N Kandy 3★, 1N Nuwara Eliya 3★, 1N Colombo Coastal 3★",
    transportSummary: "Private Dedicated A/C Vehicle throughout",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Kolkata", "Flights to Colombo (CMB)"]
  },

  // ─────────────────────────────────────────────────────────────
  // 15. FIT 13 — Sri Lanka South & Backwaters (7D / 6N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "sri-lanka-south-backwaters-7d",
    destinationSlug: "sri-lanka",
    name: "Sri Lanka South Coast & Koggala Backwaters",
    tagline: "Bentota → Madu River → Galle Fort → Koggala Houseboat → Mirissa",
    days: 7,
    nights: 6,
    packageType: "custom",
    categoryLabel: "Beach",
    route: "Bentota → Madu River → Galle Fort → Koggala Houseboat → Weligama → Mirissa",
    startCity: "Colombo",
    endCity: "Colombo",
    priceFromUSD: 710,
    priceFromINR: roundToMarketingPrice(710 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "3★ Beach Resorts + 1 Night Traditional Koggala Lake Houseboat",
    bestMonths: ["November", "December", "January", "February", "March", "April"],
    highlights: [
      "1-night exclusive stay on a traditional houseboat cruising serene Koggala Lake",
      "Madu River boat safari through dense mangrove tunnels, cinnamon island, and fish spa",
      "Photograph the iconic stilt fishermen of Ahangama at sunrise",
      "UNESCO-listed Galle Dutch Fort ramparts, colonial boutiques, and lighthouse walk",
      "Beginner surf lesson (1.5 hours with board & instructor) in gentle Weligama Bay",
      "Visit Mulkirigala Rock Temple, a hidden five-cave sanctuary carved into a giant rock boulder"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Colombo to Bentota — Madu River Mangrove Safari",
        body: "Pick up from Colombo airport and drive to Bentota (approx. 2 hours). Embark on a 2-hour guided motorboat safari through the mangrove labyrinths of the Madu River; visit Cinnamon Island to see traditional peeling and try natural fish therapy. Check into your beach resort.",
        meals: "Dinner",
        stay: "Cinnamon Bentota Beach / The Palms Beruwala (or similar 3★)"
      },
      {
        dayNumber: 2,
        title: "Bentota to Galle Fort Ramparts & Unawatuna Beach",
        body: "Stop at Kosgoda Sea Turtle Hatchery before continuing south to Galle (approx. 1.5 hours). Stroll the ramparts of UNESCO Galle Dutch Fort, see the lighthouse, and relax on Unawatuna Beach.",
        meals: "Breakfast",
        stay: "Lady Hill Galle / Tartaruga Beach Hotel (or similar 3★)"
      },
      {
        dayNumber: 3,
        title: "Galle to Koggala Lake — Stilt Fishermen & Houseboat Overnight",
        body: "Photograph the iconic stilt fishermen of Ahangama in the early morning light. Board a traditional cruise houseboat on peaceful Koggala Lake. Cruise past cinnamon isles and Buddhist monastery islands. Savor sunset cocktails and dinner on the deck before an overnight stay on board.",
        meals: "Breakfast, Dinner (Onboard houseboat)",
        stay: "Koggala Lake Traditional Cruise Houseboat (Private Cabin)"
      },
      {
        dayNumber: 4,
        title: "Koggala to Mirissa Beach Relaxation",
        body: "Enjoy sunrise coffee on the houseboat deck before disembarking. Drive to Mirissa (approx. 1 hour). Spend the afternoon relaxing on Mirissa's crescent beach and climb Parrot Rock for sunset.",
        meals: "Breakfast",
        stay: "Paradise Beach Club Mirissa / Triple O Six (or similar 3★)"
      },
      {
        dayNumber: 5,
        title: "Weligama Bay Surf Lesson & Coastal Leisure",
        body: "Head to Weligama Bay for an included 1.5-hour beginner surf lesson with certified surf instructors on its safe, sandy, gently breaking waves (board and rash vest included). Afternoon at leisure for beachside seafood or veg dining.",
        meals: "Breakfast, Lunch",
        stay: "Paradise Beach Club Mirissa / Triple O Six (or similar 3★)"
      },
      {
        dayNumber: 6,
        title: "Mirissa to Mulkirigala Rock Temple & Colombo",
        body: "Visit Mulkirigala Rock Cave Temple, an off-the-beaten-path ancient rock boulder housing five cave temples and a hilltop stupa. Drive to Colombo via the highway for a farewell dinner.",
        meals: "Breakfast, Dinner",
        stay: "Fairway Colombo / Cinnamon Red (or similar 3★)"
      },
      {
        dayNumber: 7,
        title: "Colombo to Airport Departure",
        body: "Transfer to Colombo airport (CMB) for your departure flight.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "5 nights accommodation in 3★ beach resorts + 1 night private cabin on Koggala Lake houseboat",
      "Daily breakfast, 1 lunch, and 3 dinners (including dinner on the houseboat)",
      "Private dedicated air-conditioned car with English-speaking chauffeur-guide",
      "Madu River boat safari and Koggala Lake boat excursion",
      "Beginner surf lesson in Weligama Bay with board rental and instructor",
      "Kosgoda Turtle Hatchery, Galle Fort, and Mulkirigala Rock Temple entrance fees"
    ],
    exclusions: [
      "International flights to/from Colombo",
      "Sri Lanka ETA visa fee (USD 35 pp at https://www.eta.gov.lk)",
      "Optional whale watching excursion in Mirissa (approx. USD 35 pp)",
      "Travel insurance and tips"
    ],
    visaNote: DEFAULT_SRI_LANKA_VISA_NOTE,
    isGroup: false,
    groupSize: "Min 2 pax (Private Backwaters Tour)",
    departureStyle: "Daily private departures November–April",
    sampleDates: "Daily departures during southwest dry season",
    audience: "Couples, Kerala-backwater lovers, beachgoers, and young travellers wanting water-based adventures and a unique houseboat stay",
    isFeatured: false,
    relatedSlugs: [
      "sri-lanka-galle-south-coast-6d",
      "sri-lanka-surf-beach-7d",
      "sri-lanka-colombo-galle-short-break-5d"
    ],
    heroImage: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Sri Lanka South Coast & Houseboat 7D/6N | Koggala Lake | Hassle Free Travels",
    seoDescription: "Discover Sri Lanka's backwaters with Hassle Free Travels. 1N Koggala houseboat, Madu River safari, stilt fishermen, Weligama surf lesson & Galle Fort.",
    mealsSummary: "Daily Breakfast, 1 Lunch, 3 Dinners",
    staySummary: "1N Bentota 3★, 1N Galle 3★, 1N Koggala Houseboat, 2N Mirissa 3★, 1N Colombo 3★",
    transportSummary: "Private Dedicated A/C Vehicle throughout",
    departureCities: ["Chennai", "Bengaluru", "Kochi", "Mumbai", "Delhi", "Direct flights to Colombo (CMB)"]
  },

  // ─────────────────────────────────────────────────────────────
  // 16. FIT 14 — Sri Lanka Poya & Spiritual Circuit (9D / 8N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "sri-lanka-spiritual-circuit-9d",
    destinationSlug: "sri-lanka",
    name: "Sri Lanka Sacred Poya & Spiritual Heritage Circuit",
    tagline: "Anuradhapura → Mihintale → Polonnaruwa → Kandy → Adam's Peak → Kataragama",
    days: 9,
    nights: 8,
    packageType: "spiritual",
    categoryLabel: "Spiritual",
    route: "Anuradhapura → Mihintale → Polonnaruwa → Kandy → Adam's Peak → Kataragama → Galle",
    startCity: "Colombo",
    endCity: "Colombo",
    priceFromUSD: 980,
    priceFromINR: roundToMarketingPrice(980 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "3★ Spiritual Lodges & Hotels with Pure Veg Dining",
    bestMonths: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    highlights: [
      "All sacred UNESCO World Heritage pilgrimage shrines in one comprehensive spiritual circuit",
      "Anuradhapura Sacred City — Sri Maha Bodhi tree & Ruwanwelisaya colossal stupa",
      "Mihintale — the 1,840-step holy mountain where Buddhism arrived in Sri Lanka",
      "Gal Vihara rock Buddhas in Polonnaruwa & Dambulla Cave Temple sanctuaries",
      "Temple of the Tooth Relic puja in Kandy timed for sacred drumming rituals",
      "Midnight ascent of sacred Adam's Peak (Sri Pada) revered by four world faiths",
      "Multi-faith Kataragama Maha Devale dedicated to Lord Murugan/Skanda",
      "100% Pure vegetarian meals guaranteed throughout"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Arrive Colombo — Kelaniya Temple Evening Puja & Pure Veg Dinner",
        body: "Arrive at Colombo airport and meet your spiritual tour chauffeur-guide. Visit Kelaniya Raja Maha Vihara for the sacred evening puja ceremony. Enjoy a pure vegetarian welcome dinner.",
        meals: "Dinner (Pure vegetarian)",
        stay: "Fairway Colombo / Pegasus Reef (or similar 3★)"
      },
      {
        dayNumber: 2,
        title: "Colombo to Anuradhapura Sacred Ancient Capital",
        body: "Drive north to the UNESCO Sacred City of Anuradhapura (approx. 4.5 hours). Pray beneath the branches of the 2,300-year-old sacred Jaya Sri Maha Bodhi tree. Meditate beside the majestic Ruwanwelisaya, Thuparamaya, and Jetavanaramaya stupas.",
        meals: "Breakfast, Lunch",
        stay: "Rajarata Hotel / The Lake Forest Anuradhapura (or similar 3★)"
      },
      {
        dayNumber: 3,
        title: "Anuradhapura to Mihintale & Sigiriya Rock",
        body: "Ascend the sacred mountain of Mihintale, the cradle of Sri Lankan Buddhism. Stand on Aradhana Gala meditation rock before driving to Sigiriya.",
        meals: "Breakfast, Lunch",
        stay: "Camellia Resort / Fresco Water Villa (or similar 3★)"
      },
      {
        dayNumber: 4,
        title: "Polonnaruwa Gal Vihara Rock Buddhas & Lankatilaka",
        body: "Spend a contemplative day in Polonnaruwa admiring the Gal Vihara rock temple, where four colossal Buddha figures radiate immense tranquility. Explore the Lankatilaka image house and Lotus Pond.",
        meals: "Breakfast, Lunch",
        stay: "Camellia Resort / Fresco Water Villa (or similar 3★)"
      },
      {
        dayNumber: 5,
        title: "Sigiriya to Dambulla Caves & Kandy Temple of the Tooth",
        body: "Tour Dambulla's five sacred cave temples housing 153 Buddha images. Travel to Kandy and attend the evocative evening puja at the Temple of the Tooth Relic.",
        meals: "Breakfast, Dinner",
        stay: "Topaz Hotel / Hotel Suisse Kandy (or similar 3★)"
      },
      {
        dayNumber: 6,
        title: "Kandy to Adam's Peak (Dalhousie) — Midnight Sacred Climb",
        body: "Morning stroll in Peradeniya Botanical Gardens. Drive to Dalhousie at the base of Adam's Peak (approx. 3 hours). Rest in the afternoon before starting the midnight 5,500-step pilgrimage to the sacred summit footprint.",
        meals: "Breakfast, Dinner",
        stay: "Punsisi Rest / Grand Adam's Peak Dalhousie (or similar)"
      },
      {
        dayNumber: 7,
        title: "Adam's Peak to Kataragama Maha Devale Pilgrimage",
        body: "Descend from the summit at dawn. Drive south to Kataragama (approx. 4 hours), one of Sri Lanka's holiest multi-faith shrines. Attend the vibrant evening puja at Kataragama Maha Devale dedicated to Lord Murugan.",
        meals: "Breakfast, Dinner",
        stay: "Mandarina Kataragama / Safari Hotel Tissamaharama (or similar 3★)"
      },
      {
        dayNumber: 8,
        title: "Kataragama to Galle Fort & Unawatuna",
        body: "Drive to Galle along the southern coast. Visit Galle Fort and the historic Meeran Jumma Mosque. Spend a peaceful evening on Unawatuna beach.",
        meals: "Breakfast",
        stay: "Lady Hill Galle / Tartaruga Beach Hotel (or similar 3★)"
      },
      {
        dayNumber: 9,
        title: "Galle to Colombo Airport Departure",
        body: "Transfer via the Southern Expressway to Colombo airport (CMB) for your journey home, revitalized in spirit.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "8 nights accommodation in 3★ hotels and spiritual rest houses on twin-share basis",
      "Pure vegetarian meals throughout (daily breakfast, 3 lunches, 4 dinners)",
      "Private dedicated air-conditioned car with respectful English-speaking chauffeur-guide",
      "All temple entrance tickets, stupa donations, and Adam's Peak guide",
      "All tolls, parking, and local taxes"
    ],
    exclusions: [
      "International flights to/from Colombo",
      "Sri Lanka ETA visa fee (USD 35 pp at https://www.eta.gov.lk)",
      "Personal pooja offerings/dakshina and temple donations",
      "Travel insurance and tips"
    ],
    visaNote: DEFAULT_SRI_LANKA_VISA_NOTE,
    isGroup: false,
    groupSize: "Min 2 pax (Private Spiritual Circuit)",
    departureStyle: "Daily private departures year-round (Poya full moon dates aligned)",
    sampleDates: "Daily departures (special coordination on Poya full moon days)",
    audience: "Spiritual seekers, Buddhist and Hindu pilgrims, multi-faith families, and travellers looking for deep contemplative heritage",
    isFeatured: false,
    relatedSlugs: [
      "sri-lanka-ramayana-trail-8d",
      "sri-lanka-discovery-8d",
      "sri-lanka-cultural-triangle-express-6d"
    ],
    heroImage: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Sri Lanka Spiritual & Poya Circuit 9D/8N | Holy Temples | Hassle Free Travels",
    seoDescription: "Embark on a sacred 9-day pilgrimage across Sri Lanka with Hassle Free Travels: Anuradhapura, Mihintale, Kandy Temple of the Tooth, Adam's Peak & Kataragama.",
    mealsSummary: "100% Pure Vegetarian Meals (Breakfasts, 3 Lunches, 4 Dinners)",
    staySummary: "1N Colombo 3★, 1N Anuradhapura 3★, 2N Sigiriya 3★, 1N Kandy 3★, 1N Dalhousie, 1N Kataragama 3★, 1N Galle 3★",
    transportSummary: "Private Dedicated A/C Vehicle throughout",
    departureCities: ["Chennai", "Bengaluru", "Mumbai", "Delhi", "Hyderabad", "Direct flights to Colombo (CMB)"]
  },

  // ─────────────────────────────────────────────────────────────
  // 17. FIT 15 — Sri Lanka Surf & Beach (7D / 6N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "sri-lanka-surf-beach-7d",
    destinationSlug: "sri-lanka",
    name: "Sri Lanka Surf & South Beach Adventure",
    tagline: "Weligama Surf Camp → Hikkaduwa Coral Reef → Mirissa Beach",
    days: 7,
    nights: 6,
    packageType: "adventure",
    categoryLabel: "Beach",
    route: "Weligama → Hikkaduwa → Mirissa → Colombo",
    startCity: "Colombo",
    endCity: "Colombo",
    priceFromUSD: 690,
    priceFromINR: roundToMarketingPrice(690 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "Beachfront Surf Lodges & 3★ Coastal Resorts",
    bestMonths: ["November", "December", "January", "February", "March", "April"],
    highlights: [
      "3 beginner to intermediate surf lessons included with certified local surf instructors",
      "Weligama Bay — one of the world's finest sandy, gentle beginner surf breaks",
      "Hikkaduwa National Park reef snorkelling with wild sea turtles and tropical fish",
      "Mirissa Beach — swim, relax, and catch sunsets from picturesque Parrot Rock",
      "Seasonal whale watching boat excursion in Mirissa waters included (Nov–Apr)",
      "Stroll the cobblestone heritage streets of UNESCO-listed Galle Fort"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Colombo to Weligama Bay — First Surf Lesson",
        body: "Arrive in Colombo and transfer south via the highway to Weligama Bay (approx. 2.5 hours). Settle into your beachfront surf lodge. In the afternoon, gear up for your first 2-hour beginner surf lesson covering ocean safety, paddling, and pop-up technique on Weligama's gentle sandbar waves.",
        meals: "Dinner",
        stay: "Weligama Bay Resort / Hangtime Surf Hostel (or similar beachfront lodge)"
      },
      {
        dayNumber: 2,
        title: "Weligama Surf Sessions & Coastal Lifestyle",
        body: "Morning 2-hour guided surf session catching green waves. Spend the afternoon exploring Weligama's seaside cafes and viewing Taprobane Island. Catch the sunset while surfing the evening glassy swell.",
        meals: "Breakfast, Lunch",
        stay: "Weligama Bay Resort / Hangtime Surf Hostel (or similar beachfront lodge)"
      },
      {
        dayNumber: 3,
        title: "Weligama to Hikkaduwa — Reef Surfing & Turtle Snorkelling",
        body: "Drive to Hikkaduwa (approx. 1.5 hours). Take your intermediate surf lesson over Hikkaduwa's reef break. In the afternoon, snorkel inside Hikkaduwa Marine National Park among coral gardens and friendly green sea turtles.",
        meals: "Breakfast, Lunch",
        stay: "Citrus Hikkaduwa / Hikka Tranz by Cinnamon (or similar 3★)"
      },
      {
        dayNumber: 4,
        title: "Hikkaduwa to Galle Fort & Mirissa Beach",
        body: "Pause at Galle Fort to walk the ramparts and enjoy artisan gelato. Drive to Mirissa (approx. 1 hour). Spend the afternoon swimming, sipping fresh coconut water, and watching the sunset from Parrot Rock.",
        meals: "Breakfast",
        stay: "Paradise Beach Club Mirissa / Triple O Six (or similar 3★)"
      },
      {
        dayNumber: 5,
        title: "Mirissa Whale Watching Cruise & Beach Leisure",
        body: "Early morning boat excursion out into deep waters to spot majestic blue whales, sperm whales, and spinner dolphins (Nov–Apr season). Spend a lazy afternoon on the beach.",
        meals: "Breakfast, Lunch",
        stay: "Paradise Beach Club Mirissa / Triple O Six (or similar 3★)"
      },
      {
        dayNumber: 6,
        title: "Mirissa to Colombo — Galle Face Sunset & Farewell Dinner",
        body: "Transfer north to Colombo along the expressway (approx. 3 hours). Explore the Dutch Hospital Precinct and Galle Face Green. Enjoy a farewell dinner with your fellow travellers.",
        meals: "Breakfast, Dinner",
        stay: "Fairway Colombo / Cinnamon Red (or similar 3★)"
      },
      {
        dayNumber: 7,
        title: "Colombo to Airport Departure",
        body: "Transfer to Colombo airport (CMB) for your flight home.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "6 nights accommodation in beachfront surf lodges and 3★ coastal resorts",
      "Daily breakfast, 3 lunches, and 2 dinners",
      "Three guided surf lessons (2 hours each) with equipment (surfboard, rashguard, leash) and instructor",
      "Hikkaduwa Marine Park snorkelling gear and boat permit",
      "Seasonal Mirissa whale watching cruise ticket (Nov–Apr)",
      "Private air-conditioned car with English-speaking chauffeur-guide throughout"
    ],
    exclusions: [
      "International flights to/from Colombo",
      "Sri Lanka ETA visa fee (USD 35 pp at https://www.eta.gov.lk)",
      "Travel insurance and tips",
      "Whale watching if travelling outside Nov–Apr (replaced with boat lagoon tour)"
    ],
    visaNote: DEFAULT_SRI_LANKA_VISA_NOTE,
    isGroup: false,
    groupSize: "Min 2 pax (Private Surf Adventure)",
    departureStyle: "Daily private departures November–April",
    sampleDates: "Daily departures during southwest surf season",
    audience: "Young professionals, college friends, solo travellers, and surf beginners wanting an active beach getaway with lessons included",
    isFeatured: false,
    relatedSlugs: [
      "sri-lanka-south-backwaters-7d",
      "sri-lanka-east-coast-trincomalee-8d",
      "sri-lanka-galle-south-coast-6d"
    ],
    heroImage: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Sri Lanka Surf & Beach Holiday 7D/6N | Weligama Surf Camp | Hassle Free Travels",
    seoDescription: "Catch your first wave in Sri Lanka with Hassle Free Travels. 3 surf lessons in Weligama Bay, Hikkaduwa turtle snorkelling, Mirissa whale watching & Galle Fort.",
    mealsSummary: "Daily Breakfast, 3 Lunches, 2 Dinners",
    staySummary: "2N Weligama Surf Lodge, 1N Hikkaduwa 3★, 2N Mirissa 3★, 1N Colombo 3★",
    transportSummary: "Private Dedicated A/C Vehicle throughout",
    departureCities: ["Bengaluru", "Chennai", "Mumbai", "Delhi", "Hyderabad", "Direct flights to Colombo (CMB)"]
  },

  // ─────────────────────────────────────────────────────────────
  // 18. FIT 16 — Galle & South Coast Only (6D / 5N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "sri-lanka-galle-south-coast-6d",
    destinationSlug: "sri-lanka",
    name: "Galle Fort & South Coast In-Depth Escape",
    tagline: "Galle Fort Stay → Mirissa → Tangalle → Bundala Flamingos",
    days: 6,
    nights: 5,
    packageType: "custom",
    categoryLabel: "Private",
    route: "Galle Fort → Unawatuna → Mirissa → Tangalle → Bundala → Tissamaharama",
    startCity: "Colombo",
    endCity: "Colombo",
    priceFromUSD: 520,
    priceFromINR: roundToMarketingPrice(520 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "3★ Boutique Fort Guesthouses & Coastal Beach Resorts",
    bestMonths: ["November", "December", "January", "February", "March", "April"],
    highlights: [
      "Dedicated, unhurried immersion in Sri Lanka's romantic southern coastline",
      "2 nights staying inside the fortified walls of historic 17th-century Galle Fort",
      "Discover the secluded, uncrowded sands of Tangalle — Sri Lanka's finest coastal arc",
      "Bundala National Park 4x4 safari — flamingos, wild elephants, and thousands of migratory birds",
      "Visit hidden Mulkirigala Rock Temple with five cliff-cut cave sanctuaries",
      "Boat ride through the quiet channels of Koggala Lake"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Colombo to Galle Fort — Check into Historic Fort Guesthouse",
        body: "Airport pickup at Colombo and highway transfer to Galle (approx. 1.5 hours). Check into a charming boutique guesthouse within the ancient walls of UNESCO-listed Galle Fort. Take an evening rampart sunset walk and dine in the Dutch Hospital Precinct.",
        meals: "Dinner",
        stay: "Lady Hill Galle / Fortaleza Galle Fort (or similar boutique)"
      },
      {
        dayNumber: 2,
        title: "Galle Fort In-Depth Walk & Unawatuna Jungle Beach",
        body: "Full day dedicated to Galle Fort: Dutch Reformed Church (1755), maritime museums, and artisan jewelry studios. Afternoon hike to secluded Jungle Beach near Unawatuna for swimming and snorkelling.",
        meals: "Breakfast, Lunch",
        stay: "Lady Hill Galle / Fortaleza Galle Fort (or similar boutique)"
      },
      {
        dayNumber: 3,
        title: "Galle to Mirissa — Stilt Fishermen & Koggala Lake Boat Safari",
        body: "Photograph Ahangama's stilt fishermen at dawn. Take a scenic boat tour on Koggala Lake through cinnamon isles. Drive to Mirissa, relax on the beach, and climb Parrot Rock at sunset.",
        meals: "Breakfast",
        stay: "Paradise Beach Club Mirissa / Triple O Six (or similar 3★)"
      },
      {
        dayNumber: 4,
        title: "Mirissa to Tangalle & Mulkirigala Rock Temple",
        body: "Optional early morning whale watching. Drive east to tranquil Tangalle (approx. 1.5 hours), known for its untouched golden beaches. Visit Mulkirigala Rock Cave Temple, climbing past 500 rock steps to explore five ancient cave temples.",
        meals: "Breakfast, Lunch",
        stay: "Lagoon Paradise Beach Resort Tangalle / Palm Paradise Cabanas"
      },
      {
        dayNumber: 5,
        title: "Tangalle to Bundala National Park Safari to Tissamaharama",
        body: "Embark on an open 4x4 jeep safari through Bundala National Park (UNESCO Biosphere Reserve), famous for thousands of greater flamingos (Nov–Mar), elephants, crocodiles, and painted storks. Overnight in Tissamaharama beside Tissa Wewa lake.",
        meals: "Breakfast, Lunch",
        stay: "Chandrika Hotel / Elephant Reach Tissamaharama (or similar 3★)"
      },
      {
        dayNumber: 6,
        title: "Tissamaharama to Colombo Airport Departure",
        body: "Transfer directly via the Southern Expressway to Colombo airport (CMB; approx. 4 hours) for your departure flight.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "5 nights accommodation (2 nights inside Galle Fort + 3 nights coastal resorts)",
      "Daily breakfast, 3 lunches, and 1 dinner",
      "Private dedicated air-conditioned car with English-speaking chauffeur-guide",
      "Bundala National Park 4x4 safari (jeep and entry tickets included)",
      "Koggala Lake boat safari and Mulkirigala Rock Temple entrance fees",
      "All expressway tolls and local taxes"
    ],
    exclusions: [
      "International airfare",
      "Sri Lanka ETA visa fee (USD 35 pp at https://www.eta.gov.lk)",
      "Optional whale watching boat in Mirissa (approx. USD 35 pp)",
      "Travel insurance and tips"
    ],
    visaNote: DEFAULT_SRI_LANKA_VISA_NOTE,
    isGroup: false,
    groupSize: "Min 2 pax (Private South Coast Tour)",
    departureStyle: "Daily private departures November–April",
    sampleDates: "Daily private departures",
    audience: "Travellers seeking a relaxing, culture-rich coastal holiday inspired by Vietnam's Da Nang/Hoi An style without long inland road journeys",
    isFeatured: false,
    relatedSlugs: [
      "sri-lanka-colombo-galle-short-break-5d",
      "sri-lanka-south-backwaters-7d",
      "sri-lanka-classic-private-8d"
    ],
    heroImage: "https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Galle Fort & South Coast 6D/5N Tour | Tangalle & Bundala | Hassle Free Travels",
    seoDescription: "Experience Sri Lanka's south coast with Hassle Free Travels. 2 nights inside Galle Fort, unspoilt Tangalle beaches, Bundala flamingo safari, and Mirissa sunset.",
    mealsSummary: "Daily Breakfast, 3 Lunches, 1 Dinner",
    staySummary: "2N Galle Fort Boutique, 1N Mirissa 3★, 1N Tangalle Beach Resort, 1N Tissamaharama 3★",
    transportSummary: "Private Dedicated A/C Vehicle throughout",
    departureCities: ["Chennai", "Bengaluru", "Mumbai", "Delhi", "Kochi", "Direct flights to Colombo (CMB)"]
  },

  // ─────────────────────────────────────────────────────────────
  // 19. FIT 17 — Sri Lanka Ayurveda & Wellness Retreat (8D / 7N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "sri-lanka-ayurveda-wellness-8d",
    destinationSlug: "sri-lanka",
    name: "Sri Lanka Certified Ayurveda & Wellness Retreat",
    tagline: "3N Certified Ayurveda Resort → Matale Spices → Kandy → Nuwara Eliya → Galle",
    days: 8,
    nights: 7,
    packageType: "custom",
    categoryLabel: "Wellness",
    route: "Beruwala/Bentota (Ayurveda) → Matale → Kandy → Nuwara Eliya → Galle → Mirissa",
    startCity: "Colombo",
    endCity: "Colombo",
    priceFromUSD: 1100,
    priceFromINR: roundToMarketingPrice(1100 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "3N Certified Coastal Ayurveda Resort (Full Board) + 4N 3★ Hotels",
    bestMonths: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    highlights: [
      "3-night immersive stay at a government-certified beachfront Ayurveda resort in Beruwala/Bentota",
      "Full doctor-supervised Ayurveda programme: pulse diagnosis, dosha assessment, and personalised therapies",
      "Daily authentic treatments: Abhyanga full-body warm oil massage, Shirodhara oil flow, and herbal baths",
      "Daily sunrise yoga and guided meditation sessions included at the retreat",
      "Nutritious Ayurvedic vegetarian cuisine prepared to balance your dosha constitution",
      "Matale organic spice garden tour showcasing living medicinal plants and herbs",
      "Scenic continuation to Kandy Temple of the Tooth, Nuwara Eliya tea hills, and Galle Fort"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Arrive Colombo to Beruwala Ayurveda Resort — Doctor Consultation",
        body: "Meet your private chauffeur at Colombo airport and transfer down the coast to your certified Ayurveda resort in Beruwala (approx. 1.5 hours). Receive your initial pulse diagnosis and dosha constitution assessment by a resident Ayurvedic physician. Savor a dosha-balancing Ayurvedic dinner.",
        meals: "Dinner (Ayurvedic cuisine)",
        stay: "Heritance Ayurveda Maha Gedara / Barberyn Beach Resort (or similar certified resort)"
      },
      {
        dayNumber: 2,
        title: "Ayurveda Retreat Day 1 — Abhyanga Therapy & Sunrise Yoga",
        body: "Begin with a sunrise beach yoga session. Receive your 60-minute Abhyanga synchronized full-body herbal oil massage. Afternoon consultation, herbal steam bath, and relaxing walk along Beruwala beach.",
        meals: "Breakfast, Lunch, Dinner (Ayurvedic full board)",
        stay: "Heritance Ayurveda Maha Gedara / Barberyn Beach Resort"
      },
      {
        dayNumber: 3,
        title: "Ayurveda Retreat Day 2 — Shirodhara & Meditation",
        body: "Morning meditation on the oceanfront pavilion. Undergo a therapeutic 45-minute Shirodhara treatment (warm medicated herbal oil poured steadily over the third-eye chakra to alleviate stress). Afternoon herbal bath and doctor follow-up.",
        meals: "Breakfast, Lunch, Dinner (Ayurvedic full board)",
        stay: "Heritance Ayurveda Maha Gedara / Barberyn Beach Resort"
      },
      {
        dayNumber: 4,
        title: "Ayurveda Retreat to Matale Spice Garden & Kandy",
        body: "Conclude your retreat with an invigorating morning herbal treatment. Drive inland to Matale for a guided tour of an organic Ayurvedic herb garden to see living cinnamon, turmeric, and medicinal roots. Continue to Kandy and visit the Temple of the Tooth.",
        meals: "Breakfast, Lunch",
        stay: "Topaz Hotel / Hotel Suisse Kandy (or similar 3★)"
      },
      {
        dayNumber: 5,
        title: "Kandy to Nuwara Eliya Tea Country & Medicinal Gardens",
        body: "Tour the medicinal plant section of Peradeniya Royal Botanical Gardens. Drive through the mist into Nuwara Eliya, visit Pedro Tea Estate, and tour Seetha Amman Temple.",
        meals: "Breakfast, Lunch",
        stay: "Galway Heights / Summer Hill Breeze Nuwara Eliya (or similar 3★)"
      },
      {
        dayNumber: 6,
        title: "Nuwara Eliya to Galle Fort Coastal Heritage",
        body: "Scenic drive down from the highlands to Galle Fort (approx. 4 hours). Walk the ramparts in the late afternoon and enjoy a relaxed evening on Unawatuna beach.",
        meals: "Breakfast",
        stay: "Lady Hill Galle / Tartaruga Beach Hotel (or similar 3★)"
      },
      {
        dayNumber: 7,
        title: "Galle to Mirissa Beach & Turtle Sanctuary",
        body: "Visit the Kosgoda Turtle Conservation Project. Relax on the golden sands of Mirissa Beach and watch the sunset from Parrot Rock. Farewell dinner.",
        meals: "Breakfast, Dinner",
        stay: "Paradise Beach Club Mirissa / Triple O Six (or similar 3★)"
      },
      {
        dayNumber: 8,
        title: "Mirissa to Colombo Airport Departure",
        body: "Transfer directly via the Southern Expressway to Colombo airport (CMB) for your onward flight, revitalized in mind, body, and spirit.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "3 nights full-board accommodation at a certified beachfront Ayurveda resort + 4 nights 3★ hotels",
      "Full Ayurvedic wellness package: doctor consultations, daily prescribed treatments (Abhyanga, Shirodhara, herbal baths), and daily yoga/meditation sessions",
      "All meals during the Ayurveda resort stay (Days 1–4) and daily breakfast + meals as listed on subsequent days",
      "Private dedicated air-conditioned car with English-speaking chauffeur-guide",
      "Matale spice garden tour, Peradeniya Gardens, Temple of the Tooth, and Kosgoda Turtle Project entrance fees",
      "All expressway tolls and government taxes"
    ],
    exclusions: [
      "International flights to/from Colombo",
      "Sri Lanka ETA visa fee (USD 35 pp at https://www.eta.gov.lk)",
      "Optional specialised panchakarma cleansing therapies beyond standard programme",
      "Travel insurance and tips"
    ],
    visaNote: DEFAULT_SRI_LANKA_VISA_NOTE,
    isGroup: false,
    groupSize: "Min 2 pax (Private Wellness Retreat)",
    departureStyle: "Daily private departures year-round",
    sampleDates: "Daily private departures",
    audience: "Wellness seekers, yoga enthusiasts, burnt-out professionals, and health-conscious travellers wanting authentic Ayurveda combined with island sightseeing",
    isFeatured: false,
    relatedSlugs: [
      "sri-lanka-honeymoon-escape-9d",
      "sri-lanka-spiritual-circuit-9d",
      "sri-lanka-classic-private-8d"
    ],
    heroImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Sri Lanka Ayurveda & Wellness Retreat 8D/7N | Shirodhara | Hassle Free Travels",
    seoDescription: "Rejuvenate with Hassle Free Travels on an 8-day Sri Lanka Ayurveda retreat. 3N certified resort with doctor consultation, Shirodhara, daily yoga, Kandy & Galle.",
    mealsSummary: "Full Board Ayurvedic Dining at Retreat (Days 1–4), Daily Breakfast & Selected Meals on Tour",
    staySummary: "3N Certified Ayurveda Resort (Beruwala), 1N Kandy 3★, 1N Nuwara Eliya 3★, 1N Galle 3★, 1N Mirissa 3★",
    transportSummary: "Private Dedicated A/C Vehicle throughout",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Hyderabad", "Direct flights to Colombo (CMB)"]
  },

  // ─────────────────────────────────────────────────────────────
  // 20. FIT 18 — Sri Lanka Cultural Triangle Express (6D / 5N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "sri-lanka-cultural-triangle-express-6d",
    destinationSlug: "sri-lanka",
    name: "Sri Lanka Cultural Triangle Express Heritage Tour",
    tagline: "Anuradhapura → Aukana Buddha → Sigiriya → Dambulla → Polonnaruwa → Kandy",
    days: 6,
    nights: 5,
    packageType: "custom",
    categoryLabel: "Private",
    route: "Anuradhapura → Aukana → Sigiriya → Dambulla → Polonnaruwa → Kandy → Colombo",
    startCity: "Colombo",
    endCity: "Colombo",
    priceFromUSD: 580,
    priceFromINR: roundToMarketingPrice(580 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "3★ Heritage Hotels & Scenic Jungle Resorts",
    bestMonths: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    highlights: [
      "The definitive 6-day heritage sprint covering all five UNESCO World Heritage sites in the Cultural Triangle",
      "Anuradhapura Sacred City & Jaya Sri Maha Bodhi tree",
      "Aukana Buddha — magnificent 12-meter standing Buddha statue carved from a single granite cliff",
      "Ritigala Forest Monastery — ancient jungle ruins and double-platform meditation terraces",
      "Sigiriya Rock Fortress & Dambulla Cave Temple murals",
      "Minneriya National Park 4x4 elephant safari",
      "Polonnaruwa medieval capital & Kandy Temple of the Tooth Relic"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Colombo to Anuradhapura Sacred Ancient Capital",
        body: "Pick up from Colombo airport and drive north into the heart of the Cultural Triangle to Anuradhapura (approx. 4.5 hours). Tour the sacred UNESCO city: Jaya Sri Maha Bodhi (the world's oldest planted tree), Ruwanwelisaya, Jetavanaramaya, and Isurumuniya lovers rock temple.",
        meals: "Dinner",
        stay: "Rajarata Hotel / The Lake Forest Anuradhapura (or similar 3★)"
      },
      {
        dayNumber: 2,
        title: "Anuradhapura to Aukana Buddha, Ritigala & Sigiriya",
        body: "Marvel at the colossal 12-meter standing Aukana Buddha statue carved directly out of a solid rock face in the 5th century. Continue to the secluded Ritigala Forest Monastery, exploring ancient stone ruins nestled deep in the jungle. Drive to Sigiriya and climb the majestic Rock Fortress.",
        meals: "Breakfast, Lunch",
        stay: "Camellia Resort / Hotel Sigiriya (or similar 3★)"
      },
      {
        dayNumber: 3,
        title: "Dambulla Cave Temples & Minneriya Elephant Safari",
        body: "Visit Dambulla Cave Temple to marvel at 153 Buddha statues and centuries-old ceiling murals across five caverns. In the afternoon, board an open 4x4 jeep in Minneriya National Park to observe wild Asian elephant herds.",
        meals: "Breakfast, Lunch",
        stay: "Camellia Resort / Hotel Sigiriya (or similar 3★)"
      },
      {
        dayNumber: 4,
        title: "Polonnaruwa Ancient Capital & Aluvihara Cave Temple",
        body: "Explore medieval Polonnaruwa (UNESCO), highlighting the Gal Vihara rock temple sculptures, Rankoth Vehera stupa, and royal palaces. In the afternoon, visit Aluvihara Rock Cave Temple, where the Buddhist Tipitaka (Pali Canon) was first committed to writing on ola palm leaves in the 1st century BC.",
        meals: "Breakfast, Lunch",
        stay: "Camellia Resort / Hotel Sigiriya (or similar 3★)"
      },
      {
        dayNumber: 5,
        title: "Sigiriya to Pidurangala Viewpoint & Kandy Temple of the Tooth",
        body: "Morning hike up Pidurangala Rock for an iconic direct view of Sigiriya Rock Fortress. Drive south to Kandy (approx. 2.5 hours). Visit the sacred Temple of the Tooth Relic for the evening puja and enjoy a traditional Kandyan dance performance.",
        meals: "Breakfast, Dinner",
        stay: "Topaz Hotel / Hotel Suisse Kandy (or similar 3★)"
      },
      {
        dayNumber: 6,
        title: "Kandy to Peradeniya Gardens & Colombo Airport Departure",
        body: "Stroll through the Royal Botanical Gardens at Peradeniya. Drive back to Colombo airport (CMB; approx. 3 hours) for your return flight home.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "5 nights accommodation in 3★ heritage hotels on twin-share basis",
      "Daily breakfast, 3 lunches, and 2 dinners",
      "Private dedicated air-conditioned car with English-speaking chauffeur-guide",
      "All entrance tickets for Anuradhapura, Aukana Buddha, Ritigala, Sigiriya Rock, Dambulla Caves, Polonnaruwa, Aluvihara, and Temple of the Tooth",
      "Minneriya National Park 4x4 open jeep safari (jeep and entry fees included)",
      "Kandyan cultural dance tickets and all taxes"
    ],
    exclusions: [
      "International flights to/from Colombo",
      "Sri Lanka ETA visa fee (USD 35 pp at https://www.eta.gov.lk)",
      "Travel insurance and tips",
      "Personal expenses"
    ],
    visaNote: DEFAULT_SRI_LANKA_VISA_NOTE,
    isGroup: false,
    groupSize: "Min 2 pax (Private Cultural Express)",
    departureStyle: "Daily private departures year-round",
    sampleDates: "Daily departures (not weather-dependent)",
    audience: "History enthusiasts, archaeology lovers, and travellers with 5–6 days wishing to experience Sri Lanka's greatest UNESCO heritage treasures",
    isFeatured: false,
    relatedSlugs: [
      "sri-lanka-ramayana-trail-8d",
      "sri-lanka-discovery-8d",
      "sri-lanka-spiritual-circuit-9d"
    ],
    heroImage: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Sri Lanka Cultural Triangle Express 6D/5N | Sigiriya & Anuradhapura | Hassle Free Travels",
    seoDescription: "Explore all 5 UNESCO Cultural Triangle sites in 6 days with Hassle Free Travels: Anuradhapura, Aukana Buddha, Sigiriya, Dambulla Caves, Polonnaruwa & Kandy.",
    mealsSummary: "Daily Breakfast, 3 Lunches, 2 Dinners",
    staySummary: "1N Anuradhapura 3★, 3N Sigiriya 3★, 1N Kandy 3★",
    transportSummary: "Private Dedicated A/C Vehicle throughout",
    departureCities: ["Chennai", "Bengaluru", "Mumbai", "Delhi", "Hyderabad", "Direct flights to Colombo (CMB)"]
  }
];

function generateTsFile() {
  const tsContent = `// Auto-generated by scripts/build-sri-lanka-packages.mjs
// Do not edit manually - run 'node scripts/build-sri-lanka-packages.mjs' to regenerate

export interface SriLankaDay {
  dayNumber: number;
  title: string;
  body: string;
  meals?: string;
  stay?: string;
}

export interface SriLankaPackage {
  slug: string;
  destinationSlug: "sri-lanka";
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
  itineraryDays: SriLankaDay[];
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
}

export const USD_TO_INR = 84;

export function roundToMarketingPrice(inr: number): number {
  return Math.ceil(inr / 1000) * 1000 - 1; // e.g. 75516 -> 75999
}

export const DEFAULT_SRI_LANKA_VISA_NOTE =
  "Electronic Travel Authorisation (ETA) required for Indian passport holders. Apply online before departure at https://www.eta.gov.lk. Fee: USD 35 per person (children under 12 also require an ETA). Processing time: instant to 24 hours. No visa-on-arrival for Indian passport holders. Hassle Free Travels assists with ETA application guidance.";

export const SRI_LANKA_PACKAGES: SriLankaPackage[] = ${JSON.stringify(packages, null, 2)};

export function getSriLankaPackageBySlug(slug: string): SriLankaPackage | undefined {
  return SRI_LANKA_PACKAGES.find((pkg) => pkg.slug === slug);
}

export function getSriLankaFeaturedPackages(): SriLankaPackage[] {
  return SRI_LANKA_PACKAGES.filter((pkg) => pkg.isFeatured);
}
`;

  const targetPath = path.resolve("src/data/sri-lanka-packages.ts");
  fs.writeFileSync(targetPath, tsContent, "utf-8");
  console.log("Successfully generated " + targetPath + " with " + packages.length + " packages!");
}

generateTsFile();
