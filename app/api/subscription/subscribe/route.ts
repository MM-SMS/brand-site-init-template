import { NextRequest, NextResponse } from 'next/server'
import { isSubscribeFieldRequired, isSubscribeFieldVisible } from 'subscribe-form-config'
import { getSubscribeFormConfig } from '@/lib/subscribe-form-server'
import { verifyTurnstileToken } from '../_lib/turnstile'
import { sendWelcomeEmail, sendAdminSubscribeNotification } from '../_lib/email'
import { sendWelcomeSms } from '../_lib/sms'
import { BRAND_NAME, CONTACT_EMAIL, UNSUBSCRIBE_URL } from '../_lib/constants'

type SubscriptionType = 'email' | 'sms' | 'both'

function deriveSubscriptionType(
  emailConsent: boolean,
  smsAuto: boolean,
  smsMkt: boolean,
): SubscriptionType {
  const hasSms = smsAuto || smsMkt
  if (emailConsent && hasSms) return 'both'
  if (hasSms) return 'sms'
  return 'email'
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      firstName,
      lastName,
      email,
      phone,
      emailConsent = false,
      smsAutoConsent = false,
      smsMarketingConsent = false,
      termsPrivacyAccepted = false,
      turnstileToken,
      source = 'website',
      page,
    } = body

    if (!turnstileToken) {
      return NextResponse.json(
        { success: false, error: 'Missing security token' },
        { status: 400, headers: corsHeaders() },
      )
    }
    const valid = await verifyTurnstileToken(turnstileToken)
    if (!valid) {
      return NextResponse.json(
        { success: false, error: 'Security check failed. Please try again.' },
        { status: 400, headers: corsHeaders() },
      )
    }

    const formConfig = await getSubscribeFormConfig()
    const show = (key: Parameters<typeof isSubscribeFieldVisible>[1]) =>
      isSubscribeFieldVisible(formConfig, key)
    const need = (key: Parameters<typeof isSubscribeFieldRequired>[1]) =>
      isSubscribeFieldRequired(formConfig, key)

    if (need('firstName') && !firstName) {
      return NextResponse.json(
        { success: false, error: 'First name is required' },
        { status: 400, headers: corsHeaders() },
      )
    }
    if (need('lastName') && !lastName) {
      return NextResponse.json(
        { success: false, error: 'Last name is required' },
        { status: 400, headers: corsHeaders() },
      )
    }
    if (need('email') && !email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400, headers: corsHeaders() },
      )
    }
    if (need('phone') && !phone) {
      return NextResponse.json(
        { success: false, error: 'Phone number is required' },
        { status: 400, headers: corsHeaders() },
      )
    }
    if ((show('email') || show('phone')) && !email && !phone) {
      return NextResponse.json(
        { success: false, error: 'Please provide at least one contact method (email or phone)' },
        { status: 400, headers: corsHeaders() },
      )
    }
    if (need('cbEmail') && !emailConsent) {
      return NextResponse.json(
        { success: false, error: 'Email consent is required' },
        { status: 400, headers: corsHeaders() },
      )
    }
    if (need('cbSms') && !smsAutoConsent) {
      return NextResponse.json(
        { success: false, error: 'SMS consent is required' },
        { status: 400, headers: corsHeaders() },
      )
    }
    if (need('cbMarketing') && !smsMarketingConsent) {
      return NextResponse.json(
        { success: false, error: 'Marketing consent is required' },
        { status: 400, headers: corsHeaders() },
      )
    }
    if (need('cbTerms') && !termsPrivacyAccepted) {
      return NextResponse.json(
        { success: false, error: 'You must accept the Terms & Conditions and Privacy Policy' },
        { status: 400, headers: corsHeaders() },
      )
    }

    const type = deriveSubscriptionType(emailConsent, smsAutoConsent, smsMarketingConsent)

    if (email) {
      await sendWelcomeEmail({ firstName, email, type })
    }

    let smsResult: Awaited<ReturnType<typeof sendWelcomeSms>> | null = null
    if (phone && smsAutoConsent) {
      smsResult = await sendWelcomeSms({
        firstName,
        phone,
        brandName: BRAND_NAME,
        supportEmail: CONTACT_EMAIL,
        unsubscribeUrl: UNSUBSCRIBE_URL,
      })
    }

    await sendAdminSubscribeNotification({
      firstName,
      lastName,
      email,
      phone,
      emailConsent,
      smsAutoConsent,
      smsMarketingConsent,
      source,
      page,
    })

    return NextResponse.json({ success: true, smsResult }, { headers: corsHeaders() })
  } catch (err) {
    console.error('[Subscribe] Error:', err)
    return NextResponse.json(
      { success: false, error: 'Failed to process subscription' },
      { status: 500, headers: corsHeaders() },
    )
  }
}
