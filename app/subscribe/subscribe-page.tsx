'use client'

import { useEffect, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, ArrowLeft, Mail, Bell, Shield } from 'lucide-react'
import { SubscribeFormBody, validateSubscribeForm } from '@/components/forms/subscribe-form-body'
import { Button } from '@/components/ui/button'
import { BRAND } from '@/lib/constants'
import type { SubscribeFormConfig } from 'subscribe-form-config/client'
import { submitSubscribe } from '@/lib/subscription-client'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const BENEFITS = [
  { icon: Mail, title: 'Email updates', desc: 'Newsletters and announcements based on your preferences.' },
  { icon: Bell, title: 'Optional SMS', desc: 'Text alerts only if you opt in. Reply STOP anytime.' },
  { icon: Shield, title: 'Your control', desc: 'Unsubscribe any time. We do not sell your data.' },
]

interface SubscribePageProps {
  formConfig?: SubscribeFormConfig
}

export default function SubscribePage({ formConfig }: SubscribePageProps) {
  const searchParams = useSearchParams()
  const [formState, setFormState] = useState<FormState>('idle')

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const [cbEmail, setCbEmail] = useState(false)
  const [cbSms, setCbSms] = useState(false)
  const [cbMarketing, setCbMarketing] = useState(false)
  const [cbTerms, setCbTerms] = useState(false)

  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const prefill = searchParams.get('email')
    if (prefill) {
      setEmail(prefill)
      setCbEmail(true)
    }
  }, [searchParams])

  const clearError = (key: string) =>
    setErrors((prev) => {
      const next = { ...prev }
      delete next[key]
      return next
    })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const errs = validateSubscribeForm({
      firstName,
      lastName,
      email,
      phone,
      cbEmail,
      cbSms,
      cbMarketing,
      cbTerms,
      captchaToken,
      formConfig,
    })
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setFormState('submitting')

    const result = await submitSubscribe({
      firstName,
      lastName,
      email,
      phone,
      emailConsent: cbEmail,
      smsAutoConsent: cbSms,
      smsMarketingConsent: cbMarketing,
      termsPrivacyAccepted: cbTerms,
      turnstileToken: captchaToken,
      source: 'subscribe-page',
    })

    setFormState(result.success ? 'success' : 'error')
  }

  if (formState === 'success') {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
        <CheckCircle className="mx-auto mb-6 size-14 text-primary" />
        <h1 className="mb-4 text-3xl font-semibold tracking-tight">You&apos;re subscribed</h1>
        <p className="mb-8 leading-relaxed text-muted-foreground">
          Welcome to {BRAND.name}, {firstName}. You&apos;ll receive updates based on your selected
          preferences.
        </p>
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="size-4" /> Return home
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-6">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Subscribe</p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Join {BRAND.name}
          </h1>
          <p className="max-w-md leading-relaxed text-muted-foreground">
            {BRAND.tagline} Choose how you want to hear from us — email, SMS, or both.
          </p>
          <ul className="space-y-4">
            {BENEFITS.map((item) => (
              <li key={item.title} className="flex gap-3">
                <item.icon className="mt-0.5 size-4 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
          <SubscribeFormBody
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            cbEmail={cbEmail}
            setCbEmail={setCbEmail}
            cbSms={cbSms}
            setCbSms={setCbSms}
            cbMarketing={cbMarketing}
            setCbMarketing={setCbMarketing}
            cbTerms={cbTerms}
            setCbTerms={setCbTerms}
            captchaToken={captchaToken}
            setCaptchaToken={setCaptchaToken}
            errors={errors}
            clearError={clearError}
            formState={formState}
            submitLabel={`Subscribe to ${BRAND.name}`}
            onSubmit={handleSubmit}
            formConfig={formConfig}
          />
        </div>
      </div>
    </div>
  )
}
