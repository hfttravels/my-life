'use client'

import React, { useMemo } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useListQuery } from '@payloadcms/ui'
import styles from './DestinationFilterButtons.module.css'

export const DestinationFilterButtons: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  let listQuery: ReturnType<typeof useListQuery> | null = null
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    listQuery = useListQuery()
  } catch {
    // Graceful fallback if rendered outside ListQueryProvider
    listQuery = null
  }

  // Determine active filter from URL or ListQuery context
  const activeFilter = useMemo((): 'all' | 'india' | 'international' => {
    // 1. Check URL search parameters
    const whereKind =
      searchParams?.get('where[kind][equals]') ||
      searchParams?.get('where[or][0][and][0][kind][equals]') ||
      searchParams?.get('kind')

    if (whereKind === 'india' || whereKind === 'international') {
      return whereKind
    }

    // 2. Check query context if present
    const qWhere = (listQuery?.query as Record<string, unknown> | undefined)?.where as
      | Record<string, unknown>
      | undefined

    if (
      (qWhere?.kind as Record<string, unknown> | undefined)?.equals === 'india'
    ) {
      return 'india'
    }
    if (
      (qWhere?.kind as Record<string, unknown> | undefined)?.equals ===
      'international'
    ) {
      return 'international'
    }

    return 'all'
  }, [searchParams, listQuery?.query])

  const handleFilter = async (target: 'all' | 'india' | 'international') => {
    if (activeFilter === target) return

    // Preferred: Use Payload's official refineListData/handleWhereChange for instant fast-reload
    if (listQuery?.refineListData) {
      if (target === 'all') {
        await listQuery.refineListData({
          page: 1,
          where: {},
        })
      } else {
        await listQuery.refineListData({
          page: 1,
          where: {
            kind: {
              equals: target,
            },
          },
        })
      }
      return
    }

    if (listQuery?.handleWhereChange) {
      await listQuery.handleWhereChange(
        target === 'all' ? {} : { kind: { equals: target } }
      )
      return
    }

    // Fallback: router replace
    const params = new URLSearchParams(searchParams?.toString() || '')
    params.delete('where[kind][equals]')
    params.delete('where[or][0][and][0][kind][equals]')
    params.delete('kind')
    params.set('page', '1')

    if (target !== 'all') {
      params.set('where[kind][equals]', target)
    }

    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className={styles.container} role="group" aria-label="Filter destinations by kind">
      <button
        type="button"
        className={`${styles.button} ${activeFilter === 'all' ? styles.active : ''}`}
        onClick={() => void handleFilter('all')}
        title="Show all destinations"
      >
        <span className={styles.icon}>🌎</span>
        <span>All</span>
        <span className={styles.badge}>22</span>
      </button>

      <button
        type="button"
        className={`${styles.button} ${activeFilter === 'india' ? styles.active : ''}`}
        onClick={() => void handleFilter('india')}
        title="Show only Domestic destinations in India"
      >
        <span className={styles.icon}>🇮🇳</span>
        <span>Domestic</span>
        <span className={styles.badge}>9</span>
      </button>

      <button
        type="button"
        className={`${styles.button} ${activeFilter === 'international' ? styles.active : ''}`}
        onClick={() => void handleFilter('international')}
        title="Show only International destinations"
      >
        <span className={styles.icon}>✈️</span>
        <span>International</span>
        <span className={styles.badge}>13</span>
      </button>
    </div>
  )
}

export default DestinationFilterButtons
