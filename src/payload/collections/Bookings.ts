import type { CollectionConfig } from 'payload'

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  labels: {
    singular: 'Booking',
    plural: 'Bookings',
  },
  admin: {
    useAsTitle: 'bookingReference',
    defaultColumns: ['bookingReference', 'customer', 'destination', 'departureDate', 'status', 'totalAmount', 'updatedAt'],
    group: 'Bookings & Revenue',
    description: 'Travel itineraries booked, departures, guest lists, and payment balances.',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'bookingReference',
          type: 'text',
          required: true,
          unique: true,
          label: 'Booking ID',
          admin: {
            description: 'Unique reference e.g. HFT-BK-2026-001',
            width: '40%',
          },
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'confirmed',
          options: [
            { label: 'Draft / Quote', value: 'draft' },
            { label: 'Confirmed (Awaiting Advance)', value: 'confirmed' },
            { label: 'Advance Paid 🟢', value: 'advance_paid' },
            { label: 'Fully Paid ✅', value: 'fully_paid' },
            { label: 'Trip In Progress ✈️', value: 'operating' },
            { label: 'Completed 🏆', value: 'completed' },
            { label: 'Cancelled ❌', value: 'cancelled' },
          ],
          admin: { width: '30%' },
        },
        {
          name: 'assignedAgent',
          type: 'relationship',
          relationTo: 'users',
          label: 'Handling Specialist',
          admin: { width: '30%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'customer',
          type: 'relationship',
          relationTo: 'customers',
          required: true,
          label: 'Primary Guest / Client',
          admin: { width: '50%' },
        },
        {
          name: 'enquiry',
          type: 'relationship',
          relationTo: 'enquiries',
          label: 'Original Enquiry',
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
          required: true,
          label: 'Destination',
          admin: { width: '50%' },
        },
        {
          name: 'package',
          type: 'relationship',
          relationTo: 'packages',
          label: 'Tour Package',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'departureDate',
          type: 'date',
          required: true,
          label: 'Departure Date',
          admin: { width: '25%' },
        },
        {
          name: 'returnDate',
          type: 'date',
          label: 'Return Date',
          admin: { width: '25%' },
        },
        {
          name: 'paxAdults',
          type: 'number',
          required: true,
          defaultValue: 2,
          label: 'Adults Count',
          admin: { width: '25%' },
        },
        {
          name: 'paxChildren',
          type: 'number',
          defaultValue: 0,
          label: 'Children Count',
          admin: { width: '25%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'departureCity',
          type: 'text',
          label: 'Departure City / Hub',
          admin: { width: '33%' },
        },
        {
          name: 'totalAmount',
          type: 'number',
          required: true,
          label: 'Total Package Value (₹)',
          admin: { width: '33%' },
        },
        {
          name: 'currency',
          type: 'select',
          defaultValue: 'INR',
          options: [
            { label: 'INR (₹)', value: 'INR' },
            { label: 'USD ($)', value: 'USD' },
            { label: 'EUR (€)', value: 'EUR' },
            { label: 'AED (د.إ)', value: 'AED' },
            { label: 'THB (฿)', value: 'THB' },
          ],
          admin: { width: '34%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'advanceRequired',
          type: 'number',
          label: 'Advance Required (₹)',
          admin: { width: '33%' },
        },
        {
          name: 'advancePaid',
          type: 'number',
          defaultValue: 0,
          label: 'Total Received (₹)',
          admin: { width: '33%' },
        },
        {
          name: 'balanceRemaining',
          type: 'number',
          label: 'Balance Pending (₹)',
          admin: { width: '34%' },
        },
      ],
    },
    {
      name: 'specialRequests',
      type: 'textarea',
      label: 'Special Inclusions / Custom Itinerary Adjustments',
    },
  ],
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'manager',
  },
}
