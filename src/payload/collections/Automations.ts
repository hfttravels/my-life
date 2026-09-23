import type { CollectionConfig } from 'payload'

export const Automations: CollectionConfig = {
  slug: 'automations',
  labels: {
    singular: 'Automation Rule',
    plural: 'Automations & Workflows',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'triggerEvent', 'actionType', 'isActive', 'executionCount', 'lastTriggeredAt'],
    group: 'Automation & Settings',
    description: 'Event-driven automated workflows for instant messaging, notifications, task assignments, and drip sequences.',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Workflow Name',
          admin: { width: '70%' },
        },
        {
          name: 'isActive',
          type: 'checkbox',
          label: 'Active & Enabled',
          defaultValue: true,
          admin: { width: '30%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'triggerEvent',
          type: 'select',
          required: true,
          label: 'Trigger Event',
          options: [
            { label: 'New Lead Ingested (Any Channel)', value: 'lead_created' },
            { label: 'Hot Lead Detected (AI Score >= 75) 🔥', value: 'hot_lead_detected' },
            { label: 'Pipeline Stage Advanced', value: 'pipeline_stage_changed' },
            { label: 'Payment Advance Captured 💳', value: 'payment_received' },
            { label: 'Booking Confirmed 🎉', value: 'booking_confirmed' },
            { label: 'Pre-Departure Check-in (3 Days Before)', value: 'pre_departure' },
            { label: 'Post-Trip Review Request (Day After Return)', value: 'post_trip_review' },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'actionType',
          type: 'select',
          required: true,
          label: 'Automated Action',
          options: [
            { label: 'Send Instant WhatsApp Template', value: 'send_whatsapp' },
            { label: 'Send Welcome / Itinerary Email (Resend)', value: 'send_email' },
            { label: 'Dispatch Instant Telegram Alert to Ops Team', value: 'notify_telegram' },
            { label: 'Auto-Assign Specialist (Round-Robin / Destination)', value: 'assign_agent' },
            { label: 'Schedule Follow-Up Task for Agent', value: 'create_followup' },
            { label: 'Dispatch Outbound Webhook', value: 'webhook_dispatch' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'filterCondition',
      type: 'text',
      label: 'Trigger Filter Expression (e.g. destination == "thailand" or priority == "urgent")',
      admin: {
        description: 'Optional expression to limit when this automation runs.',
      },
    },
    {
      name: 'actionConfig',
      type: 'textarea',
      label: 'Action Configuration (Template ID, Message Body, or JSON Payload)',
      defaultValue: '{\n  "template": "lead_instant_acknowledgement",\n  "include_itinerary_link": true\n}',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'executionCount',
          type: 'number',
          label: 'Total Executions',
          defaultValue: 0,
          admin: { width: '50%', readOnly: true },
        },
        {
          name: 'lastTriggeredAt',
          type: 'date',
          label: 'Last Run Timestamp',
          admin: { width: '50%', readOnly: true },
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
