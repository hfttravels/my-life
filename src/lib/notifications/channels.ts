import { db } from '@/db'
import { leadActivities } from '@/db/schema'

export interface NotificationPayload {
  leadId: string
  name: string
  phone: string
  email?: string | null
  destination?: string | null
  packageSlug?: string | null
  travelDate?: string | null
  departureCity?: string | null
  paxAdults?: number | null
  paxChildren?: number | null
  tripType?: string | null
  budget?: string | null
  message?: string | null
  source?: string | null
  sourcePage?: string | null
  leadScore?: number
  leadGrade?: 'hot' | 'warm' | 'cold'
  recommendedAction?: string
}

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&')
}

export async function sendInternalTelegramAlert(payload: NotificationPayload): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    console.log('[notifications] Telegram not configured (missing bot token or chat ID)')
    return false
  }

  const cleanPhone = payload.phone.replace(/[^0-9]/g, '')
  const whatsappTarget = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`
  const gradeEmoji = payload.leadGrade === 'hot' ? '🔥 HOT LEAD' : payload.leadGrade === 'warm' ? '⚡ WARM LEAD' : '❄️ COLD LEAD'

  const lines = [
    `🌍 *NEW TRAVEL ENQUIRY RECEIVED*`,
    `━━━━━━━━━━━━━━━━━━━━━`,
    `🏷️ *Score:* ${payload.leadScore || 0}/100 [${gradeEmoji}]`,
    `👤 *Name:* ${escapeMarkdown(payload.name)}`,
    `📞 *Phone:* ${escapeMarkdown(payload.phone)}`,
    payload.email ? `📧 *Email:* ${escapeMarkdown(payload.email)}` : '',
    payload.destination ? `✈️ *Destination:* ${escapeMarkdown(payload.destination)}` : '',
    payload.packageSlug ? `🎒 *Package:* ${escapeMarkdown(payload.packageSlug)}` : '',
    payload.departureCity ? `🏙️ *From:* ${escapeMarkdown(payload.departureCity)}` : '',
    payload.travelDate ? `📅 *Date:* ${escapeMarkdown(payload.travelDate)}` : '',
    payload.paxAdults ? `👥 *Guests:* ${payload.paxAdults} adults ${payload.paxChildren ? `+ ${payload.paxChildren} children` : ''}` : '',
    payload.budget ? `💰 *Budget:* ${escapeMarkdown(payload.budget)}` : '',
    payload.message ? `💬 *Notes:* "${escapeMarkdown(payload.message)}"` : '',
    `📄 *Source:* ${escapeMarkdown(payload.source || 'Website')} (${escapeMarkdown(payload.sourcePage || '/')})`,
    `━━━━━━━━━━━━━━━━━━━━━`,
    `⚡ *Recommended Next Step:*`,
    escapeMarkdown(payload.recommendedAction || 'Contact client immediately on WhatsApp.'),
    ``,
    `👉 [Open WhatsApp Chat](https://wa.me/${whatsappTarget})`,
  ]
    .filter(Boolean)
    .join('\n')

  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines,
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
      }),
    })

    if (!res.ok) {
      const err = await res.text().catch(() => 'unknown')
      console.error('[notifications] Telegram error:', err)
      return false
    }

    // Log activity
    await db.insert(leadActivities).values({
      leadId: payload.leadId,
      activityType: 'notification_sent',
      title: 'Telegram Alert Sent to Ops Team',
      description: `Dispatched lead alert with score ${payload.leadScore} (${payload.leadGrade})`,
      performedBy: 'System Automation',
    }).catch(() => {})

    return true
  } catch (err) {
    console.error('[notifications] Failed to dispatch Telegram alert:', err)
    return false
  }
}

export async function sendInternalEmailAlert(payload: NotificationPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.LEADS_TO_EMAIL

  if (!apiKey || !toEmail) {
    console.log('[notifications] Resend not configured (missing key or destination email)')
    return false
  }

  const target = payload.packageSlug || payload.destination || 'Custom Tour'
  const subject = `[${(payload.leadGrade || 'new').toUpperCase()}] 🌍 New Lead: ${payload.name} — ${target} (Score: ${payload.leadScore || 0})`
  const cleanPhone = payload.phone.replace(/[^0-9]/g, '')
  const whatsappTarget = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`

  const htmlBody = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
  <div style="background: linear-gradient(135deg, #8B2FC9, #6B1FA9); padding: 24px; color: #ffffff;">
    <div style="display: inline-block; background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; margin-bottom: 8px;">
      ${payload.leadGrade === 'hot' ? '🔥 Hot Lead (High Intent)' : payload.leadGrade === 'warm' ? '⚡ Warm Lead' : '❄️ Standard Lead'}
    </div>
    <h2 style="margin: 0; font-size: 22px; font-weight: 700;">New Traveller Enquiry Received</h2>
    <p style="margin: 6px 0 0; opacity: 0.9; font-size: 14px;">Lead Score: <strong>${payload.leadScore || 0}/100</strong></p>
  </div>
  
  <div style="padding: 24px;">
    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
      <tr><td style="padding: 10px 0; color: #64748b; width: 140px; border-bottom: 1px solid #f1f5f9;">Guest Name</td><td style="padding: 10px 0; font-weight: 600; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${payload.name}</td></tr>
      <tr><td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Phone / WhatsApp</td><td style="padding: 10px 0; font-weight: 600; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${payload.phone}</td></tr>
      ${payload.email ? `<tr><td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">${payload.email}</td></tr>` : ''}
      ${payload.destination ? `<tr><td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Destination</td><td style="padding: 10px 0; font-weight: 600; color: #8B2FC9; border-bottom: 1px solid #f1f5f9;">${payload.destination}</td></tr>` : ''}
      ${payload.packageSlug ? `<tr><td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Package</td><td style="padding: 10px 0; font-weight: 600; color: #F5A623; border-bottom: 1px solid #f1f5f9;">${payload.packageSlug}</td></tr>` : ''}
      ${payload.departureCity ? `<tr><td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Departure City</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">${payload.departureCity}</td></tr>` : ''}
      ${payload.travelDate ? `<tr><td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Travel Timeline</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">${payload.travelDate}</td></tr>` : ''}
      ${payload.paxAdults ? `<tr><td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Travellers</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">${payload.paxAdults} Adults ${payload.paxChildren ? `, ${payload.paxChildren} Children` : ''}</td></tr>` : ''}
      ${payload.budget ? `<tr><td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Budget Preference</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">${payload.budget}</td></tr>` : ''}
      ${payload.message ? `<tr><td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Notes</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">${payload.message}</td></tr>` : ''}
    </table>

    <div style="margin-top: 20px; padding: 14px; background: #faf5ff; border: 1px solid #f3e8ff; border-radius: 8px;">
      <p style="margin: 0; font-size: 13px; color: #6b21a8; font-weight: 600;">AI Action Recommendation:</p>
      <p style="margin: 4px 0 0; font-size: 13px; color: #4c1d95;">${payload.recommendedAction || 'Engage prospect quickly.'}</p>
    </div>

    <div style="margin-top: 24px; text-align: center;">
      <a href="https://wa.me/${whatsappTarget}?text=${encodeURIComponent(`Hi ${payload.name}, thanks for enquiring about ${payload.packageSlug || payload.destination || 'our holiday packages'} with Hassle Free Travels! I have prepared your personalized itinerary details.`)}" 
         style="display: inline-block; background: #25D366; color: #ffffff; padding: 12px 24px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 14px; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);">
        💬 Open WhatsApp Chat with ${payload.name}
      </a>
    </div>
  </div>
</div>
`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Hassle Free Travels CRM <leads@hasslefree-travels.com>',
        to: toEmail,
        subject,
        html: htmlBody,
      }),
    })

    if (!res.ok) {
      const err = await res.text().catch(() => 'unknown')
      console.error('[notifications] Resend error:', err)
      return false
    }

    // Log activity
    await db.insert(leadActivities).values({
      leadId: payload.leadId,
      activityType: 'notification_sent',
      title: 'Email Alert Sent via Resend',
      description: `Sent alert to sales team (${toEmail})`,
      performedBy: 'System Automation',
    }).catch(() => {})

    return true
  } catch (err) {
    console.error('[notifications] Failed to dispatch Resend email:', err)
    return false
  }
}

export async function sendCustomerWelcomeEmail(payload: NotificationPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey || !payload.email) return false

  const destination = payload.destination || 'Your Dream Destination'

  const htmlBody = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
  <div style="background: linear-gradient(135deg, #8B2FC9, #E8562A); padding: 32px 24px; color: #ffffff; text-align: center;">
    <h1 style="margin: 0; font-size: 24px; font-weight: 800;">Hassle Free Travels</h1>
    <p style="margin: 8px 0 0; font-size: 16px; opacity: 0.95;">Thank you for planning your holiday with us!</p>
  </div>
  <div style="padding: 28px 24px; color: #1e293b; line-height: 1.6;">
    <p style="font-size: 16px; margin: 0 0 16px;">Dear <strong>${payload.name}</strong>,</p>
    <p style="font-size: 15px; margin: 0 0 16px;">We have received your enquiry for <strong>${destination}</strong>. Our destination specialist is already curating the best flight options, handpicked 4-star/5-star stays, and customized itinerary highlights for your trip.</p>
    <p style="font-size: 15px; margin: 0 0 24px;">For immediate itinerary customization, instant flight checks, or visa assistance, connect directly with our holiday concierge on WhatsApp:</p>
    <div style="text-align: center; margin: 24px 0;">
      <a href="https://wa.me/918375030889?text=${encodeURIComponent(`Hi Hassle Free Travels, I just submitted an enquiry for ${destination}. Could you please share the itinerary details?`)}" 
         style="display: inline-block; background: #25D366; color: #ffffff; padding: 14px 28px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 15px;">
        📱 Chat with Specialist on WhatsApp (+91 8375030889)
      </a>
    </div>
    <p style="font-size: 13px; color: #64748b; margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 16px;">
      Warm regards,<br />
      <strong>Hassle Free Travels Concierge Team</strong><br />
      Call/WhatsApp: +91 8375030889 | info@hasslefree-travels.com
    </p>
  </div>
</div>
`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Hassle Free Travels <concierge@hasslefree-travels.com>',
        to: payload.email,
        subject: `✈️ We received your ${destination} travel enquiry! — Hassle Free Travels`,
        html: htmlBody,
      }),
    })

    return res.ok
  } catch (err) {
    console.error('[notifications] Customer welcome email failed:', err)
    return false
  }
}
