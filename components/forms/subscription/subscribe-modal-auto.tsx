'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { SubscribeModal } from '@/components/forms/subscription/subscribe-modal'
import { ROUTES } from '@/lib/constants'
import {
  getSubscribeModalDelayMs,
  recordSubscribeModalShown,
  SUBSCRIPTION_STORAGE,
} from '@/lib/subscription-modal'

const EXCLUDED_PATHS = [
  ROUTES.subscribe,
  ROUTES.unsubscribe,
  '/expired',
  '/not-found',
  '/privacy',
  '/terms',
]

export function SubscribeModalAuto() {
  const pathname = usePathname()
  const [showAutoModal, setShowAutoModal] = useState(false)

  const isExcluded = EXCLUDED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  )

  useEffect(() => {
    if (isExcluded) return

    const delayMs = getSubscribeModalDelayMs()
    if (delayMs === null) return

    const timer = setTimeout(() => {
      if (localStorage.getItem(SUBSCRIPTION_STORAGE.subscribed) === '1') return
      recordSubscribeModalShown()
      setShowAutoModal(true)
    }, delayMs)

    return () => clearTimeout(timer)
  }, [isExcluded, pathname])

  if (!showAutoModal) return null

  return <SubscribeModal onClose={() => setShowAutoModal(false)} source="auto-modal" />
}
