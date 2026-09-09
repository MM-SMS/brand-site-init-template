import type { Metadata } from 'next'
import { Suspense } from 'react'
import SubscribePage from './subscribe-page'
import { BRAND } from '@/lib/constants'
import { getSubscribeFormConfig } from '@/lib/subscribe-form-server'

export const metadata: Metadata = {
  title: `Subscribe — ${BRAND.name}`,
  description: `Subscribe to ${BRAND.name} updates.`,
}

export default async function Page() {
  const formConfig = await getSubscribeFormConfig()

  return (
    <Suspense>
      <SubscribePage formConfig={formConfig} />
    </Suspense>
  )
}
