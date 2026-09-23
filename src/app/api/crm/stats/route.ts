import { NextResponse } from 'next/server'
import { db } from '@/db'
import { leads, visitors, sessions, pageViews, destinations, packages } from '@/db/schema'
import { desc, count, sql, eq } from 'drizzle-orm'

export async function GET() {
  try {
    // 1. Leads overview
    const totalLeadsRes = await db.select({ count: count() }).from(leads)
    const totalLeads = totalLeadsRes[0]?.count || 0

    // Hot leads
    const hotLeadsRes = await db
      .select({ count: count() })
      .from(leads)
      .where(sql`${leads.leadGrade} = 'hot' OR ${leads.priority} = 'urgent'`)
    const hotLeads = hotLeadsRes[0]?.count || 0

    // Won leads
    const wonLeadsRes = await db
      .select({ count: count() })
      .from(leads)
      .where(sql`${leads.status} = 'won' OR ${leads.pipelineStage} = 'won'`)
    const wonLeads = wonLeadsRes[0]?.count || 0

    // Pipeline Revenue Estimation
    const revenueRes = await db
      .select({
        totalEstimated: sql<number>`COALESCE(SUM(${leads.estimatedRevenue}), 0)`,
        totalActual: sql<number>`COALESCE(SUM(${leads.actualRevenue}), 0)`,
      })
      .from(leads)
    const estimatedRevenue = Number(revenueRes[0]?.totalEstimated || 0)
    const actualRevenue = Number(revenueRes[0]?.totalActual || 0)

    // Pipeline Stages breakdown
    const stagesRes = await db
      .select({
        stage: sql<string>`COALESCE(${leads.pipelineStage}, 'new')`,
        count: count(),
      })
      .from(leads)
      .groupBy(sql`COALESCE(${leads.pipelineStage}, 'new')`)

    // Recent 10 High Intent Leads
    const recentLeads = await db
      .select({
        id: leads.id,
        name: leads.name,
        phone: leads.phone,
        email: leads.email,
        destinationSlug: leads.destinationSlug,
        packageSlug: leads.packageSlug,
        travelDate: leads.travelDate,
        paxAdults: leads.paxAdults,
        paxChildren: leads.paxChildren,
        budget: leads.budget,
        priority: leads.priority,
        leadScore: leads.leadScore,
        leadGrade: leads.leadGrade,
        status: leads.status,
        pipelineStage: leads.pipelineStage,
        source: leads.source,
        createdAt: leads.createdAt,
      })
      .from(leads)
      .orderBy(desc(leads.createdAt))
      .limit(10)

    // 2. Visitor Analytics Telemetry
    const totalVisitorsRes = await db.select({ count: count() }).from(visitors)
    const totalVisitors = totalVisitorsRes[0]?.count || 0

    const totalSessionsRes = await db.select({ count: count() }).from(sessions)
    const totalSessions = totalSessionsRes[0]?.count || 0

    const totalPageViewsRes = await db.select({ count: count() }).from(pageViews)
    const totalPageViews = totalPageViewsRes[0]?.count || 0

    // Top visited paths
    const topPagesRes = await db
      .select({
        path: pageViews.path,
        views: count(),
      })
      .from(pageViews)
      .groupBy(pageViews.path)
      .orderBy(desc(count()))
      .limit(5)

    // Conversion rate
    const conversionRate = totalVisitors > 0 ? ((totalLeads / totalVisitors) * 100).toFixed(1) : '0.0'

    return NextResponse.json({
      success: true,
      stats: {
        totalLeads,
        hotLeads,
        wonLeads,
        conversionRate: `${conversionRate}%`,
        estimatedRevenue,
        actualRevenue,
        totalVisitors,
        totalSessions,
        totalPageViews,
      },
      stages: stagesRes,
      topPages: topPagesRes,
      recentLeads,
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    console.error('[crm-stats] Error loading stats:', err)
    return NextResponse.json(
      { success: false, error: 'Could not fetch intelligence metrics' },
      { status: 500 }
    )
  }
}
