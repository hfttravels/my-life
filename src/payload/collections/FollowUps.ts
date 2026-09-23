import type { CollectionConfig } from 'payload'

export const FollowUps: CollectionConfig = {
  slug: 'follow-ups',
  labels: {
    singular: 'Follow-Up Task',
    plural: 'Follow-Up Tasks',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'priority', 'status', 'dueDate', 'assignedTo', 'updatedAt'],
    group: 'CRM & Leads',
    description: 'Scheduled reminders, calls, proposal deadlines, and payment follow-ups.',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Task Summary',
          admin: { width: '60%' },
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          defaultValue: 'call',
          options: [
            { label: 'Follow-up Call', value: 'call' },
            { label: 'WhatsApp Message', value: 'whatsapp' },
            { label: 'Send Custom Itinerary / Quote', value: 'send_itinerary' },
            { label: 'Payment / Advance Reminder', value: 'payment_reminder' },
            { label: 'Visa Documents Collection', value: 'visa_followup' },
            { label: 'Post-Trip Review Check-in', value: 'post_trip_feedback' },
          ],
          admin: { width: '40%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'dueDate',
          type: 'date',
          required: true,
          label: 'Due Date & Time',
          admin: { width: '33%' },
        },
        {
          name: 'priority',
          type: 'select',
          defaultValue: 'medium',
          options: [
            { label: 'Low', value: 'low' },
            { label: 'Medium', value: 'medium' },
            { label: 'High 🔥', value: 'high' },
            { label: 'Urgent ⚠️', value: 'urgent' },
          ],
          admin: { width: '33%' },
        },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'pending',
          options: [
            { label: 'Pending', value: 'pending' },
            { label: 'Completed ✅', value: 'completed' },
            { label: 'Cancelled ❌', value: 'cancelled' },
            { label: 'Overdue ⏰', value: 'overdue' },
          ],
          admin: { width: '34%' },
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
          admin: { width: '33%' },
        },
        {
          name: 'enquiry',
          type: 'relationship',
          relationTo: 'enquiries',
          label: 'Related Lead / Enquiry',
          admin: { width: '33%' },
        },
        {
          name: 'customer',
          type: 'relationship',
          relationTo: 'customers',
          label: 'Related Customer',
          admin: { width: '34%' },
        },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Follow-up Instructions / Notes',
    },
  ],
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
}
