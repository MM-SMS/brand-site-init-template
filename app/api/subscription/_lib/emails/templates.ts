import {
  BRAND_NAME,
  LEGAL_ENTITY,
  CONTACT_EMAIL,
  SUBSCRIBE_URL,
  UNSUBSCRIBE_URL,
  PRIVACY_URL,
  TERMS_URL,
  SITE_URL,
} from '../constants'
import { BRAND, LEGAL } from '@/lib/constants'

type SubscriptionType = 'email' | 'sms' | 'both'
type Channel = 'email' | 'sms' | 'both'

const ACCENT = '#111111'
const INK = '#0f0f0f'
const BG_PAGE = '#f5f5f5'
const BG_CARD = '#ffffff'
const GRAY = '#6b7280'
const GRAY_DIM = '#9ca3af'
const BORDER = '#e5e7eb'

function shell(content: string, showUnsubLink = true): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${BRAND_NAME}</title>
</head>
<body style="margin:0;padding:0;background:${BG_PAGE};font-family:Inter,system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${BG_PAGE};padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="580" cellpadding="0" cellspacing="0"
          style="max-width:580px;width:100%;background:${BG_CARD};border:1px solid ${BORDER};border-radius:12px;overflow:hidden;">
          <tr>
            <td style="background:${INK};padding:20px 32px;">
              <span style="font-size:14px;font-weight:600;color:#fff;vertical-align:middle;">${BRAND_NAME}</span>
              <span style="font-size:11px;color:${GRAY_DIM};margin-left:8px;vertical-align:middle;">${BRAND.tagline}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 32px 28px;">${content}</td>
          </tr>
          <tr>
            <td style="border-top:1px solid ${BORDER};padding:20px 32px;background:#fafafa;">
              <p style="font-size:11px;color:${GRAY};margin:0 0 6px;">
                ${BRAND_NAME} · ${LEGAL_ENTITY}<br />
                ${LEGAL.principalAddress}
              </p>
              ${
                showUnsubLink
                  ? `<p style="font-size:11px;color:${GRAY};margin:0;">
                <a href="${UNSUBSCRIBE_URL}" style="color:${INK};">Unsubscribe</a>
                · <a href="${PRIVACY_URL}" style="color:${INK};">Privacy</a>
                · <a href="${TERMS_URL}" style="color:${INK};">Terms</a>
              </p>`
                  : ''
              }
              <p style="font-size:10px;color:${GRAY_DIM};margin:8px 0 0;">You subscribed at ${SITE_URL}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function heading(text: string): string {
  return `<h1 style="font-size:24px;font-weight:600;color:${INK};margin:0 0 8px;">${text}</h1>`
}

function para(text: string): string {
  return `<p style="font-size:14px;color:${GRAY};line-height:1.7;margin:0 0 14px;">${text}</p>`
}

function bullet(text: string): string {
  return `<tr>
    <td style="color:${ACCENT};font-size:12px;padding-right:10px;vertical-align:top;padding-bottom:8px;">●</td>
    <td style="font-size:13px;color:${INK};line-height:1.6;padding-bottom:8px;">${text}</td>
  </tr>`
}

function bulletTable(items: string[]): string {
  return `<table cellpadding="0" cellspacing="0" style="width:100%;margin:12px 0;"><tbody>${items.map(bullet).join('')}</tbody></table>`
}

function btn(url: string, label: string): string {
  return `<div style="margin:24px 0 8px;">
    <a href="${url}" style="display:inline-block;background:${ACCENT};color:#ffffff;padding:12px 28px;font-size:13px;font-weight:600;text-decoration:none;border-radius:8px;">${label}</a>
  </div>`
}

function signoff(): string {
  return `<p style="font-size:14px;color:${GRAY};margin:24px 0 4px;">${BRAND.tagline}</p>
  <p style="font-size:14px;color:${INK};font-weight:600;margin:0;">The ${BRAND_NAME} Team</p>`
}

function buildWelcomeEmailOnly(firstName: string): string {
  return `
    ${heading(`Welcome, ${firstName}`)}
    ${para(`Thank you for joining <strong style="color:${INK};">${BRAND_NAME}</strong>. You're subscribed to email updates.`)}
    ${bulletTable([
      'Newsletters and product updates',
      'Tips and announcements based on your preferences',
      'Easy unsubscribe anytime',
    ])}
    ${para(`Manage preferences anytime — <a href="${UNSUBSCRIBE_URL}" style="color:${INK};">unsubscribe here</a>.`)}
    ${btn(SITE_URL, `Visit ${BRAND_NAME}`)}
    ${signoff()}`
}

function buildWelcomeSmsOnly(firstName: string): string {
  return `
    ${heading(`Welcome, ${firstName}`)}
    ${para(`Your phone is now connected to <strong style="color:${INK};">${BRAND_NAME}</strong> SMS updates.`)}
    ${bulletTable([
      'Occasional text alerts when you opt in',
      'Reply STOP anytime to opt out',
    ])}
    ${para(`Reply <strong>STOP</strong> to any message to unsubscribe.`)}
    ${btn(SITE_URL, `Visit ${BRAND_NAME}`)}
    ${signoff()}`
}

function buildWelcomeBoth(firstName: string): string {
  return `
    ${heading(`Welcome, ${firstName}`)}
    ${para(`You're fully subscribed to <strong style="color:${INK};">${BRAND_NAME}</strong> — email and SMS.`)}
    ${bulletTable([
      'Email: newsletters and updates',
      'SMS: optional alerts (reply STOP anytime)',
    ])}
    ${para(`<a href="${UNSUBSCRIBE_URL}" style="color:${INK};">Manage preferences</a> or reply STOP to any text.`)}
    ${btn(SITE_URL, `Visit ${BRAND_NAME}`)}
    ${signoff()}`
}

function buildGoodbyeBody(channel: Channel): string {
  const channelLabel =
    channel === 'both'
      ? 'all communications'
      : channel === 'email'
        ? 'email communications'
        : 'SMS messages'

  const channelDetail =
    channel === 'email'
      ? `If you also receive SMS from us, reply <strong style="color:${INK};">STOP</strong> to any text to opt out immediately.`
      : channel === 'sms'
        ? `If you also receive emails from us, manage those on our <a href="${UNSUBSCRIBE_URL}" style="color:${INK};">unsubscribe page</a>.`
        : `You have been fully removed from all ${BRAND_NAME} communication channels.`

  const removedItems =
    channel === 'both'
      ? ['Email — removed', 'SMS — removed']
      : [`${channel === 'email' ? 'Email' : 'SMS'} — removed`]

  return `
    ${heading('Unsubscribe confirmed')}
    ${para(`This confirms you have been unsubscribed from <strong style="color:${INK};">${BRAND_NAME} ${channelLabel}</strong>.`)}
    ${bulletTable(removedItems)}
    ${para(channelDetail)}
    ${para(`If you did not request this, contact <a href="mailto:${CONTACT_EMAIL}" style="color:${INK};">${CONTACT_EMAIL}</a> immediately.`)}
    ${btn(SUBSCRIBE_URL, `Resubscribe to ${BRAND_NAME}`)}
    ${signoff()}`
}

export function buildWelcomeEmail(firstName: string, type: SubscriptionType): string {
  if (type === 'email') return shell(buildWelcomeEmailOnly(firstName), true)
  if (type === 'sms') return shell(buildWelcomeSmsOnly(firstName), true)
  return shell(buildWelcomeBoth(firstName), true)
}

export function getWelcomeSubject(type: SubscriptionType): string {
  switch (type) {
    case 'email':
      return `Welcome to ${BRAND_NAME} — subscription confirmed`
    case 'sms':
      return `${BRAND_NAME} SMS channel confirmed`
    case 'both':
      return `Welcome to ${BRAND_NAME} — you're all set`
  }
}

export function buildGoodbyeEmail(channel: Channel): string {
  return shell(buildGoodbyeBody(channel), false)
}

export function getGoodbyeSubject(channel: Channel): string {
  switch (channel) {
    case 'email':
      return `${BRAND_NAME} — email unsubscribe confirmed`
    case 'sms':
      return `${BRAND_NAME} — SMS unsubscribe confirmed`
    case 'both':
      return `${BRAND_NAME} — you have been fully unsubscribed`
  }
}

export function buildAdminSubscribeHtml(params: {
  firstName: string
  lastName: string
  email?: string
  phone?: string
  emailConsent: boolean
  smsAutoConsent: boolean
  smsMarketingConsent: boolean
  source: string
  page?: string
}): string {
  const ts = new Date().toISOString()
  const rows: [string, string][] = [
    ['Name', `${params.firstName} ${params.lastName}`],
    ['Email', params.email || '—'],
    ['Phone', params.phone || '—'],
    ['Email Consent', params.emailConsent ? 'Yes' : 'No'],
    ['SMS Transactional', params.smsAutoConsent ? 'Yes' : 'No'],
    ['SMS Marketing', params.smsMarketingConsent ? 'Yes' : 'No'],
    ['Source', params.source],
    ['Page', params.page || 'N/A'],
    ['Timestamp', ts],
  ]
  return `<div style="font-family:monospace;padding:24px;">
    <h2>New Subscription: ${params.firstName} ${params.lastName}</h2>
    <table style="border-collapse:collapse;font-size:12px;">
      ${rows.map(([k, v]) => `<tr><td style="padding:6px 12px;border:1px solid #ddd;">${k}</td><td style="padding:6px 12px;border:1px solid #ddd;">${v}</td></tr>`).join('')}
    </table>
  </div>`
}

export function buildAdminUnsubscribeHtml(params: {
  email?: string
  phone?: string
  channel: Channel
}): string {
  const channelText =
    params.channel === 'both' ? 'Both (Email + SMS)' : params.channel === 'email' ? 'Email' : 'SMS'
  const rows: [string, string][] = [
    ['Email', params.email || '—'],
    ['Phone', params.phone || '—'],
    ['Unsubscribed from', channelText],
    ['Timestamp', new Date().toISOString()],
  ]
  return `<div style="font-family:monospace;padding:24px;">
    <h2>Unsubscribe: ${params.email || params.phone || 'unknown'}</h2>
    <table style="border-collapse:collapse;font-size:12px;">
      ${rows.map(([k, v]) => `<tr><td style="padding:6px 12px;border:1px solid #ddd;">${k}</td><td style="padding:6px 12px;border:1px solid #ddd;">${v}</td></tr>`).join('')}
    </table>
  </div>`
}
