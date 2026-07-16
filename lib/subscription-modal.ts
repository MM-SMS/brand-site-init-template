export const SUBSCRIPTION_STORAGE = {
  subscribed: 'brand_subscribed',
  modalShows: 'brand_modal_shows',
  modalLastShownAt: 'brand_modal_last_shown_at',
} as const

function getCooldownMs(shows: number): number {
  if (shows === 0) return 4000
  if (shows === 1) return 2 * 60 * 1000
  if (shows === 2) return 5 * 60 * 1000
  return 20 * 60 * 1000
}

export function getSubscribeModalDelayMs(now = Date.now()): number | null {
  if (typeof window === 'undefined') return null
  if (localStorage.getItem(SUBSCRIPTION_STORAGE.subscribed) === '1') return null

  const shows = parseInt(localStorage.getItem(SUBSCRIPTION_STORAGE.modalShows) || '0', 10)
  const lastShownAt = parseInt(localStorage.getItem(SUBSCRIPTION_STORAGE.modalLastShownAt) || '0', 10)

  if (shows === 0) return 4000

  const cooldownMs = getCooldownMs(shows)
  const elapsed = lastShownAt ? now - lastShownAt : 0
  return elapsed >= cooldownMs ? 4000 : cooldownMs - elapsed
}

export function recordSubscribeModalShown(now = Date.now()): void {
  const current = parseInt(localStorage.getItem(SUBSCRIPTION_STORAGE.modalShows) || '0', 10)
  localStorage.setItem(SUBSCRIPTION_STORAGE.modalShows, String(current + 1))
  localStorage.setItem(SUBSCRIPTION_STORAGE.modalLastShownAt, String(now))
}

export function markSubscribed(): void {
  localStorage.setItem(SUBSCRIPTION_STORAGE.subscribed, '1')
}
