import type { CollectionConfig } from 'payload'

export const AuditLogs: CollectionConfig = {
  slug: 'audit-logs',
  labels: {
    singular: 'Audit Log',
    plural: 'Audit & Security Logs',
  },
  admin: {
    useAsTitle: 'action',
    defaultColumns: ['action', 'collectionName', 'recordTitle', 'user', 'createdAt'],
    group: 'Settings & Admin',
    description: 'Immutable system audit trail tracking sensitive modifications, status transitions, and user actions.',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'action',
          type: 'text',
          required: true,
          label: 'Action Taken',
          admin: { width: '33%' },
        },
        {
          name: 'collectionName',
          type: 'text',
          required: true,
          label: 'Affected Collection / Table',
          admin: { width: '33%' },
        },
        {
          name: 'recordTitle',
          type: 'text',
          label: 'Record Identifier / Title',
          admin: { width: '34%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'user',
          type: 'relationship',
          relationTo: 'users',
          label: 'Actor / User',
          admin: { width: '50%' },
        },
        {
          name: 'ipAddress',
          type: 'text',
          label: 'IP Address / User Agent',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'changesSummary',
      type: 'textarea',
      label: 'Delta / Modifications JSON',
    },
  ],
  access: {
    read: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'manager',
    create: () => true, // System logs
    update: () => false, // Immutable!
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
}
