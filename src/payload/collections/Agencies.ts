import type { CollectionConfig } from 'payload'

export const Agencies: CollectionConfig = {
  slug: 'agencies',
  labels: {
    singular: 'B2B Partner Agency',
    plural: 'B2B Partner Agencies',
  },
  admin: {
    useAsTitle: 'agencyName',
    defaultColumns: ['agencyName', 'city', 'tier', 'commissionRate', 'status', 'accountManager'],
    group: 'B2B Network',
    description: 'Travel agents, corporate partners, and tour resellers.',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'agencyName',
          type: 'text',
          required: true,
          label: 'Agency / Corporate Name',
          admin: { width: '60%' },
        },
        {
          name: 'registrationNumber',
          type: 'text',
          label: 'GSTIN / IATA / Trade License',
          admin: { width: '40%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'contactPerson',
          type: 'text',
          required: true,
          label: 'Primary Coordinator',
          admin: { width: '33%' },
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          label: 'Official Email',
          admin: { width: '33%' },
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
          label: 'Phone / WhatsApp',
          admin: { width: '34%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'city',
          type: 'text',
          label: 'Headquarters City',
          admin: { width: '33%' },
        },
        {
          name: 'state',
          type: 'text',
          label: 'State / Province',
          admin: { width: '33%' },
        },
        {
          name: 'country',
          type: 'text',
          defaultValue: 'India',
          label: 'Country',
          admin: { width: '34%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'tier',
          type: 'select',
          required: true,
          defaultValue: 'silver',
          options: [
            { label: 'Silver Partner (Standard)', value: 'silver' },
            { label: 'Gold Partner (High Volume) 🥇', value: 'gold' },
            { label: 'Platinum Elite Partner 💎', value: 'platinum' },
          ],
          admin: { width: '33%' },
        },
        {
          name: 'commissionRate',
          type: 'number',
          defaultValue: 8,
          label: 'Contract Commission Rate (%)',
          admin: { width: '33%' },
        },
        {
          name: 'creditLimit',
          type: 'number',
          defaultValue: 0,
          label: 'Approved Credit Line (₹)',
          admin: { width: '34%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'status',
          type: 'select',
          defaultValue: 'active',
          options: [
            { label: 'Active Partner ✅', value: 'active' },
            { label: 'Pending Approval ⏳', value: 'pending' },
            { label: 'Suspended 🚫', value: 'suspended' },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'accountManager',
          type: 'relationship',
          relationTo: 'users',
          label: 'Assigned Key Account Manager',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Partnership Agreement Notes & Commercial Terms',
    },
  ],
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'manager',
    update: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'manager',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
}
