// ─────────────────────────────────────────────
// SMS via Textbelt  (https://textbelt.com)
// ─────────────────────────────────────────────

const TEXTBELT_KEY = process.env.TEXTBELT_API_KEY

export interface SmsResult {
  success: boolean
  textId?: string
  error?: string
  skipped?: boolean
}

export async function sendWelcomeSms({
  firstName,
  phone,
  brandName,
}: {
  firstName: string
  phone: string
  brandName: string
  unsubscribeUrl: string
  supportEmail: string
}): Promise<SmsResult> {
  if (!TEXTBELT_KEY) {
    console.log('[SMS] TEXTBELT_API_KEY not set — skipping')
    return { success: false, skipped: true, error: 'TEXTBELT_API_KEY not configured' }
  }

  const message =
    `Hi ${firstName}! You're subscribed to ${brandName} SMS tips. ` +
    `Msg & data rates may apply. Frequency varies. ` +
    `Reply STOP to unsubscribe, HELP for help.`

  try {
    const res = await fetch('https://textbelt.com/text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, message, key: TEXTBELT_KEY }),
    })
    const data = (await res.json()) as { success: boolean; textId?: string; error?: string }
    if (!data.success) return { success: false, error: data.error }
    return { success: true, textId: data.textId }
  } catch (err) {
    return { success: false, error: String(err) }
  }
}

export async function sendGoodbyeSms({
  phone,
  brandName,
}: {
  phone: string
  brandName: string
  subscribeUrl?: string
}): Promise<SmsResult> {
  if (!TEXTBELT_KEY) {
    return { success: false, skipped: true, error: 'TEXTBELT_API_KEY not configured' }
  }

  // SMS carriers may block messages containing URLs — keep goodbye text plain
  const message =
    `${phone}: you have been unsubscribed from ${brandName} SMS. ` +
    `No more messages will be sent to this number. ` +
    `Reply START at any time to resubscribe.`

  try {
    const res = await fetch('https://textbelt.com/text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, message, key: TEXTBELT_KEY }),
    })
    const data = (await res.json()) as { success: boolean; textId?: string; error?: string }
    if (!data.success) return { success: false, error: data.error }
    return { success: true, textId: data.textId }
  } catch (err) {
    return { success: false, error: String(err) }
  }
}
