import type { Metadata } from 'next'
import { Suspense } from 'react'
import SubscribePage from './subscribe-page'
import { BRAND } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Subscribe — ${BRAND.name}`,
  description: `Subscribe to ${BRAND.name} updates.`,
}

export default function Page() {
  return (
    <Suspense>
      <SubscribePage />
    </Suspense>
  )
}
