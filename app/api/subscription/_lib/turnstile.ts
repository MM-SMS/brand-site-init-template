const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

export async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY

  if (!secretKey) {
    console.warn('[Turnstile] TURNSTILE_SECRET_KEY not set — skipping verification (dev mode)')
    return true // allow in dev without key
  }

  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: secretKey, response: token }),
    })
    const data = (await res.json()) as { success: boolean }
    return data.success === true
  } catch (err) {
    console.error('[Turnstile] Verification error:', err)
    return false
  }
}
