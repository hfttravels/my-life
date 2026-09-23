import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

/**
 * Revalidation hooks for Payload CMS collections.
 * These ensure the public frontend updates when content changes in /admin.
 *
 * The `context.disableRevalidation` flag is used during bulk seeding
 * to prevent revalidation storms.
 */

// ── Destinations ──
export const revalidateDestination: CollectionAfterChangeHook = ({
  doc,
  req,
  context,
}) => {
  if (context?.disableRevalidation) return doc

  const slug = doc.slug as string
  if (!slug) return doc

  req.payload.logger.info(`Revalidating destination: ${slug}`)

  try {
    revalidatePath(`/destination/${slug}`)
    revalidatePath('/') // Homepage shows trending destinations
    revalidateTag('destinations', 'max')
    revalidateTag('sitemap', 'max')
  } catch (err) {
    req.payload.logger.error(`Revalidation error for destination ${slug}: ${err}`)
  }

  return doc
}

// ── Packages ──
export const revalidatePackage: CollectionAfterChangeHook = ({
  doc,
  req,
  context,
}) => {
  if (context?.disableRevalidation) return doc

  const slug = doc.slug as string
  if (!slug) return doc

  req.payload.logger.info(`Revalidating package: ${slug}`)

  try {
    // Resolve the destination slug for URL revalidation
    const destination = doc.destination
    let destSlug: string | undefined

    if (typeof destination === 'object' && destination?.slug) {
      destSlug = destination.slug
    } else if (typeof destination === 'string') {
      // Relationship stored as ID — we need to look up the slug
      // This is a fire-and-forget revalidation, so we use a simpler approach
      destSlug = undefined
    }

    if (destSlug) {
      revalidatePath(`/destination/${destSlug}/${slug}`)
      revalidatePath(`/destination/${destSlug}`) // Parent destination page
    }
    revalidatePath('/') // Homepage may show featured packages
    revalidateTag('packages', 'max')
    revalidateTag('destinations', 'max')
    revalidateTag('sitemap', 'max')
  } catch (err) {
    req.payload.logger.error(`Revalidation error for package ${slug}: ${err}`)
  }

  return doc
}

// ── Posts ──
export const revalidatePost: CollectionAfterChangeHook = ({
  doc,
  req,
  context,
}) => {
  if (context?.disableRevalidation) return doc

  const slug = doc.slug as string
  if (!slug) return doc

  req.payload.logger.info(`Revalidating post: ${slug}`)

  try {
    revalidatePath(`/blogs/${slug}`)
    revalidatePath('/blogs')
    revalidateTag('posts', 'max')
    revalidateTag('sitemap', 'max')

    // If linked to a destination, revalidate that too
    const destination = doc.destination
    if (typeof destination === 'object' && destination?.slug) {
      revalidatePath(`/destination/${destination.slug}`)
    }
  } catch (err) {
    req.payload.logger.error(`Revalidation error for post ${slug}: ${err}`)
  }

  return doc
}

// ── Generic afterDelete hook factory ──
export function revalidateDelete(
  collection: 'destinations' | 'packages' | 'posts'
): CollectionAfterDeleteHook {
  return ({ doc, req, context }) => {
    if (context?.disableRevalidation) return

    req.payload.logger.info(`Revalidating after delete in ${collection}: ${doc?.slug}`)

    try {
      revalidateTag(collection, 'max')
      revalidateTag('sitemap', 'max')
      revalidatePath('/')

      if (collection === 'destinations' && doc?.slug) {
        revalidatePath(`/destination/${doc.slug}`)
      }
      if (collection === 'packages' && doc?.slug) {
        const dest = doc.destination
        const destSlug = typeof dest === 'object' ? dest?.slug : undefined
        if (destSlug) {
          revalidatePath(`/destination/${destSlug}/${doc.slug}`)
          revalidatePath(`/destination/${destSlug}`)
        }
      }
      if (collection === 'posts' && doc?.slug) {
        revalidatePath(`/blogs/${doc.slug}`)
        revalidatePath('/blogs')
      }
    } catch (err) {
      req.payload.logger.error(`Revalidation error on delete in ${collection}: ${err}`)
    }
  }
}
