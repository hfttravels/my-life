import type { CollectionConfig } from 'payload'
import { revalidatePackage, revalidateDelete } from '../hooks/revalidate'

export const Packages: CollectionConfig = {
  slug: 'packages',
  labels: {
    singular: 'Tour Package',
    plural: 'Tour Packages',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'destination', 'startingPriceINR', '_status', 'updatedAt'],
    description: 'Tour packages / itineraries linked to a destination.',
    group: 'Content',
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [revalidatePackage],
    afterDelete: [revalidateDelete('packages')],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Package Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'destination',
      type: 'relationship',
      relationTo: 'destinations',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    // ── Duration & Price ──
    {
      name: 'durationDays',
      type: 'number',
      required: true,
      label: 'Days',
      admin: { width: '25%' },
    },
    {
      name: 'durationNights',
      type: 'number',
      required: true,
      label: 'Nights',
      admin: { width: '25%' },
    },
    {
      name: 'startingPriceINR',
      type: 'number',
      label: 'Starting Price (INR)',
      admin: {
        description: 'Number only, no ₹ symbol. Leave empty for enquiry-only.',
        width: '25%',
      },
    },
    {
      name: 'priceNote',
      type: 'text',
      label: 'Price Note',
      admin: {
        description: 'e.g. "per person, twin share, ex-Delhi, without flights"',
        width: '25%',
      },
    },
    // ── Details ──
    {
      name: 'packageType',
      type: 'select',
      label: 'Package Type',
      defaultValue: 'group',
      options: [
        { label: 'Group', value: 'group' },
        { label: 'Custom / Private', value: 'custom' },
        { label: 'Honeymoon', value: 'honeymoon' },
        { label: 'Family', value: 'family' },
        { label: 'Adventure', value: 'adventure' },
        { label: 'Spiritual', value: 'spiritual' },
        { label: 'Culinary', value: 'culinary' },
        { label: 'Beach', value: 'beach' },
        { label: 'Luxury', value: 'luxury' },
        { label: 'Heritage', value: 'heritage' },
        { label: 'Wellness', value: 'wellness' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
    },
    {
      name: 'groupSize',
      type: 'text',
      label: 'Group Size',
      admin: { description: 'e.g. "2–16 pax"' },
    },
    {
      name: 'difficulty',
      type: 'select',
      label: 'Difficulty',
      options: [
        { label: 'Easy', value: 'easy' },
        { label: 'Moderate', value: 'moderate' },
        { label: 'Challenging', value: 'challenging' },
        { label: 'Extreme', value: 'extreme' },
      ],
    },
    {
      name: 'bestTime',
      type: 'text',
      label: 'Best Time to Visit',
    },
    {
      name: 'heroImage',
      type: 'text',
      required: true,
      label: 'Hero Image URL',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Gallery',
      fields: [
        { name: 'url', type: 'text', required: true },
        { name: 'alt', type: 'text' },
      ],
    },
    {
      name: 'summary',
      type: 'richText',
      label: 'Summary',
    },
    // ── Itinerary ──
    {
      name: 'itinerary',
      type: 'array',
      label: 'Day-by-Day Itinerary',
      fields: [
        { name: 'day', type: 'number', required: true, label: 'Day Number' },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
        { name: 'meals', type: 'text' },
        { name: 'stay', type: 'text' },
      ],
    },
    // ── Inclusions / Exclusions ──
    {
      name: 'inclusions',
      type: 'array',
      label: 'Inclusions',
      fields: [
        { name: 'text', type: 'text', required: true },
      ],
    },
    {
      name: 'exclusions',
      type: 'array',
      label: 'Exclusions',
      fields: [
        { name: 'text', type: 'text', required: true },
      ],
    },
    // ── FAQs ──
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQs',
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
    // ── Logistics ──
    {
      name: 'pickup',
      type: 'text',
      label: 'Pickup Location',
    },
    {
      name: 'drop',
      type: 'text',
      label: 'Drop Location',
    },
    {
      name: 'mealsSummary',
      type: 'text',
      label: 'Meals Summary',
    },
    {
      name: 'staySummary',
      type: 'text',
      label: 'Stay Summary',
    },
    {
      name: 'transportSummary',
      type: 'text',
      label: 'Transport Summary',
    },
    {
      name: 'visaNote',
      type: 'textarea',
      label: 'Visa Note',
    },
    {
      name: 'route',
      type: 'text',
      label: 'Route',
      admin: { description: 'e.g. "Delhi → Shimla → Kaza → Manali → Delhi"' },
    },
    // ── CTA ──
    {
      name: 'enquiryWhatsAppText',
      type: 'text',
      label: 'WhatsApp Enquiry Text',
      admin: {
        description: 'Auto-defaults to package title if empty.',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'Featured',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    // ── SEO ──
    {
      type: 'group',
      name: 'seo',
      label: 'SEO',
      fields: [
        { name: 'metaTitle', type: 'text', label: 'Meta Title' },
        { name: 'metaDescription', type: 'textarea', label: 'Meta Description' },
        { name: 'ogImage', type: 'text', label: 'OG Image URL' },
        { name: 'canonical', type: 'text', label: 'Canonical URL' },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Published At',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
  ],
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return { _status: { equals: 'published' } }
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
}
