import fs from "fs";
import path from "path";

export const USD_TO_INR = 84;

export function roundToMarketingPrice(inr) {
  return Math.ceil(inr / 1000) * 1000 - 1; // e.g. 58716 -> 58999
}

export const EGYPT_VISA_NOTE =
  "Indian passport holders can obtain an Egypt tourist visa on arrival at Cairo International Airport (USD 25, single entry, 30 days) or apply for an e-visa in advance at https://visa2egypt.gov.eg (USD 25, processing 3–5 business days). Hassle Free Travels provides a support letter for visa applications on request.";

const IMAGES = {
  pyramids: "https://images.unsplash.com/photo-1539667468225-eebb663053e6?auto=format&fit=crop&w=1200&q=80",
  luxor: "https://images.unsplash.com/photo-1598285521996-857c7d42df2e?auto=format&fit=crop&w=1200&q=80",
  aswan: "https://images.unsplash.com/photo-1601217036662-799a4e9b9961?auto=format&fit=crop&w=1200&q=80",
  red_sea: "https://images.unsplash.com/photo-1540134018671-55866b17c767?auto=format&fit=crop&w=1200&q=80",
  nile_cruise: "https://images.unsplash.com/photo-1582299849206-383792cbcc28?auto=format&fit=crop&w=1200&q=80",
  petra: "https://images.unsplash.com/photo-1502016335345-3db3ad6de036?auto=format&fit=crop&w=1200&q=80",
  generic_egypt: "https://images.unsplash.com/photo-1572252009286-268caa47ea56?auto=format&fit=crop&w=1200&q=80"
};

function assignImage(title) {
  const t = title.toLowerCase();
  if (t.includes("jordan") || t.includes("petra")) return IMAGES.petra;
  if (t.includes("red sea") || t.includes("hurghada") || t.includes("sharm")) return IMAGES.red_sea;
  if (t.includes("luxor") || t.includes("nile") || t.includes("cruise") || t.includes("aswan")) return IMAGES.nile_cruise;
  return IMAGES.pyramids;
}

// Clean text helper to strip DMC names and rewrite to HFT brand voice
function cleanBrandVoice(text) {
  if (!text) return "";
  let cleaned = text
    .replace(/Memphis Tours/g, "Hassle Free Travels")
    .replace(/Abercrombie & Kent Egypt/g, "Hassle Free Travels")
    .replace(/Travcotels/g, "Hassle Free Travels")
    .replace(/Emeco Travel/g, "Hassle Free Travels")
    .replace(/Eastmar Travel/g, "Hassle Free Travels")
    .replace(/Misr Travel/g, "Hassle Free Travels")
    .replace(/Nile Holiday/g, "Hassle Free Travels")
    .replace(/Destination Asia Egypt/g, "Hassle Free Travels")
    .replace(/Soliman Travel/g, "Hassle Free Travels")
    .replace(/Egypt Tailor Made/g, "Hassle Free Travels")
    .replace(/Abercrombie & Kent/gi, "Hassle Free Travels")
    .replace(/A&K/gi, "Hassle Free Travels")
    .replace(/Destination Asia/gi, "Hassle Free Travels")
    .replace(/ETM/g, "Hassle Free Travels");
    
  return cleaned.trim();
}

export function buildPackages() {
  const mdPath = path.resolve("Egypt-packages-hft.md");
  if (!fs.existsSync(mdPath)) {
    console.error("Markdown file not found:", mdPath);
    return [];
  }

  const rawText = fs.readFileSync(mdPath, "utf-8");
  const sections = rawText.split(/(?=### (?:Rank|FIT|Special)\s+\d+)/g).slice(1);
  const resultPackages = [];

  for (let i = 0; i < sections.length; i++) {
    const sectionText = sections[i];

    // Extract Title Match
    const titleMatch = sectionText.match(/### (?:Rank|FIT|Special)\s+\d+\s+—\s+(.*?)\s*\((.*?)\)/i);
    if (!titleMatch) continue;
    
    let rawTitle = cleanBrandVoice(titleMatch[1].trim());
    let rawDuration = titleMatch[2].trim();

    // Extract basic fields
    const urlMatch = sectionText.match(/(?:\*\*Product URL:\*\*|\*\*URL:\*\*)\s*(.*?)\n/i);
    const priceMatch = sectionText.match(/(?:\*\*From-price:\*\*|\*\*Starting price:\*\*)\s*(.*?)\n/i);
    const startEndMatch = sectionText.match(/\*\*Start\/End airports:\*\*\s*(.*?)\n/i);
    const bestMonthsMatch = sectionText.match(/\*\*Best months:\*\*\s*(.*?)\n/i);
    
    // Check if it's Group or Private
    const isGroup = sectionText.includes("### Rank");
    const packageType = isGroup ? "group" : "custom";
    
    let categoryLabel = "Private";
    if (isGroup) categoryLabel = "Group";
    if (rawTitle.toLowerCase().includes("luxury")) categoryLabel = "Luxury";
    if (rawTitle.toLowerCase().includes("budget") || rawTitle.toLowerCase().includes("hostel")) categoryLabel = "Budget";
    if (rawTitle.toLowerCase().includes("jordan") || rawTitle.toLowerCase().includes("twin-country")) categoryLabel = "Twin-Country";

    // Duration processing
    const nightsMatch = rawDuration.match(/(\d+)\s*night/i);
    const daysMatch = rawDuration.match(/(\d+)\s*day/i);
    const nights = nightsMatch ? parseInt(nightsMatch[1], 10) : 0;
    const days = daysMatch ? parseInt(daysMatch[1], 10) : 0;

    // Slug generation
    let slug = rawTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (!slug.endsWith(`-${days}d`)) {
      slug += `-${days}d`;
    }

    // Pricing
    const priceFromUSD = priceMatch ? parseInt(priceMatch[1].replace(/[^0-9]/g, ""), 10) : 0;
    const priceFromINR = roundToMarketingPrice(priceFromUSD * USD_TO_INR);
    const priceNote = "From · per person · twin share · land only · international flights extra";

    // Start/End Cities
    let startCity = "Cairo (CAI)";
    let endCity = "Cairo (CAI)";
    if (startEndMatch) {
      const parts = startEndMatch[1].split(/→|out/i);
      if (parts[0]) startCity = parts[0].replace(/in/i, '').trim();
      if (parts[1]) endCity = parts[1].trim();
    }
    
    let departureCities = ["Delhi", "Mumbai", "Bengaluru", "Chennai"];

    // Itinerary Parsing
    let itineraryDays = [];
    const dayRegex = /(?:^|\n)(?:\*\*Day \d+.*?|\*\*Day \d+ —.*?|Day \d+ —.*?)\n([\s\S]*?)(?=(?:\n\*\*Day \d+.*?|\nDay \d+ —.*?|\n\*\*Inclusions:\*\*|\n#### Inclusions|$))/gi;
    const dayMatches = Array.from(sectionText.matchAll(dayRegex));
    let dayCounter = 1;

    for (const match of dayMatches) {
      const fullDayText = match[0].trim();
      const firstLine = fullDayText.split('\n')[0];
      const title = cleanBrandVoice(firstLine.replace(/\*\*/g, '').trim());
      let bodyText = fullDayText.replace(firstLine, '').trim();

      let meals = "Breakfast";
      const mealsMatch = bodyText.match(/Meals:\s*(.*?)(?:\n|$)/i);
      if (mealsMatch) {
        let mText = mealsMatch[1].trim();
        mText = mText.replace(/B/i, "Breakfast").replace(/L/i, "Lunch").replace(/D/i, "Dinner");
        meals = mText;
        bodyText = bodyText.replace(mealsMatch[0], '').trim();
      }
      
      let stay = "Premium Hotel / Resort / Cruise";
      if (title.toLowerCase().includes("cruise") || bodyText.toLowerCase().includes("cruise")) {
         stay = "Nile Cruise Cabin";
      } else if (title.toLowerCase().includes("cairo")) {
         stay = "4★ Hotel Cairo";
      }

      itineraryDays.push({
        dayNumber: dayCounter,
        title: title,
        body: cleanBrandVoice(bodyText),
        meals,
        stay
      });
      dayCounter++;
    }

    if (itineraryDays.length === 0) {
      // Fallback if day parsing fails
      for (let j = 1; j <= days; j++) {
        itineraryDays.push({
          dayNumber: j,
          title: `Day ${j}`,
          body: `Detailed itinerary to be provided.`,
          meals: "Breakfast",
          stay: "Premium Hotel"
        });
      }
    }

    // Extract Highlights
    let highlights = [];
    const hlMatch = sectionText.match(/(?:\*\*Highlights:\*\*|#### Why this is a top seller)[\s\S]*?(?=\*\*Full Itinerary:\*\*|#### Full Day-by-Day|\*\*Day 1)/i);
    if (hlMatch) {
      const hlLines = hlMatch[0].split("\n").filter(l => l.trim().startsWith("-"));
      highlights = hlLines.map(l => cleanBrandVoice(l.replace(/^-\s*/, "").trim())).filter(Boolean);
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

    const visaNote = EGYPT_VISA_NOTE;

    const audience = isGroup
      ? "Young Indian group travellers, friends & solo explorers seeking guaranteed departures with Indian-friendly vegetarian dining and guided sightseeing."
      : "Couples, families, and private groups seeking flexible start times, dedicated private vehicle, verified stays, and stress-free Egypt travel.";

    const seoTitle = `${rawTitle} (${days}D/${nights}N) | Hassle Free Travels`;
    const seoDescription = `Handcrafted ${days}D/${nights}N Egypt holiday: ${startCity} to ${endCity}. E-visa assistance, verified stays, Indian veg dining options & seamless WhatsApp booking.`;

    const bestMonths = bestMonthsMatch ? bestMonthsMatch[1].trim().split(/,|;/).map(m => m.trim()) : ["Oct - Apr"];
    let hotelCategory = "4★ Premium Hotels & Nile Cruise";
    if (rawTitle.toLowerCase().includes("budget")) hotelCategory = "3★ / Budget / Hostels";
    if (rawTitle.toLowerCase().includes("luxury") || sectionText.toLowerCase().includes("5★")) hotelCategory = "5★ Luxury Hotels & Nile Cruise";

    let route = `${startCity} → ${endCity}`;
    if (sectionText.toLowerCase().includes("luxor") && sectionText.toLowerCase().includes("aswan")) {
      route = `${startCity} → Luxor → Nile Cruise → Aswan → ${endCity}`;
    }

    resultPackages.push({
      slug: slug,
      destinationSlug: "egypt",
      name: rawTitle,
      tagline: route,
      days,
      nights,
      packageType,
      categoryLabel,
      route,
      startCity,
      endCity,
      priceFromUSD,
      priceFromINR,
      priceUnit: "per person (twin share)",
      priceNote,
      hotelCategory,
      bestMonths,
      highlights,
      itineraryDays,
      inclusions,
      exclusions,
      visaNote,
      isGroup,
      groupSize: isGroup ? "Min 2 / Max 24 pax" : "Private vehicle",
      departureStyle: isGroup ? "Fixed-date guaranteed departures" : "Private departure daily",
      audience,
      isFeatured: i < 5, // Top 5 are featured
      relatedSlugs: [], // Will populate later if needed
      heroImage: assignImage(rawTitle),
      seoTitle,
      seoDescription,
      mealsSummary: "Daily Breakfast, select Lunches/Dinners (Vegetarian/Jain options on request)",
      staySummary: hotelCategory,
      transportSummary: "Private A/C transfers & applicable domestic flights",
      departureCities,
      sourceUrl: urlMatch ? urlMatch[1] : ""
    });
  }

  // Map related slugs to first 3 elements that aren't itself
  for (let pkg of resultPackages) {
    pkg.relatedSlugs = resultPackages.filter(p => p.slug !== pkg.slug).slice(0, 3).map(p => p.slug);
  }

  return resultPackages;
}

export function generateTsFile() {
  const packages = buildPackages();

  const tsContent = `// Auto-generated by scripts/build-egypt-packages.mjs
// Do not edit manually - run 'node scripts/build-egypt-packages.mjs' to regenerate

export interface EgyptDay {
  dayNumber: number;
  title: string;
  body: string;
  meals?: string;
  stay?: string;
}

export interface EgyptPackage {
  slug: string;
  destinationSlug: "egypt";
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
  itineraryDays: EgyptDay[];
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
  return Math.ceil(inr / 1000) * 1000 - 1; 
}

export const EGYPT_VISA_NOTE = ${JSON.stringify(EGYPT_VISA_NOTE)};

export const EGYPT_PACKAGES: EgyptPackage[] = ${JSON.stringify(packages, null, 2)};

export function getEgyptPackageBySlug(slug: string): EgyptPackage | undefined {
  const clean = slug.toLowerCase();
  return EGYPT_PACKAGES.find(
    (pkg) =>
      pkg.slug === clean ||
      pkg.slug.replace("-private-", "-") === clean ||
      clean.replace("-private-", "-") === pkg.slug.replace("-private-", "-")
  );
}

export function getEgyptFeaturedPackages(): EgyptPackage[] {
  return EGYPT_PACKAGES.filter((pkg) => pkg.isFeatured);
}
`;

  const targetPath = path.resolve("src/data/egypt-packages.ts");
  fs.writeFileSync(targetPath, tsContent, "utf-8");
  console.log("Successfully generated " + targetPath + " with " + packages.length + " packages!");
}

generateTsFile();
