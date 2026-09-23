'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from './RevenueCommandCentre.module.css'
import './cyberAdminTheme.css'
import { FlightMesh3D } from './FlightMesh3D'
import { sound } from '@/lib/audio/soundFx'

interface CRMStats {
  totalLeads: number
  hotLeads: number
  wonLeads: number
  conversionRate: string
  estimatedRevenue: number
  actualRevenue: number
  totalVisitors: number
  totalSessions: number
  totalPageViews: number
}

interface LeadItem {
  id: string
  name: string
  phone: string
  email?: string
  destinationSlug?: string
  packageSlug?: string
  travelDate?: string
  budget?: string
  priority: string
  leadScore: number
  leadGrade: 'hot' | 'warm' | 'cold'
  status: string
  pipelineStage: string
  createdAt: string
}

interface StageItem {
  stage: string
  count: number
}

export const RevenueCommandCentre: React.FC = () => {
  const [stats, setStats] = useState<CRMStats | null>(null)
  const [stages, setStages] = useState<StageItem[]>([])
  const [recentLeads, setRecentLeads] = useState<LeadItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [activeFilter, setActiveFilter] = useState<'all' | 'hot' | 'warm' | 'cold'>('all')

  // AI Assistant state
  const [aiQuery, setAiQuery] = useState('')
  const [aiAnswer, setAiAnswer] = useState<string>('')
  const [aiLoading, setAiLoading] = useState(false)
  const [isSimulating, setIsSimulating] = useState(false)

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/crm/stats')
      if (res.ok) {
        const data = await res.json()
        setStats(data.stats)
        setStages(data.stages || [])
        setRecentLeads(data.recentLeads || [])
      }
    } catch (err) {
      console.error('Failed to load CRM stats:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAskAI = async (queryOverride?: string) => {
    const q = queryOverride || aiQuery || 'Analyze pipeline bottlenecks and today\'s top priority actions.'
    setAiLoading(true)
    sound.playNeuralPulse()

    try {
      const res = await fetch('/api/crm/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      })
      if (res.ok) {
        const data = await res.json()
        setAiAnswer(data.answer)
        sound.playSuccess()
      }
    } catch {
      setAiAnswer('Unable to generate AI analysis at this moment. Please check connectivity.')
    } finally {
      setAiLoading(false)
    }
  }

  const handleSimulateLead = async () => {
    setIsSimulating(true)
    sound.playLaserPulse()

    const mockDestinations = [
      { name: 'Thailand', slug: 'thailand', pkg: 'bangkok-phuket-luxury-7d', budget: '₹1,45,000', adults: 2, children: 1 },
      { name: 'Japan', slug: 'japan', pkg: 'japan-cherry-blossom-golden-route-9d', budget: '₹3,20,000', adults: 2, children: 0 },
      { name: 'Spiti Valley', slug: 'spiti', pkg: 'spiti-valley-tour-packages', budget: '₹68,000', adults: 4, children: 0 },
      { name: 'Maldives', slug: 'maldives', pkg: 'maldives-all-inclusive-villa', budget: '₹2,80,000', adults: 2, children: 0 },
    ]
    const pick = mockDestinations[Math.floor(Math.random() * mockDestinations.length)]
    const mockNames = ['Vikram Kapoor', 'Ananya Sharma', 'Rohan Mehta', 'Priya Singhania', 'Aditya Verma']
    const pickName = mockNames[Math.floor(Math.random() * mockNames.length)]
    const randomPhone = `98${Math.floor(10000000 + Math.random() * 90000000)}`

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: pickName,
          phone: randomPhone,
          email: `${pickName.toLowerCase().replace(' ', '.')}@example.com`,
          destination: pick.name,
          destinationSlug: pick.slug,
          packageSlug: pick.pkg,
          departureCity: 'Delhi',
          travelDate: 'Immediate Departure (Next 10 Days)',
          paxAdults: pick.adults,
          paxChildren: pick.children,
          budget: pick.budget,
          message: 'Looking for confirmed departures with 4-star boutique hotels and airport transfers.',
          source: 'live_telemetry_simulation',
        }),
      })

      if (res.ok) {
        sound.playSuccess()
        await fetchStats()
      }
    } catch (e) {
      console.error('Simulation failed:', e)
    } finally {
      setIsSimulating(false)
    }
  }

  const didInit = useRef(false)

  useEffect(() => {
    if (didInit.current) return
    didInit.current = true
    // Defer data fetching to avoid synchronous setState in effect body
    queueMicrotask(() => {
      fetchStats()
      handleAskAI()
      setIsMuted(sound.isMuted())
    })
  })

  const formatCurrency = (amount: number) => {
    return '₹' + amount.toLocaleString('en-IN')
  }

  // 3D Card Tilt Effect Handler
  const handleCardTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const rotateX = (-y / rect.height) * 12
    const rotateY = (x / rect.width) * 12
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`
  }

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)'
  }

  const filteredLeads = recentLeads.filter((l) => {
    if (activeFilter === 'all') return true
    return l.leadGrade === activeFilter
  })

  return (
    <div className={styles.container}>
      {/* Executive Cybernetic HUD Header */}
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Travel Revenue Intelligence Platform</h2>
            <span className={styles.cyberBadge}>Neural Hub v4.2</span>
          </div>
          <div className={styles.telemetryRow}>
            <span className={styles.liveIndicator}>
              <span className={styles.pulseDot} />
              ENCRYPTED NEURAL PIPELINE ONLINE
            </span>
            <span>•</span>
            <span>LATENCY: 12ms</span>
            <span>•</span>
            <span>UPTIME: 99.98%</span>
          </div>
        </div>

        <div className={styles.quickActions}>
          <button
            onClick={() => {
              const muted = sound.toggleMute()
              setIsMuted(muted)
            }}
            className={styles.hudBtn}
            title="Toggle futuristic audio micro-haptics"
          >
            {isMuted ? '🔇 Audio Muted' : '🔊 Cyber SFX Active'}
          </button>

          <button
            onClick={() => {
              sound.playBeep(700, 'sine')
              fetchStats()
            }}
            className={styles.hudBtn}
          >
            🔄 Sync Data
          </button>

          <button
            onClick={handleSimulateLead}
            disabled={isSimulating}
            className={`${styles.hudBtn} ${styles.hudBtnSimulate}`}
            title="Simulates a real incoming lead to verify scoring & notifications pipeline in real-time"
          >
            {isSimulating ? '⚡ Ingesting...' : '⚡ Simulate Live Inbound Lead'}
          </button>

          <Link href="/admin/collections/enquiries" className={styles.hudBtn}>
            📋 All Leads
          </Link>

          <Link href="/admin/collections/bookings" className={styles.hudBtn}>
            ✈️ Bookings
          </Link>

          <Link
            href="/admin/collections/enquiries/create"
            className={`${styles.hudBtn} ${styles.hudBtnPrimary}`}
          >
            + Create Lead
          </Link>
        </div>
      </div>

      {/* Interactive 3D Geospatial Flight Mesh & Global Operations Canvas */}
      <FlightMesh3D />

      {/* 3D KPI Tilt Matrix */}
      <div className={styles.kpiGrid}>
        <div
          className={styles.kpiCard}
          onMouseMove={handleCardTilt}
          onMouseLeave={handleCardLeave}
        >
          <div className={styles.kpiGlowLine} />
          <div className={styles.kpiTop}>
            <span className={styles.kpiLabel}>Total Enquiries</span>
            <div className={styles.kpiIconWrapper}>📨</div>
          </div>
          <div className={styles.kpiValue}>{loading ? '...' : stats?.totalLeads ?? 0}</div>
          <div className={styles.kpiFoot}>
            <span>Prospect Pipeline</span>
            <span className={styles.kpiTrendPos}>↑ Live Stream</span>
          </div>
        </div>

        <div
          className={styles.kpiCard}
          onMouseMove={handleCardTilt}
          onMouseLeave={handleCardLeave}
          style={{ borderColor: 'rgba(220, 38, 38, 0.25)' }}
        >
          <div className={styles.kpiGlowLine} style={{ background: 'linear-gradient(90deg, #dc2626, #f97316)' }} />
          <div className={styles.kpiTop}>
            <span className={styles.kpiLabel} style={{ color: '#dc2626' }}>Hot Leads 🔥</span>
            <div className={styles.kpiIconWrapper} style={{ background: 'rgba(220, 38, 38, 0.08)' }}>⚡</div>
          </div>
          <div className={styles.kpiValue} style={{ color: '#dc2626' }}>
            {loading ? '...' : stats?.hotLeads ?? 0}
          </div>
          <div className={styles.kpiFoot}>
            <span>Score 75+ (High Intent)</span>
            <span style={{ color: '#dc2626', fontWeight: 700 }}>Priority Action</span>
          </div>
        </div>

        <div
          className={styles.kpiCard}
          onMouseMove={handleCardTilt}
          onMouseLeave={handleCardLeave}
        >
          <div className={styles.kpiGlowLine} style={{ background: 'linear-gradient(90deg, #10b981, #06b6d4)' }} />
          <div className={styles.kpiTop}>
            <span className={styles.kpiLabel}>Won Deals</span>
            <div className={styles.kpiIconWrapper} style={{ background: 'rgba(16, 185, 129, 0.08)' }}>🏆</div>
          </div>
          <div className={styles.kpiValue} style={{ color: '#10b981' }}>
            {loading ? '...' : stats?.wonLeads ?? 0}
          </div>
          <div className={styles.kpiFoot}>
            <span>Conversion Rate</span>
            <span className={styles.kpiTrendPos}>{stats?.conversionRate ?? '0.0%'}</span>
          </div>
        </div>

        <div
          className={styles.kpiCard}
          onMouseMove={handleCardTilt}
          onMouseLeave={handleCardLeave}
        >
          <div className={styles.kpiGlowLine} style={{ background: 'linear-gradient(90deg, #8B2FC9, #3b82f6)' }} />
          <div className={styles.kpiTop}>
            <span className={styles.kpiLabel}>Pipeline Value</span>
            <div className={styles.kpiIconWrapper}>💼</div>
          </div>
          <div className={styles.kpiValue}>
            {loading ? '...' : formatCurrency(stats?.estimatedRevenue ?? 0)}
          </div>
          <div className={styles.kpiFoot}>
            <span>Confirmed Cash</span>
            <span style={{ fontWeight: 700, color: '#8B2FC9' }}>{formatCurrency(stats?.actualRevenue ?? 0)}</span>
          </div>
        </div>

        <div
          className={styles.kpiCard}
          onMouseMove={handleCardTilt}
          onMouseLeave={handleCardLeave}
        >
          <div className={styles.kpiGlowLine} style={{ background: 'linear-gradient(90deg, #00F0FF, #8B2FC9)' }} />
          <div className={styles.kpiTop}>
            <span className={styles.kpiLabel}>Visitors Telemetry</span>
            <div className={styles.kpiIconWrapper} style={{ background: 'rgba(0, 240, 255, 0.08)' }}>🌐</div>
          </div>
          <div className={styles.kpiValue}>{loading ? '...' : stats?.totalVisitors ?? 0}</div>
          <div className={styles.kpiFoot}>
            <span>Total Views</span>
            <span>{stats?.totalPageViews ?? 0}</span>
          </div>
        </div>
      </div>

      {/* Middle Grid: Neural AI Analyst & Pipeline Stages */}
      <div className={styles.contentRow}>
        {/* Neural AI Business Analyst Console */}
        <div className={`${styles.panel} ${styles.aiPanel}`}>
          <div className={styles.panelHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h3 className={styles.panelTitle}>
                <span>🤖</span> Neural AI Business Analyst & Yield Strategist
              </h3>
              <div className={styles.waveformRow}>
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className={styles.waveformBar}
                    style={{
                      animationDuration: `${0.6 + (i % 4) * 0.25}s`,
                      animationPlayState: aiLoading ? 'running' : 'paused',
                      background: aiLoading ? '#E8562A' : '#8B2FC9',
                    }}
                  />
                ))}
              </div>
            </div>

            <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#8B2FC9', fontWeight: 700 }}>
              AUTO-YIELD ENGINE // LIVE
            </span>
          </div>

          {/* Strategy Presets */}
          <div className={styles.strategyPills}>
            <button
              onClick={() => handleAskAI('Analyze profit margins, flight bundling, and package yield opportunities.')}
              className={styles.strategyBtn}
            >
              🚀 Yield Maximizer
            </button>
            <button
              onClick={() => handleAskAI('What are the main bottlenecks preventing negotiation leads from converting?')}
              className={styles.strategyBtn}
            >
              🎯 Negotiation Doctor
            </button>
            <button
              onClick={() => handleAskAI('Review Spiti Valley & Himalayan summer expedition demand and pricing.')}
              className={styles.strategyBtn}
            >
              🏔️ Spiti & Himalaya Surge
            </button>
            <button
              onClick={() => handleAskAI('Recommend best 15-minute WhatsApp follow-up scripts for inbound leads.')}
              className={styles.strategyBtn}
            >
              ⚡ WhatsApp Cadence
            </button>
          </div>

          {/* AI Terminal Output */}
          <div className={styles.aiTerminal}>
            {aiLoading ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8B2FC9', fontWeight: 600 }}>
                <span className={styles.pulseDot} style={{ background: '#8B2FC9' }} />
                Synthesizing multi-source pipeline signals, destination velocity, and margin models...
              </div>
            ) : (
              aiAnswer || 'Ready to analyze.'
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleAskAI()
            }}
            className={styles.aiForm}
          >
            <input
              type="text"
              placeholder="Ask AI Analyst: e.g. How to increase Vietnam tour conversions by 25%?"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              className={styles.aiInput}
            />
            <button type="submit" disabled={aiLoading} className={styles.aiSendBtn}>
              {aiLoading ? 'Thinking...' : 'Synthesize'}
            </button>
          </form>
        </div>

        {/* Funnel Pipeline Distribution */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>
              <span>📊</span> Pipeline Stage Velocity
            </h3>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Real-Time Distribution</span>
          </div>

          <div className={styles.funnelList}>
            {stages.length === 0 ? (
              <p style={{ fontSize: '13px', color: '#94a3b8', margin: '20px 0' }}>
                No active stages recorded yet. Submissions will automatically populate funnel metrics.
              </p>
            ) : (
              stages.map((st) => {
                const total = stats?.totalLeads || 1
                const pct = Math.round((st.count / total) * 100)
                const stageLabel = st.stage.replace(/_/g, ' ').toUpperCase()
                return (
                  <div key={st.stage} className={styles.funnelItem}>
                    <div className={styles.funnelLabelRow}>
                      <span>{stageLabel}</span>
                      <span>{st.count} ({pct}%)</span>
                    </div>
                    <div className={styles.funnelTrack}>
                      <div
                        className={styles.funnelFill}
                        style={{
                          width: `${Math.max(8, pct)}%`,
                          background:
                            st.stage === 'won'
                              ? 'linear-gradient(90deg, #10b981, #06b6d4)'
                              : st.stage === 'lost'
                              ? '#94a3b8'
                              : 'linear-gradient(90deg, #8B2FC9, #E8562A)',
                        }}
                      />
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>

      {/* Real-Time Leads Matrix */}
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h3 className={styles.panelTitle}>
              <span>🔥</span> Live Inbound Leads Stream
            </h3>
            <div className={styles.filterPills}>
              {(['all', 'hot', 'warm', 'cold'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    sound.playBeep(650, 'sine', 0.03, 0.02)
                    setActiveFilter(filter)
                  }}
                  className={`${styles.filterPill} ${activeFilter === filter ? styles.filterPillActive : ''}`}
                >
                  {filter.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <Link
            href="/admin/collections/enquiries"
            style={{ fontSize: '12px', color: '#8B2FC9', fontWeight: 800, textDecoration: 'none' }}
          >
            Open Full CRM Pipeline →
          </Link>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Guest</th>
                <th>Phone / WhatsApp</th>
                <th>Target Destination / Package</th>
                <th>AI Score</th>
                <th>Stage</th>
                <th>Travel Date</th>
                <th>Quick Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '28px', color: '#94a3b8' }}>
                    No matching enquiries in this view. Click <strong>&quot;Simulate Live Inbound Lead&quot;</strong> above to test!
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const cleanPhone = lead.phone.replace(/[^0-9]/g, '')
                  const waNumber = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`
                  const gradeClass =
                    lead.leadGrade === 'hot'
                      ? styles.badgeHot
                      : lead.leadGrade === 'warm'
                      ? styles.badgeWarm
                      : styles.badgeCold

                  return (
                    <tr key={lead.id}>
                      <td style={{ fontWeight: 700 }}>{lead.name}</td>
                      <td style={{ fontFamily: 'monospace', fontSize: '12px' }}>{lead.phone}</td>
                      <td style={{ color: '#8B2FC9', fontWeight: 700 }}>
                        {lead.packageSlug || lead.destinationSlug || 'Custom Tour'}
                      </td>
                      <td>
                        <span className={`${styles.scoreBadge} ${gradeClass}`}>
                          {lead.leadGrade === 'hot' ? '🔥' : lead.leadGrade === 'warm' ? '⚡' : '❄️'}{' '}
                          {lead.leadScore}/100
                        </span>
                      </td>
                      <td>
                        <span
                          style={{
                            fontSize: '10px',
                            textTransform: 'uppercase',
                            fontWeight: 800,
                            padding: '3px 8px',
                            borderRadius: '6px',
                            background: '#f1f5f9',
                            color: '#334155',
                          }}
                        >
                          {lead.pipelineStage || lead.status}
                        </span>
                      </td>
                      <td style={{ fontSize: '12px', color: '#475569' }}>{lead.travelDate || 'Flexible'}</td>
                      <td>
                        <a
                          href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                            `Hi ${lead.name}, thanks for enquiring with Hassle Free Travels! I have prepared your personalized itinerary details.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.waBtn}
                        >
                          💬 WhatsApp
                        </a>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
