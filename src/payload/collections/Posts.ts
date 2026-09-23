import type { CollectionConfig } from 'payload'
import { revalidatePost, revalidateDelete } from '../hooks/revalidate'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Blog Post',
    plural: 'Blog Posts',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'destination', '_status', 'publishedAt', 'updatedAt'],
    description: 'Travel blog posts, guides, and articles.',
    group: 'Content',
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [revalidatePost],
    afterDelete: [revalidateDelete('posts')],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
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
      admin: {
        position: 'sidebar',
        description: 'Link to a destination (optional).',
      },
    },
    {
      name: 'coverImage',
      type: 'text',
      label: 'Cover Image URL',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      label: 'Excerpt',
      admin: {
        description: 'Short summary for cards and meta descriptions.',
      },
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
      label: 'Body',
    },
    {
      name: 'authorDisplayName',
      type: 'text',
      label: 'Author Display Name',
      defaultValue: 'Hassle Free Travels',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Category',
      options: [
        { label: 'Travel Guides', value: 'Travel Guides' },
        { label: 'Places to Visit', value: 'Places to Visit' },
        { label: 'Things to Do', value: 'Things to Do' },
        { label: 'Best Time to Visit', value: 'Best Time to Visit' },
        { label: 'Weekend Getaways', value: 'Weekend Getaways' },
        { label: 'Tips & Hacks', value: 'Tips & Hacks' },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [
        { name: 'tag', type: 'text', required: true },
      ],
    },
    {
      name: 'readMinutes',
      type: 'number',
      label: 'Read Time (minutes)',
      defaultValue: 5,
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
