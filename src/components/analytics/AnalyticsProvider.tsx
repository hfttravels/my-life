'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { sendAnalyticsEvent } from '@/lib/analytics/tracker'

export function AnalyticsProvider() {
  const pathname = usePathname()
  const lastPathname = useRef('')
  const scrollMilestones = useRef<Set<number>>(new Set())

  // Track Page Views
  useEffect(() => {
    if (!pathname || pathname.startsWith('/admin')) return

    if (pathname !== lastPathname.current) {
      lastPathname.current = pathname
      scrollMilestones.current.clear()

      sendAnalyticsEvent({
        eventType: 'page_view',
        eventName: 'page_viewed',
        path: pathname,
      })
    }
  }, [pathname])

  // Track Scroll Depth
  useEffect(() => {
    if (typeof window === 'undefined' || pathname?.startsWith('/admin')) return

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) return

      const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100)
      const milestones = [25, 50, 75, 90]

      for (const m of milestones) {
        if (scrollPercent >= m && !scrollMilestones.current.has(m)) {
          scrollMilestones.current.add(m)
          sendAnalyticsEvent({
            eventType: 'scroll_depth',
            eventName: `scroll_${m}%`,
            path: pathname,
            properties: { scrollDepth: m },
          })
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  // Global High-Intent Click Listener (WhatsApp, CTAs, Phone links)
  useEffect(() => {
    if (typeof window === 'undefined' || pathname?.startsWith('/admin')) return

    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a, button') as HTMLElement | null
      if (!target) return

      // 1. WhatsApp click
      const href = target.getAttribute('href') || ''
      if (href.includes('wa.me') || href.includes('whatsapp.com')) {
        sendAnalyticsEvent({
          eventType: 'whatsapp_click',
          eventName: 'whatsapp_concierge_clicked',
          path: pathname,
          properties: {
            text: target.innerText?.trim()?.substring(0, 50),
            href,
          },
        })
      }

      // 2. Direct Call click
      if (href.startsWith('tel:')) {
        sendAnalyticsEvent({
          eventType: 'cta_click',
          eventName: 'phone_call_clicked',
          path: pathname,
          properties: { href },
        })
      }

      // 3. Explicit CTA element
      if (target.dataset?.trackCta || target.classList.contains('cta-button') || target.classList.contains('btn-primary')) {
        sendAnalyticsEvent({
          eventType: 'cta_click',
          eventName: 'cta_button_clicked',
          path: pathname,
          properties: {
            ctaName: target.dataset?.trackCta || target.innerText?.trim()?.substring(0, 50),
          },
        })
      }
    }

    document.addEventListener('click', handleClick, { passive: true })
    return () => document.removeEventListener('click', handleClick)
  }, [pathname])

  return null
}
