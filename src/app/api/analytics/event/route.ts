import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { visitors, sessions, pageViews, analyticsEvents } from '@/db/schema'
import { eq } from 'drizzle-orm'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null)
    if (!body || !body.visitorId || !body.sessionId) {
      return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 })
    }

    const {
      visitorId,
      sessionId,
      eventType = 'page_view',
      eventName = 'view',
      path = '/',
      title = '',
      referrer = '',
      properties = {},
      utmSource,
      utmMedium,
      utmCampaign,
      utmTerm,
      utmContent,
      deviceType = 'desktop',
    } = body

    // Hash client IP for privacy preservation
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || request.headers.get('x-real-ip') || 'unknown'
    const ipHash = crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16)
    const userAgent = request.headers.get('user-agent') || ''

    // 1. Ingest / Update Visitor Record
    const existingVisitor = await db
      .select({ id: visitors.id })
      .from(visitors)
      .where(eq(visitors.visitorId, visitorId))
      .limit(1)

    if (existingVisitor.length === 0) {
      await db.insert(visitors).values({
        visitorId,
        firstPage: path,
        firstReferrer: referrer,
        utmSource: utmSource || null,
        utmMedium: utmMedium || null,
        utmCampaign: utmCampaign || null,
        utmTerm: utmTerm || null,
        utmContent: utmContent || null,
        deviceType,
        ipHash,
        metadata: JSON.stringify({ userAgent }),
      }).catch(() => {})
    } else {
      await db
        .update(visitors)
        .set({ lastSeenAt: new Date() })
        .where(eq(visitors.visitorId, visitorId))
        .catch(() => {})
    }

    // 2. Ingest / Update Session Record
    const existingSession = await db
      .select({ id: sessions.id, count: sessions.pageViewsCount })
      .from(sessions)
      .where(eq(sessions.sessionId, sessionId))
      .limit(1)

    if (existingSession.length === 0) {
      await db.insert(sessions).values({
        sessionId,
        visitorId,
        landingPage: path,
        referrer: referrer || null,
        utmSource: utmSource || null,
        utmMedium: utmMedium || null,
        utmCampaign: utmCampaign || null,
        utmTerm: utmTerm || null,
        utmContent: utmContent || null,
        deviceType,
        pageViewsCount: 1,
      }).catch(() => {})
    } else if (eventType === 'page_view') {
      await db
        .update(sessions)
        .set({
          pageViewsCount: (existingSession[0].count || 1) + 1,
          exitPage: path,
          endedAt: new Date(),
        })
        .where(eq(sessions.sessionId, sessionId))
        .catch(() => {})
    }

    // 3. Record Specific Page View
    if (eventType === 'page_view') {
      await db.insert(pageViews).values({
        sessionId,
        visitorId,
        path,
        title: title || null,
        referrer: referrer || null,
        scrollDepth: properties?.scrollDepth ? Number(properties.scrollDepth) : 0,
      }).catch(() => {})
    }

    // 4. Record Analytics Event
    await db.insert(analyticsEvents).values({
      sessionId,
      visitorId,
      eventType,
      eventName,
      path,
      properties: Object.keys(properties).length > 0 ? JSON.stringify(properties) : null,
    }).catch(() => {})

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[analytics] Ingestion error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
