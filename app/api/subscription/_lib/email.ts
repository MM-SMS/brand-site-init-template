import { Resend } from 'resend'
import {
  buildWelcomeEmail,
  getWelcomeSubject,
  buildGoodbyeEmail,
  getGoodbyeSubject,
  buildAdminSubscribeHtml,
  buildAdminUnsubscribeHtml,
} from './emails/templates'
import { SENDER_FROM, SENDER_REPLY_TO, ADMIN_EMAIL } from './constants'

type SubscriptionType = 'email' | 'sms' | 'both'
type Channel = 'email' | 'sms' | 'both'

let _resend: Resend | null = null

function getResend(): Resend {
  if (!_resend) {
    if (!process.env.RESEND_API_KEY) throw new Error('RESEND_API_KEY not set')
    _resend = new Resend(process.env.RESEND_API_KEY)
  }
  return _resend
}

export async function sendWelcomeEmail(params: {
  firstName: string
  email: string
  type: SubscriptionType
}): Promise<void> {
  try {
    await getResend().emails.send({
      from: SENDER_FROM,
      replyTo: SENDER_REPLY_TO,
      to: params.email,
      subject: getWelcomeSubject(params.type),
      html: buildWelcomeEmail(params.firstName, params.type),
    })
  } catch (err) {
    console.error('[Email] Welcome email failed:', err)
  }
}

export async function sendGoodbyeEmail(params: {
  email: string
  channel: Channel
}): Promise<void> {
  try {
    await getResend().emails.send({
      from: SENDER_FROM,
      replyTo: SENDER_REPLY_TO,
      to: params.email,
      subject: getGoodbyeSubject(params.channel),
      html: buildGoodbyeEmail(params.channel),
    })
  } catch (err) {
    console.error('[Email] Goodbye email failed:', err)
  }
}

export async function sendAdminSubscribeNotification(params: {
  firstName: string
  lastName: string
  email?: string
  phone?: string
  emailConsent: boolean
  smsAutoConsent: boolean
  smsMarketingConsent: boolean
  source: string
  page?: string
}): Promise<void> {
  if (!ADMIN_EMAIL) return
  try {
    await getResend().emails.send({
      from: SENDER_FROM,
      to: ADMIN_EMAIL,
      subject: `New Subscription: ${params.firstName} ${params.lastName}`,
      html: buildAdminSubscribeHtml(params),
    })
  } catch (err) {
    console.error('[Email] Admin subscribe notification failed:', err)
  }
}

export async function sendAdminUnsubscribeNotification(params: {
  email?: string
  phone?: string
  channel: Channel
}): Promise<void> {
  if (!ADMIN_EMAIL) return
  try {
    await getResend().emails.send({
      from: SENDER_FROM,
      to: ADMIN_EMAIL,
      subject: `Unsubscribe Request: ${params.email || params.phone || 'unknown'}`,
      html: buildAdminUnsubscribeHtml(params),
    })
  } catch (err) {
    console.error('[Email] Admin unsubscribe notification failed:', err)
  }
}
