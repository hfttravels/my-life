import type { CollectionConfig } from 'payload'
import { revalidateDestination, revalidateDelete } from '../hooks/revalidate'

export const Destinations: CollectionConfig = {
  slug: 'destinations',
  labels: {
    singular: 'Destination',
    plural: 'Destinations',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'kind', '_status', 'updatedAt'],
    description: 'Travel destinations — each destination can have multiple tour packages.',
    group: 'Content',
    enableListViewSelectAPI: true,
    components: {
      beforeListTable: [
        '@/payload/components/DestinationFilterButtons#DestinationFilterButtons',
      ],
    },
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [revalidateDestination],
    afterDelete: [revalidateDelete('destinations')],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Destination Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL slug — auto-generated from title, locked after publish unless admin override.',
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
      name: 'kind',
      type: 'select',
      required: true,
      defaultValue: 'international',
      index: true,
      options: [
        { label: 'India (Domestic)', value: 'india' },
        { label: 'International', value: 'international' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'country',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'shortTagline',
      type: 'text',
      label: 'Short Tagline',
      admin: {
        description: 'One-line tagline for cards and badges.',
      },
    },
    {
      name: 'heroImage',
      type: 'text',
      label: 'Hero Image URL',
      admin: {
        description: 'URL to hero image (external or /public path).',
      },
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Gallery Images',
      fields: [
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
        },
      ],
    },
    {
      name: 'intro',
      type: 'richText',
      label: 'Introduction',
      admin: {
        description: 'Rich description of the destination.',
      },
    },
    {
      name: 'highlights',
      type: 'array',
      label: 'Highlights',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'bestTime',
      type: 'text',
      label: 'Best Time to Visit',
    },
    {
      name: 'durationHint',
      type: 'text',
      label: 'Ideal Duration',
      admin: {
        description: 'e.g. "6N / 7D"',
      },
    },
    {
      name: 'startingPrice',
      type: 'text',
      label: 'Starting Price Text',
      admin: {
        description: 'e.g. "Starts from ₹16,499 / person"',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'Featured / Trending',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show on homepage trending section.',
      },
    },
    {
      name: 'trendingBadge',
      type: 'text',
      label: 'Trending Badge',
      admin: {
        description: 'e.g. "Trending 2026", "Most searched 2026"',
        condition: (data) => data?.isFeatured,
      },
    },
    {
      name: 'trendingSeason',
      type: 'text',
      label: 'Trending Season',
      admin: {
        condition: (data) => data?.isFeatured,
      },
    },
    {
      name: 'trendingDuration',
      type: 'text',
      label: 'Trending Duration Display',
      admin: {
        condition: (data) => data?.isFeatured,
      },
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQs',
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      type: 'group',
      name: 'seo',
      label: 'SEO',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Meta Title',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta Description',
        },
        {
          name: 'ogImage',
          type: 'text',
          label: 'OG Image URL',
        },
        {
          name: 'canonical',
          type: 'text',
          label: 'Canonical URL',
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Published At',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      // Public: only published
      return {
        _status: { equals: 'published' },
      }
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
}
