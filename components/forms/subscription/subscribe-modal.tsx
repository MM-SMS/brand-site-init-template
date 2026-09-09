'use client'

import { useState, type FormEvent } from 'react'
import { X, CheckCircle, Mail, Bell, Shield } from 'lucide-react'
import { SubscribeFormBody, validateSubscribeForm } from '@/components/forms/subscribe-form-body'
import { BRAND } from '@/lib/constants'
import type { SubscribeFormConfig } from 'subscribe-form-config/client'
import { submitSubscribe } from '@/lib/subscription-client'

const MODAL_BENEFITS = [
  { icon: Mail, text: 'Updates and tips delivered to your inbox' },
  { icon: Bell, text: 'Optional SMS alerts — only if you opt in' },
  { icon: Shield, text: 'Unsubscribe any time. Data never sold.' },
]

interface SubscribeModalProps {
  onClose: () => void
  source?: string
  formConfig?: SubscribeFormConfig
}

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function SubscribeModal({
  onClose,
  source = 'modal',
  formConfig,
}: SubscribeModalProps) {
  const [formState, setFormState] = useState<FormState>('idle')
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const [cbEmail, setCbEmail] = useState(false)
  const [cbSms, setCbSms] = useState(false)
  const [cbMarketing, setCbMarketing] = useState(false)
  const [cbTerms, setCbTerms] = useState(false)

  const [errors, setErrors] = useState<Record<string, string>>({})

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
      source,
    })

    setFormState(result.success ? 'success' : 'error')
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative flex max-h-[95vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-border bg-background text-foreground shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {BRAND.name} — Free subscription
            </p>
            <h2 className="text-lg font-medium">Stay in the loop</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-border p-2 transition-colors hover:bg-muted"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        {formState !== 'success' && (
          <div className="grid shrink-0 grid-cols-1 gap-2 border-b border-border bg-muted/30 px-6 py-3 sm:grid-cols-3">
            {MODAL_BENEFITS.map((benefit) => (
              <div key={benefit.text} className="flex items-start gap-2">
                <benefit.icon className="mt-0.5 size-3.5 shrink-0 text-primary" />
                <span className="text-[11px] leading-snug text-muted-foreground">{benefit.text}</span>
              </div>
            ))}
          </div>
        )}

        {formState === 'success' ? (
          <div className="flex flex-col items-center justify-center gap-5 px-8 py-14 text-center">
            <CheckCircle className="size-12 text-primary" />
            <div>
              <h3 className="mb-2 text-xl font-medium">You&apos;re subscribed!</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Welcome to {BRAND.name}, {firstName}. You&apos;ll receive updates based on your selected
                preferences.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-border px-6 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto px-6 py-5">
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
        )}
      </div>
    </div>
  )
}
