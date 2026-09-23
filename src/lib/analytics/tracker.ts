'use client'

const VISITOR_KEY = 'hft_vid'
const SESSION_KEY = 'hft_sid'
const SESSION_EXPIRE_MS = 30 * 60 * 1000 // 30 minutes inactivity

export interface AnalyticsEventData {
  eventType: 'page_view' | 'cta_click' | 'whatsapp_click' | 'form_start' | 'form_submit' | 'package_view' | 'filter_click' | 'scroll_depth'
  eventName: string
  path?: string
  properties?: Record<string, unknown>
}

export function getVisitorId(): string {
  if (typeof window === 'undefined') return ''
  let vid = localStorage.getItem(VISITOR_KEY)
  if (!vid) {
    vid = 'v_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36)
    localStorage.setItem(VISITOR_KEY, vid)
  }
  return vid
}

export function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  const now = Date.now()
  const storedSession = sessionStorage.getItem(SESSION_KEY)
  const lastActive = parseInt(sessionStorage.getItem('hft_last_active') || '0', 10)

  if (storedSession && now - lastActive < SESSION_EXPIRE_MS) {
    sessionStorage.setItem('hft_last_active', now.toString())
    return storedSession
  }

  const newSid = 's_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36)
  sessionStorage.setItem(SESSION_KEY, newSid)
  sessionStorage.setItem('hft_last_active', now.toString())
  return newSid
}

export function getUtmParameters(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search)
  const utms: Record<string, string> = {}
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']

  keys.forEach((key) => {
    const val = params.get(key)
    if (val) utms[key] = val
  })

  // Also check stored initial UTMs
  if (Object.keys(utms).length > 0) {
    sessionStorage.setItem('hft_initial_utms', JSON.stringify(utms))
  } else {
    const stored = sessionStorage.getItem('hft_initial_utms')
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch {}
    }
  }

  return utms
}

export async function sendAnalyticsEvent(data: AnalyticsEventData): Promise<void> {
  if (typeof window === 'undefined') return

  const visitorId = getVisitorId()
  const sessionId = getSessionId()
  const utms = getUtmParameters()
  const path = data.path || window.location.pathname

  const payload = {
    visitorId,
    sessionId,
    eventType: data.eventType,
    eventName: data.eventName,
    path,
    referrer: document.referrer || '',
    title: document.title || '',
    properties: data.properties || {},
    utmSource: utms['utm_source'],
    utmMedium: utms['utm_medium'],
    utmCampaign: utms['utm_campaign'],
    utmTerm: utms['utm_term'],
    utmContent: utms['utm_content'],
    deviceType: window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop',
    screenResolution: `${window.innerWidth}x${window.innerHeight}`,
  }

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' })
      navigator.sendBeacon('/api/analytics/event', blob)
    } else {
      fetch('/api/analytics/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {})
    }
  } catch {}
}
