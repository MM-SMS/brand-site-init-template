import { NextRequest, NextResponse } from 'next/server'
import { verifyTurnstileToken } from '../_lib/turnstile'
import { sendGoodbyeEmail, sendAdminUnsubscribeNotification } from '../_lib/email'
import { sendGoodbyeSms } from '../_lib/sms'
import { BRAND_NAME } from '../_lib/constants'

type Channel = 'email' | 'sms'

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
    const { channels, email, phone, turnstileToken } = body as {
      channels: Channel[]
      email?: string
      phone?: string
      turnstileToken?: string
    }

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

    if (!channels || !Array.isArray(channels) || channels.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Select at least one channel to unsubscribe from' },
        { status: 400, headers: corsHeaders() },
      )
    }

    const hasEmail = channels.includes('email')
    const hasSms = channels.includes('sms')

    if (hasEmail && (!email || !email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Email is required when unsubscribing from email' },
        { status: 400, headers: corsHeaders() },
      )
    }
    if (hasSms && (!phone || !phone.trim())) {
      return NextResponse.json(
        { success: false, error: 'Phone is required when unsubscribing from SMS' },
        { status: 400, headers: corsHeaders() },
      )
    }

    const channelType: 'email' | 'sms' | 'both' =
      hasEmail && hasSms ? 'both' : hasEmail ? 'email' : 'sms'

    if (hasEmail && email) {
      await sendGoodbyeEmail({ email, channel: channelType })
    }

    let smsResult: Awaited<ReturnType<typeof sendGoodbyeSms>> | null = null
    if (hasSms && phone) {
      smsResult = await sendGoodbyeSms({
        phone,
        brandName: BRAND_NAME,
      })
    }

    await sendAdminUnsubscribeNotification({ email, phone, channel: channelType })

    return NextResponse.json({ success: true, smsResult }, { headers: corsHeaders() })
  } catch (err) {
    console.error('[Unsubscribe] Error:', err)
    return NextResponse.json(
      { success: false, error: 'Failed to process unsubscribe request' },
      { status: 500, headers: corsHeaders() },
    )
  }
}
