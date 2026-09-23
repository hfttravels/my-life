import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
dotenv.config()

import { getPayload } from 'payload'
import config from '../payload.config'
import { ALL_DESTINATIONS } from '../data/destinations'
import { THAILAND_PACKAGES } from '../data/thailand-packages'
import { JAPAN_PACKAGES } from '../data/japan-packages'
import { SRI_LANKA_PACKAGES } from '../data/sri-lanka-packages'
import { MALAYSIA_PACKAGES } from '../data/malaysia-packages'
import { MALDIVES_PACKAGES } from '../data/maldives-packages'
import { EGYPT_PACKAGES } from '../data/egypt-packages'
import { BLOG_POSTS } from '../data/blogs'

function textToLexical(text: string) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: text
        .split('\n\n')
        .filter(Boolean)
        .map((paragraph) => ({
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          direction: 'ltr',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: paragraph.trim(),
              version: 1,
            },
          ],
        })),
    },
  }
}

async function runSeed() {
  console.log('🌱 Starting Payload CMS seed...')
  const payload = await getPayload({ config })
  const context = { disableRevalidation: true }

  // ─────────────────────────────────────────────
  // 1. Seed Destinations (22 Destinations)
  // ─────────────────────────────────────────────
  console.log('📍 Seeding Destinations into Payload CMS...')
  const destinationDocMap = new Map<string, number | string>() // slug -> id

  for (const [slug, d] of Object.entries(ALL_DESTINATIONS)) {
    console.log(`  -> Processing destination: ${slug}...`)
    const isTrending = !!d.trending2026
    const title = d.name
    const seoTitle = isTrending
      ? `${d.name} Tour Packages 2026 | ${d.trending2026?.tagline} | Hassle Free Travels`
      : `${d.hero.title} | Hassle Free Travels`
    const seoDescription = isTrending
      ? `${d.name} Tour Packages 2026: ${d.trending2026?.whyTrending} Handcrafted itineraries, verified stays & seamless WhatsApp booking with Hassle Free Travels.`
      : d.hero.subtitle

    const introText = d.trending2026?.whyTrending || d.hero.subtitle || d.hero.title

    const destData = {
      title,
      slug,
      kind: d.type === 'domestic' ? ('india' as const) : ('international' as const),
      country: d.name,
      shortTagline: d.trending2026?.tagline || d.hero.badge,
      heroImage: d.hero.image,
      intro: textToLexical(introText),
      highlights: (d.hero.perks || []).map((p) => ({ text: p })),
      bestTime: d.trending2026?.season || (d.seasons?.[0]?.title ?? 'Year-round'),
      durationHint: d.trending2026?.duration || '5N / 6D',
      startingPrice: d.hero.startingPrice,
      isFeatured: isTrending,
      trendingBadge: d.trending2026?.tagline || (isTrending ? 'Trending 2026' : undefined),
      trendingSeason: d.trending2026?.season,
      trendingDuration: d.trending2026?.duration,
      faqs: (d.faqs || []).map((f) => ({ question: f.q, answer: f.a })),
      seo: {
        metaTitle: seoTitle,
        metaDescription: seoDescription,
        ogImage: d.hero.image,
        canonical: `https://www.hasslefree-travels.com/destination/${slug}`,
      },
      publishedAt: new Date().toISOString(),
      _status: 'published' as const,
    }

    const existing = await payload.find({
      collection: 'destinations',
      where: { slug: { equals: slug } },
      limit: 1,
      draft: true,
    })

    let docId: number | string
    if (existing.docs.length > 0) {
      const updated = await payload.update({
        collection: 'destinations',
        id: existing.docs[0].id,
        data: destData,
        context,
        draft: false,
      })
      docId = updated.id
    } else {
      const created = await payload.create({
        collection: 'destinations',
        data: destData,
        context,
        draft: false,
      })
      docId = created.id
    }

    destinationDocMap.set(slug, docId)
  }
  console.log(`✅ Seeded ${destinationDocMap.size} destinations into Payload!`)

  // ─────────────────────────────────────────────
  // 2. Seed Packages
  // ─────────────────────────────────────────────
  console.log('📦 Seeding Tour Packages into Payload CMS...')

  type AnyPackage = {
    slug: string
    destinationSlug: string
    name: string
    tagline?: string
    days: number
    nights: number
    packageType?: string
    route?: string
    startCity?: string
    endCity?: string
    priceFromINR?: number
    priceNote?: string
    highlights?: string[]
    itineraryDays?: Array<{
      dayNumber: number
      title: string
      body: string
      meals?: string
      stay?: string
    }>
    inclusions?: string[]
    exclusions?: string[]
    visaNote?: string
    isFeatured?: boolean
    heroImage: string
    seoTitle?: string
    seoDescription?: string
    mealsSummary?: string
    staySummary?: string
    transportSummary?: string
    groupSize?: string
  }

  const allPackagesList: AnyPackage[] = [
    ...THAILAND_PACKAGES,
    ...JAPAN_PACKAGES,
    ...SRI_LANKA_PACKAGES,
    ...MALAYSIA_PACKAGES,
    ...MALDIVES_PACKAGES,
    ...EGYPT_PACKAGES,
  ]

  // Add benchmark Spiti package
  allPackagesList.push({
    slug: 'spiti-valley-tour-packages',
    destinationSlug: 'spiti',
    name: 'Spiti Valley Circuit Tour Package (Shimla to Manali)',
    tagline: 'The Ultimate 8 Nights Full Circuit Himalayan Road Trip',
    days: 9,
    nights: 8,
    packageType: 'adventure',
    priceFromINR: 16499,
    priceNote: 'per person, twin share, ex-Delhi, without flights',
    highlights: [
      '1000-year-old Key & Dhankar Monasteries perched over cliffs',
      "Send postcards from the World's Highest Post Office in Hikkim (4,440 m)",
      'Stargazing and luxury tent camping beside crescent Chandratal Lake',
      'Drive across high Himalayan passes including Kunzum Pass (4,590 m)',
      'Oxygen-fitted vehicles with certified high-altitude Trip Captains',
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        title: 'Delhi to Narkanda — Gateway to the Himalayas',
        body: 'Assemble in Delhi in the evening. Board the comfortable AC vehicle for an overnight scenic drive towards Narkanda. Enjoy a morning climb through apple orchard country with views of snow-clad Shivalik peaks.',
        stay: 'Hotel in Narkanda',
        meals: 'Dinner',
      },
      {
        dayNumber: 2,
        title: "Narkanda to Chitkul — India's Last Inhabited Village",
        body: "Drive along the mighty Sutlej River through Kinnaur's jaw-dropping cliff-carved roads. Arrive in the idyllic Baspa Valley and settle into Chitkul (3,450 m), the last village on the Indo-Tibetan border.",
        stay: 'Riverside Resort in Sangla / Chitkul',
        meals: 'Breakfast & Dinner',
      },
      {
        dayNumber: 3,
        title: 'Chitkul to Kalpa — Kinner Kailash Views',
        body: 'Explore Chitkul village, pristine riverbeds, and apple orchards. Head towards Kalpa (2,960 m). Witness the awe-inspiring 70-meter sacred rock spire of Kinner Kailash glowing golden at sunset.',
        stay: 'Hotel in Kalpa',
        meals: 'Breakfast & Dinner',
      },
      {
        dayNumber: 4,
        title: 'Kalpa to Kaza — Entering the Middle Land',
        body: 'Cross the Khab confluence where Spiti and Sutlej meet. Visit the 500-year-old Mummy of Sangha Tenzin at Gue village. Cross Tabo and enter the barren, Martian moonscapes of Kaza (3,800 m).',
        stay: 'Hotel in Kaza',
        meals: 'Breakfast & Dinner',
      },
      {
        dayNumber: 5,
        title: 'Hikkim, Komic & Langza — The High Altitude Circuit',
        body: 'Visit Hikkim (4,440 m) to mail a letter from the highest post office on earth. Drive to Komic (4,587 m), the highest motorable village, and hunt for ancient marine fossils at Langza.',
        stay: 'Hotel in Kaza',
        meals: 'Breakfast & Dinner',
      },
      {
        dayNumber: 6,
        title: 'Key Monastery & Kibber to Chandratal Lake',
        body: 'Ascend to the majestic 11th-century Key Gompa. Cross the dizzying Chicham Bridge and conquer Kunzum Pass (4,590 m). Arrive at the mystical crescent moon of Chandratal Lake for sunset.',
        stay: 'Swiss Alpine Tents at Chandratal Camp',
        meals: 'Breakfast & Dinner',
      },
      {
        dayNumber: 7,
        title: 'Chandratal to Manali via Atal Tunnel',
        body: 'Cross the Batal boulder-field water crossings and pass through the 9.02 km engineering marvel of the Atal Tunnel. Arrive in lush green Manali and celebrate the completion of the circuit.',
        stay: 'Hotel in Manali',
        meals: 'Breakfast & Dinner',
      },
      {
        dayNumber: 8,
        title: 'Manali Leisure & Evening Departure to Delhi',
        body: 'Relax in Old Manali, visit Hadimba Temple, and sample trout at local riverside cafes. Board the evening luxury Volvo transfer back towards Delhi.',
        stay: 'Overnight Volvo Coach',
        meals: 'Breakfast',
      },
      {
        dayNumber: 9,
        title: 'Arrive in Delhi',
        body: 'Arrive at Majnu Ka Tilla or Kashmere Gate in Delhi early morning with unforgettable memories of the Trans-Himalayan kingdom.',
        stay: 'Departure',
        meals: 'Breakfast',
      },
    ],
    inclusions: [
      '8 nights verified stays in boutique hotels, homestays, and Swiss alpine camps',
      '16 meals (8 breakfasts and 8 hearty dinners)',
      'All transfers and sightseeing in sanitized tempo traveller or 4x4 SUV',
      'Experienced high-altitude Trip Captain and local driver',
      'Medical oxygen cylinder and first aid kit in all vehicles',
      'Inner Line Permits and environmental green fees for Spiti Valley',
    ],
    exclusions: [
      'Personal expenses, tips, and heater charges at homestays',
      'Lunches and snacks during travel',
      'Travel insurance and medical emergency evacuation fees',
      'Anything not explicitly mentioned in inclusions',
    ],
    heroImage: '/images/spiti/spiti-hero.jpg',
    seoTitle: 'Spiti Valley Tour Packages 2026 | Hassle Free Travels',
    seoDescription: "Experience the untamed magic of the 'Middle Land' between India and Tibet. Thrilling 4x4 expeditions and Royal Enfield bike trips.",
    mealsSummary: '16 Meals (8 Breakfasts + 8 Dinners)',
    staySummary: '8 Nights in Handpicked Hotels, Homestays & Swiss Alpine Tents',
    transportSummary: 'Comfortable Tempo Traveller / 4x4 SUV with oxygen onboard',
    visaNote: 'No visa required for Indian citizens. Inner Line Permits arranged by Hassle Free Travels.',
    isFeatured: true,
  })

  let packageCount = 0
  for (const pkg of allPackagesList) {
    const parentDestId = destinationDocMap.get(pkg.destinationSlug)
    if (!parentDestId) {
      console.warn(`Destination ${pkg.destinationSlug} not found in map for package ${pkg.slug}`)
      continue
    }

    const packageData = {
      title: pkg.name,
      slug: pkg.slug,
      destination: parentDestId,
      durationDays: pkg.days,
      durationNights: pkg.nights,
      startingPriceINR: pkg.priceFromINR || 0,
      priceNote: pkg.priceNote,
      packageType: (pkg.packageType as string) || 'group',
      tagline: pkg.tagline,
      groupSize: pkg.groupSize || '2–16 pax',
      heroImage: pkg.heroImage || '/dest-mountain.jpg',
      gallery: [{ url: pkg.heroImage || '/dest-mountain.jpg', alt: pkg.name }],
      summary: textToLexical(pkg.tagline || pkg.name),
      itinerary: (pkg.itineraryDays || []).map((d) => ({
        day: d.dayNumber,
        title: d.title,
        body: (d.body && d.body.trim()) ? d.body : d.title,
        meals: d.meals || '',
        stay: d.stay || '',
      })),
      inclusions: (pkg.inclusions || []).map((inc) => ({ text: inc })),
      exclusions: (pkg.exclusions || []).map((exc) => ({ text: exc })),
      pickup: pkg.startCity || '',
      drop: pkg.endCity || '',
      mealsSummary: pkg.mealsSummary || '',
      staySummary: pkg.staySummary || '',
      transportSummary: pkg.transportSummary || '',
      visaNote: pkg.visaNote || '',
      route: pkg.route || '',
      enquiryWhatsAppText: `Hi, I am interested in ${pkg.name} (${pkg.nights}N/${pkg.days}D). Please share availability and customized pricing.`,
      isFeatured: !!pkg.isFeatured,
      seo: {
        metaTitle: pkg.seoTitle || `${pkg.name} | Hassle Free Travels`,
        metaDescription: pkg.seoDescription || pkg.tagline || pkg.name,
        ogImage: pkg.heroImage,
        canonical: `https://www.hasslefree-travels.com/destination/${pkg.destinationSlug}/${pkg.slug}`,
      },
      publishedAt: new Date().toISOString(),
      _status: 'published' as const,
    }

    const existing = await payload.find({
      collection: 'packages',
      where: { slug: { equals: pkg.slug } },
      limit: 1,
      draft: true,
    })

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'packages',
        id: existing.docs[0].id,
        data: packageData,
        context,
        draft: false,
      })
    } else {
      await payload.create({
        collection: 'packages',
        data: packageData,
        context,
        draft: false,
      })
    }

    packageCount++
  }
  console.log(`✅ Seeded ${packageCount} packages into Payload!`)

  // ─────────────────────────────────────────────
  // 3. Seed Blog Posts (12 Blogs)
  // ─────────────────────────────────────────────
  console.log('📝 Seeding Blog Posts into Payload CMS...')
  let blogCount = 0

  for (const post of BLOG_POSTS) {
    let matchedDestId: number | string | undefined
    for (const [slug, id] of destinationDocMap.entries()) {
      if (post.slug.includes(slug)) {
        matchedDestId = id
        break
      }
    }

    const postData = {
      title: post.title,
      slug: post.slug,
      destination: matchedDestId,
      coverImage: post.image || '/dest-mountain.jpg',
      excerpt: post.excerpt,
      body: textToLexical(post.excerpt + '\n\n' + post.title + ' — Detailed travel guide coming soon from our travel specialists.'),
      authorDisplayName: post.author || 'Hassle Free Travels',
      category: post.category as string,
      tags: (post.tags || []).map((t) => ({ tag: t })),
      isFeatured: !!post.featured,
      readMinutes: parseInt(post.readTime) || 8,
      seo: {
        metaTitle: `${post.title} | Hassle Free Travels Blog`,
        metaDescription: post.excerpt,
        ogImage: post.image,
        canonical: `https://www.hasslefree-travels.com/blogs/${post.slug}`,
      },
      publishedAt: new Date().toISOString(),
      _status: 'published' as const,
    }

    const existing = await payload.find({
      collection: 'posts',
      where: { slug: { equals: post.slug } },
      limit: 1,
      draft: true,
    })

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'posts',
        id: existing.docs[0].id,
        data: postData,
        context,
        draft: false,
      })
    } else {
      await payload.create({
        collection: 'posts',
        data: postData,
        context,
        draft: false,
      })
    }

    blogCount++
  }
  console.log(`✅ Seeded ${blogCount} blog posts into Payload!`)

  console.log('🎉 Payload CMS seeding complete!')
  process.exit(0)
}

runSeed().catch((err) => {
  console.error('❌ Error during Payload seed:', err)
  process.exit(1)
})
