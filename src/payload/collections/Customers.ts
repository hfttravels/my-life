import type { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
  slug: 'customers',
  labels: {
    singular: 'Customer',
    plural: 'Customers',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'email', 'status', 'lifetimeValue', 'totalBookings', 'updatedAt'],
    group: 'CRM & Leads',
    description: 'Verified travelers, past clients, and high-value customer profiles.',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Customer Name',
          admin: { width: '50%' },
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
          label: 'Primary Phone',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'email',
          type: 'email',
          label: 'Email',
          admin: { width: '50%' },
        },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'active',
          options: [
            { label: 'Active Traveler', value: 'active' },
            { label: 'VIP / HNI 🌟', value: 'vip' },
            { label: 'Prospective Client', value: 'prospect' },
            { label: 'Inactive', value: 'inactive' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'city',
          type: 'text',
          label: 'City of Residence',
          admin: { width: '33%' },
        },
        {
          name: 'country',
          type: 'text',
          defaultValue: 'India',
          label: 'Country',
          admin: { width: '33%' },
        },
        {
          name: 'passportExpiry',
          type: 'date',
          label: 'Passport Expiry Date',
          admin: { width: '34%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'totalBookings',
          type: 'number',
          defaultValue: 0,
          label: 'Completed Trips',
          admin: { width: '50%' },
        },
        {
          name: 'lifetimeValue',
          type: 'number',
          defaultValue: 0,
          label: 'Lifetime Value (₹)',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Traveler Preferences & Special Requirements',
      admin: { initCollapsed: false },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'preferredHotelCategory',
              type: 'select',
              label: 'Preferred Stay Category',
              options: [
                { label: '3-Star / Standard Boutique', value: 'standard' },
                { label: '4-Star Premium', value: 'premium' },
                { label: '5-Star Luxury', value: 'luxury' },
                { label: 'Ultra Luxury / Heritage / Private Villa', value: 'ultra_luxury' },
              ],
              admin: { width: '50%' },
            },
            {
              name: 'dietaryPreferences',
              type: 'text',
              label: 'Dietary (e.g. Jain, Vegetarian, Halal, Vegan)',
              admin: { width: '50%' },
            },
          ],
        },
        {
          name: 'preferredDestinations',
          type: 'relationship',
          relationTo: 'destinations',
          hasMany: true,
          label: 'Bucket List / Preferred Destinations',
        },
        {
          name: 'emergencyContact',
          type: 'group',
          label: 'Emergency Contact Info',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  label: 'Contact Person',
                  admin: { width: '50%' },
                },
                {
                  name: 'phone',
                  type: 'text',
                  label: 'Emergency Phone',
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Agent Relationship Notes & Insights',
    },
  ],
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'manager',
  },
}
