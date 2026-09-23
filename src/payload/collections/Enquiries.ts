import type { CollectionConfig } from 'payload'

export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  labels: {
    singular: 'Lead / Enquiry',
    plural: 'Leads & Enquiries',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'destination', 'pipelineStage', 'priority', 'leadScore', 'leadGrade', 'assignedTo', 'createdAt'],
    group: 'CRM & Leads',
    description: 'High-intent travel enquiries and lead intelligence pipeline.',
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
          label: 'Phone (WhatsApp)',
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
          label: 'Email Address',
          admin: { width: '50%' },
        },
        {
          name: 'communicationPreference',
          type: 'select',
          label: 'Preferred Channel',
          defaultValue: 'whatsapp',
          options: [
            { label: 'WhatsApp', value: 'whatsapp' },
            { label: 'Email', value: 'email' },
            { label: 'Phone Call', value: 'phone' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'destination',
          type: 'relationship',
          relationTo: 'destinations',
          label: 'Interested Destination',
          admin: { width: '50%' },
        },
        {
          name: 'package',
          type: 'relationship',
          relationTo: 'packages',
          label: 'Interested Package',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'pipelineStage',
          type: 'select',
          label: 'Pipeline Stage',
          required: true,
          defaultValue: 'new',
          options: [
            { label: 'New Lead', value: 'new' },
            { label: 'Contacted', value: 'contacted' },
            { label: 'Requirements Gathered', value: 'requirement_gathered' },
            { label: 'Itinerary Sent', value: 'itinerary_sent' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Won / Booked', value: 'won' },
            { label: 'Lost', value: 'lost' },
            { label: 'Dormant', value: 'dormant' },
          ],
          admin: { width: '25%' },
        },
        {
          name: 'priority',
          type: 'select',
          label: 'Priority',
          required: true,
          defaultValue: 'medium',
          options: [
            { label: 'Low', value: 'low' },
            { label: 'Medium', value: 'medium' },
            { label: 'High', value: 'high' },
            { label: 'Urgent 🔥', value: 'urgent' },
          ],
          admin: { width: '25%' },
        },
        {
          name: 'leadGrade',
          type: 'select',
          label: 'AI Grade',
          defaultValue: 'cold',
          options: [
            { label: 'Hot 🔥', value: 'hot' },
            { label: 'Warm ⚡', value: 'warm' },
            { label: 'Cold ❄️', value: 'cold' },
          ],
          admin: { width: '25%' },
        },
        {
          name: 'leadScore',
          type: 'number',
          label: 'AI Score (0-100)',
          defaultValue: 0,
          admin: { width: '25%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'assignedTo',
          type: 'relationship',
          relationTo: 'users',
          label: 'Assigned Specialist',
          admin: { width: '50%' },
        },
        {
          name: 'followUpAt',
          type: 'date',
          label: 'Next Follow-up Due',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'travelDate',
          type: 'text',
          label: 'Estimated Travel Month / Date',
          admin: { width: '25%' },
        },
        {
          name: 'departureCity',
          type: 'text',
          label: 'Departure City',
          admin: { width: '25%' },
        },
        {
          name: 'paxAdults',
          type: 'number',
          label: 'Adults',
          admin: { width: '25%' },
        },
        {
          name: 'paxChildren',
          type: 'number',
          label: 'Children',
          admin: { width: '25%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'budget',
          type: 'text',
          label: 'Budget Preference',
          admin: { width: '33%' },
        },
        {
          name: 'estimatedRevenue',
          type: 'number',
          label: 'Estimated Revenue (₹)',
          admin: { width: '33%' },
        },
        {
          name: 'actualRevenue',
          type: 'number',
          label: 'Actual Revenue (₹)',
          admin: { width: '34%' },
        },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Visitor Inquiry Message / Notes',
    },
    {
      name: 'lostReason',
      type: 'text',
      label: 'Lost Reason (if lost)',
      admin: {
        condition: (data) => data?.pipelineStage === 'lost',
      },
    },
    {
      type: 'collapsible',
      label: 'Attribution & Analytics Intelligence',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'source',
              type: 'text',
              label: 'Channel / Source',
              admin: { width: '50%' },
            },
            {
              name: 'sourcePage',
              type: 'text',
              label: 'Page Submitted On',
              admin: { width: '50%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'utmSource',
              type: 'text',
              label: 'UTM Source',
              admin: { width: '33%' },
            },
            {
              name: 'utmMedium',
              type: 'text',
              label: 'UTM Medium',
              admin: { width: '33%' },
            },
            {
              name: 'utmCampaign',
              type: 'text',
              label: 'UTM Campaign',
              admin: { width: '34%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'visitorId',
              type: 'text',
              label: 'First-Party Visitor ID',
              admin: { width: '50%' },
            },
            {
              name: 'sessionId',
              type: 'text',
              label: 'Session ID',
              admin: { width: '50%' },
            },
          ],
        },
      ],
    },
  ],
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true, // Public enquiry submission allowed
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'manager',
  },
}
