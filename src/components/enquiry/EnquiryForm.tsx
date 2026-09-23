'use client'

import React, { useState } from 'react'
import styles from './EnquiryForm.module.css'
import { getVisitorId, getSessionId, getUtmParameters, sendAnalyticsEvent } from '@/lib/analytics/tracker'

export interface EnquiryFormProps {
  destinationSlug?: string
  destinationTitle?: string
  packageSlug?: string
  packageTitle?: string
  tripType?: 'group' | 'custom' | 'unknown'
  sourcePage?: string
  variant?: 'compact' | 'full'
  title?: string
  subtitle?: string
  onSuccess?: (leadId: string) => void
}

export function EnquiryForm({
  destinationSlug,
  destinationTitle,
  packageSlug,
  packageTitle,
  tripType = 'custom',
  sourcePage,
  variant = 'full',
  title = 'Plan Your Dream Holiday',
  subtitle = 'Get a customized itinerary with flight options, luxury stays & instant WhatsApp support.',
  onSuccess,
}: EnquiryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    departureCity: '',
    travelDate: '',
    paxAdults: '2',
    paxChildren: '0',
    budget: '',
    message: '',
    communicationPreference: 'whatsapp',
    website: '', // honeypot
  })

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [leadId, setLeadId] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    setLoading(true)

    // First party analytics tracking
    sendAnalyticsEvent({
      eventType: 'form_submit',
      eventName: 'enquiry_form_submitted',
      path: sourcePage || window.location.pathname,
      properties: {
        destination: destinationTitle || destinationSlug,
        package: packageTitle || packageSlug,
      },
    })

    const utms = getUtmParameters()
    const visitorId = getVisitorId()
    const sessionId = getSessionId()

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || undefined,
          destination: destinationTitle || destinationSlug,
          destinationSlug,
          packageSlug,
          departureCity: formData.departureCity || undefined,
          travelDate: formData.travelDate || undefined,
          paxAdults: Number(formData.paxAdults) || 2,
          paxChildren: Number(formData.paxChildren) || 0,
          budget: formData.budget || undefined,
          message: formData.message || undefined,
          tripType,
          communicationPreference: formData.communicationPreference,
          sourcePage: sourcePage || window.location.pathname,
          source: 'enquiry_form',
          visitorId,
          sessionId,
          utmSource: utms['utm_source'],
          utmMedium: utms['utm_medium'],
          utmCampaign: utms['utm_campaign'],
          utmTerm: utms['utm_term'],
          utmContent: utms['utm_content'],
          website: formData.website, // honeypot
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit enquiry. Please try again.')
      }

      setLeadId(data.leadId)
      setSubmitted(true)
      if (onSuccess) onSuccess(data.leadId)
    } catch (err: unknown) {
      setErrorMsg((err as Error).message || 'Something went wrong. Please connect on WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  const cleanPhone = formData.phone.replace(/[^0-9]/g, '')
  const whatsappTarget = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`
  const targetLabel = packageTitle || destinationTitle || 'your holiday'

  if (submitted) {
    return (
      <div className={`${styles.enquiryCard} ${variant === 'compact' ? styles.enquiryCardCompact : ''}`}>
        <div className={styles.successState}>
          <div className={styles.successIcon}>✓</div>
          <h3 className={styles.successTitle}>Enquiry Received!</h3>
          <p className={styles.successDesc}>
            Thank you, <strong>{formData.name}</strong>. Our destination specialist has received your requirements for{' '}
            <strong>{targetLabel}</strong> and is preparing your personalized itinerary.
          </p>
          <a
            href={`https://wa.me/918375030889?text=${encodeURIComponent(
              `Hi Hassle Free Travels, I just submitted an enquiry for ${targetLabel} (Ref: ${leadId.slice(0, 8)}). Please share the quote.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappSuccessBtn}
          >
            💬 Instant WhatsApp Connect
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles.enquiryCard} ${variant === 'compact' ? styles.enquiryCardCompact : ''}`}>
      <div className={styles.header}>
        <span className={styles.badge}>⚡ Direct Specialist Quote</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      {errorMsg && <div className={styles.errorBanner}>{errorMsg}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Honeypot field for bot protection */}
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          className={styles.honeypot}
        />

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Your Name *</label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. Rahul Sharma"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>WhatsApp / Phone *</label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Departure City</label>
            <input
              type="text"
              name="departureCity"
              placeholder="e.g. Delhi, Mumbai, Bangalore"
              value={formData.departureCity}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Estimated Travel Month</label>
            <input
              type="text"
              name="travelDate"
              placeholder="e.g. November 2025"
              value={formData.travelDate}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Number of Travellers</label>
            <select
              name="paxAdults"
              value={formData.paxAdults}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="1">1 Person (Solo)</option>
              <option value="2">2 Persons (Couple / Friends)</option>
              <option value="3">3 Persons</option>
              <option value="4">4 Persons (Family / Group)</option>
              <option value="5">5+ Persons (Large Group)</option>
            </select>
          </div>
        </div>

        {variant === 'full' && (
          <>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>Budget Range (Optional)</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="">Select budget range...</option>
                  <option value="Under ₹50,000">Under ₹50,000 per person</option>
                  <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000 per person</option>
                  <option value="₹1,00,000 - ₹2,00,000">₹1,00,000 - ₹2,00,000 (Premium)</option>
                  <option value="₹2,00,000+">₹2,00,000+ (Luxury Private)</option>
                </select>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Preferred Contact Mode</label>
                <select
                  name="communicationPreference"
                  value={formData.communicationPreference}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="whatsapp">WhatsApp (Fastest Response ⚡)</option>
                  <option value="phone">Phone Call</option>
                  <option value="email">Email</option>
                </select>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Special Preferences / Flight Needs</label>
              <textarea
                name="message"
                placeholder="Mention any specific hotels, meal preferences, flight requirements, or celebrations..."
                value={formData.message}
                onChange={handleChange}
                className={styles.textarea}
              />
            </div>
          </>
        )}

        <div className={styles.actions}>
          <button type="submit" disabled={loading} className={styles.submitBtn}>
            {loading ? 'Submitting Enquiry...' : 'Get Custom Itinerary & Best Price →'}
          </button>

          <div className={styles.whatsappAlt}>
            Need immediate advice?{' '}
            <a
              href={`https://wa.me/918375030889?text=${encodeURIComponent(
                `Hi Hassle Free Travels, I need quick assistance for planning a trip to ${targetLabel}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappLink}
            >
              Chat on WhatsApp ↗
            </a>
          </div>
        </div>
      </form>
    </div>
  )
}
