import { getPayload } from 'payload'
import config from '@/payload.config'

/**
 * Cached singleton or helper to get the initialized Payload instance.
 */
export async function getPayloadClient() {
  return await getPayload({ config })
}
