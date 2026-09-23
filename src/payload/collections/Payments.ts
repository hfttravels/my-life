import type { CollectionConfig } from 'payload'

export const Payments: CollectionConfig = {
  slug: 'payments',
  labels: {
    singular: 'Payment',
    plural: 'Payments',
  },
  admin: {
    useAsTitle: 'transactionRef',
    defaultColumns: ['booking', 'amount', 'currency', 'paymentMethod', 'paymentType', 'status', 'paymentDate'],
    group: 'Bookings & Revenue',
    description: 'Payment receipts, advance deposits, bank transfers, and balance settlements.',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'booking',
          type: 'relationship',
          relationTo: 'bookings',
          required: true,
          label: 'Linked Booking ID',
          admin: { width: '50%' },
        },
        {
          name: 'customer',
          type: 'relationship',
          relationTo: 'customers',
          label: 'Customer / Payer',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'amount',
          type: 'number',
          required: true,
          label: 'Amount Received',
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
          admin: { width: '33%' },
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'captured',
          options: [
            { label: 'Captured / Received ✅', value: 'captured' },
            { label: 'Pending Verification ⏳', value: 'pending' },
            { label: 'Failed ❌', value: 'failed' },
            { label: 'Refunded ↩️', value: 'refunded' },
          ],
          admin: { width: '34%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'paymentType',
          type: 'select',
          required: true,
          defaultValue: 'advance',
          options: [
            { label: 'Booking Advance Deposit', value: 'advance' },
            { label: 'Milestone / Second Payment', value: 'milestone' },
            { label: 'Final Balance Settlement', value: 'final_balance' },
            { label: 'Full 100% Payment', value: 'full_payment' },
            { label: 'Add-on / Activity Extra', value: 'addon' },
            { label: 'Refund Issued', value: 'refund' },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'paymentMethod',
          type: 'select',
          required: true,
          defaultValue: 'upi',
          options: [
            { label: 'UPI (GPay / PhonePe / Paytm)', value: 'upi' },
            { label: 'NEFT / RTGS / IMPS Bank Transfer', value: 'bank_transfer' },
            { label: 'Credit Card / Debit Card', value: 'card' },
            { label: 'Razorpay Gateway', value: 'razorpay' },
            { label: 'Stripe Global Gateway', value: 'stripe' },
            { label: 'Cash / Cheque Deposit', value: 'cash' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'transactionRef',
          type: 'text',
          required: true,
          label: 'Transaction Ref / UTR / Gateway Order ID',
          admin: { width: '50%' },
        },
        {
          name: 'paymentDate',
          type: 'date',
          required: true,
          label: 'Payment Received Date',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'receipt',
      type: 'upload',
      relationTo: 'media',
      label: 'Payment Screenshot / Bank Receipt',
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Accountant / Reconciliation Remarks',
    },
  ],
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'manager',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
}
