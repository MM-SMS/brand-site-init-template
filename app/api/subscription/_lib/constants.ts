import { BRAND } from '@/lib/constants'

const ROOT = process.env.SITE_URL || `https://${BRAND.domain}`

export const BRAND_NAME = BRAND.name
export const LEGAL_ENTITY = BRAND.legalEntity
export const CONTACT_EMAIL = BRAND.contactEmail
export const SENDER_FROM =
  process.env.RESEND_FROM || `${BRAND.name} <noreply@${BRAND.domain}>`
export const SENDER_REPLY_TO = process.env.RESEND_REPLY_TO || BRAND.contactEmail
export const ADMIN_EMAIL = process.env.RESEND_FORWARD_EMAIL || ''

export const SITE_URL = ROOT
export const SUBSCRIBE_URL = `${ROOT}/subscribe`
export const UNSUBSCRIBE_URL = `${ROOT}/unsubscribe`
export const PRIVACY_URL = `${ROOT}/privacy`
export const TERMS_URL = `${ROOT}/terms`
