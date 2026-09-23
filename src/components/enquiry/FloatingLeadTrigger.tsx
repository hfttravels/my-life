'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import styles from './FloatingLeadTrigger.module.css'
import { EnquiryForm } from './EnquiryForm'
import { sendAnalyticsEvent } from '@/lib/analytics/tracker'

export function FloatingLeadTrigger() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Don't render inside admin or thank-you pages
  if (!pathname || pathname.startsWith('/admin') || pathname.startsWith('/thank-you')) {
    return null
  }

  const handleOpen = () => {
    setIsOpen(true)
    sendAnalyticsEvent({
      eventType: 'cta_click',
      eventName: 'floating_enquiry_opened',
      path: pathname,
    })
  }

  return (
    <>
      <div className={styles.floatingContainer}>
        <button
          onClick={handleOpen}
          className={styles.triggerButton}
          aria-label="Request Custom Tour Quote"
        >
          <span>✈️</span>
          <span>Get Custom Itinerary</span>
        </button>
      </div>

      {isOpen && (
        <div className={styles.backdrop} onClick={() => setIsOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsOpen(false)}
              className={styles.closeButton}
              aria-label="Close modal"
            >
              ✕
            </button>
            <EnquiryForm
              variant="full"
              sourcePage={pathname}
              title="Plan Your Tour With an Expert"
              subtitle="Tell us your preferences and get a customized proposal within 1 hour."
              onSuccess={() => {
                setTimeout(() => setIsOpen(false), 3000)
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}
