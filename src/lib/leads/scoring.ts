export interface LeadScoringInput {
  name: string
  phone: string
  email?: string | null
  destinationSlug?: string | null
  packageSlug?: string | null
  travelDate?: string | null
  departureCity?: string | null
  paxAdults?: number | null
  paxChildren?: number | null
  tripType?: string | null
  budget?: string | null
  message?: string | null
  source?: string | null
  pageViewsCount?: number
  durationSeconds?: number
}

export interface LeadScoreResult {
  score: number // 0-100
  grade: 'hot' | 'warm' | 'cold'
  engagementScore: number
  intentScore: number
  fitScore: number
  budgetScore: number
  urgencyScore: number
  breakdown: Record<string, number>
  aiSummary: string
  recommendedAction: string
}

export function calculateLeadScore(input: LeadScoringInput): LeadScoreResult {
  let intentScore = 0
  let urgencyScore = 0
  let fitScore = 0
  let budgetScore = 0
  let engagementScore = 0
  const breakdown: Record<string, number> = {}

  // 1. Intent & Specificity
  if (input.packageSlug) {
    intentScore += 20
    breakdown['Specific package selected'] = 20
  } else if (input.destinationSlug) {
    intentScore += 10
    breakdown['Destination specified'] = 10
  }

  if (input.departureCity && input.departureCity.trim().length > 1) {
    intentScore += 10
    breakdown['Departure city provided'] = 10
  }

  // 2. Urgency & Travel Timeline
  if (input.travelDate && input.travelDate.trim().length > 0) {
    urgencyScore += 15
    breakdown['Travel date specified'] = 15
    const lowerDate = input.travelDate.toLowerCase()
    if (
      lowerDate.includes('this week') ||
      lowerDate.includes('next week') ||
      lowerDate.includes('immediate') ||
      lowerDate.includes('days')
    ) {
      urgencyScore += 10
      breakdown['Imminent departure'] = 10
    }
  }

  // 3. Fit & Group Commercial Value
  const adults = input.paxAdults ?? 1
  const children = input.paxChildren ?? 0
  const totalPax = adults + children

  if (totalPax >= 4) {
    fitScore += 20
    breakdown['Family / Group booking (4+ pax)'] = 20
  } else if (totalPax >= 2) {
    fitScore += 12
    breakdown['Couple / Duo booking'] = 12
  } else {
    fitScore += 5
    breakdown['Solo traveler'] = 5
  }

  if (input.tripType === 'custom' || input.tripType === 'honeymoon') {
    fitScore += 10
    breakdown['High-margin custom/honeymoon travel'] = 10
  }

  // 4. Budget & Financial Readiness
  if (input.budget && input.budget.trim().length > 0) {
    budgetScore += 15
    breakdown['Budget specified'] = 15
    const numBudget = parseInt(input.budget.replace(/[^0-9]/g, ''), 10)
    if (!isNaN(numBudget) && numBudget >= 100000) {
      budgetScore += 10
      breakdown['High-value budget (₹1L+)'] = 10
    }
  }

  // 5. Engagement & Detail
  if (input.message && input.message.trim().length >= 20) {
    engagementScore += 10
    breakdown['Detailed inquiry message'] = 10
  }

  if (input.email && input.email.includes('@')) {
    engagementScore += 5
    breakdown['Verified email supplied'] = 5
  }

  if ((input.pageViewsCount ?? 0) >= 3) {
    engagementScore += 10
    breakdown['Multi-page research on site'] = 10
  }

  const rawTotal = intentScore + urgencyScore + fitScore + budgetScore + engagementScore
  const score = Math.min(100, Math.max(10, rawTotal))

  let grade: 'hot' | 'warm' | 'cold' = 'cold'
  let aiSummary = ''
  let recommendedAction = ''

  const destinationName = input.destinationSlug
    ? input.destinationSlug.charAt(0).toUpperCase() + input.destinationSlug.slice(1)
    : 'tour'

  if (score >= 75) {
    grade = 'hot'
    aiSummary = `High-intent ${totalPax}-passenger enquiry for ${destinationName}. Strong booking signals with confirmed travel timeline and concrete itinerary preferences.`
    recommendedAction = `🔥 Immediate Action Required: Call or WhatsApp ${input.name} within 10 minutes. Send customized quotation before they explore competitors.`
  } else if (score >= 45) {
    grade = 'warm'
    aiSummary = `Active prospect researching ${destinationName}. Clear travel interest, awaiting curated package recommendations and pricing breakdowns.`
    recommendedAction = `⚡ Send WhatsApp itinerary summary for ${destinationName} within 1 hour, followed by a consultation call.`
  } else {
    grade = 'cold'
    aiSummary = `Early discovery stage enquiry with baseline contact info. Requires nurturing with destination highlights and seasonal deals.`
    recommendedAction = `❄️ Send automated welcome message with curated ${destinationName} brochures and WhatsApp concierge link.`
  }

  return {
    score,
    grade,
    intentScore,
    urgencyScore,
    fitScore,
    budgetScore,
    engagementScore,
    breakdown,
    aiSummary,
    recommendedAction,
  }
}
