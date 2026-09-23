import type { CollectionConfig } from 'payload'

export const Communications: CollectionConfig = {
  slug: 'communications',
  labels: {
    singular: 'Communication Log',
    plural: 'Communications & Messages',
  },
  admin: {
    useAsTitle: 'recipient',
    defaultColumns: ['channel', 'direction', 'recipient', 'status', 'sentAt', 'enquiry'],
    group: 'CRM & Leads',
    description: 'Omnichannel message audit log across WhatsApp, Email, Telegram, and Phone.',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'channel',
          type: 'select',
          required: true,
          defaultValue: 'whatsapp',
          options: [
            { label: 'WhatsApp', value: 'whatsapp' },
            { label: 'Email (Resend)', value: 'email' },
            { label: 'Telegram Notification', value: 'telegram' },
            { label: 'Phone Call Record', value: 'call' },
            { label: 'SMS', value: 'sms' },
          ],
          admin: { width: '33%' },
        },
        {
          name: 'direction',
          type: 'select',
          required: true,
          defaultValue: 'outbound',
          options: [
            { label: 'Outbound (Sent)', value: 'outbound' },
            { label: 'Inbound (Received)', value: 'inbound' },
          ],
          admin: { width: '33%' },
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'sent',
          options: [
            { label: 'Queued', value: 'queued' },
            { label: 'Sent', value: 'sent' },
            { label: 'Delivered', value: 'delivered' },
            { label: 'Read / Opened', value: 'read' },
            { label: 'Failed ❌', value: 'failed' },
          ],
          admin: { width: '34%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'recipient',
          type: 'text',
          required: true,
          label: 'Recipient (Phone or Email)',
          admin: { width: '50%' },
        },
        {
          name: 'templateOrSubject',
          type: 'text',
          label: 'Template Name / Subject',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'messageBody',
      type: 'textarea',
      required: true,
      label: 'Message Content',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'enquiry',
          type: 'relationship',
          relationTo: 'enquiries',
          label: 'Related Lead',
          admin: { width: '33%' },
        },
        {
          name: 'customer',
          type: 'relationship',
          relationTo: 'customers',
          label: 'Related Customer',
          admin: { width: '33%' },
        },
        {
          name: 'sentBy',
          type: 'relationship',
          relationTo: 'users',
          label: 'Sent By Specialist',
          admin: { width: '34%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'externalId',
          type: 'text',
          label: 'External Message ID (Resend/WhatsApp/Telegram)',
          admin: { width: '50%' },
        },
        {
          name: 'sentAt',
          type: 'date',
          label: 'Timestamp',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'errorDetails',
      type: 'text',
      label: 'Error Diagnostics (if failed)',
      admin: {
        condition: (data) => data?.status === 'failed',
      },
    },
  ],
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
}
