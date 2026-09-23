import type { CollectionConfig } from 'payload'

export const AgencyContacts: CollectionConfig = {
  slug: 'agency-contacts',
  labels: {
    singular: 'Agency Agent / Contact',
    plural: 'Agency Contacts',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'agency', 'designation', 'email', 'phone', 'isPrimary'],
    group: 'B2B Network',
    description: 'Individual travel agents, ticketing executives, and tour operators under partner agencies.',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Contact Name',
          admin: { width: '50%' },
        },
        {
          name: 'agency',
          type: 'relationship',
          relationTo: 'agencies',
          required: true,
          label: 'Parent Agency',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'designation',
          type: 'text',
          label: 'Job Title / Role (e.g. Head of Outbound, Travel Consultant)',
          admin: { width: '50%' },
        },
        {
          name: 'isPrimary',
          type: 'checkbox',
          label: 'Primary Point of Contact',
          defaultValue: false,
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
          required: true,
          label: 'Direct Email',
          admin: { width: '50%' },
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
          label: 'Direct WhatsApp / Phone',
          admin: { width: '50%' },
        },
      ],
    },
  ],
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'manager',
    update: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'manager',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
}
