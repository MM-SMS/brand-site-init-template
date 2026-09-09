'use client'

/**
 * @deprecated Prefer Notion-driven copy via `subscribe-form-config`.
 * Kept as a fallback reference for SMS consent wording.
 */
import { BRAND } from '@/lib/constants'

export const SMS_CONSENT_TEXT = `I give my express consent to receive recurring automated text messages from ${BRAND.name} (operated by ${BRAND.legalEntity}) at the phone number provided, including messages sent using an automatic telephone dialing system. Message and data rates may apply and message frequency varies. I understand I can opt out at any time by replying "STOP" to any message, or get more information by replying "HELP." Consent is not required to purchase any goods or services. My number and SMS opt-in/consent will not be shared with third parties or affiliates for marketing purposes. Messages may include account and subscription notifications, support and service updates, important platform notices, and promotional updates.`

