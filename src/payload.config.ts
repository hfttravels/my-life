import * as dotenv from 'dotenv'
if (!process.env.DATABASE_URL && !process.env.PAYLOAD_DATABASE_URI) {
  dotenv.config({ path: '.env.local' })
  dotenv.config()
}

import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './payload/collections/Users'
import { Media } from './payload/collections/Media'
import { Destinations } from './payload/collections/Destinations'
import { Packages } from './payload/collections/Packages'
import { Posts } from './payload/collections/Posts'
import { Enquiries } from './payload/collections/Enquiries'
import { Customers } from './payload/collections/Customers'
import { FollowUps } from './payload/collections/FollowUps'
import { Communications } from './payload/collections/Communications'
import { Bookings } from './payload/collections/Bookings'
import { Payments } from './payload/collections/Payments'
import { Agencies } from './payload/collections/Agencies'
import { AgencyContacts } from './payload/collections/AgencyContacts'
import { Automations } from './payload/collections/Automations'
import { Reviews } from './payload/collections/Reviews'
import { AuditLogs } from './payload/collections/AuditLogs'
import sharp from 'sharp'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  sharp,
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— Hassle Free Travels Revenue Intelligence Platform',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      beforeDashboard: [
        '@/payload/components/RevenueCommandCentre#RevenueCommandCentre',
      ],
    },
  },

  collections: [
    // Content & CMS
    Destinations,
    Packages,
    Posts,
    Reviews,
    Media,
    // CRM & Lead Intelligence
    Enquiries,
    Customers,
    FollowUps,
    Communications,
    // Bookings & Revenue
    Bookings,
    Payments,
    // B2B Network
    Agencies,
    AgencyContacts,
    // Automations & System
    Automations,
    AuditLogs,
    Users,
  ],

  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || 'UNSAFE-DEFAULT-SECRET-CHANGE-ME',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: postgresAdapter({
    pool: {
      connectionString: process.env.PAYLOAD_DATABASE_URI || process.env.DATABASE_URL || '',
    },
    schemaName: 'payload',
  }),

  // Local media uploads
  upload: {
    limits: {
      fileSize: 10000000, // 10MB
    },
  },

  // Automatically create first user on admin first visit
  onInit: async (payload) => {
    // Check if any users exist
    const users = await payload.find({
      collection: 'users',
      limit: 1,
    })

    if (users.totalDocs === 0) {
      const email = process.env.PAYLOAD_ADMIN_EMAIL || process.env.ADMIN_EMAIL
      const password = process.env.PAYLOAD_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD

      if (email && password) {
        await payload.create({
          collection: 'users',
          data: {
            email,
            password,
            role: 'admin',
          },
        })
        payload.logger.info(`Created initial admin user: ${email}`)
      } else {
        payload.logger.info(
          'No PAYLOAD_ADMIN_EMAIL/PAYLOAD_ADMIN_PASSWORD set. Visit /admin to create your first user.'
        )
      }
    }
  },
})
