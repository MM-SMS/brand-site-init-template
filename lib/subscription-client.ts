import { markSubscribed } from '@/lib/subscription-modal'

export async function submitSubscribe(payload: {
  firstName: string
  lastName: string
  email: string
  phone: string
  emailConsent: boolean
  smsAutoConsent: boolean
  smsMarketingConsent: boolean
  termsPrivacyAccepted: boolean
  turnstileToken: string | null
  source?: string
  page?: string
}): Promise<{ success: boolean; error?: string }> {
  const res = await fetch('/api/subscription/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...payload,
      page: payload.page ?? (typeof window !== 'undefined' ? window.location.pathname : undefined),
    }),
  })
  const data = (await res.json()) as { success?: boolean; error?: string }
  if (data.success) {
    markSubscribed()
    return { success: true }
  }
  return { success: false, error: data.error || 'Request failed' }
}

export async function submitUnsubscribe(payload: {
  channels: ('email' | 'sms')[]
  email?: string
  phone?: string
  turnstileToken: string | null
}): Promise<{ success: boolean; error?: string }> {
  const res = await fetch('/api/subscription/unsubscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = (await res.json()) as { success?: boolean; error?: string }
  return data.success ? { success: true } : { success: false, error: data.error || 'Request failed' }
}
