import type { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  labels: {
    singular: 'Customer Review & Testimonial',
    plural: 'Customer Reviews',
  },
  admin: {
    useAsTitle: 'authorName',
    defaultColumns: ['authorName', 'rating', 'destination', 'verified', 'isFeatured', 'isPublished'],
    group: 'Content',
    description: 'Verified customer feedback, ratings, and social proof for destination & package landing pages.',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'authorName',
          type: 'text',
          required: true,
          label: 'Traveler Name',
          admin: { width: '50%' },
        },
        {
          name: 'location',
          type: 'text',
          label: 'Traveler City / Country (e.g. Bangalore, India)',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'rating',
          type: 'number',
          required: true,
          min: 1,
          max: 5,
          defaultValue: 5,
          label: 'Rating (1 to 5 Stars)',
          admin: { width: '33%' },
        },
        {
          name: 'destination',
          type: 'relationship',
          relationTo: 'destinations',
          label: 'Destination',
          admin: { width: '33%' },
        },
        {
          name: 'package',
          type: 'relationship',
          relationTo: 'packages',
          label: 'Package Taken',
          admin: { width: '34%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'travelMonth',
          type: 'text',
          label: 'Travel Period (e.g. November 2025)',
          admin: { width: '25%' },
        },
        {
          name: 'verified',
          type: 'checkbox',
          label: 'Verified Booking Guest ✅',
          defaultValue: true,
          admin: { width: '25%' },
        },
        {
          name: 'isFeatured',
          type: 'checkbox',
          label: 'Feature on Homepage ⭐',
          defaultValue: false,
          admin: { width: '25%' },
        },
        {
          name: 'isPublished',
          type: 'checkbox',
          label: 'Published Live',
          defaultValue: true,
          admin: { width: '25%' },
        },
      ],
    },
    {
      name: 'comment',
      type: 'textarea',
      required: true,
      label: 'Review Text / Story',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Traveler Profile Image',
    },
    {
      name: 'photos',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      label: 'Trip Photos Shared by Customer',
    },
  ],
  access: {
    read: () => true, // Public read for social proof
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'manager',
  },
}
