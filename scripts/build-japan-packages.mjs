import fs from "fs";
import path from "path";

export const USD_TO_INR = 84;

export function roundToMarketingPrice(inr) {
  return Math.ceil(inr / 1000) * 1000 - 1; // e.g. 58716 -> 58999
}

const DEFAULT_JAPAN_VISA_NOTE =
  "Japan tourist visa required for Indian passport holders. Apply at the Japanese Embassy or Consulate in India (Mumbai, Delhi, Chennai, Kolkata, Bengaluru). Processing time: approximately 5–7 working days. Fee: approx. INR 540 (single entry). No visa on arrival. Hassle Free Travels can provide a visa support letter on request. Reference: https://www.in.emb-japan.go.jp/itpr_en/visa.html";

const packages = [
  // ─────────────────────────────────────────────────────────────
  // 1. Group 1 — Japan Classic Highlights (8D / 7N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "japan-classic-highlights-8d",
    destinationSlug: "japan",
    name: "Japan Classic Highlights Group Tour",
    tagline: "Tokyo → Mt Fuji & Hakone → Kyoto → Nara → Osaka",
    days: 8,
    nights: 7,
    packageType: "group",
    categoryLabel: "Group",
    route: "Tokyo → Hakone → Kyoto → Nara → Osaka",
    startCity: "Tokyo",
    endCity: "Osaka",
    priceFromUSD: 1190,
    priceFromINR: roundToMarketingPrice(1190 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "3★ City Hotels & Traditional Hakone Ryokan (or similar)",
    bestMonths: ["March", "April", "May", "October", "November", "December"],
    highlights: [
      "Fixed-date guaranteed SIC departure — seamless group travel with fellow Indian explorers",
      "Futuristic Tokyo: teamLab digital art (Borderless or Planets, subject to availability, advance booking required) & Shibuya Sky",
      "Mt Fuji 5th Station (weather permitting) & scenic Hakone Ropeway over volcanic Owakudani",
      "Traditional Hakone Ryokan overnight stay with natural hot spring onsen bath",
      "Kyoto's iconic Fushimi Inari vermilion torii gates & Golden Pavilion (Kinkaku-ji)",
      "Friendly sacred deer encounters at Nara Deer Park & UNESCO Todai-ji Temple",
      "Electric Osaka: vibrant Dotonbori neon canal food walk & historic Osaka Castle"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Arrive Tokyo — Meet & Greet, Shinjuku Neon Walk & Welcome Dinner",
        body: "Arrive at Tokyo Narita (NRT) or Haneda (HND) International Airport. Complete immigration and customs, then meet your Hassle Free Travels local English-speaking guide at arrival hall. Board your comfortable private air-conditioned coach transfer to your central hotel in Shinjuku. After check-in and refreshing, embark on an evening orientation walk exploring the dazzling neon corridors of Shinjuku Kabukicho and historic Omoide Yokocho (Memory Lane). Tonight, gather for a warm welcome dinner at a curated Japanese restaurant featuring dedicated vegetarian and Jain-friendly set menus upon advance request.",
        meals: "Dinner (Welcome dinner; vegetarian/Jain set available)",
        stay: "Shinjuku Washington Hotel / Hotel Gracery Shinjuku (or similar)"
      },
      {
        dayNumber: 2,
        title: "Tokyo Highlights — Asakusa Senso-ji, teamLab Digital Art & Shibuya Sky",
        body: "Begin the morning in historic Asakusa visiting Senso-ji, Tokyo's oldest Buddhist temple dating to 628 AD, followed by souvenir browsing along lively Nakamise shopping street. In the afternoon, enter the world of immersive digital art at teamLab Borderless or teamLab Planets (subject to availability, advance booking required), walking through crystal light chambers and water-mirror rooms. Conclude the afternoon at Shibuya Crossing, the world's busiest pedestrian intersection, before ascending to the 360-degree open-air observation deck at Shibuya Sky. Enjoy optional free time in Akihabara's neon gaming and anime district before returning to your hotel.",
        meals: "Breakfast",
        stay: "Shinjuku Washington Hotel / Hotel Gracery Shinjuku (or similar)"
      },
      {
        dayNumber: 3,
        title: "Tokyo to Mt Fuji & Hakone — 5th Station, Lake Ashi Cruise & Onsen Ryokan",
        body: "Depart Tokyo by private coach toward magnificent Mount Fuji. En route, make a curated shopping stop at Gotemba Premium Outlets, framed by views of Fuji's snow-capped cone. Ascend along the Fuji Subaru Line to Mt Fuji 5th Station at 2,305 meters elevation (weather permitting; panoramic views of the crater and surrounding Five Lakes, crater views weather permitting). Descend into the volcanic caldera of Hakone, gliding aboard the Hakone Ropeway above smoking sulphur vents at Owakudani valley. Take a serene cruise across Lake Ashi before checking into an authentic traditional Japanese ryokan with mineral-rich hot spring onsen baths. Savor a multi-course Kaiseki dinner (vegetarian kaiseki available).",
        meals: "Breakfast, Dinner (Ryokan Kaiseki dinner)",
        stay: "Hakone Yumoto Onsen Ryokan / Hotel Okada Hakone (or similar)"
      },
      {
        dayNumber: 4,
        title: "Hakone to Kyoto — Open-Air Museum, Shinkansen Bullet Train & Gion Walk",
        body: "Spend a leisurely morning admiring sculpture art nestled in mountain forests at the renowned Hakone Open-Air Museum, featuring its acclaimed Picasso pavilion. Transfer to Odawara Station to board the high-speed Shinkansen bullet train to Kyoto (approx. 2 hours; 7-Day JR Pass included). Watch the Japanese countryside flash past at 300 km/h. Arrive in ancient Kyoto, the cultural heart of Japan, and transfer to your hotel. In the late afternoon, take a guided stroll through the lantern-lit cobblestone alleys of Gion, bordered by preserved wooden machiya townhouses, with opportunities to catch a glimpse of apprentice geiko (maiko) heading to evening appointments.",
        meals: "Breakfast",
        stay: "Miyako Hotel Kyoto Hachijo / Keihan Kyoto Grande (or similar)"
      },
      {
        dayNumber: 5,
        title: "Kyoto Heritage — Fushimi Inari, Golden Pavilion, Arashiyama Bamboo & Nishiki Market",
        body: "Set out early to Fushimi Inari Taisha, trekking under thousands of iconic vermilion torii gates winding up sacred Mount Inari. Next, visit Kinkaku-ji (the Golden Pavilion), a stunning Zen Buddhist temple whose top two floors are completely covered in pure gold leaf, mirrored in the surrounding mirror pond. Continue to scenic western Kyoto to wander through the soaring green stalks of Arashiyama Bamboo Grove and visit the UNESCO World Heritage Zen garden of Tenryu-ji. Savor a delicious bento lunch in Arashiyama, then immerse your senses in Nishiki Market ('Kyoto’s Kitchen'), packed with local delicacies, matcha treats, and vegetarian street specialties.",
        meals: "Breakfast, Lunch (Arashiyama bento lunch)",
        stay: "Miyako Hotel Kyoto Hachijo / Keihan Kyoto Grande (or similar)"
      },
      {
        dayNumber: 6,
        title: "Kyoto to Nara & Osaka — Todai-ji Great Buddha, Sacred Deer Park & Dotonbori Canal",
        body: "Embark on a short morning journey to Nara, Japan's first permanent capital. Marvel at Todai-ji Temple, one of the world's largest wooden structures housing a colossal 15-meter bronze Daibutsu (Great Buddha). Walk through expansive Nara Deer Park, home to over 1,200 docile, free-roaming sika deer who bow politely for deer crackers (shika-senbei; 1 pack included per guest). In the afternoon, transfer to energetic Osaka, Japan's undisputed food capital. Check in to your central hotel, then spend the evening navigating the bustling canals of Dotonbori beneath the iconic neon Glico Running Man, enjoying takoyaki, okonomiyaki, and fresh local street snacks with vegetarian options highlighted.",
        meals: "Breakfast",
        stay: "Hotel Monterey Grasmere Osaka / Holiday Inn Osaka Namba (or similar)"
      },
      {
        dayNumber: 7,
        title: "Osaka Castle, Kuromon Market & Universal Studios Japan (Optional)",
        body: "Visit majestic 16th-century Osaka Castle (Osaka-jo), exploring its comprehensive museum and enjoying panoramic 360-degree city views from the top observatory. Next, explore vibrant Kuromon Ichiba Market, bustling with fresh produce and street treats. The afternoon is yours to customize: enjoy an optional excursion to Universal Studios Japan (USJ) to experience The Wizarding World of Harry Potter and Super Nintendo World (tickets not included in base tour; Hassle Free Travels can pre-book tickets), or enjoy a guided walking exploration of retro Shinsekai district and Tsutenkaku Tower. Tonight, assemble for a memorable farewell dinner celebrating your Japan adventure.",
        meals: "Breakfast, Dinner (Farewell dinner; Indian veg set available)",
        stay: "Hotel Monterey Grasmere Osaka / Holiday Inn Osaka Namba (or similar)"
      },
      {
        dayNumber: 8,
        title: "Depart Osaka / Tokyo — Airport Transfer & Departure",
        body: "Enjoy a relaxed breakfast at your hotel. Depending on your flight schedule, enjoy free time for last-minute souvenir shopping in Shinsaibashi or Namba arcades. Transfer by airport coach or train to Kansai International Airport (KIX) or Osaka Itami (ITM) for your return flight to India. Alternatively, connect by Shinkansen bullet train back to Tokyo Haneda or Narita for onward departures. Board your flight home with unforgettable memories of Japan's classic highlights.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "7 nights accommodation in vetted 3★ city hotels & 1 night authentic Hakone Onsen Ryokan (twin-share, or similar)",
      "Daily breakfast at hotels, 1 Welcome Dinner in Tokyo, 1 Multi-course Kaiseki Dinner at Hakone Ryokan, 1 Arashiyama Bento Lunch, 1 Farewell Dinner in Osaka",
      "All intercity and local sightseeing transfers by private air-conditioned coach",
      "Dedicated Hassle Free Travels local English-speaking tour guide throughout the journey",
      "7-Day Whole Japan JR Pass covering Shinkansen bullet trains and JR lines",
      "Hakone scenic ropeway ticket and Lake Ashi pirate cruise ride",
      "teamLab digital art exhibition admission (Borderless or Planets venue, subject to availability, advance booking required)",
      "Entrance fees to Senso-ji, Fushimi Inari, Kinkaku-ji, Arashiyama Tenryu-ji, Todai-ji Temple, and Osaka Castle",
      "Nara deer crackers (1 complimentary pack per person)",
      "Gotemba Premium Outlets shopping excursion"
    ],
    exclusions: [
      "International airfare from India to Tokyo / from Osaka to India",
      "Travel and medical insurance (mandatory for overseas travel)",
      "Japan tourist visa processing fees (Embassy/Consulate application)",
      "Universal Studios Japan (USJ) park tickets & express passes (available as optional add-on)",
      "Personal expenses, laundry, telephone calls, alcoholic beverages, and discretionary tips",
      "Hindi-speaking tour escort (available upon special advance request with surcharge)",
      "Mt Fuji 5th Station environmental access fee (seasonal, approx. JPY 2,000 when applicable)"
    ],
    visaNote: DEFAULT_JAPAN_VISA_NOTE,
    isGroup: true,
    groupSize: "Min 2 / Max 20 pax (guaranteed departure)",
    departureStyle: "Fixed-date SIC group departures every Friday year-round; extra Tuesday departures during cherry blossom (Mar–Apr) & autumn foliage (Oct–Nov)",
    sampleDates: "Every Friday year-round; Tuesdays in peak season",
    audience: "Young Indian travellers (18–35), first-time visitors, couples, and groups of friends seeking a balanced, hassle-free Golden Route circuit",
    isFeatured: true,
    relatedSlugs: [
      "japan-kansai-tokyo-explorer-10d",
      "japan-tokyo-fuji-kyoto-osaka-classic-private",
      "japan-tokyo-pop-culture-anime-5d"
    ],
    heroImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Japan Classic Highlights Group Tour 8D/7N | Tokyo, Fuji, Kyoto & Osaka | Hassle Free Travels",
    seoDescription: "Book the 8-day Japan Classic Highlights group tour with Hassle Free Travels. Guaranteed Friday departures, Shinkansen bullet trains, teamLab, Mt Fuji, Kyoto temples, and Indian vegetarian meals.",
    mealsSummary: "Daily Breakfast, 1 Welcome Dinner, 1 Ryokan Kaiseki Dinner, 1 Bento Lunch, 1 Farewell Dinner",
    staySummary: "2N Tokyo 3★, 1N Hakone Ryokan with Onsen, 2N Kyoto 3★, 2N Osaka 3★ (or similar)",
    transportSummary: "7-Day JR Pass + Private A/C Coach Transfers + Shinkansen Bullet Train",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Chennai", "Direct flights to NRT / HND / KIX"]
  },

  // ─────────────────────────────────────────────────────────────
  // 2. Group 2 — Japan Kansai & Tokyo Explorer (10D / 9N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "japan-kansai-tokyo-explorer-10d",
    destinationSlug: "japan",
    name: "Japan Kansai & Tokyo Explorer Group Tour",
    tagline: "Osaka → Kyoto → Nara → Hiroshima & Miyajima → Tokyo",
    days: 10,
    nights: 9,
    packageType: "group",
    categoryLabel: "Group",
    route: "Osaka → Kyoto → Nara → Hiroshima → Miyajima → Tokyo",
    startCity: "Osaka",
    endCity: "Tokyo",
    priceFromUSD: 1490,
    priceFromINR: roundToMarketingPrice(1490 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "3★ / 4★ City Hotels (or similar)",
    bestMonths: ["March", "April", "May", "September", "October", "November"],
    highlights: [
      "Extended 10-day comprehensive group departure starting in Kansai and ending in Tokyo",
      "Osaka street food & Kuromon Ichiba market immersion with guided Dotonbori food walk",
      "Two full days exploring ancient Kyoto's UNESCO World Heritage temples and Gion geisha district",
      "Scenic Sagano Romantic Train ride through the picturesque Arashiyama bamboo forest gorge",
      "Poignant day trip to Hiroshima Peace Memorial Park, Museum, and A-Bomb Dome (UNESCO)",
      "High-speed ferry to Miyajima Island to behold the iconic floating vermilion Torii Gate",
      "Dazzling Tokyo finale: Tokyo Skytree, teamLab Planets, Shibuya Sky & Harajuku fashion"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Arrive Osaka (KIX) — Meet & Greet, Dotonbori Canal Walk & Welcome Dinner",
        body: "Touch down at Kansai International Airport (KIX) in Osaka. You will be greeted by your Hassle Free Travels local English-speaking guide and escorted to your private coach for the transfer to your central hotel in the lively Namba district. Following check-in, set out for an evening walk along the illuminated canals of Dotonbori, gazing at the giant mechanical crab and neon signboards. Enjoy a welcome dinner featuring savoury Osaka street cuisine (takoyaki, okonomiyaki, with vegetarian-adapted sets available on advance notice).",
        meals: "Dinner (Welcome dinner; vegetarian set on request)",
        stay: "Hotel Monterey Grasmere Osaka / Cross Hotel Osaka (or similar)"
      },
      {
        dayNumber: 2,
        title: "Osaka City Highlights — Osaka Castle, Kuromon Market & Shinsekai District",
        body: "Spend a full day exploring Japan's liveliest metropolis. Start at historic Osaka Castle, exploring its parklands and ascending to the multi-level observation museum. Next, venture to Kuromon Ichiba Market, nicknamed 'Osaka's Kitchen', sampling fresh seasonal fruits, sweets, and savoury bites. In the afternoon, explore the retro, nostalgic atmosphere of Shinsekai and gaze up at Tsutenkaku Tower. The evening is open for shopping at Namba Parks or visiting the vast Osaka Aquarium Kaiyukan (optional entry).",
        meals: "Breakfast",
        stay: "Hotel Monterey Grasmere Osaka / Cross Hotel Osaka (or similar)"
      },
      {
        dayNumber: 3,
        title: "Kyoto Exploration Part 1 — Fushimi Inari, Golden Pavilion & Gion Geisha Quarter",
        body: "Transfer by private coach to nearby Kyoto. Begin with an early morning visit to Fushimi Inari Taisha, hiking through thousands of bright orange torii gates up the sacred mountain before crowds arrive. Proceed to the Zen Buddhist jewel of Kinkaku-ji (Golden Pavilion), glowing brilliantly over its reflection pond, followed by the contemplative rock garden of Ryoan-ji (UNESCO). After a delicious kaiseki lunch in the Nishiki quarter, stroll the cobblestone lanes of Hanamikoji in Gion, looking out for maiko stepping out for evening tea ceremonies.",
        meals: "Breakfast, Lunch (Kyoto Kaiseki lunch; vegetarian available)",
        stay: "Keihan Kyoto Grande / Kyoto Century Hotel (or similar)"
      },
      {
        dayNumber: 4,
        title: "Kyoto Exploration Part 2 — Arashiyama Bamboo Grove, Sagano Train & Nijo Castle",
        body: "Head to scenic western Kyoto to explore the mesmerizing Arashiyama Bamboo Grove and the UNESCO-listed Tenryu-ji temple garden. Board the vintage Sagano Romantic Train for a panoramic ride along the scenic Hozugawa River ravine (seasonal, subject to availability). In the afternoon, tour historic Nijo Castle, the fortified palace of the Tokugawa shoguns famous for its ingenious 'nightingale floors' that squeak like birds when walked upon. End the day with a gentle walk along the Philosopher's Path and dinner near Pontocho alley.",
        meals: "Breakfast",
        stay: "Keihan Kyoto Grande / Kyoto Century Hotel (or similar)"
      },
      {
        dayNumber: 5,
        title: "Nara Day Trip — Great Bronze Buddha at Todai-ji, Deer Park & Kasuga Taisha",
        body: "Take a scenic express train trip to Nara, Japan's ancient capital. Visit Todai-ji Temple, housing the world's most monumental bronze Buddha statue inside an awe-inspiring wooden sanctuary. Stroll through green Nara Deer Park, feeding friendly deer with shika-senbei crackers. Continue to sacred Kasuga Taisha Shrine, renowned for its 3,000 ancient stone lanterns covered in moss. Return to Kyoto in the afternoon with free time for shopping along the Teramachi covered arcade.",
        meals: "Breakfast",
        stay: "Keihan Kyoto Grande / Kyoto Century Hotel (or similar)"
      },
      {
        dayNumber: 6,
        title: "Kyoto to Hiroshima & Miyajima — Peace Memorial Park & Floating Torii Gate",
        body: "Board the Shinkansen bullet train from Kyoto to Hiroshima (approx. 1 hr 20 min; JR Pass included). Visit the profoundly moving Hiroshima Peace Memorial Museum, the Peace Memorial Park, and the UNESCO-protected A-Bomb Dome, standing as a solemn symbol of resilience and global peace. Afterward, take a scenic ferry across the Seto Inland Sea to sacred Miyajima Island. Behold Itsukushima Shrine with its world-famous floating vermilion torii gate standing gracefully in the tidal waters. Enjoy momiji manju (maple leaf cakes) and observe friendly island deer before returning to Hiroshima for an authentic Hiroshima-style okonomiyaki lunch/dinner.",
        meals: "Breakfast, Lunch (Hiroshima-style okonomiyaki; veg version available)",
        stay: "Sheraton Grand Hiroshima Hotel / Hotel Granvia Hiroshima (or similar)"
      },
      {
        dayNumber: 7,
        title: "Hiroshima to Tokyo — Shukkeien Garden & Shinkansen Bullet Train to the Capital",
        body: "Begin with a morning walk through Shukkeien Garden, an exquisitely miniature Japanese landscape garden built in 1620 featuring bridges, tea huts, and carp ponds. Board the Shinkansen bullet train for a thrilling 4-hour journey straight into Tokyo. Check into your hotel in vibrant Shinjuku. As twilight falls, explore the neon maze of Kabukicho and historic Golden Gai, soaked in atmosphere with non-alcoholic and artisanal tea lounges.",
        meals: "Breakfast",
        stay: "Shinjuku Washington Hotel / Sunshine City Prince Hotel Tokyo (or similar)"
      },
      {
        dayNumber: 8,
        title: "Tokyo Tech & Art — Asakusa Senso-ji, Tokyo Skytree, teamLab Planets & Odaiba",
        body: "Discover the contrast of traditional and futuristic Tokyo. Visit historic Senso-ji Temple in Asakusa, browsing the lively stalls of Nakamise. Head up to the observatory deck of the 634-meter Tokyo Skytree for a jaw-dropping panoramic view over the endless metropolis. In the afternoon, immerse your senses in the sensory digital art labyrinth of teamLab Planets in Toyosu, wading barefoot through shimmering water rooms. Finish the day on futuristic Odaiba island with views of Rainbow Bridge and the giant life-sized Unicorn Gundam.",
        meals: "Breakfast",
        stay: "Shinjuku Washington Hotel / Sunshine City Prince Hotel Tokyo (or similar)"
      },
      {
        dayNumber: 9,
        title: "Tokyo Icons — Meiji Shrine, Harajuku Fashion, Shibuya Crossing & Farewell Dinner",
        body: "Walk beneath towering cedar trees to sacred Meiji Jingu Shrine, Tokyo's premier Shinto shrine dedicated to Emperor Meiji. Transition directly into Harajuku's lively Takeshita Street, the global epicenter of Japanese youth fashion, quirky boutiques, and rainbow cotton candy. Stroll down tree-lined Omotesando boulevard, then conquer the legendary Shibuya Crossing. Ascend to Shibuya Sky's rooftop observatory for dramatic skyline vistas. Tonight, celebrate the journey with a lavish farewell dinner at a top Tokyo restaurant featuring curated vegetarian and international menus.",
        meals: "Breakfast, Dinner (Farewell dinner; Indian veg set available)",
        stay: "Shinjuku Washington Hotel / Sunshine City Prince Hotel Tokyo (or similar)"
      },
      {
        dayNumber: 10,
        title: "Depart Tokyo — Final Moments & Airport Transfer",
        body: "Savor a leisurely breakfast and spend your final morning picking up Japanese matcha, ceramics, and souvenirs in Tokyo's department stores. Transfer via scheduled express airport coach or Narita Express train to Tokyo Narita (NRT) or Haneda (HND) Airport for your scheduled flight back to India, carrying unforgettable memories of Japan's ancient traditions and modern wonders.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "9 nights accommodation in premium 3★/4★ city hotels (2N Osaka, 3N Kyoto, 1N Hiroshima, 3N Tokyo, twin-share, or similar)",
      "Daily breakfast, 1 Welcome Dinner in Osaka, 1 Kyoto Kaiseki Lunch, 1 Hiroshima Okonomiyaki Lunch, 1 Tokyo Farewell Dinner",
      "All intercity and local sightseeing transfers by private A/C coach",
      "Dedicated Hassle Free Travels local English-speaking tour escort throughout the trip",
      "10-Day Whole Japan JR Pass covering Shinkansen bullet trains and JR network",
      "Sagano Romantic Scenic Train tickets (seasonal, subject to availability)",
      "teamLab Planets digital art admission ticket (pre-reserved time slot)",
      "Tokyo Skytree observation deck admission ticket",
      "Shibuya Sky open-air rooftop observation deck admission ticket",
      "Miyajima Island return ferry ticket and all temple, shrine, and castle admission fees listed"
    ],
    exclusions: [
      "International flights (India–Osaka / Tokyo–India)",
      "Travel insurance and personal medical cover",
      "Japan tourist visa processing and consulate fees",
      "Optional activities and theme park entries (USJ, Aquarium)",
      "Personal telephone calls, laundry, snacks, and tips for tour staff",
      "Hindi-speaking guide supplement (available upon advance request)"
    ],
    visaNote: DEFAULT_JAPAN_VISA_NOTE,
    isGroup: true,
    groupSize: "Min 2 / Max 18 pax (guaranteed departure)",
    departureStyle: "Guaranteed SIC departures every Friday year-round from Osaka; peak-season Wednesday departures in Mar–Apr & Oct–Nov",
    sampleDates: "Every Friday year-round; Wednesdays in peak season",
    audience: "Young Indian travellers (18–35), culture enthusiasts, and repeat visitors seeking a deep, comprehensive overland journey across Japan",
    isFeatured: true,
    relatedSlugs: [
      "japan-classic-highlights-8d",
      "japan-tokyo-nikko-hakone-kyoto-hiroshima-11d",
      "japan-rail-pass-grand-tour-13d"
    ],
    heroImage: "https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Japan Kansai & Tokyo Explorer 10D/9N Group Tour | Osaka to Tokyo | Hassle Free Travels",
    seoDescription: "Join the 10-day Japan Kansai & Tokyo Explorer group tour with Hassle Free Travels. Guaranteed Friday departures covering Osaka, Kyoto, Nara, Hiroshima, Miyajima, and Tokyo with Shinkansen and Indian vegetarian meals.",
    mealsSummary: "Daily Breakfast, 1 Welcome Dinner, 1 Kaiseki Lunch, 1 Okonomiyaki Lunch, 1 Farewell Dinner",
    staySummary: "2N Osaka 3★, 3N Kyoto 3★, 1N Hiroshima 3★, 3N Tokyo 3★ (or similar)",
    transportSummary: "10-Day JR Pass + Private A/C Coach Transfers + Shinkansen Bullet Train + Miyajima Ferry",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Direct flights to KIX / NRT / HND"]
  },

  // ─────────────────────────────────────────────────────────────
  // 3. FIT 1 — Tokyo–Fuji–Kyoto–Osaka Classic Private (8D / 7N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "japan-tokyo-fuji-kyoto-osaka-classic-private",
    destinationSlug: "japan",
    name: "Tokyo, Mt Fuji, Kyoto & Osaka Classic Private Tour",
    tagline: "Tokyo → Mt Fuji & Hakone → Kyoto → Nara → Osaka",
    days: 8,
    nights: 7,
    packageType: "custom",
    categoryLabel: "Private",
    route: "Tokyo → Hakone → Kyoto → Nara → Osaka",
    startCity: "Tokyo",
    endCity: "Osaka",
    priceFromUSD: 1050,
    priceFromINR: roundToMarketingPrice(1050 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "3★ City Hotels & Onsen Ryokan (or similar)",
    bestMonths: ["March", "April", "May", "October", "November", "December", "January", "February"],
    highlights: [
      "Tailor-made private journey with dedicated car and English-speaking local guide throughout",
      "Private early-morning crowd-free exploration of Fushimi Inari Taisha and Arashiyama bamboo grove",
      "teamLab digital art exhibition (Borderless or Planets, subject to availability, advance booking required)",
      "Mount Fuji 5th Station (weather permitting) + Lake Ashi cruise + Hakone volcanic ropeway",
      "Overnight stay at an authentic Japanese Onsen Ryokan with soothing mineral hot spring baths",
      "Private street food tour through Osaka's neon Dotonbori district with tailored vegetarian stalls"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Arrive Tokyo — Private Airport Transfer & Shinjuku Night Walk",
        body: "Arrive at Tokyo Narita or Haneda Airport. Your private chauffeur and Hassle Free Travels English-speaking guide welcome you at arrival and escort you via private vehicle directly to your hotel in central Shinjuku. In the evening, step out with your private guide for a relaxed walking orientation through Shinjuku's glittering entertainment district and the nostalgic red lanterns of Omoide Yokocho. Conclude with a delicious welcome dinner featuring Japanese specialties with customized vegetarian options.",
        meals: "Dinner (Welcome dinner; veg set on request)",
        stay: "Hotel Gracery Shinjuku / Century Southern Tower Tokyo (or similar)"
      },
      {
        dayNumber: 2,
        title: "Tokyo Highlights — Asakusa Senso-ji, Skytree, teamLab & Shibuya Crossing",
        body: "Begin your private sightseeing tour at historic Senso-ji Temple in Asakusa, browsing traditional crafts on Nakamise Street. Catch panoramic perspectives from Tokyo Skytree observatory. In the afternoon, enter teamLab Planets in Toyosu (advance booking arranged by Hassle Free Travels), stepping through immersive infinity light rooms. In the evening, experience the world-famous Shibuya Scramble Crossing and take in the panoramic skyline from Shibuya Sky's open-air rooftop deck.",
        meals: "Breakfast",
        stay: "Hotel Gracery Shinjuku / Century Southern Tower Tokyo (or similar)"
      },
      {
        dayNumber: 3,
        title: "Tokyo to Hakone & Mt Fuji — Private Scenic Drive, 5th Station & Onsen Ryokan",
        body: "Board your private car for a scenic drive toward Mount Fuji. Stop at Gotemba Premium Outlets for premier tax-free shopping against Fuji views. Continue up to Mt Fuji 5th Station at 2,305 meters elevation (weather permitting; panoramic views of the crater and surrounding lakes, crater views weather permitting). Later, glide across the Owakudani volcanic crater on the Hakone Ropeway and sail on a Lake Ashi cruise. Check in to your Hakone onsen ryokan and soak in the soothing hot spring waters before enjoying an exquisite multi-course Kaiseki dinner.",
        meals: "Breakfast, Dinner (Ryokan Kaiseki dinner; veg kaiseki available)",
        stay: "Hakone Yumoto Onsen Ryokan / Yoshiike Ryokan (or similar)"
      },
      {
        dayNumber: 4,
        title: "Hakone to Kyoto — Open-Air Sculpture Museum, Shinkansen & Gion Evening",
        body: "Visit the world-renowned Hakone Open-Air Museum, appreciating outdoor masterworks by Henry Moore and Rodin alongside a dedicated Picasso pavilion. Transfer by private car to Odawara Station to catch the high-speed Shinkansen bullet train to Kyoto (approx. 2 hours; 7-Day JR Pass included). Arrive in Kyoto, transfer to your hotel, and spend a peaceful evening strolling through the historic preservation district of Gion with your private guide.",
        meals: "Breakfast",
        stay: "Kyoto Tokyu Hotel / The Thousand Kyoto (or similar)"
      },
      {
        dayNumber: 5,
        title: "Kyoto Heritage — Sunrise Fushimi Inari, Golden Pavilion & Nishiki Market",
        body: "Beat the tourist rush with an early morning private visit to Fushimi Inari Taisha, trekking under endless bright vermilion torii tunnels. Proceed to Kinkaku-ji (Golden Pavilion), glowing above its reflective pond, followed by the contemplative rock garden of Ryoan-ji. Spend the afternoon exploring the vibrant culinary stalls of Nishiki Market with your guide, savoring tofu skewers, matcha delicacies, and local vegetarian specialties.",
        meals: "Breakfast, Lunch (Nishiki market food tasting lunch)",
        stay: "Kyoto Tokyu Hotel / The Thousand Kyoto (or similar)"
      },
      {
        dayNumber: 6,
        title: "Kyoto Bamboo & Shogun History — Arashiyama, Tenryu-ji & Nijo Castle",
        body: "Head westward to peaceful Arashiyama to walk beneath towering bamboo groves and admire the serene Zen pond garden at Tenryu-ji. Take an optional ride on the historic Sagano Romantic Train (seasonal). In the afternoon, visit Nijo Castle to marvel at its opulent painted screen doors and historic 'nightingale floors'. Finish your day with a serene walk along the Philosopher's Path and dinner near Pontocho canal.",
        meals: "Breakfast",
        stay: "Kyoto Tokyu Hotel / The Thousand Kyoto (or similar)"
      },
      {
        dayNumber: 7,
        title: "Kyoto to Nara & Osaka — Sacred Deer Park, Todai-ji & Dotonbori Evening",
        body: "Travel south in your private vehicle to Nara. Visit the magnificent Todai-ji Temple, gazing up at the 15-meter bronze Buddha, and interact with the famous bowing sika deer in Nara Deer Park. Afterward, drive to dynamic Osaka. Check in to your hotel and head straight to Dotonbori with your private guide to photograph the Glico Man and taste Osaka's celebrated street delicacies.",
        meals: "Breakfast",
        stay: "Swissotel Nankai Osaka / Cross Hotel Osaka (or similar)"
      },
      {
        dayNumber: 8,
        title: "Depart Osaka — Private Airport Transfer",
        body: "Enjoy a relaxed breakfast at your hotel. At the appointed time, meet your private chauffeur for a seamless transfer to Kansai International Airport (KIX) or Osaka Itami (ITM) for your return flight home, concluding your classic private Japan journey.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "7 nights accommodation in handpicked 3★/4★ city hotels & 1 night authentic Onsen Ryokan (twin-share, or similar)",
      "Daily breakfast, 1 Welcome Dinner in Tokyo, 1 Ryokan Kaiseki Dinner in Hakone, 1 Nishiki Market Lunch in Kyoto",
      "Private air-conditioned vehicle with dedicated driver for all airport, intercity, and sightseeing transfers",
      "Dedicated Hassle Free Travels English-speaking private guide throughout the trip",
      "7-Day Whole Japan JR Pass covering Shinkansen bullet train from Hakone to Kyoto",
      "teamLab Planets digital art admission ticket (advance pre-booked)",
      "All admission fees for Senso-ji, Tokyo Skytree, Hakone Ropeway, Lake Ashi cruise, Fushimi Inari, Kinkaku-ji, Tenryu-ji, Nijo Castle, and Todai-ji"
    ],
    exclusions: [
      "International air tickets",
      "Japan tourist visa processing and consulate fees",
      "Comprehensive travel insurance",
      "Personal expenses, room service, alcoholic beverages, and discretionary tips"
    ],
    visaNote: DEFAULT_JAPAN_VISA_NOTE,
    isGroup: false,
    groupSize: "Min 2 pax (private car + guide)",
    departureStyle: "Private FIT departure — Daily departures (min 2 pax)",
    sampleDates: "Daily departures on request",
    audience: "Millennial couples, young families, and friends seeking a private, flexible classic journey with customized vegetarian meal planning",
    isFeatured: true,
    relatedSlugs: [
      "japan-classic-highlights-8d",
      "japan-tokyo-nikko-hakone-kyoto-hiroshima-11d",
      "japan-tokyo-fuji-short-break-4d"
    ],
    heroImage: "https://images.unsplash.com/photo-1478436127897-769e00d2c715?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Tokyo, Mt Fuji, Kyoto & Osaka Classic Private Tour 8D/7N | Hassle Free Travels",
    seoDescription: "Experience Japan in comfort with Hassle Free Travels' 8-day private tour. Dedicated vehicle, English guide, teamLab, Mt Fuji, Onsen Ryokan, Kyoto temples & Shinkansen.",
    mealsSummary: "Daily Breakfast, 1 Welcome Dinner, 1 Ryokan Kaiseki Dinner, 1 Nishiki Market Lunch",
    staySummary: "2N Tokyo 3★, 1N Hakone Ryokan with Onsen, 3N Kyoto 3★, 1N Osaka 3★ (or similar)",
    transportSummary: "7-Day JR Pass + Private Car with English-speaking Guide + Shinkansen",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Hyderabad", "Direct flights to Tokyo & Osaka"]
  },

  // ─────────────────────────────────────────────────────────────
  // 4. FIT 2 — Grand Japan Heritage: Tokyo–Nikko–Hakone–Kyoto–Hiroshima–Osaka (11D / 10N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "japan-tokyo-nikko-hakone-kyoto-hiroshima-11d",
    destinationSlug: "japan",
    name: "Grand Japan Heritage: Tokyo, Nikko, Hakone, Kyoto, Hiroshima & Osaka",
    tagline: "Tokyo → Nikko → Hakone → Kyoto → Nara → Hiroshima → Osaka",
    days: 11,
    nights: 10,
    packageType: "custom",
    categoryLabel: "Heritage",
    route: "Tokyo → Nikko → Hakone → Kyoto → Hiroshima → Osaka",
    startCity: "Tokyo",
    endCity: "Osaka",
    priceFromUSD: 1680,
    priceFromINR: roundToMarketingPrice(1680 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "3★ / 4★ City Hotels & Onsen Ryokan (or similar)",
    bestMonths: ["April", "May", "September", "October", "November"],
    highlights: [
      "Comprehensive 11-day private overland journey encompassing 6 distinct regions of Japan",
      "UNESCO World Heritage Tosho-gu Shrine in Nikko with the legendary Three Wise Monkeys carving",
      "Thunderous Kegon Falls, plunging 97 meters from Lake Chuzenji in Nikko National Park",
      "Full-day Hakone excursion: Mt Fuji 5th Station, volcanic Owakudani, and onsen ryokan stay",
      "Hiroshima Peace Memorial Park & ferry to Miyajima Island's floating Itsukushima Torii",
      "Three full days immersed in Kyoto's imperial villas, Zen rock gardens, and bamboo groves"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Arrive Tokyo — Private Transfer & Evening Shinjuku Walk",
        body: "Arrive in Tokyo. Meet your Hassle Free Travels representative and transfer by private car to your central hotel. In the evening, enjoy a guided orientation walk through the illuminated streets of Shinjuku, followed by a welcome dinner featuring traditional Japanese cuisine with vegetarian options.",
        meals: "Dinner",
        stay: "Hotel Gracery Shinjuku (or similar)"
      },
      {
        dayNumber: 2,
        title: "Tokyo Highlights — Asakusa Senso-ji, Akihabara & teamLab",
        body: "Explore Tokyo's timeless and modern landmarks. Visit ancient Senso-ji Temple in Asakusa, experience Akihabara's electronic and anime district, dive into sensory light exhibits at teamLab Planets, and watch the sunset from Shibuya Crossing and Shibuya Sky.",
        meals: "Breakfast",
        stay: "Hotel Gracery Shinjuku (or similar)"
      },
      {
        dayNumber: 3,
        title: "Nikko UNESCO Day Trip — Tosho-gu Shrine, Rinno-ji & Kegon Falls",
        body: "Drive north by private car (approx. 2.5 hours) to Nikko National Park. Marvel at Tosho-gu Shrine (UNESCO), an opulent masterpiece of woodcarving housing the tomb of Shogun Tokugawa Ieyasu. See the famous carvings of the 'Three Wise Monkeys' and 'Sleeping Cat'. Continue past Lake Chuzenji to Kegon Falls, plunging 97 meters down a sheer volcanic cliff. Return to Tokyo in the late afternoon.",
        meals: "Breakfast, Lunch",
        stay: "Hotel Gracery Shinjuku (or similar)"
      },
      {
        dayNumber: 4,
        title: "Tokyo to Hakone — Mt Fuji 5th Station, Ropeway & Onsen Ryokan",
        body: "Journey to Hakone in your private car. Ascend to Mt Fuji 5th Station (weather permitting; panoramic views of the crater and surrounding lakes, crater views weather permitting). Ride the Hakone Ropeway above sulphur vents at Owakudani and cruise picturesque Lake Ashi. Check into a traditional onsen ryokan and soak in mineral hot springs before savoring a multi-course Kaiseki dinner.",
        meals: "Breakfast, Dinner (Ryokan Kaiseki dinner)",
        stay: "Hakone Yumoto Onsen Ryokan (or similar)"
      },
      {
        dayNumber: 5,
        title: "Hakone to Kyoto — Open-Air Sculpture Park & Shinkansen to the Ancient Capital",
        body: "Visit the acclaimed Hakone Open-Air Museum, enjoying monumental sculptures against forested mountain slopes. Board the Shinkansen bullet train from Odawara to Kyoto (approx. 2 hours; JR Pass included). Arrive in Kyoto and take an evening stroll through the atmospheric Gion geisha quarter.",
        meals: "Breakfast",
        stay: "Keihan Kyoto Grande (or similar)"
      },
      {
        dayNumber: 6,
        title: "Kyoto Icons — Fushimi Inari, Golden Pavilion & Nishiki Market",
        body: "Rise early to explore Fushimi Inari Taisha's vibrant torii corridors in tranquil morning light. Tour the glistening Golden Pavilion (Kinkaku-ji), then dive into Nishiki Market with your private guide for a rich food tour featuring local delicacies and vegetarian tastings.",
        meals: "Breakfast, Lunch",
        stay: "Keihan Kyoto Grande (or similar)"
      },
      {
        dayNumber: 7,
        title: "Kyoto Bamboo & Shogun History — Arashiyama, Tenryu-ji & Nijo Castle",
        body: "Explore scenic Arashiyama Bamboo Grove and the UNESCO-listed Zen garden of Tenryu-ji. Tour historic Nijo Castle, admiring its defensive moat and squeaking nightingale floors. Walk the Philosopher's Path in the afternoon.",
        meals: "Breakfast",
        stay: "Keihan Kyoto Grande (or similar)"
      },
      {
        dayNumber: 8,
        title: "Nara Heritage Excursion — Todai-ji Great Buddha & Sika Deer Park",
        body: "Take a half-day private excursion to ancient Nara. Marvel at the colossal bronze Buddha at Todai-ji Temple and greet the friendly bowing sika deer in Nara Park. Return to Kyoto for an afternoon at leisure.",
        meals: "Breakfast",
        stay: "Keihan Kyoto Grande (or similar)"
      },
      {
        dayNumber: 9,
        title: "Kyoto to Hiroshima & Miyajima Island — Peace Memorial & Floating Torii",
        body: "Ride the Shinkansen to Hiroshima. Visit the Hiroshima Peace Memorial Park, Museum, and the A-Bomb Dome (UNESCO). In the afternoon, board the scenic ferry to Miyajima Island to behold the iconic floating vermilion Torii Gate of Itsukushima Shrine. Savor a Hiroshima-style okonomiyaki lunch.",
        meals: "Breakfast, Lunch",
        stay: "Hotel Granvia Hiroshima (or similar)"
      },
      {
        dayNumber: 10,
        title: "Hiroshima to Osaka — Shukkeien Garden, Osaka Castle & Dotonbori",
        body: "Visit Shukkeien miniature landscape garden in Hiroshima, then board the Shinkansen to Osaka. Tour historic Osaka Castle and lively Kuromon Market before exploring the illuminated Dotonbori canal in the evening.",
        meals: "Breakfast",
        stay: "Hotel Monterey Grasmere Osaka (or similar)"
      },
      {
        dayNumber: 11,
        title: "Depart Osaka — Private Airport Transfer",
        body: "Enjoy breakfast at your hotel before meeting your private chauffeur for your transfer to Kansai International Airport (KIX) or Osaka Itami (ITM) for your return flight home.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "10 nights accommodation in 3★/4★ city hotels & 1 night Hakone Onsen Ryokan (twin-share, or similar)",
      "Daily breakfast, 1 Welcome Dinner, 3 Lunches (Nikko, Nishiki Market, Hiroshima), 1 Ryokan Kaiseki Dinner",
      "Private vehicle with dedicated driver and English-speaking private guide throughout",
      "10-Day Whole Japan JR Pass covering all Shinkansen bullet train sectors",
      "All entrance fees for Tosho-gu Shrine, Kegon Falls, Hakone Ropeway, Lake Ashi cruise, teamLab Planets, Kyoto temples, Todai-ji, Hiroshima museum, and Miyajima ferry"
    ],
    exclusions: [
      "International flights",
      "Japan visa fees",
      "Travel insurance",
      "Personal expenses and tips"
    ],
    visaNote: DEFAULT_JAPAN_VISA_NOTE,
    isGroup: false,
    groupSize: "Min 2 pax (private car + guide)",
    departureStyle: "Private FIT departure — Daily departures (min 2 pax)",
    sampleDates: "Daily departures on request",
    audience: "Heritage seekers, repeat Japan travellers, and UNESCO World Heritage enthusiasts looking for an all-encompassing private circuit",
    isFeatured: false,
    relatedSlugs: [
      "japan-kansai-tokyo-explorer-10d",
      "japan-rail-pass-grand-tour-13d",
      "japan-tokyo-fuji-kyoto-osaka-classic-private"
    ],
    heroImage: "https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Grand Japan Heritage 11D/10N Tour | Tokyo, Nikko, Hakone, Kyoto & Hiroshima | Hassle Free Travels",
    seoDescription: "Book an 11-day grand private Japan heritage tour with Hassle Free Travels. Nikko UNESCO shrines, Mt Fuji, Hakone onsen ryokan, Kyoto temples, Hiroshima, Miyajima & Osaka.",
    mealsSummary: "Daily Breakfast, 1 Welcome Dinner, 3 Lunches (Nikko, Nishiki, Hiroshima), 1 Ryokan Kaiseki Dinner",
    staySummary: "3N Tokyo 3★, 1N Hakone Ryokan with Onsen, 3N Kyoto 3★, 1N Hiroshima 3★, 2N Osaka 3★ (or similar)",
    transportSummary: "10-Day JR Pass + Private Car with Dedicated Guide + Shinkansen Bullet Trains",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Direct flights to Tokyo & Osaka"]
  },

  // ─────────────────────────────────────────────────────────────
  // 5. FIT 3 — Hokkaido Snow, Onsen & Nature Winter Adventure (7D / 6N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "japan-hokkaido-snow-nature-7d",
    destinationSlug: "japan",
    name: "Hokkaido Snow, Onsen & Nature Winter Adventure",
    tagline: "Sapporo → Otaru → Noboribetsu Onsen → Niseko → Biei",
    days: 7,
    nights: 6,
    packageType: "adventure",
    categoryLabel: "Adventure",
    route: "Sapporo → Otaru → Noboribetsu → Niseko → Biei → Sapporo",
    startCity: "Sapporo",
    endCity: "Sapporo",
    priceFromUSD: 1320,
    priceFromINR: roundToMarketingPrice(1320 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "3★ City Hotels, Ski Lodge & Onsen Ryokan (or similar)",
    bestMonths: ["December", "January", "February", "March"],
    highlights: [
      "Hokkaido's world-class powder snow experience with private 4WD vehicle and English-speaking guide",
      "Sapporo Snow Festival in Odori Park (February) with massive illuminated ice sculptures",
      "Romantic Otaru Canal lined with vintage Victorian gas lamps and snow-draped warehouses",
      "Thermal wonderland of Noboribetsu Jigokudani (Hell Valley) with volcanic steam vents and onsen soak",
      "World-famous powder snow paradise of Niseko (skiing, snowboarding, or scenic snowshoeing)",
      "Surreal frozen Biei Blue Pond and snow-blanketed rolling patchwork hills"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Arrive Sapporo (CTS) — Susukino Night & Ramen Alley Dinner",
        body: "Land at New Chitose Airport (CTS) in Sapporo. Meet your private Hassle Free Travels driver-guide and transfer by private 4WD winter vehicle to your hotel in central Sapporo. In the evening, explore the bustling Susukino entertainment district and visit legendary Ramen Alley (Ganso Ramen Yokocho) for piping hot Hokkaido miso ramen with vegetarian-friendly broth options available.",
        meals: "Dinner",
        stay: "Sapporo Grand Hotel / Keio Plaza Hotel Sapporo (or similar)"
      },
      {
        dayNumber: 2,
        title: "Sapporo City — Snow Festival / Odori Park & Sapporo Beer Museum",
        body: "Spend the day experiencing Sapporo's winter charm. If visiting in February, marvel at the monumental snow and ice sculptures of the world-famous Sapporo Snow Festival in Odori Park. In other winter months, explore Odori Park, the Sapporo TV Tower, and the historic red-brick Sapporo Beer Museum (non-alcoholic tastings available). Explore the covered Tanukikoji shopping arcade in the afternoon.",
        meals: "Breakfast",
        stay: "Sapporo Grand Hotel / Keio Plaza Hotel Sapporo (or similar)"
      },
      {
        dayNumber: 3,
        title: "Sapporo to Romantic Otaru — Canals, Music Box Museum & Glass Crafts",
        body: "Take a scenic 40-minute coastal drive to picturesque Otaru. Stroll along the snow-covered Otaru Canal, lined with preserved historic brick warehouses and illuminated by gas lamps. Visit the enchanting Otaru Music Box Museum and Sakaimachi handicraft street, sampling local sweets. Enjoy lunch in Otaru before returning to Sapporo. Optional evening ascent on the Mt Moiwa Ropeway for a breathtaking night vista.",
        meals: "Breakfast, Lunch",
        stay: "Sapporo Grand Hotel / Keio Plaza Hotel Sapporo (or similar)"
      },
      {
        dayNumber: 4,
        title: "Sapporo to Noboribetsu Onsen — Jigokudani Hell Valley & Natural Geothermal Soak",
        body: "Drive south to Noboribetsu, Hokkaido's most celebrated hot spring town. Walk the wooden boardwalks through Jigokudani ('Hell Valley'), marveling at steaming volcanic fumaroles and boiling sulfurous lakes. Check into a traditional onsen ryokan and surrender to the healing warmth of multiple mineral baths. Savor a multi-course Hokkaido winter kaiseki dinner.",
        meals: "Breakfast, Dinner (Ryokan Kaiseki dinner)",
        stay: "Noboribetsu Grand Hotel / Dai-ichi Takimotokan (or similar)"
      },
      {
        dayNumber: 5,
        title: "Noboribetsu to Niseko — Japan's Powder Snow Capital",
        body: "Drive through majestic snowy landscapes toward Niseko, globally renowned for the finest champagne powder snow on earth. Spend the afternoon hitting the slopes (ski/snowboard equipment rental not included; optional activity) or embark on a guided snowshoeing walk through birch forests. Relax in an open-air onsen with views of Mt Yotei (Hokkaido's Mt Fuji).",
        meals: "Breakfast",
        stay: "Hilton Niseko Village / Niseko Northern Resort An'nupuri (or similar)"
      },
      {
        dayNumber: 6,
        title: "Niseko to Biei & Furano — Frozen Blue Pond & Patchwork Snow Hills",
        body: "Drive across central Hokkaido to the magical winter landscapes of Biei. Behold the ethereal Blue Pond (Aoiike), illuminated by evening lights as snow blankets its dead larch trees. Drive across the pristine white patchwork hills of Biei and stop by Shirogane Onsen's Shirahige Waterfall.",
        meals: "Breakfast, Lunch",
        stay: "Hotel Wing International Asahikawa / Furano Prince Hotel (or similar)"
      },
      {
        dayNumber: 7,
        title: "Biei to Sapporo New Chitose — Hokkaido Dairy Experience & Departure",
        body: "Visit a local Hokkaido dairy farm workshop in Furano, sampling fresh milk treats and soft-serve ice cream. Transfer by private vehicle to Sapporo New Chitose Airport (CTS) for your domestic connection or international flight back home.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "6 nights accommodation (3N Sapporo 3★/4★, 1N Noboribetsu Onsen Ryokan, 1N Niseko Alpine Resort, 1N Biei/Asahikawa, twin-share, or similar)",
      "Daily breakfast, 1 Susukino Welcome Dinner, 2 Lunches (Otaru, Biei), 1 Noboribetsu Ryokan Kaiseki Dinner",
      "Private 4WD winter-equipped vehicle with dedicated driver and English-speaking guide throughout",
      "All park fees, toll fees, and scheduled sightseeing admissions as per itinerary"
    ],
    exclusions: [
      "International and domestic flights to/from Sapporo New Chitose",
      "Ski/snowboard equipment rental, lift tickets, and ski school lessons (optional add-on)",
      "Travel insurance with winter sports coverage",
      "Japan visa fees and personal expenses"
    ],
    visaNote: DEFAULT_JAPAN_VISA_NOTE,
    isGroup: false,
    groupSize: "Min 2 pax (private car + guide)",
    departureStyle: "Private FIT departure — Daily winter departures (min 2 pax)",
    sampleDates: "Daily departures Dec–Mar (Feb for Sapporo Snow Festival)",
    audience: "Snow lovers, winter sports enthusiasts, photography enthusiasts, and adventurous couples looking for deep powder snow and hot springs",
    isFeatured: false,
    relatedSlugs: [
      "japan-tohoku-autumn-foliage-onsen-6d",
      "japan-adventure-hiking-rafting-cycling-8d",
      "japan-winter-illuminations-tokyo-osaka-6d"
    ],
    heroImage: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Hokkaido Snow, Onsen & Nature Winter Tour 7D/6N | Hassle Free Travels",
    seoDescription: "Experience the magic of winter in Hokkaido with Hassle Free Travels. Sapporo Snow Festival, romantic Otaru, Noboribetsu onsen ryokan, Niseko powder snow & Biei Blue Pond.",
    mealsSummary: "Daily Breakfast, 1 Welcome Dinner in Susukino, 2 Lunches (Otaru, Biei), 1 Ryokan Dinner",
    staySummary: "3N Sapporo 3★, 1N Noboribetsu Onsen Ryokan, 1N Niseko Resort, 1N Biei/Asahikawa (or similar)",
    transportSummary: "Private 4WD A/C Vehicle with English-speaking Guide throughout",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Connections via Tokyo HND / NRT to Sapporo CTS"]
  },

  // ─────────────────────────────────────────────────────────────
  // 6. FIT 4 — Kyoto, Nara & Osaka Kansai Deep Dive (5D / 4N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "japan-kansai-deep-dive-5d",
    destinationSlug: "japan",
    name: "Kyoto, Nara & Osaka Kansai Deep Dive",
    tagline: "Osaka → Kyoto → Nara → Osaka",
    days: 5,
    nights: 4,
    packageType: "custom",
    categoryLabel: "Private",
    route: "Osaka → Kyoto → Nara → Osaka",
    startCity: "Osaka",
    endCity: "Osaka",
    priceFromUSD: 680,
    priceFromINR: roundToMarketingPrice(680 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "3★ / 4★ City Hotels (or similar)",
    bestMonths: ["March", "April", "May", "October", "November", "December"],
    highlights: [
      "Focused 5-day cultural deep-dive in Japan's historic heartland of Kansai",
      "Dawn visit to Fushimi Inari Taisha with private guide for serene, uncrowded photos",
      "Nara Deer Park and the colossal Great Buddha inside Todai-ji Temple",
      "Sagano Romantic Scenic Train through Arashiyama bamboo forest and river ravine",
      "Guided Dotonbori street food safari in Osaka with dedicated vegetarian recommendations"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Arrive Osaka (KIX) — Private Transfer & Dotonbori Food Walk",
        body: "Arrive at Kansai International Airport (KIX). Meet your Hassle Free Travels driver and guide for a private transfer to your hotel in Namba. In the evening, set off for an exciting walking tour of neon-drenched Dotonbori, tasting local street food with vegetarian options highlighted.",
        meals: "Dinner",
        stay: "Hotel Monterey Grasmere Osaka (or similar)"
      },
      {
        dayNumber: 2,
        title: "Osaka Highlights — Osaka Castle, Kuromon Market & Shinsekai",
        body: "Tour magnificent Osaka Castle and its panoramic observation deck. Walk through the bustling alleys of Kuromon Ichiba Market for a market lunch. In the afternoon, visit the quirky retro quarter of Shinsekai and Tsutenkaku Tower.",
        meals: "Breakfast, Lunch",
        stay: "Hotel Monterey Grasmere Osaka (or similar)"
      },
      {
        dayNumber: 3,
        title: "Kyoto Highlights — Dawn Fushimi Inari, Golden Pavilion & Gion",
        body: "Drive to Kyoto in your private car. Arrive early at Fushimi Inari Taisha to walk the vermilion torii paths without the crowds. Visit Kinkaku-ji (Golden Pavilion) and contemplative Ryoan-ji rock garden. Explore Nishiki Market in the afternoon and walk the historic lanes of Gion at twilight.",
        meals: "Breakfast",
        stay: "Keihan Kyoto Grande (or similar)"
      },
      {
        dayNumber: 4,
        title: "Arashiyama Bamboo Grove, Sagano Train & Nara Deer Park",
        body: "Wander through Arashiyama Bamboo Grove and visit Tenryu-ji Zen garden. Ride the scenic Sagano Romantic Train (seasonal). In the afternoon, drive to ancient Nara to see the Great Bronze Buddha at Todai-ji and feed the bowing deer in Nara Park.",
        meals: "Breakfast, Lunch",
        stay: "Keihan Kyoto Grande (or similar)"
      },
      {
        dayNumber: 5,
        title: "Depart Osaka — Private Transfer to Kansai Airport",
        body: "Enjoy breakfast before your private transfer from Kyoto to Kansai International Airport (KIX) for your scheduled flight home.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "4 nights accommodation in 3★/4★ city hotels (2N Osaka, 2N Kyoto, twin-share, or similar)",
      "Daily breakfast, 1 Welcome Dinner in Dotonbori, 2 Lunches (Kuromon Market, Nara)",
      "Private car with dedicated driver and English-speaking guide throughout",
      "Sagano Romantic Train tickets (seasonal, subject to availability)",
      "All entrance fees for Osaka Castle, Fushimi Inari, Kinkaku-ji, Tenryu-ji, and Todai-ji"
    ],
    exclusions: [
      "International flights",
      "Japan visa fees",
      "Travel insurance and personal expenses"
    ],
    visaNote: DEFAULT_JAPAN_VISA_NOTE,
    isGroup: false,
    groupSize: "Min 2 pax (private car + guide)",
    departureStyle: "Private FIT departure — Daily departures (min 2 pax)",
    sampleDates: "Daily departures on request",
    audience: "Time-pressed travellers, couples, or city break visitors looking for the ultimate Kansai heritage and culinary immersion",
    isFeatured: false,
    relatedSlugs: [
      "japan-food-trail-tokyo-osaka-kyoto-7d",
      "japan-kyoto-spiritual-temple-immersion-6d",
      "japan-tokyo-fuji-short-break-4d"
    ],
    heroImage: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Kyoto, Nara & Osaka Kansai Deep Dive 5D/4N Tour | Hassle Free Travels",
    seoDescription: "Discover Kansai with Hassle Free Travels' 5-day private tour. Fushimi Inari, Golden Pavilion, Arashiyama bamboo, Nara deer park, Osaka Castle & Dotonbori street food.",
    mealsSummary: "Daily Breakfast, 1 Dotonbori Welcome Dinner, 2 Lunches (Kuromon, Nara)",
    staySummary: "2N Osaka 3★, 2N Kyoto 3★ (or similar)",
    transportSummary: "Private Car with English-speaking Guide + Sagano Romantic Train",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Direct flights to Osaka KIX"]
  },

  // ─────────────────────────────────────────────────────────────
  // 7. FIT 5 — Tokyo Pop Culture, Anime & Digital Art Experience (5D / 4N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "japan-tokyo-pop-culture-anime-5d",
    destinationSlug: "japan",
    name: "Tokyo Pop Culture, Anime & Digital Art Experience",
    tagline: "Shinjuku → Akihabara → Harajuku → Shibuya → Odaiba",
    days: 5,
    nights: 4,
    packageType: "custom",
    categoryLabel: "Pop Culture",
    route: "Tokyo (Shinjuku, Akihabara, Harajuku, Shibuya, Odaiba, Asakusa)",
    startCity: "Tokyo",
    endCity: "Tokyo",
    priceFromUSD: 590,
    priceFromINR: roundToMarketingPrice(590 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "3★ Central Tokyo Hotel (or similar)",
    bestMonths: ["January", "February", "March", "April", "May", "June", "September", "October", "November", "December"],
    highlights: [
      "Custom youth-focused pop-culture itinerary tailored for Gen Z and millennial travellers",
      "Akihabara Electric Town half-day guided tour: retro gaming arcades, anime figurines, and multi-story manga shops",
      "teamLab Planets in Toyosu (advance booking arranged by Hassle Free Travels) with immersive digital crystal worlds",
      "Harajuku Takeshita Street youth fashion, vintage thrift shopping in Shimokitazawa, and Japanese street crepes",
      "Giant 1:1 scale Unicorn Gundam transformation show and futuristic waterfront skyline on Odaiba Island",
      "Shibuya Scramble Crossing and 360-degree panoramic skyline views from the open-air Shibuya Sky observatory"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Arrive Tokyo — Private Transfer & Shinjuku Neon Walk",
        body: "Touch down at Tokyo Narita or Haneda Airport. Your private chauffeur transfers you to your hotel in central Shinjuku. In the evening, explore Shinjuku's neon-lit Kabukicho, the giant Godzilla head above Shinjuku Toho Building, and the atmospheric food alleys of Omoide Yokocho with vegetarian yakitori skewers available.",
        meals: "Dinner",
        stay: "Hotel Gracery Shinjuku / Shinjuku Washington Hotel (or similar)"
      },
      {
        dayNumber: 2,
        title: "Akihabara Otaku District, teamLab Planets & Odaiba Gundam",
        body: "Spend the morning immersed in Akihabara, the world capital of anime, gaming, and manga. Browse iconic shops like Mandarake, Animate, and Radio Kaikan with your guide. In the afternoon, take off your shoes and wade through water at teamLab Planets. In the evening, visit Odaiba to see the towering life-sized Unicorn Gundam statue, DiverCity Tokyo, and the Rainbow Bridge.",
        meals: "Breakfast",
        stay: "Hotel Gracery Shinjuku / Shinjuku Washington Hotel (or similar)"
      },
      {
        dayNumber: 3,
        title: "Harajuku Takeshita Street, Meiji Shrine, Shibuya Crossing & Shibuya Sky",
        body: "Dive into colorful Harajuku along Takeshita Street, sampling Japanese street crepes and browsing avant-garde boutiques. Transition to the quiet cedar forests of Meiji Jingu Shrine. Walk through luxury Omotesando and conquer the iconic Shibuya Crossing before ascending to the breathtaking Shibuya Sky observation deck at sunset. Explore vintage thrift shops in trendy Shimokitazawa in the evening.",
        meals: "Breakfast, Lunch",
        stay: "Hotel Gracery Shinjuku / Shinjuku Washington Hotel (or similar)"
      },
      {
        dayNumber: 4,
        title: "Asakusa Senso-ji, Tokyo Skytree & Ueno National Museum",
        body: "Balance modern pop culture with timeless heritage. Visit Tokyo's oldest temple, Senso-ji in Asakusa, browsing Nakamise shopping arcade. View Tokyo from above at the 634-meter Tokyo Skytree. In the afternoon, explore Ueno Park and the Tokyo National Museum with its authentic samurai armour, katanas, and ukiyo-e woodblock prints.",
        meals: "Breakfast",
        stay: "Hotel Gracery Shinjuku / Shinjuku Washington Hotel (or similar)"
      },
      {
        dayNumber: 5,
        title: "Depart Tokyo — Final Shopping & Airport Transfer",
        body: "Enjoy breakfast and free time for souvenir hunting in Shinjuku or Shibuya before your private transfer to Tokyo Narita or Haneda Airport for your flight home.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "4 nights accommodation in central Tokyo 3★ hotel in Shinjuku/Shibuya (twin-share, or similar)",
      "Daily breakfast, 1 Welcome Dinner in Shinjuku, 1 Harajuku Street Food Lunch",
      "Private car and dedicated English-speaking guide for scheduled tours",
      "teamLab Planets digital art admission ticket (pre-booked slot)",
      "Tokyo Skytree observation deck admission ticket",
      "Shibuya Sky rooftop observatory admission ticket"
    ],
    exclusions: [
      "International flights",
      "Japan visa fees",
      "Travel insurance and personal shopping expenses"
    ],
    visaNote: DEFAULT_JAPAN_VISA_NOTE,
    isGroup: false,
    groupSize: "Min 2 pax (private car + guide)",
    departureStyle: "Private FIT departure — Daily departures (min 2 pax)",
    sampleDates: "Daily departures on request",
    audience: "Young Indian travellers (18–30), anime and gaming fans, Gen Z and millennial pop-culture lovers",
    isFeatured: true,
    relatedSlugs: [
      "japan-tokyo-nightlife-culture-4d",
      "japan-tokyo-fuji-short-break-4d",
      "japan-winter-illuminations-tokyo-osaka-6d"
    ],
    heroImage: "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Tokyo Pop Culture, Anime & Digital Art Tour 5D/4N | Hassle Free Travels",
    seoDescription: "Experience the anime, gaming, and digital art capital with Hassle Free Travels. Akihabara, teamLab Planets, Harajuku, Shibuya Sky, Odaiba Gundam & Shinjuku.",
    mealsSummary: "Daily Breakfast, 1 Welcome Dinner in Shinjuku, 1 Harajuku Street Food Lunch",
    staySummary: "4N Central Tokyo 3★ in Shinjuku/Shibuya area (or similar)",
    transportSummary: "Private Car with English-speaking Specialist Guide + Tokyo Subway Passes",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Direct flights to Tokyo NRT / HND"]
  },

  // ─────────────────────────────────────────────────────────────
  // 8. FIT 6 — Japan Honeymoon: Kyoto Ryokan & Tokyo Luxury (8D / 7N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "japan-honeymoon-kyoto-ryokan-tokyo-luxury-8d",
    destinationSlug: "japan",
    name: "Japan Honeymoon: Kyoto Private Onsen Ryokan & Tokyo Luxury",
    tagline: "Tokyo → Mt Fuji & Hakone → Kyoto Ryokan → Osaka",
    days: 8,
    nights: 7,
    packageType: "honeymoon",
    categoryLabel: "Honeymoon",
    route: "Tokyo → Hakone → Kyoto → Osaka",
    startCity: "Tokyo",
    endCity: "Osaka",
    priceFromUSD: 2100,
    priceFromINR: roundToMarketingPrice(2100 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "4★ / 5★ Luxury Hotels & Premium Onsen Ryokan with Private Open-Air Bath (or similar)",
    bestMonths: ["March", "April", "May", "October", "November", "December"],
    highlights: [
      "Curated romantic itinerary for couples with luxury stays and private open-air onsen hot spring baths",
      "2 nights in a traditional Kyoto luxury Ryokan with private in-room open-air hot spring bath",
      "Exclusive couples' matcha tea ceremony with wagashi confections in a private Kyoto tea house",
      "Private sake tasting experience at a heritage Fushimi brewery (non-alcoholic options available)",
      "Romantic dawn stroll through Arashiyama bamboo grove with a dedicated private photographer guide",
      "Pre-reserved sunset viewing slot at Shibuya Sky rooftop and romantic Ginza fine dining"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Arrive Tokyo — Luxury Private Transfer, Ginza Stroll & Romantic Dinner",
        body: "Arrive at Tokyo Narita or Haneda Airport. Your private chauffeur whisks you directly to your luxury hotel in central Tokyo with a complimentary welcome amenity of fresh fruit and flowers. In the evening, take a romantic walk through the elegant tree-lined avenues of Ginza, followed by an intimate welcome dinner at a top restaurant.",
        meals: "Dinner (Romantic welcome dinner; veg set on request)",
        stay: "The Capitol Hotel Tokyu / Cerulean Tower Tokyu Hotel (or similar)"
      },
      {
        dayNumber: 2,
        title: "Tokyo Romance — Senso-ji, teamLab Planets & Sunset at Shibuya Sky",
        body: "Begin with a morning walk at historic Senso-ji Temple. Step into the ethereal digital art wonderland of teamLab Planets (advance booking arranged by Hassle Free Travels). Stroll through Harajuku and Omotesando before heading to Shibuya Sky for a pre-reserved sunset viewing over Mount Fuji and the Tokyo skyline.",
        meals: "Breakfast",
        stay: "The Capitol Hotel Tokyu / Cerulean Tower Tokyu Hotel (or similar)"
      },
      {
        dayNumber: 3,
        title: "Tokyo to Hakone — Mt Fuji 5th Station & Luxury Onsen Ryokan with Private Bath",
        body: "Travel by private car to scenic Hakone. Ascend to Mt Fuji 5th Station (weather permitting; panoramic views of the crater and surrounding lakes, crater views weather permitting). Ride the Hakone Ropeway above volcanic Owakudani and cruise Lake Ashi. Check into an exclusive Hakone onsen ryokan featuring a private open-air mineral bath on your balcony. Indulge in an exquisite multi-course Kaiseki dinner for two.",
        meals: "Breakfast, Dinner (Ryokan Kaiseki dinner for two; veg available)",
        stay: "Hakone Ginyu / Gora Kadan / Yoshiike Ryokan (or similar)"
      },
      {
        dayNumber: 4,
        title: "Hakone to Kyoto — Hakone Open-Air Museum & Shinkansen to Kyoto Ryokan",
        body: "Enjoy a morning soak in your private onsen, followed by a visit to the Hakone Open-Air Museum. Catch the high-speed Shinkansen bullet train to Kyoto (7-Day JR Pass included). Check into your boutique luxury ryokan in Kyoto with private onsen facilities. In the evening, stroll hand-in-hand through the lantern-lit alleys of Gion.",
        meals: "Breakfast, Dinner (Ryokan Kaiseki dinner for two)",
        stay: "Yuzuya Ryokan / Kanamean Nishitomiya Kyoto (or similar)"
      },
      {
        dayNumber: 5,
        title: "Kyoto Romance — Dawn Bamboo Stroll, Private Tea Ceremony & Pontocho",
        body: "Experience Arashiyama Bamboo Grove in the serene stillness of early morning with your private guide. Visit the tranquil Zen garden of Tenryu-ji. In the afternoon, participate in a private couples' traditional matcha ceremony in an exclusive Kyoto tea house, paired with artisanal wagashi sweets. Dine alongside the Kamogawa River in romantic Pontocho alley.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Yuzuya Ryokan / Kanamean Nishitomiya Kyoto (or similar)"
      },
      {
        dayNumber: 6,
        title: "Fushimi Inari, Private Sake Brewery Tasting & Kyoto Heritage",
        body: "Visit Fushimi Inari Taisha early in the morning to walk beneath thousands of scarlet torii gates. Continue to a historic brewery in the Fushimi sake district for a private tasting session. Spend the afternoon exploring Nishiki Market and historic Nijo Castle.",
        meals: "Breakfast",
        stay: "Kyoto Brighton Hotel / The Thousand Kyoto (or similar)"
      },
      {
        dayNumber: 7,
        title: "Kyoto to Nara & Osaka — Sacred Deer Park & Farewell Dinner",
        body: "Visit ancient Nara to feed the sacred deer in Nara Park and marvel at the colossal Great Buddha of Todai-ji. Transfer to Osaka, checking into a 4★ hotel. Conclude your romantic journey with a celebratory farewell dinner in Osaka.",
        meals: "Breakfast, Dinner",
        stay: "Swissotel Nankai Osaka (or similar)"
      },
      {
        dayNumber: 8,
        title: "Depart Osaka — Private Airport Transfer",
        body: "Enjoy breakfast at your hotel before meeting your private chauffeur for your transfer to Kansai International Airport (KIX) for your flight home.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "7 nights luxury accommodation (2N Tokyo 4★/5★, 1N Hakone Luxury Ryokan with private onsen, 2N Kyoto Luxury Ryokan with private onsen, 1N Kyoto 4★, 1N Osaka 4★, or similar)",
      "Daily breakfast, 1 Romantic Welcome Dinner, 2 Multi-course Kaiseki Dinners for Two, 1 Wagashi Tea Ceremony Lunch, 1 Farewell Dinner",
      "Private luxury vehicle with dedicated driver and English-speaking private guide",
      "7-Day Whole Japan JR Pass covering Shinkansen bullet train travel",
      "Private couples' traditional matcha tea ceremony with artisanal confections",
      "Private Fushimi sake brewery tour and tasting session",
      "teamLab Planets admission & reserved sunset slot at Shibuya Sky"
    ],
    exclusions: [
      "International flights",
      "Japan visa fees",
      "Travel insurance and personal expenses"
    ],
    visaNote: DEFAULT_JAPAN_VISA_NOTE,
    isGroup: false,
    groupSize: "Min 2 pax (private couples tour)",
    departureStyle: "Private FIT departure — Daily departures for couples",
    sampleDates: "Daily departures on request",
    audience: "Honeymooners, couples celebrating anniversaries, and luxury romantic getaways seeking private onsen baths and personalized cultural experiences",
    isFeatured: true,
    relatedSlugs: [
      "japan-tokyo-fuji-kyoto-osaka-classic-private",
      "japan-kyoto-kanazawa-shirakawa-go-7d",
      "japan-food-trail-tokyo-osaka-kyoto-7d"
    ],
    heroImage: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Japan Luxury Honeymoon Tour 8D/7N | Tokyo & Kyoto Private Ryokan | Hassle Free Travels",
    seoDescription: "Book a dream Japan honeymoon with Hassle Free Travels. Private onsen ryokan, romantic Tokyo luxury hotels, Mt Fuji, teamLab, private tea ceremony & Shinkansen.",
    mealsSummary: "Daily Breakfast, 1 Romantic Welcome Dinner, 2 Private Kaiseki Dinners for Two, 1 Wagashi Tea Ceremony Lunch, 1 Farewell Dinner",
    staySummary: "2N Tokyo 4★/5★, 1N Hakone Luxury Ryokan with Private Onsen, 2N Kyoto Luxury Ryokan with Private Onsen, 1N Kyoto 4★, 1N Osaka 4★ (or similar)",
    transportSummary: "7-Day JR Pass + Private Luxury Car with English-speaking Guide + Reserved Shinkansen Green Car (Optional)",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Direct flights to Tokyo & Osaka"]
  },

  // ─────────────────────────────────────────────────────────────
  // 9. FIT 7 — Okinawa Tropical Beach & Ryukyu Heritage Escape (6D / 5N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "japan-okinawa-beach-culture-6d",
    destinationSlug: "japan",
    name: "Okinawa Tropical Beach & Ryukyu Heritage Escape",
    tagline: "Naha → Churaumi → Kerama Islands → Shuri Castle",
    days: 6,
    nights: 5,
    packageType: "custom",
    categoryLabel: "Beach",
    route: "Naha → Onna Village / Chatan → Kerama Islands → Naha",
    startCity: "Naha",
    endCity: "Naha",
    priceFromUSD: 890,
    priceFromINR: roundToMarketingPrice(890 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "3★ / 4★ Beachfront Resort & City Hotel (or similar)",
    bestMonths: ["April", "May", "June", "October", "November"],
    highlights: [
      "Discover Japan's tropical island paradise with turquoise waters and coral reefs",
      "Full-day speedboat excursion to Kerama Islands for world-class snorkelling with sea turtles",
      "Okinawa Churaumi Aquarium — one of the world's largest aquariums featuring majestic whale sharks and manta rays",
      "UNESCO-listed Shuri Castle ruins and traditional Ryukyu Kingdom royal heritage",
      "Dramatic coastal limestone cliffs of Cape Manzamo overlooking the East China Sea",
      "Okinawa World: massive Gyokusendo subterranean limestone cave and traditional Eisa drum dance"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Arrive Naha (OKA) — Private Transfer to Beach Resort & Kokusai Street",
        body: "Arrive at Naha Airport (OKA) on Okinawa Main Island. Meet your Hassle Free Travels driver and guide for a private transfer to your beach resort in Onna Village or Chatan. In the evening, explore bustling Kokusai Street in Naha and enjoy an authentic Okinawan welcome dinner featuring stir-fried champuru and tropical sweet potato treats.",
        meals: "Dinner",
        stay: "Rizzan Sea-Park Hotel Tancha-Bay / Vessel Hotel Campana Okinawa (or similar)"
      },
      {
        dayNumber: 2,
        title: "Churaumi Aquarium, Cape Manzamo & Nakijin Castle",
        body: "Travel up the northern coast to the world-renowned Okinawa Churaumi Aquarium. Gaze in awe at giant whale sharks and giant manta rays gliding inside the Kuroshio Sea tank. Stand atop the elephant-trunk limestone cliffs of Cape Manzamo and explore the ancient stone ramparts of Nakijin Castle (UNESCO).",
        meals: "Breakfast, Lunch",
        stay: "Rizzan Sea-Park Hotel Tancha-Bay / Vessel Hotel Campana Okinawa (or similar)"
      },
      {
        dayNumber: 3,
        title: "Kerama Islands Full-Day Snorkelling Speedboat Tour",
        body: "Board a private speedboat out into the crystalline Kerama Blue waters of Kerama Shoto National Park. Snorkel over pristine coral reefs alongside tropical reef fish and wild sea turtles with professional equipment and safety instruction provided. Enjoy a relaxing bento lunch on board before returning to your resort.",
        meals: "Breakfast, Lunch",
        stay: "Rizzan Sea-Park Hotel Tancha-Bay / Vessel Hotel Campana Okinawa (or similar)"
      },
      {
        dayNumber: 4,
        title: "Shuri Castle, Gyokusendo Cave & Eisa Drum Show",
        body: "Delve into Okinawan heritage at Shuri Castle, the historic royal palace of the Ryukyu Kingdom. Continue to Okinawa World to walk through Gyokusendo Cave, an 890-meter underground limestone wonderland filled with hundreds of thousands of stalactites. Watch a high-energy traditional Eisa folk dance show.",
        meals: "Breakfast",
        stay: "Rizzan Sea-Park Hotel Tancha-Bay / Vessel Hotel Campana Okinawa (or similar)"
      },
      {
        dayNumber: 5,
        title: "Resort Beach Day & Chatan American Village",
        body: "Enjoy a leisurely morning on the white sand beach of your resort. In the afternoon, visit the vibrant seaside entertainment district of Chatan American Village, featuring retro Americana shops, cafes, and a sunset Ferris wheel. Savor a farewell Okinawan dinner.",
        meals: "Breakfast, Dinner",
        stay: "Rizzan Sea-Park Hotel Tancha-Bay / Vessel Hotel Campana Okinawa (or similar)"
      },
      {
        dayNumber: 6,
        title: "Depart Naha — Private Airport Transfer",
        body: "Enjoy breakfast overlooking the ocean before your private transfer to Naha Airport (OKA) for your domestic flight connection back home.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "5 nights accommodation in beachfront resort / 3★/4★ hotel (twin-share, or similar)",
      "Daily breakfast, 1 Okinawan Welcome Dinner, 1 Lunch, 1 Snorkelling Boat Bento Lunch, 1 Farewell Dinner",
      "Private vehicle with dedicated driver and English-speaking guide for scheduled tours",
      "Kerama Islands full-day speedboat excursion with complete snorkelling gear and guide",
      "Admission fees for Churaumi Aquarium, Shuri Castle, and Okinawa World"
    ],
    exclusions: [
      "International flights and domestic airfare to/from Naha (OKA)",
      "Japan visa fees and comprehensive travel insurance",
      "Water sports rentals (jet ski, parasailing, diving) and personal expenses"
    ],
    visaNote: DEFAULT_JAPAN_VISA_NOTE,
    isGroup: false,
    groupSize: "Min 2 pax (private car + guide)",
    departureStyle: "Private FIT departure — Daily departures (min 2 pax)",
    sampleDates: "Daily departures on request",
    audience: "Beach lovers, couples, snorkellers and divers, and tropical island enthusiasts looking for an idyllic beach extension after Tokyo or Kyoto",
    isFeatured: false,
    relatedSlugs: [
      "japan-tokyo-nightlife-culture-4d",
      "japan-hokkaido-snow-nature-7d",
      "japan-kansai-deep-dive-5d"
    ],
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Okinawa Beach & Culture Tour 6D/5N | Hassle Free Travels",
    seoDescription: "Escape to tropical Okinawa with Hassle Free Travels. Kerama Islands snorkelling with sea turtles, Churaumi Aquarium whale sharks, Shuri Castle & luxury beachfront resorts.",
    mealsSummary: "Daily Breakfast, 1 Okinawan Welcome Dinner, 1 Lunch, 1 Snorkelling Boat Lunch, 1 Farewell Dinner",
    staySummary: "5N Beach Resort Hotel in Onna Village or Chatan area (or similar)",
    transportSummary: "Private A/C Vehicle with English-speaking Guide + Speedboat to Kerama Islands",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Connections via Tokyo HND or Osaka KIX to Naha OKA"]
  },

  // ─────────────────────────────────────────────────────────────
  // 10. FIT 8 — Hiroshima, Miyajima Floating Torii & Kyushu Heritage Trail (7D / 6N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "japan-hiroshima-miyajima-kyushu-7d",
    destinationSlug: "japan",
    name: "Hiroshima, Miyajima Floating Torii & Kyushu Heritage Trail",
    tagline: "Hiroshima → Miyajima → Nagasaki → Beppu Onsen → Kumamoto → Fukuoka",
    days: 7,
    nights: 6,
    packageType: "custom",
    categoryLabel: "Heritage",
    route: "Hiroshima → Miyajima → Nagasaki → Beppu → Kumamoto → Fukuoka",
    startCity: "Hiroshima",
    endCity: "Fukuoka",
    priceFromUSD: 1050,
    priceFromINR: roundToMarketingPrice(1050 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "3★ City Hotels & Beppu Onsen Ryokan (or similar)",
    bestMonths: ["March", "April", "May", "September", "October", "November"],
    highlights: [
      "Discover the deep history, coastal beauty, and volcanic wonders of western Japan and Kyushu",
      "Hiroshima Peace Memorial Park, Museum, and the preserved ruins of the UNESCO A-Bomb Dome",
      "Scenic ferry to sacred Miyajima Island to admire the iconic floating vermilion Torii Gate",
      "Historic Nagasaki: Glover Garden, Dejima Dutch trading post, and Nagasaki Peace Park",
      "Beppu Onsen: explore the steaming, colorful '8 Hells' and experience a natural hot sand bath",
      "Majestic Kumamoto Castle and lively open-air Yatai food stalls in Fukuoka"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Arrive Hiroshima — Peace Memorial Museum & Okonomiyaki Dinner",
        body: "Arrive at Hiroshima Airport (HIJ) or take the Shinkansen from Osaka. Meet your Hassle Free Travels guide and transfer to your hotel. Visit the Hiroshima Peace Memorial Museum, the tranquil Peace Park, and the UNESCO A-Bomb Dome. Savor Hiroshima-style layered okonomiyaki for dinner.",
        meals: "Dinner",
        stay: "Hotel Granvia Hiroshima (or similar)"
      },
      {
        dayNumber: 2,
        title: "Miyajima Island — Floating Torii Gate & Mt Misen Ropeway",
        body: "Take the short scenic ferry to sacred Miyajima Island. Behold Itsukushima Shrine's world-famous floating torii gate standing gracefully in the bay. Visit Daisho-in Temple and ascend the Mt Misen Ropeway for sweeping views across the Seto Inland Sea.",
        meals: "Breakfast, Lunch",
        stay: "Hotel Granvia Hiroshima (or similar)"
      },
      {
        dayNumber: 3,
        title: "Hiroshima to Nagasaki — Glover Garden, Dejima & Nagasaki Peace Park",
        body: "Ride the Shinkansen and express train to historic Nagasaki. Tour hillside Glover Garden with its Victorian merchant homes, visit Dejima island where Dutch traders lived during Japan's period of isolation, and pay respects at Nagasaki Peace Park.",
        meals: "Breakfast, Lunch",
        stay: "Hotel New Nagasaki (or similar)"
      },
      {
        dayNumber: 4,
        title: "Nagasaki to Beppu Onsen — The 8 Hells & Volcanic Sand Bath",
        body: "Travel across Kyushu to Beppu, Japan's hot spring capital producing more geothermal water than any other resort in Japan. Tour the colorful '8 Hells' of Beppu (Jigoku Meguri), including the boiling blue Sea Hell and bubbling mud pools. Experience a rejuvenating hot sand bath on the beach before checking into an onsen ryokan.",
        meals: "Breakfast, Dinner (Ryokan Kaiseki dinner)",
        stay: "Suginoi Hotel Beppu / Seaside Hotel Mimatsu Ooetei (or similar)"
      },
      {
        dayNumber: 5,
        title: "Beppu to Kumamoto & Fukuoka — Kumamoto Castle & Suizenji Garden",
        body: "Travel by limited express to Kumamoto. Tour historic Kumamoto Castle, renowned for its imposing black stone walls, and stroll through the manicured landscape of Suizenji Jojuen Garden. Continue to energetic Fukuoka in the evening.",
        meals: "Breakfast, Lunch",
        stay: "Hotel Nikko Fukuoka / Grand Hyatt Fukuoka (or similar)"
      },
      {
        dayNumber: 6,
        title: "Fukuoka City — Ohori Park, Hakata Folk Museum & Yatai Food Stalls",
        body: "Explore Fukuoka's tranquil Ohori Park, the ruins of Fukuoka Castle, and the Hakata Machiya Folk Museum. In the evening, head to the atmospheric open-air Yatai street food stalls along the river on Nakasu Island, tasting Hakata ramen with vegetarian broth options available.",
        meals: "Breakfast",
        stay: "Hotel Nikko Fukuoka / Grand Hyatt Fukuoka (or similar)"
      },
      {
        dayNumber: 7,
        title: "Depart Fukuoka — Private Airport Transfer",
        body: "Enjoy breakfast at your hotel before your private transfer to Fukuoka Airport (FUK) for your scheduled flight home.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "6 nights accommodation in 3★/4★ city hotels & 1 night Beppu Onsen Ryokan (twin-share, or similar)",
      "Daily breakfast, 1 Hiroshima Welcome Dinner, 2 Lunches, 1 Beppu Ryokan Kaiseki Dinner",
      "Private vehicle with driver and English-speaking guide for scheduled tours",
      "7-Day Whole Japan JR Pass covering Shinkansen and express trains across western Japan and Kyushu",
      "Miyajima return ferry ticket, Mt Misen ropeway, Beppu 8 Hells admission, and Beppu sand bath experience"
    ],
    exclusions: [
      "International flights",
      "Japan visa fees",
      "Travel insurance and personal expenses"
    ],
    visaNote: DEFAULT_JAPAN_VISA_NOTE,
    isGroup: false,
    groupSize: "Min 2 pax (private car + guide)",
    departureStyle: "Private FIT departure — Daily departures (min 2 pax)",
    sampleDates: "Daily departures on request",
    audience: "History lovers, onsen enthusiasts, and travellers looking for deep western Japan and Kyushu culture beyond the standard Tokyo-Kyoto trail",
    isFeatured: false,
    relatedSlugs: [
      "japan-rail-pass-grand-tour-13d",
      "japan-kansai-tokyo-explorer-10d",
      "japan-tokyo-nikko-hakone-kyoto-hiroshima-11d"
    ],
    heroImage: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Hiroshima, Miyajima & Kyushu Heritage Tour 7D/6N | Hassle Free Travels",
    seoDescription: "Explore Hiroshima, Miyajima floating torii, Nagasaki, Beppu onsen, and Fukuoka with Hassle Free Travels. 7-day private heritage tour with JR Pass and Shinkansen.",
    mealsSummary: "Daily Breakfast, 1 Hiroshima Okonomiyaki Dinner, 2 Lunches (Nagasaki, Kumamoto), 1 Beppu Ryokan Kaiseki Dinner",
    staySummary: "2N Hiroshima 3★, 1N Nagasaki 3★, 1N Beppu Onsen Ryokan, 2N Fukuoka 3★ (or similar)",
    transportSummary: "7-Day JR Pass + Private Car with English-speaking Guide + Miyajima Ferry + Shinkansen",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Connections via Tokyo, Osaka, or Fukuoka FUK"]
  },

  // ─────────────────────────────────────────────────────────────
  // 11. FIT 9 — Tokyo & Mt Fuji Scenic Short Break (4D / 3N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "japan-tokyo-fuji-short-break-4d",
    destinationSlug: "japan",
    name: "Tokyo & Mt Fuji Scenic Short Break",
    tagline: "Tokyo Highlights & Mt Fuji Hakone Day Tour",
    days: 4,
    nights: 3,
    packageType: "custom",
    categoryLabel: "Private",
    route: "Tokyo → Mt Fuji & Hakone → Tokyo",
    startCity: "Tokyo",
    endCity: "Tokyo",
    priceFromUSD: 480,
    priceFromINR: roundToMarketingPrice(480 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "3★ Central Tokyo Hotel (or similar)",
    bestMonths: ["January", "February", "March", "April", "May", "June", "September", "October", "November", "December"],
    highlights: [
      "Compact 4-day short-break itinerary perfect for stopovers or quick holiday getaways",
      "Full-day private Mount Fuji excursion: 5th Station (weather permitting), Hakone Ropeway & Lake Ashi cruise",
      "Tax-free shopping stop at Gotemba Premium Outlets framed by magnificent Fuji views",
      "Sensory digital art immersion at teamLab Planets in Toyosu (advance booking arranged by Hassle Free Travels)",
      "Iconic Tokyo landmarks: Senso-ji Temple, Tokyo Skytree, Shibuya Crossing & Shibuya Sky observatory"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Arrive Tokyo — Private Transfer & Shinjuku Night Walk",
        body: "Arrive at Tokyo Narita or Haneda Airport. Meet your Hassle Free Travels driver and transfer by private car to your central Tokyo hotel. In the evening, enjoy a guided walking orientation through Shinjuku's glittering entertainment district and Omoide Yokocho with a welcome dinner.",
        meals: "Dinner",
        stay: "Shinjuku Washington Hotel / Hotel Gracery Shinjuku (or similar)"
      },
      {
        dayNumber: 2,
        title: "Tokyo Highlights — Senso-ji, Skytree, teamLab & Shibuya Sky",
        body: "Spend a full day exploring Tokyo's iconic highlights. Visit ancient Senso-ji Temple in Asakusa, take in the views from Tokyo Skytree, step inside the digital light rooms of teamLab Planets, and ascend to Shibuya Sky for open-air rooftop views above Shibuya Crossing.",
        meals: "Breakfast",
        stay: "Shinjuku Washington Hotel / Hotel Gracery Shinjuku (or similar)"
      },
      {
        dayNumber: 3,
        title: "Full-Day Mt Fuji & Hakone Tour — 5th Station, Ropeway & Cruise",
        body: "Embark on a full-day private tour to Mount Fuji. Stop at Gotemba Premium Outlets for premier shopping. Ascend to Mt Fuji 5th Station at 2,305 meters elevation (weather permitting; panoramic views of the crater and surrounding lakes, crater views weather permitting). Ride the Hakone Ropeway over volcanic Owakudani and cruise across serene Lake Ashi before returning to Tokyo.",
        meals: "Breakfast, Lunch",
        stay: "Shinjuku Washington Hotel / Hotel Gracery Shinjuku (or similar)"
      },
      {
        dayNumber: 4,
        title: "Depart Tokyo — Final Shopping & Airport Transfer",
        body: "Enjoy breakfast at your hotel before your private transfer to Tokyo Narita or Haneda Airport for your scheduled return flight home.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "3 nights accommodation in central Tokyo 3★ hotel (twin-share, or similar)",
      "Daily breakfast, 1 Shinjuku Welcome Dinner, 1 Mt Fuji Day Tour Lunch",
      "Private car and dedicated English-speaking guide for airport transfers and tours",
      "teamLab Planets admission ticket",
      "Tokyo Skytree & Shibuya Sky observation deck tickets",
      "Hakone Ropeway and Lake Ashi pirate cruise tickets"
    ],
    exclusions: [
      "International flights",
      "Japan visa fees",
      "Travel insurance and personal expenses"
    ],
    visaNote: DEFAULT_JAPAN_VISA_NOTE,
    isGroup: false,
    groupSize: "Min 2 pax (private car + guide)",
    departureStyle: "Private FIT departure — Daily departures (min 2 pax)",
    sampleDates: "Daily departures on request",
    audience: "Business travellers with weekend free, short break vacationers, and multi-country travellers seeking a fast, high-impact taste of Tokyo and Mount Fuji",
    isFeatured: false,
    relatedSlugs: [
      "japan-tokyo-nightlife-culture-4d",
      "japan-tokyo-pop-culture-anime-5d",
      "japan-tokyo-fuji-kyoto-osaka-classic-private"
    ],
    heroImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Tokyo & Mt Fuji Scenic Short Break 4D/3N | Hassle Free Travels",
    seoDescription: "Book a 4-day Tokyo and Mount Fuji short break with Hassle Free Travels. Senso-ji, teamLab Planets, Shibuya Sky, Mt Fuji 5th Station & Hakone cruise with private guide.",
    mealsSummary: "Daily Breakfast, 1 Welcome Dinner in Shinjuku, 1 Mt Fuji Day Tour Lunch",
    staySummary: "3N Central Tokyo 3★ Hotel (or similar)",
    transportSummary: "Private Car with English-speaking Guide for Transfers & Mt Fuji Day Tour",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Direct flights to Tokyo NRT / HND"]
  },

  // ─────────────────────────────────────────────────────────────
  // 12. FIT 10 — Japan Family Adventure: Tokyo, Mt Fuji, Kyoto & Universal Studios (9D / 8N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "japan-family-adventure-tokyo-fuji-kyoto-9d",
    destinationSlug: "japan",
    name: "Japan Family Adventure: Tokyo, Mt Fuji, Kyoto & Universal Studios",
    tagline: "Tokyo → Mt Fuji & Hakone → Kyoto → Nara → Osaka & Universal Studios Japan",
    days: 9,
    nights: 8,
    packageType: "family",
    categoryLabel: "Family",
    route: "Tokyo → Hakone → Kyoto → Nara → Osaka",
    startCity: "Tokyo",
    endCity: "Osaka",
    priceFromUSD: 1380,
    priceFromINR: roundToMarketingPrice(1380 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "3★ / 4★ Family Hotels & Family Onsen Ryokan (or similar)",
    bestMonths: ["March", "April", "May", "July", "August", "October", "November"],
    highlights: [
      "Carefully paced family-friendly private itinerary designed for parents, kids, and teens",
      "Interactive digital art playground at teamLab Planets in Toyosu (advance booking arranged by Hassle Free Travels)",
      "Hakone family onsen ryokan overnight stay with private family mineral hot spring bath",
      "Feeding friendly bowing deer at Nara Deer Park & seeing the giant bronze Daibutsu at Todai-ji",
      "Full day dedicated to Universal Studios Japan (USJ) in Osaka (Super Nintendo World & Harry Potter; Hassle Free Travels pre-books tickets)",
      "Bullet train Shinkansen journey at 300 km/h connecting Hakone and ancient Kyoto"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Arrive Tokyo — Private Transfer & Family Welcome Dinner",
        body: "Touch down at Tokyo Narita or Haneda Airport. Your private chauffeur welcomes your family and transfers you to your hotel in central Tokyo. Enjoy an easy evening family orientation walk in Shinjuku and a relaxed welcome dinner.",
        meals: "Dinner",
        stay: "Shinjuku Washington Hotel / Hotel Gracery Shinjuku (or similar)"
      },
      {
        dayNumber: 2,
        title: "Tokyo Family Highlights — Asakusa Senso-ji, Skytree & teamLab",
        body: "Visit ancient Senso-ji Temple in Asakusa, browsing souvenir shops on Nakamise. Ascend Tokyo Skytree for bird's-eye views over the metropolis. In the afternoon, let the kids explore the magical interactive light and water rooms of teamLab Planets. Finish at Odaiba seeing the giant Unicorn Gundam statue.",
        meals: "Breakfast",
        stay: "Shinjuku Washington Hotel / Hotel Gracery Shinjuku (or similar)"
      },
      {
        dayNumber: 3,
        title: "Tokyo Wildlife & Pop Culture — Ueno Zoo Pandas, Akihabara & Shibuya",
        body: "Visit Ueno Zoo in Ueno Park, home to giant pandas and over 3,000 animals. In the afternoon, explore Akihabara's anime and gaming stores. In the evening, let the kids experience the excitement of walking across Shibuya Scramble Crossing.",
        meals: "Breakfast, Lunch",
        stay: "Shinjuku Washington Hotel / Hotel Gracery Shinjuku (or similar)"
      },
      {
        dayNumber: 4,
        title: "Tokyo to Hakone & Mt Fuji — 5th Station, Ropeway, Cruise & Family Ryokan",
        body: "Drive by private van to Mount Fuji. Ascend to Mt Fuji 5th Station (weather permitting; panoramic views of the crater and surrounding lakes, crater views weather permitting). Ride the Hakone Ropeway and sail on a Lake Ashi pirate boat. Check into a family onsen ryokan with a private hot spring bath and enjoy a multi-course dinner.",
        meals: "Breakfast, Dinner",
        stay: "Hakone Yumoto Onsen Ryokan (or similar)"
      },
      {
        dayNumber: 5,
        title: "Hakone to Kyoto — Sculpture Park & Shinkansen Bullet Train",
        body: "Visit the interactive Hakone Open-Air Museum, where kids can climb through vibrant outdoor art structures and maze pavilions. Board the high-speed Shinkansen bullet train to Kyoto (JR Pass included). Enjoy an evening walk through historic Gion.",
        meals: "Breakfast",
        stay: "Keihan Kyoto Grande (or similar)"
      },
      {
        dayNumber: 6,
        title: "Kyoto Heritage — Fushimi Inari Torii & Golden Pavilion",
        body: "Walk through the endless red torii tunnels of Fushimi Inari Taisha (kids love counting the gates!). Visit the shimmering Golden Pavilion (Kinkaku-ji) and enjoy an optional family ninja experience at a Kyoto ninja dojo.",
        meals: "Breakfast, Lunch",
        stay: "Keihan Kyoto Grande (or similar)"
      },
      {
        dayNumber: 7,
        title: "Arashiyama Bamboo Grove & Nara Deer Park",
        body: "Explore the towering bamboo stalks of Arashiyama and visit Tenryu-ji garden. In the afternoon, travel to Nara Deer Park where kids can feed hundreds of gentle, bowing sika deer with deer crackers, and marvel at the giant Great Buddha at Todai-ji Temple.",
        meals: "Breakfast",
        stay: "Keihan Kyoto Grande (or similar)"
      },
      {
        dayNumber: 8,
        title: "Universal Studios Japan (USJ) — Full Day Theme Park Magic",
        body: "Spend a full, magical day at Universal Studios Japan in Osaka. Enter The Wizarding World of Harry Potter and power up inside Super Nintendo World (tickets and express passes not included in base tour; Hassle Free Travels can pre-book tickets). In the evening, sample Osaka street food in Dotonbori.",
        meals: "Breakfast",
        stay: "Hotel Monterey Grasmere Osaka (or similar)"
      },
      {
        dayNumber: 9,
        title: "Depart Osaka — Private Airport Transfer",
        body: "Enjoy breakfast at your hotel before your private transfer to Kansai International Airport (KIX) for your flight home.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "8 nights family accommodation in 3★/4★ hotels & 1 night Hakone Family Ryokan with private onsen (twin/triple share, or similar)",
      "Daily breakfast, 1 Family Welcome Dinner, 2 Bento Lunches, 1 Family Ryokan Dinner",
      "Private family van with dedicated driver and English-speaking guide for all scheduled tours",
      "9-Day Whole Japan JR Pass covering Shinkansen bullet train",
      "Admission tickets for teamLab Planets, Tokyo Skytree, Hakone Ropeway, Lake Ashi cruise, Ueno Zoo, Senso-ji, Fushimi Inari, Kinkaku-ji, and Todai-ji"
    ],
    exclusions: [
      "International flights",
      "Universal Studios Japan (USJ) studio passes and timed-entry express passes (optional add-on)",
      "Optional Kyoto Ninja Dojo experience",
      "Japan visa fees and comprehensive travel insurance"
    ],
    visaNote: DEFAULT_JAPAN_VISA_NOTE,
    isGroup: false,
    groupSize: "Min 2 pax (private family departure)",
    departureStyle: "Private FIT departure — Daily family departures (min 2 pax)",
    sampleDates: "Daily departures on request",
    audience: "Families with kids and teens, multi-generation family groups seeking child-friendly pacing and iconic theme park highlights",
    isFeatured: false,
    relatedSlugs: [
      "japan-classic-highlights-8d",
      "japan-tokyo-fuji-kyoto-osaka-classic-private",
      "japan-tokyo-pop-culture-anime-5d"
    ],
    heroImage: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Japan Family Adventure 9D/8N Tour | Tokyo, Fuji, Kyoto & Universal Studios | Hassle Free Travels",
    seoDescription: "The ultimate Japan family holiday with Hassle Free Travels. Tokyo Skytree, teamLab, Mt Fuji, onsen ryokan, Kyoto bamboo, Nara deer park & Universal Studios Japan.",
    mealsSummary: "Daily Breakfast, 1 Family Welcome Dinner, 2 Bento Lunches, 1 Family Ryokan Dinner",
    staySummary: "3N Tokyo 3★/4★, 1N Hakone Family Ryokan with Onsen, 3N Kyoto 3★/4★, 1N Osaka 3★/4★ (or similar)",
    transportSummary: "9-Day JR Pass + Private Family Van with English-speaking Guide + Shinkansen Bullet Train",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Direct flights to Tokyo & Osaka"]
  },

  // ─────────────────────────────────────────────────────────────
  // 13. FIT 11 — Kyoto Spiritual & Temple Immersion with Shukubo Temple Lodging (6D / 5N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "japan-kyoto-spiritual-temple-immersion-6d",
    destinationSlug: "japan",
    name: "Kyoto Spiritual & Temple Immersion with Shukubo Temple Lodging",
    tagline: "Osaka → Kyoto Temples → Sacred Koyasan → Zen Meditation",
    days: 6,
    nights: 5,
    packageType: "spiritual",
    categoryLabel: "Spiritual",
    route: "Osaka → Kyoto → Koyasan → Kyoto",
    startCity: "Osaka",
    endCity: "Osaka",
    priceFromUSD: 820,
    priceFromINR: roundToMarketingPrice(820 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "3★ Kyoto Hotel & 1N Authentic Shukubo Buddhist Temple Lodging (or similar)",
    bestMonths: ["February", "March", "April", "May", "October", "November"],
    highlights: [
      "1 night authentic Shukubo (temple lodging) inside an active Buddhist monastery with morning prayer ceremony",
      "Private Zen meditation session led by an English-speaking Buddhist monk at a quiet Kyoto Zen temple",
      "Full-day spiritual pilgrimage to sacred Mount Koya (Koyasan) — the headquarters of Shingon Buddhism",
      "Atmospheric dusk walk along the lantern-lined stone path of Okunoin Cemetery under towering cedars",
      "Tasting Buddhist vegetarian shojin ryori cuisine at temples and traditional Kyoto dining houses",
      "Dawn visit to Fushimi Inari Taisha and contemplative stroll through Jojakko-ji moss temple"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Arrive Osaka (KIX) — Transfer to Kyoto & Shojin Ryori Dinner",
        body: "Arrive at Kansai International Airport (KIX). Meet your private Hassle Free Travels guide and transfer to Kyoto. In the evening, stroll through the Gion district and Yasaka Shrine, illuminated by hundreds of white lanterns. Savor an authentic shojin ryori (Zen Buddhist vegetarian cuisine) welcome dinner.",
        meals: "Dinner",
        stay: "Kyoto Tokyu Hotel (or similar)"
      },
      {
        dayNumber: 2,
        title: "Dawn Fushimi Inari, Golden Pavilion & Nishiki Market Veg Walk",
        body: "Visit Fushimi Inari Taisha at dawn to hike through thousands of vermilion torii gates in serene silence. Continue to Kinkaku-ji (Golden Pavilion) and the meditative rock garden of Ryoan-ji. In the afternoon, enjoy a curated vegetarian food walk through Nishiki Market.",
        meals: "Breakfast, Lunch",
        stay: "Kyoto Tokyu Hotel (or similar)"
      },
      {
        dayNumber: 3,
        title: "Sacred Koyasan Pilgrimage — Kongobu-ji & Lantern-Lit Okunoin",
        body: "Embark on a scenic journey by train and cable car up sacred Mount Koya (Koyasan), the cradle of Shingon Esoteric Buddhism founded by Kobo Daishi in 816 AD. Visit Kongobu-ji, the head monastery featuring the Banryutei rock garden. Walk along the mystical 2-kilometer cedar-lined path of Okunoin Cemetery, home to over 200,000 moss-covered stupas and gravestones, illuminated by stone lanterns at twilight.",
        meals: "Breakfast",
        stay: "Kyoto Tokyu Hotel (or similar)"
      },
      {
        dayNumber: 4,
        title: "Zen Meditation & Shukubo Temple Lodging Overnight",
        body: "Participate in a 90-minute private Zen meditation session guided by an English-speaking monk at a tranquil Kyoto temple. Explore peaceful Arashiyama Bamboo Grove and the serene moss garden of Jojakko-ji Temple. In the afternoon, check into your authentic shukubo (temple lodging). Enjoy a multi-course vegetarian Buddhist shojin ryori dinner prepared by monks.",
        meals: "Breakfast, Dinner (Shojin ryori temple dinner)",
        stay: "Authentic Shukubo Temple Lodging (or similar)"
      },
      {
        dayNumber: 5,
        title: "Morning Buddhist Prayer Ceremony, Nijo Castle & Farewell Dinner",
        body: "Rise early for the 5:30 AM morning Buddhist prayer and fire ritual (goma) in the main temple hall, listening to rhythmic sutra chanting. After a vegetarian temple breakfast, visit historic Nijo Castle and the Kyoto Imperial Palace grounds. Enjoy a farewell dinner in Kyoto.",
        meals: "Breakfast, Dinner",
        stay: "Kyoto Tokyu Hotel (or similar)"
      },
      {
        dayNumber: 6,
        title: "Depart Kyoto — Transfer to Kansai Airport",
        body: "Enjoy breakfast before your private transfer from Kyoto to Kansai International Airport (KIX) for your flight home.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "5 nights accommodation (4N Kyoto 3★ hotel, 1N authentic Shukubo Buddhist Temple Lodging, twin-share, or similar)",
      "Daily breakfast, 1 Shojin Ryori Dinner, 1 Nishiki Market Veg Lunch, 1 Shukubo Temple Vegetarian Dinner, 1 Farewell Dinner",
      "Private car and dedicated English-speaking guide for scheduled tours",
      "Koyasan cable car and scenic railway passes",
      "Private Zen meditation session with resident Buddhist monk",
      "All temple and shrine entrance fees as per itinerary"
    ],
    exclusions: [
      "International flights",
      "Japan visa fees",
      "Travel insurance and personal expenses"
    ],
    visaNote: DEFAULT_JAPAN_VISA_NOTE,
    isGroup: false,
    groupSize: "Min 2 pax (private car + guide)",
    departureStyle: "Private FIT departure — Daily departures (min 2 pax)",
    sampleDates: "Daily departures on request",
    audience: "Spiritual seekers, mindfulness practitioners, vegetarian and vegan travellers, and cultural explorers seeking peace and spiritual depth",
    isFeatured: false,
    relatedSlugs: [
      "japan-kansai-deep-dive-5d",
      "japan-food-trail-tokyo-osaka-kyoto-7d",
      "japan-kyoto-kanazawa-shirakawa-go-7d"
    ],
    heroImage: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Kyoto Spiritual & Temple Immersion 6D/5N | Shukubo Temple Stay | Hassle Free Travels",
    seoDescription: "Experience authentic spiritual Japan with Hassle Free Travels. Shukubo Buddhist temple lodging, sacred Koyasan, private Zen meditation, Fushimi Inari & shojin ryori vegetarian cuisine.",
    mealsSummary: "Daily Breakfast, 1 Shojin Ryori Buddhist Vegetarian Dinner, 1 Nishiki Market Veg Lunch, 1 Shukubo Temple Vegetarian Dinner, 1 Farewell Dinner",
    staySummary: "4N Kyoto 3★ Hotel, 1N Sacred Shukubo Buddhist Temple Lodging in Kyoto/Koyasan (or similar)",
    transportSummary: "Private Car with English-speaking Guide + Koyasan Cable Car & Express Train",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Direct flights to Osaka KIX"]
  },

  // ─────────────────────────────────────────────────────────────
  // 14. FIT 12 — Japan Food Trail: Tokyo, Osaka & Kyoto (7D / 6N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "japan-food-trail-tokyo-osaka-kyoto-7d",
    destinationSlug: "japan",
    name: "Japan Food Trail: Tsukiji, Kyoto Vegetarian Cuisine & Osaka Street Food",
    tagline: "Tokyo Gastronomy → Kyoto Shojin Ryori & Wagashi → Osaka Kuromon & Dotonbori",
    days: 7,
    nights: 6,
    packageType: "custom",
    categoryLabel: "Culinary",
    route: "Tokyo → Kyoto → Osaka",
    startCity: "Tokyo",
    endCity: "Osaka",
    priceFromUSD: 1080,
    priceFromINR: roundToMarketingPrice(1080 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "3★ / 4★ City Hotels in Prime Culinary Neighbourhoods (or similar)",
    bestMonths: ["January", "February", "March", "April", "May", "September", "October", "November", "December"],
    highlights: [
      "Specialist culinary tour designed with extensive Indian vegetarian, vegan, and Jain adaptations",
      "Tsukiji Outer Market breakfast tasting: fresh tamagoyaki, roasted matcha, grilled skewers, and seasonal produce",
      "Shin-Yokohama Ramen Museum with customized vegetarian and vegan craft ramen broths",
      "Hands-on Wagashi (traditional Japanese confectionery) making masterclass with wagashi tea masters in Kyoto",
      "Kyoto Nishiki Market culinary safari and authentic Zen Buddhist shojin ryori dining",
      "Hands-on Japanese home cooking class in Osaka and street food crawl in neon Dotonbori"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Arrive Tokyo — Private Transfer & Omoide Yokocho Street Food Dinner",
        body: "Arrive in Tokyo. Meet your Hassle Free Travels food-specialist guide and transfer to your hotel. In the evening, explore Shinjuku's nostalgic Omoide Yokocho ('Memory Lane') for an introduction to Tokyo's street food culture with vegetarian grilled skewers and craft side dishes.",
        meals: "Dinner",
        stay: "Hotel Gracery Shinjuku (or similar)"
      },
      {
        dayNumber: 2,
        title: "Tsukiji Outer Market Food Safari & Shin-Yokohama Ramen Museum",
        body: "Begin with an early morning tasting tour of bustling Tsukiji Outer Market, sampling fluffy sweet tamagoyaki, fresh wasabi, and seasonal fruits. In the afternoon, visit the retro-themed Shin-Yokohama Ramen Museum, enjoying a tasting of artisanal vegetarian and plant-based ramen. Explore Shibuya's depachika (underground luxury department store food hall) in the evening.",
        meals: "Breakfast, Lunch",
        stay: "Hotel Gracery Shinjuku (or similar)"
      },
      {
        dayNumber: 3,
        title: "Tokyo to Kyoto — Shinkansen & Nishiki Market Shojin Ryori Food Walk",
        body: "Board the Shinkansen bullet train to Kyoto (JR Pass included). In the afternoon, explore Nishiki Market ('Kyoto’s Kitchen') with your private guide, sampling yuba (tofu skin), pickled seasonal vegetables, roasted tea, and matcha soft-serve. Dine in the historic Pontocho alley.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Keihan Kyoto Grande (or similar)"
      },
      {
        dayNumber: 4,
        title: "Wagashi Confectionery Making Class & Fushimi Sake District",
        body: "Join a 2-hour hands-on Wagashi (Japanese sweet confections) making class with a Kyoto master confectioner, creating delicate sweets shaped like seasonal flowers. Afterward, tour the historic Fushimi sake district with its canal-side breweries, enjoying tastings with non-alcoholic rice malt drinks available. Visit Arashiyama in the afternoon.",
        meals: "Breakfast, Lunch",
        stay: "Keihan Kyoto Grande (or similar)"
      },
      {
        dayNumber: 5,
        title: "Kyoto to Osaka — Kuromon Market & Dotonbori Street Food Safari",
        body: "Drive to Osaka, Japan's culinary capital. Explore vibrant Kuromon Ichiba Market with tastings of local street delicacies. In the afternoon, tour Osaka Castle and explore the colossal food floors of Umeda's department stores. In the evening, embark on a street food crawl through Dotonbori, tasting takoyaki and okonomiyaki with vegetarian stalls highlighted.",
        meals: "Breakfast, Lunch",
        stay: "Hotel Monterey Grasmere Osaka (or similar)"
      },
      {
        dayNumber: 6,
        title: "Hands-on Japanese Home Cooking Class & Farewell Kaiseki Dinner",
        body: "Attend a private 3-hour Japanese home cooking class in Osaka, learning to prepare authentic miso soup, handmade onigiri, rolled omelets, and vegetable tempura (fully vegetarian menu available). Spend the afternoon at leisure in Shinsekai. Tonight, celebrate with a multi-course farewell Kaiseki dinner.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Hotel Monterey Grasmere Osaka (or similar)"
      },
      {
        dayNumber: 7,
        title: "Depart Osaka — Private Airport Transfer",
        body: "Enjoy breakfast before your private transfer to Kansai International Airport (KIX) for your scheduled flight home.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "6 nights accommodation in 3★/4★ city hotels (3N Tokyo, 2N Kyoto, 1N Osaka, twin-share, or similar)",
      "Daily breakfast, 1 Welcome Street Food Dinner, 4 Specialty Food Lunches (Tsukiji, Nishiki, Wagashi class, Kuromon), 1 Cooking Class Lunch, 1 Farewell Kaiseki Dinner",
      "Private car and dedicated food-specialist English guide throughout",
      "7-Day Whole Japan JR Pass covering Shinkansen bullet train",
      "Wagashi confectionery making class and hands-on Japanese home cooking class with materials included",
      "All market tasting fees and museum entries as per itinerary"
    ],
    exclusions: [
      "International flights",
      "Japan visa fees",
      "Travel insurance and personal expenses"
    ],
    visaNote: DEFAULT_JAPAN_VISA_NOTE,
    isGroup: false,
    groupSize: "Min 2 pax (private car + food specialist guide)",
    departureStyle: "Private FIT departure — Daily departures (min 2 pax)",
    sampleDates: "Daily departures on request",
    audience: "Food enthusiasts, vegetarian and Jain foodies, culinary travellers, and street food lovers looking for curated gastronomic immersion",
    isFeatured: false,
    relatedSlugs: [
      "japan-kansai-deep-dive-5d",
      "japan-tokyo-fuji-kyoto-osaka-classic-private",
      "japan-kyoto-spiritual-temple-immersion-6d"
    ],
    heroImage: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Japan Food Trail Tour 7D/6N | Tokyo, Kyoto & Osaka Gastronomy | Hassle Free Travels",
    seoDescription: "A culinary journey across Tokyo, Kyoto, and Osaka with Hassle Free Travels. Tsukiji Market, Ramen Museum, Wagashi sweet making, Nishiki Market & Osaka street food with vegetarian options.",
    mealsSummary: "Daily Breakfast, 1 Street Food Welcome Dinner, 4 Specialty Food Lunches (Tsukiji, Nishiki, Wagashi class, Kuromon), 1 Cooking Class Lunch, 1 Farewell Kaiseki Dinner",
    staySummary: "3N Tokyo 3★, 2N Kyoto 3★, 1N Osaka 3★ (or similar)",
    transportSummary: "7-Day JR Pass + Private Car with Food-Specialist English Guide + Shinkansen Bullet Train",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Direct flights to Tokyo & Osaka"]
  },

  // ─────────────────────────────────────────────────────────────
  // 15. FIT 13 — Tohoku Autumn Foliage, Mountain Temples & Onsen Ryokan (6D / 5N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "japan-tohoku-autumn-foliage-onsen-6d",
    destinationSlug: "japan",
    name: "Tohoku Autumn Foliage, Mountain Temples & Onsen Ryokan",
    tagline: "Tokyo → Sendai & Matsushima Bay → Naruko Onsen → Yamadera → Zao Onsen",
    days: 6,
    nights: 5,
    packageType: "adventure",
    categoryLabel: "Adventure",
    route: "Tokyo → Sendai → Naruko Onsen → Yamadera → Zao Onsen → Yamagata → Tokyo",
    startCity: "Tokyo",
    endCity: "Tokyo",
    priceFromUSD: 980,
    priceFromINR: roundToMarketingPrice(980 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "3★ City Hotels & Traditional Tohoku Onsen Ryokan (or similar)",
    bestMonths: ["October", "November"],
    highlights: [
      "Spectacular autumn foliage (koyo) journey through Japan's serene northern Tohoku wilderness",
      "Matsushima Bay cruise through pine-covered islands — officially recognized as one of Japan's Three Great Scenic Views",
      "Yamadera (Risshaku-ji Temple) climb — 1,000 ancient stone steps carved into a sheer mountain with panoramic autumn vistas",
      "Naruko Gorge — dramatic 100-meter deep gorge ablaze with gold, amber, and crimson foliage",
      "2 nights in authentic Tohoku onsen ryokans with healing sulfur and milky-white mineral hot springs",
      "Traditional handmade Kokeshi wooden doll painting workshop in Naruko Onsen"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Tokyo to Sendai by Shinkansen — Matsushima Bay Cruise",
        body: "Board the Hayabusa Shinkansen from Tokyo to Sendai (approx. 1.5 hours at 320 km/h; JR Pass included). Meet your private driver-guide and drive to Matsushima Bay, one of Japan's Three Views. Cruise among pine-clad islets ablaze with autumn colors and visit historic Zuigan-ji Zen Temple. Welcome dinner in Sendai.",
        meals: "Dinner",
        stay: "Hotel Metropolitan Sendai (or similar)"
      },
      {
        dayNumber: 2,
        title: "Sendai Castle Ruins, Naruko Gorge & Kokeshi Doll Workshop",
        body: "Visit Sendai's Aoba Castle ruins and the bronze statue of warlord Date Masamune with city vistas. Drive to Naruko Gorge, gazing down at brilliant autumn foliage framing the Ofukazawa Bridge. In Naruko Onsen, paint your own traditional wooden Kokeshi doll in a craft workshop. Soak in the ryokan's hot springs and enjoy a multi-course dinner.",
        meals: "Breakfast, Dinner",
        stay: "Naruko Kanko Hotel / Onsen Ryokan (or similar)"
      },
      {
        dayNumber: 3,
        title: "Naruko to Mountain Temple Yamadera & Zao Onsen",
        body: "Drive across mountain passes to Yamadera (Risshaku-ji Temple). Climb the 1,000 moss-covered stone steps winding through sacred cedar forests up to the cliffside Godaido hall for a breathtaking panorama of fiery autumn foliage. Continue to high-altitude Zao Onsen, soaking in milky-white natural hot springs before dinner.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Zao Kokusai Hotel / Takamiya Ryokan Miyamaso (or similar)"
      },
      {
        dayNumber: 4,
        title: "Zao Onsen, Fox Village & Historic Ginzan Onsen",
        body: "Enjoy a morning soak in Zao's sulfur onsen. Visit Zao Fox Village to see over 100 free-roaming foxes in a wooded sanctuary. In the afternoon, visit Ginzan Onsen, an enchanting hot spring village with Taisho-era multi-story wooden ryokans and gas lamps along a crystal stream. Overnight in Yamagata city.",
        meals: "Breakfast, Lunch",
        stay: "Hotel Metropolitan Yamagata (or similar)"
      },
      {
        dayNumber: 5,
        title: "Yamagata to Tokyo by Shinkansen — Tokyo Free Afternoon",
        body: "Board the Yamagata Shinkansen back to Tokyo (approx. 2.5 hours). Check into your Tokyo hotel. The afternoon is free for shopping and relaxation in Shibuya, Harajuku, or Ginza.",
        meals: "Breakfast",
        stay: "Shinjuku Washington Hotel / Hotel Gracery Shinjuku (or similar)"
      },
      {
        dayNumber: 6,
        title: "Depart Tokyo — Private Airport Transfer",
        body: "Enjoy breakfast at your hotel before your private transfer to Tokyo Narita or Haneda Airport for your return flight home.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "5 nights accommodation in 3★ city hotels & 2 nights authentic Tohoku Onsen Ryokans (twin-share, or similar)",
      "Daily breakfast, 1 Welcome Dinner, 2 Ryokan Kaiseki Dinners, 2 Lunches",
      "Private vehicle with dedicated driver and English-speaking guide in Tohoku",
      "6-Day Whole Japan JR Pass covering Shinkansen bullet trains",
      "Matsushima Bay scenic cruise ticket, Kokeshi doll workshop fee, and all listed temple and park admissions"
    ],
    exclusions: [
      "International flights",
      "Japan visa fees",
      "Travel insurance and personal expenses"
    ],
    visaNote: DEFAULT_JAPAN_VISA_NOTE,
    isGroup: false,
    groupSize: "Min 2 pax (private car + guide)",
    departureStyle: "Private FIT departure — Daily departures during peak autumn season (Oct–Nov)",
    sampleDates: "Daily departures October–November",
    audience: "Nature photographers, hot spring lovers, and travellers seeking serene, off-the-beaten-track Japan during the peak autumn foliage spectacle",
    isFeatured: false,
    relatedSlugs: [
      "japan-hokkaido-snow-nature-7d",
      "japan-kyoto-kanazawa-shirakawa-go-7d",
      "japan-adventure-hiking-rafting-cycling-8d"
    ],
    heroImage: "https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Tohoku Autumn Foliage & Onsen Tour 6D/5N | Hassle Free Travels",
    seoDescription: "Witness the magnificent autumn colors of northern Japan with Hassle Free Travels. Matsushima Bay, 1,000-step Yamadera mountain temple, Naruko gorge & Zao onsen ryokan.",
    mealsSummary: "Daily Breakfast, 1 Welcome Dinner in Sendai, 2 Ryokan Kaiseki Dinners, 2 Lunches",
    staySummary: "1N Sendai 3★, 1N Naruko Onsen Ryokan, 1N Zao Onsen Ryokan, 1N Yamagata 3★, 1N Tokyo 3★ (or similar)",
    transportSummary: "6-Day JR Pass + Private Car with English-speaking Guide + Shinkansen + Matsushima Bay Cruise",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Direct flights to Tokyo NRT / HND"]
  },

  // ─────────────────────────────────────────────────────────────
  // 16. FIT 14 — Japan Winter Illuminations & Snow Views (6D / 5N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "japan-winter-illuminations-tokyo-osaka-6d",
    destinationSlug: "japan",
    name: "Japan Winter Illuminations & Snow Views: Tokyo, Hakone, Kyoto & Osaka",
    tagline: "Tokyo Roppongi Lights → Hakone Mt Fuji Snow Views → Kyoto Winter Temples → Osaka Lights",
    days: 6,
    nights: 5,
    packageType: "custom",
    categoryLabel: "Private",
    route: "Tokyo → Hakone → Kyoto → Osaka",
    startCity: "Tokyo",
    endCity: "Osaka",
    priceFromUSD: 820,
    priceFromINR: roundToMarketingPrice(820 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "3★ City Hotels & Winter Onsen Ryokan (or similar)",
    bestMonths: ["December", "January", "February"],
    highlights: [
      "Experience Japan's magical winter wonderland of sparkling city illuminations and crisp snow-capped landscapes",
      "Tokyo's premier winter light spectacles: Roppongi Hills Keyakizaka blue tree avenue and Shinjuku Terrace City",
      "Crisp winter skies offering the clearest views of Mount Fuji from Hakone Ropeway and Lake Ashi",
      "Overnight winter onsen ryokan stay with steaming outdoor hot springs surrounded by crisp mountain air",
      "Quiet Kyoto winter temples dusted with snow and lantern-lit evening strolls through Gion",
      "Osaka Hikari Renaissance festive light displays illuminating Nakanoshima's historic public halls and river"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Arrive Tokyo — Private Transfer & Roppongi Hills Winter Illuminations",
        body: "Arrive in Tokyo. Meet your Hassle Free Travels driver and transfer by private car to your central hotel. In the evening, visit Roppongi Hills to stroll through the Keyakizaka blue illumination tunnel with Tokyo Tower glowing in the background. Welcome dinner in Tokyo.",
        meals: "Dinner",
        stay: "Hotel Gracery Shinjuku (or similar)"
      },
      {
        dayNumber: 2,
        title: "Tokyo Highlights — Senso-ji, teamLab Planets & Shibuya Sky Lights",
        body: "Visit ancient Senso-ji Temple in Asakusa. Step inside the mesmerizing digital light wonderland of teamLab Planets. Ascend to Shibuya Sky's open-air rooftop observatory at twilight to view Tokyo's sea of lights stretching to the horizon. In the evening, walk through Shinjuku Terrace City illuminations.",
        meals: "Breakfast",
        stay: "Hotel Gracery Shinjuku (or similar)"
      },
      {
        dayNumber: 3,
        title: "Tokyo to Hakone & Mt Fuji — Winter Snow Views, Ropeway & Onsen Ryokan",
        body: "Drive by private car to Hakone. Winter offers the clearest, most reliable views of Mount Fuji's snow-capped cone. Ascend toward Mt Fuji 5th Station (weather permitting; panoramic views of the crater and surrounding lakes, crater views weather permitting). Ride the Hakone Ropeway above volcanic Owakudani and cruise Lake Ashi. Check into a traditional onsen ryokan and soak in steaming outdoor hot springs. Kaiseki dinner.",
        meals: "Breakfast, Dinner",
        stay: "Hakone Yumoto Onsen Ryokan (or similar)"
      },
      {
        dayNumber: 4,
        title: "Hakone to Kyoto — Shinkansen & Snow-Dusted Temples",
        body: "Board the Shinkansen bullet train to Kyoto (JR Pass included). Visit the Golden Pavilion (Kinkaku-ji), often dusted in pristine winter snow. Stroll through the quiet, crowd-free lantern-lit alleys of Gion.",
        meals: "Breakfast",
        stay: "Keihan Kyoto Grande (or similar)"
      },
      {
        dayNumber: 5,
        title: "Fushimi Inari to Osaka — Osaka Hikari Renaissance Light Festival",
        body: "Visit Fushimi Inari Taisha in the crisp morning air. Transfer to energetic Osaka. In the evening, attend the festive Osaka Hikari Renaissance illumination festival along Nakanoshima river and Osaka City Hall. Savor a farewell dinner in Osaka.",
        meals: "Breakfast, Dinner",
        stay: "Hotel Monterey Grasmere Osaka (or similar)"
      },
      {
        dayNumber: 6,
        title: "Depart Osaka — Private Airport Transfer",
        body: "Enjoy breakfast before your private transfer to Kansai International Airport (KIX) for your flight home.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "5 nights accommodation in 3★ city hotels & 1 night Hakone Onsen Ryokan (twin-share, or similar)",
      "Daily breakfast, 1 Tokyo Welcome Dinner, 1 Hakone Ryokan Kaiseki Dinner, 1 Osaka Farewell Dinner",
      "Private vehicle with driver and English-speaking guide for scheduled tours",
      "6-Day Whole Japan JR Pass covering Shinkansen bullet trains",
      "teamLab Planets admission, Shibuya Sky observatory ticket, Hakone Ropeway and Lake Ashi cruise"
    ],
    exclusions: [
      "International flights",
      "Japan visa fees",
      "Travel insurance and personal expenses"
    ],
    visaNote: DEFAULT_JAPAN_VISA_NOTE,
    isGroup: false,
    groupSize: "Min 2 pax (private car + guide)",
    departureStyle: "Private FIT departure — Daily departures during winter illumination season (Dec–Feb)",
    sampleDates: "Daily departures December–February",
    audience: "Winter holidaymakers, couples, photography lovers, and festive season travellers looking for glittering lights and snow views",
    isFeatured: false,
    relatedSlugs: [
      "japan-tokyo-nightlife-culture-4d",
      "japan-hokkaido-snow-nature-7d",
      "japan-tokyo-fuji-kyoto-osaka-classic-private"
    ],
    heroImage: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Japan Winter Illuminations & Snow Views 6D/5N | Hassle Free Travels",
    seoDescription: "Experience Japan's winter magic with Hassle Free Travels. Tokyo illuminations, Mt Fuji snow views, Hakone onsen ryokan, winter Kyoto temples & Osaka light festivals.",
    mealsSummary: "Daily Breakfast, 1 Welcome Dinner in Roppongi, 1 Hakone Ryokan Dinner, 1 Farewell Dinner in Osaka",
    staySummary: "2N Tokyo 3★, 1N Hakone Ryokan with Onsen, 1N Kyoto 3★, 1N Osaka 3★ (or similar)",
    transportSummary: "6-Day JR Pass + Private Car with English-speaking Guide + Shinkansen Bullet Train",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Direct flights to Tokyo & Osaka"]
  },

  // ─────────────────────────────────────────────────────────────
  // 17. FIT 15 — Kyoto, Kanazawa & Shirakawa-go Gassho-Zukuri Heritage Trail (7D / 6N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "japan-kyoto-kanazawa-shirakawa-go-7d",
    destinationSlug: "japan",
    name: "Kyoto, Kanazawa & Shirakawa-go Gassho-Zukuri Heritage Trail",
    tagline: "Kyoto → Kanazawa Kenroku-en & Geisha District → Shirakawa-go Thatched Village → Tokyo",
    days: 7,
    nights: 6,
    packageType: "custom",
    categoryLabel: "Heritage",
    route: "Osaka / Kyoto → Kanazawa → Shirakawa-go → Nagoya → Tokyo",
    startCity: "Osaka",
    endCity: "Tokyo",
    priceFromUSD: 1120,
    priceFromINR: roundToMarketingPrice(1120 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "3★ City Hotels & 1N Authentic Gassho-Zukuri Farmhouse (or similar)",
    bestMonths: ["January", "February", "March", "April", "May", "September", "October", "November"],
    highlights: [
      "Venture into Japan's preserved feudal heartland along the historic Sea of Japan coast",
      "Kanazawa Kenroku-en Garden — celebrated as one of Japan's Three Great Landscape Gardens",
      "Preserved wooden machiya tea houses of Kanazawa's Higashi Chaya geisha district",
      "UNESCO World Heritage Shirakawa-go village with historic gassho-zukuri steep-thatched farmhouses",
      "1 night authentic overnight stay inside a historic thatched-roof gassho-zukuri farmhouse in Shirakawa-go",
      "Ninja-dera (Myoryu-ji) Temple in Kanazawa featuring trapdoors, hidden staircases, and secret tunnels"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Arrive Osaka (KIX) — Transfer to Kyoto & Gion Evening Walk",
        body: "Arrive at Kansai International Airport (KIX). Meet your Hassle Free Travels guide and transfer to Kyoto. In the evening, enjoy a guided stroll through the lantern-lit preservation streets of Gion, followed by a welcome dinner.",
        meals: "Dinner",
        stay: "Keihan Kyoto Grande (or similar)"
      },
      {
        dayNumber: 2,
        title: "Kyoto Highlights — Fushimi Inari, Golden Pavilion & Arashiyama Bamboo",
        body: "Visit Fushimi Inari Taisha at dawn. Tour Kinkaku-ji (Golden Pavilion) and explore the culinary delights of Nishiki Market. In the afternoon, walk through the soaring Arashiyama Bamboo Grove and visit Tenryu-ji Zen garden.",
        meals: "Breakfast, Lunch",
        stay: "Keihan Kyoto Grande (or similar)"
      },
      {
        dayNumber: 3,
        title: "Kyoto to Kanazawa — Thunderbird Express, Kenroku-en & Geisha Quarter",
        body: "Board the Thunderbird limited express train north to Kanazawa (approx. 2.5 hours; JR Pass included). Tour magnificent Kenroku-en Garden, admiring its stone lanterns, ponds, and seasonal pines. Explore Kanazawa Castle park and walk through the historic cobblestone lanes of Higashi Chaya geisha district.",
        meals: "Breakfast",
        stay: "Hotel Intergate Kanazawa / Hotel Trusty Kanazawa Korinbo (or similar)"
      },
      {
        dayNumber: 4,
        title: "Kanazawa Culinary & Secrets — Omicho Market & Ninja-dera Temple",
        body: "Visit vibrant Omicho Market, known as 'Kanazawa’s Kitchen', sampling fresh seasonal produce and street snacks. Tour the famous Ninja-dera (Myoryu-ji Temple), exploring its deceptive trapdoors, hidden guardrooms, and secret escape routes. Visit the 21st Century Museum of Contemporary Art in the afternoon.",
        meals: "Breakfast, Lunch",
        stay: "Hotel Intergate Kanazawa / Hotel Trusty Kanazawa Korinbo (or similar)"
      },
      {
        dayNumber: 5,
        title: "Kanazawa to Shirakawa-go — Thatched Village & Farmhouse Overnight",
        body: "Drive by private vehicle into the mountains to UNESCO World Heritage Shirakawa-go. Walk among preserved gassho-zukuri farmhouses built with steep thatched roofs designed to withstand heavy snow. Ascend to the Shiroyama Viewpoint for a fairytale panorama. Check into an authentic thatched-roof farmhouse for a unique overnight experience, enjoying a home-cooked regional dinner.",
        meals: "Breakfast, Dinner (Traditional farmhouse dinner)",
        stay: "Authentic Gassho-Zukuri Farmhouse Minshuku in Shirakawa-go (or similar)"
      },
      {
        dayNumber: 6,
        title: "Shirakawa-go to Tokyo via Nagoya — Shinkansen Bullet Train",
        body: "Wake up in the peaceful mountain village. Drive to Nagoya and board the high-speed Shinkansen bullet train to Tokyo (approx. 1.5 hours; JR Pass included). Check into your central Tokyo hotel with free time for shopping and dining in Shinjuku or Ginza.",
        meals: "Breakfast",
        stay: "Shinjuku Washington Hotel / Hotel Gracery Shinjuku (or similar)"
      },
      {
        dayNumber: 7,
        title: "Depart Tokyo — Private Airport Transfer",
        body: "Enjoy breakfast at your hotel before your private transfer to Tokyo Narita or Haneda Airport for your flight home.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "6 nights accommodation (2N Kyoto 3★, 2N Kanazawa 3★, 1N Shirakawa-go Gassho-Zukuri Farmhouse, 1N Tokyo 3★, twin-share, or similar)",
      "Daily breakfast, 1 Welcome Dinner in Kyoto, 2 Lunches (Arashiyama, Omicho Market), 1 Farmhouse Dinner in Shirakawa-go",
      "Private car and dedicated English-speaking guide for scheduled excursions",
      "7-Day Whole Japan JR Pass covering Thunderbird express and Shinkansen bullet train",
      "All admission fees for Kenroku-en Garden, Ninja-dera Temple, and listed cultural monuments"
    ],
    exclusions: [
      "International flights",
      "Japan visa fees",
      "Travel insurance and personal expenses"
    ],
    visaNote: DEFAULT_JAPAN_VISA_NOTE,
    isGroup: false,
    groupSize: "Min 2 pax (private car + guide)",
    departureStyle: "Private FIT departure — Daily departures (min 2 pax)",
    sampleDates: "Daily departures on request (Jan–Feb for snowy farmhouses)",
    audience: "Heritage enthusiasts, architecture lovers, and cultural explorers looking for authentic rural Japan and fairytale thatched-roof mountain villages",
    isFeatured: false,
    relatedSlugs: [
      "japan-tokyo-nikko-hakone-kyoto-hiroshima-11d",
      "japan-kyoto-spiritual-temple-immersion-6d",
      "japan-rail-pass-grand-tour-13d"
    ],
    heroImage: "https://images.unsplash.com/photo-1505069446780-45453e147171?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Kyoto, Kanazawa & Shirakawa-go Heritage Tour 7D/6N | Hassle Free Travels",
    seoDescription: "Discover traditional Japan with Hassle Free Travels. Kenroku-en garden in Kanazawa, overnight in a thatched gassho-zukuri farmhouse in Shirakawa-go, Kyoto temples & Shinkansen.",
    mealsSummary: "Daily Breakfast, 1 Welcome Dinner in Kyoto, 2 Lunches (Arashiyama, Omicho Market), 1 Farmhouse Dinner in Shirakawa-go",
    staySummary: "2N Kyoto 3★, 2N Kanazawa 3★, 1N Shirakawa-go Gassho-Zukuri Farmhouse, 1N Tokyo 3★ (or similar)",
    transportSummary: "7-Day JR Pass + Private Car with English-speaking Guide + Thunderbird Express + Shinkansen",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Direct flights to Osaka & Tokyo"]
  },

  // ─────────────────────────────────────────────────────────────
  // 18. FIT 16 — Japan Active Adventure: Mt Fuji Hike, Tone River Rafting, Kamikochi & Alps (8D / 7N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "japan-adventure-hiking-rafting-cycling-8d",
    destinationSlug: "japan",
    name: "Japan Active Adventure: Mt Fuji Hike, Tone River Rafting, Kamikochi & Alps",
    tagline: "Tokyo → Nikko Kegon Falls → Minakami Rafting → Kamikochi Alps Hike → Hakone → Kyoto Cycling",
    days: 8,
    nights: 7,
    packageType: "adventure",
    categoryLabel: "Adventure",
    route: "Tokyo → Nikko → Minakami → Kamikochi → Hakone → Mt Fuji → Kyoto",
    startCity: "Tokyo",
    endCity: "Osaka",
    priceFromUSD: 1450,
    priceFromINR: roundToMarketingPrice(1450 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "3★ City Hotels, Onsen Ryokan & Alpine Mountain Lodge (or similar)",
    bestMonths: ["May", "June", "July", "August", "September", "October"],
    highlights: [
      "Multi-sport adventure through Japan's most dramatic mountain and river landscapes",
      "White-water rafting on the roaring Tone River in Minakami (Grade 3–4 rapids with complete gear)",
      "Scenic hiking through the Kamikochi alpine valley in the Northern Japan Alps across Kappa Bridge and Myojin Pond",
      "Hike along Mt Fuji's Yoshida Trail (Stations 5–8 during July–September official climbing season, weather permitting)",
      "Guided cycling tour through the bamboo groves and riverside trails of Arashiyama in Kyoto",
      "Hike around Hakone's volcanic Owakudani sulphur vents and soak in mineral onsen ryokans"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Arrive Tokyo — Private Transfer & Gear Check",
        body: "Arrive in Tokyo. Meet your Hassle Free Travels adventure specialist guide and transfer to your hotel. Conduct an orientation and gear check for your upcoming hiking and rafting adventure, followed by a hearty welcome dinner in Shinjuku.",
        meals: "Dinner",
        stay: "Hotel Gracery Shinjuku (or similar)"
      },
      {
        dayNumber: 2,
        title: "Tokyo to Nikko — Tosho-gu Shrine & Kegon Falls Hike",
        body: "Drive by private vehicle to Nikko National Park. Tour the UNESCO Tosho-gu Shrine, then hike the trail leading to the base of thundering 97-meter Kegon Falls. Stroll along the shores of alpine Lake Chuzenji. Overnight in Nikko.",
        meals: "Breakfast, Lunch",
        stay: "Nikko Station Hotel Classic (or similar)"
      },
      {
        dayNumber: 3,
        title: "Nikko to Minakami — Tone River White-Water Rafting & Onsen Soak",
        body: "Drive to Minakami, Japan's premier outdoor adventure capital. Gear up with wetsuits, helmets, and life jackets for an adrenaline-pumping white-water rafting run down the Tone River (Grade 3–4 rapids). Enjoy a packed riverside lunch before checking into a traditional onsen ryokan to soothe tired muscles in natural hot springs.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Minakami Onsen Ryokan (or similar)"
      },
      {
        dayNumber: 4,
        title: "Minakami to Kamikochi — Alpine Valley Hike in the Japan Alps",
        body: "Drive west into the heart of Chubu Sangaku National Park to pristine Kamikochi valley. Embark on an 8-kilometer scenic round-trip hike from Taisho Pond across the wooden Kappa Bridge to tranquil Myojin Pond, with 3,000-meter alpine peaks towering overhead. Overnight at an alpine mountain lodge.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Kamikochi Onsen Hotel / Mountain Lodge (or similar)"
      },
      {
        dayNumber: 5,
        title: "Kamikochi to Hakone — Volcanic Owakudani Hike & Lake Ashi Cruise",
        body: "Drive across mountain roads to Hakone. Ride the Hakone Ropeway and hike the volcanic nature trail around smoking sulphur vents at Owakudani. Cruise across Lake Ashi against views of Mount Fuji before relaxing in your Hakone hotel.",
        meals: "Breakfast, Lunch",
        stay: "Hakone Hotel / Onsen Ryokan (or similar)"
      },
      {
        dayNumber: 6,
        title: "Mount Fuji Trail Hike — 5th to 8th Station on Yoshida Trail",
        body: "Tackle Mount Fuji! During the official July–September hiking season, hike from Mt Fuji 5th Station (2,305 m) up to the 8th Station (approx. 3,100 m) along the historic Yoshida Trail (approx. 4 hours up, 3 hours down, weather permitting). In non-climbing months, hike through the scenic Fuji Five Lakes trails and Aokigahara nature boardwalks. Overnight near Fuji.",
        meals: "Breakfast, Lunch",
        stay: "Highland Resort Hotel & Spa / Fuji View Hotel (or similar)"
      },
      {
        dayNumber: 7,
        title: "Mt Fuji to Kyoto by Shinkansen — Arashiyama Bamboo Cycling Tour",
        body: "Board the Shinkansen bullet train to Kyoto (JR Pass included). In the afternoon, rent bicycles for an invigorating guided cycling tour through Arashiyama Bamboo Grove, the riverside paths along Katsura River, and quiet temple backstreets. Conclude with an evening walk in Gion.",
        meals: "Breakfast",
        stay: "Keihan Kyoto Grande (or similar)"
      },
      {
        dayNumber: 8,
        title: "Depart Kyoto / Osaka — Transfer to Airport",
        body: "Enjoy breakfast at your hotel before your private transfer to Kansai International Airport (KIX) or Shinkansen return to Tokyo for your flight home.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "7 nights accommodation in 3★ hotels, mountain lodges, and onsen ryokans (twin-share, or similar)",
      "Daily breakfast, 1 Welcome Dinner, 5 Lunches (packed lunches for hikes/rafting), 2 Onsen/Lodge Dinners",
      "Private adventure minivan with dedicated driver and English-speaking outdoor specialist guide",
      "Tone River white-water rafting trip with professional river guides, safety craft, and complete gear",
      "8-Day Whole Japan JR Pass covering Shinkansen bullet train sectors",
      "Kamikochi eco-bus passes, Hakone Ropeway, Lake Ashi cruise, and all park entrance fees"
    ],
    exclusions: [
      "International flights",
      "Bicycle rental fee in Kyoto (approx. JPY 1,500)",
      "Japan visa fees and comprehensive adventure travel insurance"
    ],
    visaNote: DEFAULT_JAPAN_VISA_NOTE,
    isGroup: false,
    groupSize: "Min 2 pax (private adventure departure)",
    departureStyle: "Private FIT departure — Daily departures during hiking & rafting season (May–Oct)",
    sampleDates: "Daily departures May–October (July–Aug for Mt Fuji upper trail)",
    audience: "Active millennials, hikers, adventure seekers, and groups of friends looking for high-adrenaline outdoor sports in the Japanese Alps",
    isFeatured: false,
    relatedSlugs: [
      "japan-hokkaido-snow-nature-7d",
      "japan-tohoku-autumn-foliage-onsen-6d",
      "japan-tokyo-fuji-kyoto-osaka-classic-private"
    ],
    heroImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Japan Active Adventure 8D/7N | Mt Fuji Hike, Rafting & Kamikochi Alps | Hassle Free Travels",
    seoDescription: "An exhilarating outdoor adventure in Japan with Hassle Free Travels. Tone River rafting, Kamikochi alpine hiking, Mt Fuji trail, Hakone onsen & Kyoto cycling tour.",
    mealsSummary: "Daily Breakfast, 1 Welcome Dinner, 5 Packed/Trek Lunches, 2 Dinners (Minakami Ryokan, Kamikochi Lodge)",
    staySummary: "1N Tokyo 3★, 1N Nikko 3★, 1N Minakami Onsen Ryokan, 1N Kamikochi Mountain Lodge, 1N Hakone 3★, 1N Mt Fuji area, 1N Kyoto 3★ (or similar)",
    transportSummary: "8-Day JR Pass + Private Adventure Minivan with Outdoor Specialist Guide + Rafting Equipment",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Direct flights to Tokyo & Osaka"]
  },

  // ─────────────────────────────────────────────────────────────
  // 19. FIT 17 — Tokyo After Dark & Urban Culture Short Break (4D / 3N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "japan-tokyo-nightlife-culture-4d",
    destinationSlug: "japan",
    name: "Tokyo After Dark & Urban Culture Short Break",
    tagline: "Shinjuku Neon → Shibuya Sky Sunset → Odaiba Skyline → Akihabara & Harajuku",
    days: 4,
    nights: 3,
    packageType: "custom",
    categoryLabel: "Pop Culture",
    route: "Tokyo (Shinjuku, Shibuya, Odaiba, Akihabara, Harajuku, Asakusa)",
    startCity: "Tokyo",
    endCity: "Tokyo",
    priceFromUSD: 420,
    priceFromINR: roundToMarketingPrice(420 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "3★ Central Tokyo Hotel (or similar)",
    bestMonths: ["January", "February", "March", "April", "May", "June", "September", "October", "November", "December"],
    highlights: [
      "Our most affordable Japan package — ideal for solo travellers, couples, and youth city breaks",
      "Nightlife-light experience exploring Tokyo's neon streets, twilight observatories, and food lanes (suitable for all travellers, alcohol-free options throughout)",
      "Shinjuku Kabukicho neon walking tour & Omoide Yokocho street food alleyway",
      "Sunset from the open-air rooftop of Shibuya Sky and evening view of Shibuya Crossing",
      "Odaiba waterfront night skyline across Tokyo Bay with the illuminated Rainbow Bridge",
      "Akihabara evening gaming arcades and Mori Art Museum late-night gallery opening in Roppongi Hills"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Arrive Tokyo — Private Transfer & Shinjuku Night Walk",
        body: "Arrive at Tokyo Narita or Haneda Airport. Your private chauffeur transfers you to your central hotel. In the evening, step out with your Hassle Free Travels guide to explore Shinjuku's neon-lit Kabukicho district and the historic lanterns of Omoide Yokocho with grilled vegetarian skewers and street food for dinner.",
        meals: "Dinner",
        stay: "Shinjuku Washington Hotel / Hotel Gracery Shinjuku (or similar)"
      },
      {
        dayNumber: 2,
        title: "Senso-ji, teamLab Planets & Odaiba Waterfront Night View",
        body: "Visit historic Senso-ji Temple in Asakusa, followed by views from Tokyo Skytree. In the afternoon, explore the interactive digital art installations at teamLab Planets in Toyosu. In the evening, head to the Odaiba waterfront to see the illuminated Rainbow Bridge, Palette Town, and the giant Unicorn Gundam statue glowing against Tokyo Bay.",
        meals: "Breakfast",
        stay: "Shinjuku Washington Hotel / Hotel Gracery Shinjuku (or similar)"
      },
      {
        dayNumber: 3,
        title: "Harajuku Street Culture, Akihabara Arcades & Sunset Shibuya Sky",
        body: "Stroll down Harajuku Takeshita Street, trying street food crepes. In the afternoon, explore Akihabara's multi-level retro gaming arcades and anime stores. At dusk, ascend to the 360-degree open-air rooftop observatory at Shibuya Sky, watching the sunset and looking down over the bustling Shibuya Crossing scramble. Visit Roppongi Hills for evening art exhibitions at Mori Art Museum.",
        meals: "Breakfast, Lunch",
        stay: "Shinjuku Washington Hotel / Hotel Gracery Shinjuku (or similar)"
      },
      {
        dayNumber: 4,
        title: "Depart Tokyo — Final Souvenir Shopping & Airport Transfer",
        body: "Enjoy breakfast at your hotel before your private transfer to Tokyo Narita or Haneda Airport for your scheduled flight home.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "3 nights accommodation in central Tokyo 3★ hotel in Shinjuku/Shibuya (twin-share, or similar)",
      "Daily breakfast, 1 Shinjuku Omoide Yokocho Welcome Dinner, 1 Harajuku Street Food Lunch",
      "Private car and dedicated English-speaking guide for evening walking tours and transfers",
      "teamLab Planets admission ticket",
      "Tokyo Skytree observation deck ticket",
      "Shibuya Sky rooftop observatory admission ticket",
      "Mori Art Museum admission ticket (seasonal)"
    ],
    exclusions: [
      "International flights",
      "Japan visa fees",
      "Travel insurance and personal expenses"
    ],
    visaNote: DEFAULT_JAPAN_VISA_NOTE,
    isGroup: false,
    groupSize: "Min 2 pax (private car + guide)",
    departureStyle: "Private FIT departure — Daily departures (min 2 pax)",
    sampleDates: "Daily departures on request",
    audience: "Young Indian solo travellers, friend groups, Gen Z and millennials wanting urban evening exploration without alcohol-centric venues",
    isFeatured: false,
    relatedSlugs: [
      "japan-tokyo-pop-culture-anime-5d",
      "japan-tokyo-fuji-short-break-4d",
      "japan-winter-illuminations-tokyo-osaka-6d"
    ],
    heroImage: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Tokyo After Dark & Urban Culture 4D/3N Tour | Hassle Free Travels",
    seoDescription: "Explore Tokyo by night with Hassle Free Travels from ₹35,999. Shibuya Sky sunset, teamLab Planets, Shinjuku neon, Odaiba skyline & Akihabara with private guide.",
    mealsSummary: "Daily Breakfast, 1 Shinjuku Omoide Yokocho Welcome Dinner, 1 Harajuku Street Food Lunch",
    staySummary: "3N Central Tokyo 3★ Hotel in Shinjuku/Shibuya (or similar)",
    transportSummary: "Private Car with English-speaking Guide for Evening Walks + Tokyo Metro Passes",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Direct flights to Tokyo NRT / HND"]
  },

  // ─────────────────────────────────────────────────────────────
  // 20. FIT 18 — Japan Rail Pass Grand Circuit: Tokyo to Kyushu 8-City Odyssey (13D / 12N)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "japan-rail-pass-grand-tour-13d",
    destinationSlug: "japan",
    name: "Japan Rail Pass Grand Circuit: Tokyo to Kyushu 8-City Odyssey",
    tagline: "Tokyo → Nikko → Hakone & Mt Fuji → Kyoto → Nara → Hiroshima & Miyajima → Beppu Onsen → Nagasaki → Fukuoka",
    days: 13,
    nights: 12,
    packageType: "custom",
    categoryLabel: "Heritage",
    route: "Tokyo → Nikko → Hakone → Kyoto → Nara → Hiroshima → Miyajima → Osaka → Beppu → Nagasaki → Fukuoka",
    startCity: "Tokyo",
    endCity: "Fukuoka",
    priceFromUSD: 2180,
    priceFromINR: roundToMarketingPrice(2180 * USD_TO_INR),
    priceUnit: "per person (twin share)",
    priceNote: "From · per person · twin share · land only · international flights extra",
    hotelCategory: "3★ / 4★ City Hotels & Traditional Onsen Ryokan (or similar)",
    bestMonths: ["March", "April", "May", "September", "October", "November"],
    highlights: [
      "The ultimate 13-day trans-Japan overland odyssey traversing 8 iconic cities on the Shinkansen bullet train",
      "UNESCO Nikko shrines (Tosho-gu) and thunderous Kegon Falls",
      "Hakone onsen ryokan overnight stay with Lake Ashi cruise and Mount Fuji views",
      "Three full days immersed in ancient Kyoto's bamboo groves, Golden Pavilion, and Fushimi Inari",
      "Hiroshima Peace Memorial Park, Museum, and Miyajima Island's floating Itsukushima Torii Gate",
      "Kyushu deep-dive: steaming Beppu onsen hot sand baths, historic Nagasaki, and Fukuoka Yatai food stalls",
      "Includes a 14-Day Whole Japan JR Pass for unlimited Shinkansen bullet train travel throughout"
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Arrive Tokyo — Private Transfer & Shinjuku Night Walk",
        body: "Touch down in Tokyo. Meet your Hassle Free Travels representative for a private transfer to your hotel. Evening walking tour of Shinjuku neon district and welcome dinner.",
        meals: "Dinner",
        stay: "Hotel Gracery Shinjuku (or similar)"
      },
      {
        dayNumber: 2,
        title: "Nikko UNESCO Day Excursion — Tosho-gu Shrine & Kegon Falls",
        body: "Drive by private vehicle to Nikko National Park. Tour opulent Tosho-gu Shrine (UNESCO), see the Three Wise Monkeys woodcarving, and admire 97-meter Kegon Falls plunging from Lake Chuzenji. Return to Tokyo.",
        meals: "Breakfast, Lunch",
        stay: "Hotel Gracery Shinjuku (or similar)"
      },
      {
        dayNumber: 3,
        title: "Tokyo Highlights — Asakusa Senso-ji, teamLab Planets & Shibuya Sky",
        body: "Visit ancient Senso-ji Temple in Asakusa. Immerse in the digital light installations of teamLab Planets in Toyosu. Cross the famous Shibuya Crossing and gaze across Tokyo from the open-air rooftop of Shibuya Sky.",
        meals: "Breakfast",
        stay: "Hotel Gracery Shinjuku (or similar)"
      },
      {
        dayNumber: 4,
        title: "Tokyo to Hakone & Mt Fuji — 5th Station, Ropeway & Onsen Ryokan",
        body: "Drive to Hakone. Ascend to Mt Fuji 5th Station (weather permitting; panoramic views of the crater and surrounding lakes, crater views weather permitting). Ride the Hakone Ropeway above volcanic Owakudani and cruise Lake Ashi. Check into a traditional onsen ryokan, soak in natural hot springs, and savor a multi-course Kaiseki dinner.",
        meals: "Breakfast, Dinner",
        stay: "Hakone Yumoto Onsen Ryokan (or similar)"
      },
      {
        dayNumber: 5,
        title: "Hakone to Kyoto by Shinkansen — Gion Geisha Quarter Walk",
        body: "Board the Shinkansen bullet train from Odawara to Kyoto (approx. 2 hours; 14-Day JR Pass included). Arrive in ancient Kyoto and take a guided twilight walk through the cobblestone streets of Gion.",
        meals: "Breakfast",
        stay: "Keihan Kyoto Grande (or similar)"
      },
      {
        dayNumber: 6,
        title: "Kyoto Heritage — Fushimi Inari, Golden Pavilion & Nishiki Market",
        body: "Rise early for Fushimi Inari Taisha's endless orange torii paths. Tour the glistening Golden Pavilion (Kinkaku-ji) and dive into Nishiki Market for a guided street food tasting lunch.",
        meals: "Breakfast, Lunch",
        stay: "Keihan Kyoto Grande (or similar)"
      },
      {
        dayNumber: 7,
        title: "Kyoto Bamboo & Shogun Palace + Nara Sika Deer Park",
        body: "Wander through Arashiyama Bamboo Grove and visit Tenryu-ji Zen garden. Tour historic Nijo Castle with its squeaking nightingale floors. In the afternoon, take a side excursion to Nara to visit the Great Bronze Buddha at Todai-ji and feed bowing deer in Nara Park.",
        meals: "Breakfast",
        stay: "Keihan Kyoto Grande (or similar)"
      },
      {
        dayNumber: 8,
        title: "Kyoto to Hiroshima & Miyajima Island — Peace Memorial & Floating Torii",
        body: "Board the Shinkansen to Hiroshima. Visit the Hiroshima Peace Memorial Park, Museum, and A-Bomb Dome (UNESCO). Take the scenic ferry to sacred Miyajima Island to behold the floating torii gate of Itsukushima Shrine. Hiroshima okonomiyaki lunch.",
        meals: "Breakfast, Lunch",
        stay: "Hotel Granvia Hiroshima (or similar)"
      },
      {
        dayNumber: 9,
        title: "Hiroshima to Osaka — Osaka Castle & Dotonbori Canal",
        body: "Board the Shinkansen to Osaka. Tour historic Osaka Castle and Kuromon Market before exploring the illuminated street food canal of Dotonbori.",
        meals: "Breakfast",
        stay: "Hotel Monterey Grasmere Osaka (or similar)"
      },
      {
        dayNumber: 10,
        title: "Osaka to Beppu Onsen (Kyushu) — The 8 Hells & Volcanic Sand Bath",
        body: "Ride the Shinkansen and sonic limited express train across the Kanmon Straits into Kyushu to Beppu Onsen. Tour the steaming '8 Hells' of Beppu and enjoy a relaxing hot sand bath on the beach before checking into an onsen ryokan for a Kaiseki dinner.",
        meals: "Breakfast, Dinner",
        stay: "Suginoi Hotel Beppu (or similar)"
      },
      {
        dayNumber: 11,
        title: "Beppu to Nagasaki — Glover Garden, Dejima & Peace Park",
        body: "Take the express train across Kyushu to historic Nagasaki. Tour hillside Glover Garden, Dejima Dutch trading post museum, and Nagasaki Peace Park.",
        meals: "Breakfast, Lunch",
        stay: "Hotel New Nagasaki (or similar)"
      },
      {
        dayNumber: 12,
        title: "Nagasaki to Fukuoka — Ohori Park & Yatai Street Food Stalls",
        body: "Travel by limited express train to vibrant Fukuoka. Stroll through Ohori Park and visit Fukuoka Castle ruins. In the evening, dine at the famous riverside Yatai food stalls on Nakasu Island.",
        meals: "Breakfast",
        stay: "Hotel Nikko Fukuoka (or similar)"
      },
      {
        dayNumber: 13,
        title: "Depart Fukuoka — Private Airport Transfer",
        body: "Enjoy breakfast at your hotel before your private transfer to Fukuoka Airport (FUK) for your scheduled flight home.",
        meals: "Breakfast",
        stay: "Departure flight"
      }
    ],
    inclusions: [
      "12 nights accommodation in 3★/4★ city hotels & 2 nights authentic Onsen Ryokans (Hakone & Beppu, twin-share, or similar)",
      "Daily breakfast, 1 Welcome Dinner in Tokyo, 5 Lunches (Nikko, Nishiki Market, Hiroshima, Beppu, Nagasaki), 2 Ryokan Kaiseki Dinners",
      "14-Day Whole Japan JR Pass covering all Shinkansen bullet trains and express rail lines across Honshu and Kyushu",
      "Private car for local transfers and English-speaking guide (Days 1–3 and Days 12–13) + curated Hassle Free Travels route notes for middle sectors",
      "teamLab Planets admission, Shibuya Sky observatory ticket, Hakone Ropeway, Lake Ashi cruise, Miyajima ferry, Beppu 8 Hells admission, and sand bath entry"
    ],
    exclusions: [
      "International flights",
      "Japan visa fees",
      "Travel insurance and personal expenses"
    ],
    visaNote: DEFAULT_JAPAN_VISA_NOTE,
    isGroup: false,
    groupSize: "Min 2 pax (private + rail circuit)",
    departureStyle: "Private + Shinkansen FIT departure — Daily departures (min 2 pax)",
    sampleDates: "Daily departures on request",
    audience: "Long-vacation travellers, railway enthusiasts, and comprehensive multi-city Japan explorers seeking the ultimate rail circuit from Tokyo to Kyushu",
    isFeatured: true,
    relatedSlugs: [
      "japan-tokyo-nikko-hakone-kyoto-hiroshima-11d",
      "japan-hiroshima-miyajima-kyushu-7d",
      "japan-kansai-tokyo-explorer-10d"
    ],
    heroImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Japan Rail Pass Grand Tour 13D/12N | Tokyo to Kyushu 8-City Circuit | Hassle Free Travels",
    seoDescription: "The definitive 13-day Japan rail tour with Hassle Free Travels. 14-day JR Pass, Shinkansen across 8 cities: Tokyo, Nikko, Hakone, Kyoto, Nara, Hiroshima, Beppu onsen, Nagasaki & Fukuoka.",
    mealsSummary: "Daily Breakfast, 1 Welcome Dinner in Tokyo, 5 Lunches (Nikko, Nishiki, Hiroshima, Beppu, Nagasaki), 2 Ryokan Kaiseki Dinners (Hakone, Beppu)",
    staySummary: "3N Tokyo 3★, 1N Hakone Onsen Ryokan, 3N Kyoto 3★, 1N Hiroshima 3★, 1N Osaka 3★, 1N Beppu Onsen Ryokan, 1N Nagasaki 3★, 1N Fukuoka 3★ (or similar)",
    transportSummary: "14-Day JR Pass + Private Car for Local Transfers + English Guide (Days 1–3 & Days 12–13) + Curated Hassle Free Travels Route Notes",
    departureCities: ["Delhi", "Mumbai", "Bengaluru", "Connections to Tokyo NRT/HND and returning from Fukuoka FUK"]
  }
];

// Generate TypeScript source file
function generateTsFile() {
  const tsContent = `export interface JapanDay {
  dayNumber: number;
  title: string;
  body: string;
  meals?: string;
  stay?: string;
}

export interface JapanPackage {
  slug: string;
  destinationSlug: "japan";
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
  itineraryDays: JapanDay[];
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
  return Math.ceil(inr / 1000) * 1000 - 1; // e.g. 58716 -> 58999
}

export const DEFAULT_JAPAN_VISA_NOTE =
  "Japan tourist visa required for Indian passport holders. Apply at the Japanese Embassy or Consulate in India (Mumbai, Delhi, Chennai, Kolkata, Bengaluru). Processing time: approximately 5–7 working days. Fee: approx. INR 540 (single entry). No visa on arrival. Hassle Free Travels can provide a visa support letter on request. Reference: https://www.in.emb-japan.go.jp/itpr_en/visa.html";

export const JAPAN_PACKAGES: JapanPackage[] = ${JSON.stringify(packages, null, 2)};

export function getJapanPackageBySlug(slug: string): JapanPackage | undefined {
  return JAPAN_PACKAGES.find((pkg) => pkg.slug === slug);
}

export function getJapanFeaturedPackages(): JapanPackage[] {
  return JAPAN_PACKAGES.filter((pkg) => pkg.isFeatured);
}
`;

  const targetPath = path.resolve("src/data/japan-packages.ts");
  fs.writeFileSync(targetPath, tsContent, "utf-8");
  console.log("Successfully generated " + targetPath + " with " + packages.length + " packages!");
}

generateTsFile();
