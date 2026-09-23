import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role', 'isActive', 'updatedAt'],
    group: 'Settings & Admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'agent',
      options: [
        { label: 'Platform Admin', value: 'admin' },
        { label: 'Sales Manager', value: 'manager' },
        { label: 'Travel Specialist / Agent', value: 'agent' },
        { label: 'Content Editor', value: 'editor' },
        { label: 'B2B Partner Agent', value: 'b2b_agency' },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Active Status',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Profile Photo',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'assignedDestinations',
      type: 'relationship',
      relationTo: 'destinations',
      hasMany: true,
      label: 'Assigned Destination Specialties',
      admin: {
        condition: (data) => ['agent', 'manager'].includes(data?.role),
      },
    },
  ],
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'manager',
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
}
