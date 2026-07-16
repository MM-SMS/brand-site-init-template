'use client'

import { type FormEvent } from 'react'
import Link from 'next/link'
import { Mail, Phone, User, AlertCircle } from 'lucide-react'
import { CloudflareTurnstile } from '@/components/forms/turnstile'
import { SMS_CONSENT_TEXT } from '@/components/forms/subscription/consent-copy'
import { Button } from '@/components/ui/button'
import { BRAND } from '@/lib/constants'
import { cn } from '@/lib/utils'

export interface SubscribeFormState {
  firstName: string
  setFirstName: (v: string) => void
  lastName: string
  setLastName: (v: string) => void
  email: string
  setEmail: (v: string) => void
  phone: string
  setPhone: (v: string) => void
  cbEmail: boolean
  setCbEmail: (fn: (v: boolean) => boolean) => void
  cbSms: boolean
  setCbSms: (fn: (v: boolean) => boolean) => void
  cbMarketing: boolean
  setCbMarketing: (fn: (v: boolean) => boolean) => void
  cbTerms: boolean
  setCbTerms: (fn: (v: boolean) => boolean) => void
  captchaToken: string | null
  setCaptchaToken: (t: string | null) => void
  errors: Record<string, string>
  clearError: (key: string) => void
  formState: 'idle' | 'submitting' | 'success' | 'error'
  submitLabel?: string
  onSubmit: (e: FormEvent) => void
}

function TermsLink() {
  return (
    <Link
      href="/terms"
      target="_blank"
      className="text-primary underline-offset-2 hover:underline"
      onClick={(e) => e.stopPropagation()}
    >
      Terms & Conditions
    </Link>
  )
}

function PrivacyLink() {
  return (
    <Link
      href="/privacy"
      target="_blank"
      className="text-primary underline-offset-2 hover:underline"
      onClick={(e) => e.stopPropagation()}
    >
      Privacy Policy
    </Link>
  )
}

function TermsPrivacyLinks() {
  return (
    <>
      <Link
        href="/terms"
        target="_blank"
        className="text-primary underline-offset-2 hover:underline"
        onClick={(e) => e.stopPropagation()}
      >
        Terms
      </Link>
      {' & '}
      <Link
        href="/privacy"
        target="_blank"
        className="text-primary underline-offset-2 hover:underline"
        onClick={(e) => e.stopPropagation()}
      >
        Privacy
      </Link>
    </>
  )
}

export function SubscribeFormBody({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  phone,
  setPhone,
  cbEmail,
  setCbEmail,
  cbSms,
  setCbSms,
  cbMarketing,
  setCbMarketing,
  cbTerms,
  setCbTerms,
  setCaptchaToken,
  errors,
  clearError,
  formState,
  submitLabel = `Subscribe to ${BRAND.name}`,
  onSubmit,
}: SubscribeFormState) {
  const emailRequired = cbEmail
  const phoneRequired = cbSms || cbMarketing

  const inputClass = (field: string) =>
    cn(
      'w-full rounded-md border bg-background px-4 py-3 text-sm outline-none transition-colors focus:ring-2 focus:ring-ring/30',
      errors[field] ? 'border-destructive text-destructive' : 'border-border',
    )

  const checkboxClass = (checked: boolean, hasError?: boolean) =>
    cn(
      'size-4 shrink-0 mt-0.5 rounded border transition-colors flex items-center justify-center',
      checked
        ? 'border-primary bg-primary text-primary-foreground'
        : hasError
          ? 'border-destructive bg-destructive/10'
          : 'border-border group-hover:border-foreground/30',
    )

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            <span className="inline-flex items-center gap-1.5">
              <User className="size-3.5" /> First name *
            </span>
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value)
              clearError('firstName')
            }}
            placeholder="First name"
            className={inputClass('firstName')}
            autoComplete="given-name"
          />
          {errors.firstName && <p className="mt-1 text-xs text-destructive">{errors.firstName}</p>}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">
            <span className="inline-flex items-center gap-1.5">
              <User className="size-3.5" /> Last name *
            </span>
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value)
              clearError('lastName')
            }}
            placeholder="Last name"
            className={inputClass('lastName')}
            autoComplete="family-name"
          />
          {errors.lastName && <p className="mt-1 text-xs text-destructive">{errors.lastName}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            <span className="inline-flex items-center gap-1.5">
              <Mail className="size-3.5" /> Email
              {emailRequired ? (
                <span className="text-primary">*</span>
              ) : (
                <span className="text-xs text-muted-foreground">(optional)</span>
              )}
            </span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              clearError('email')
              clearError('cbEmail')
            }}
            placeholder={`you@${BRAND.domain}`}
            className={inputClass('email')}
            autoComplete="email"
          />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">
            <span className="inline-flex items-center gap-1.5">
              <Phone className="size-3.5" /> Phone
              {phoneRequired ? (
                <span className="text-primary">*</span>
              ) : (
                <span className="text-xs text-muted-foreground">(optional)</span>
              )}
            </span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value)
              clearError('phone')
              clearError('cbSms')
              clearError('cbMarketing')
            }}
            placeholder="+1 (555) 000-0000"
            className={inputClass('phone')}
            autoComplete="tel"
          />
          {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
        </div>
      </div>

      <div className="space-y-3 border-t border-border pt-5">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Communication preferences
        </p>

        <label
          className="group flex cursor-pointer items-start gap-3"
          onClick={() => {
            setCbEmail((v) => !v)
            clearError('cbEmail')
          }}
        >
          <div className={checkboxClass(cbEmail, !!errors.cbEmail)}>
            {cbEmail && <span className="text-[10px] font-bold">✓</span>}
          </div>
          <span className={cn('text-sm leading-snug', errors.cbEmail && !cbEmail && 'text-destructive')}>
            I consent to receive emails from {BRAND.name}. Frequency varies. You can unsubscribe any
            time. <TermsPrivacyLinks />
          </span>
        </label>
        {errors.cbEmail && !cbEmail && <p className="pl-7 text-xs text-destructive">{errors.cbEmail}</p>}

        <label
          className="group flex cursor-pointer items-start gap-3"
          onClick={() => {
            setCbSms((v) => !v)
            clearError('cbSms')
          }}
        >
          <div className={checkboxClass(cbSms, !!errors.cbSms)}>
            {cbSms && <span className="text-[10px] font-bold">✓</span>}
          </div>
          <span
            className={cn(
              'text-sm leading-snug text-muted-foreground',
              errors.cbSms && !cbSms && 'text-destructive',
            )}
          >
            {SMS_CONSENT_TEXT} See details: <TermsPrivacyLinks />
          </span>
        </label>
        {errors.cbSms && !cbSms && <p className="pl-7 text-xs text-destructive">{errors.cbSms}</p>}

        <label
          className="group flex cursor-pointer items-start gap-3"
          onClick={() => {
            setCbMarketing((v) => !v)
            clearError('cbMarketing')
          }}
        >
          <div className={checkboxClass(cbMarketing, !!errors.cbMarketing)}>
            {cbMarketing && <span className="text-[10px] font-bold">✓</span>}
          </div>
          <span
            className={cn(
              'text-sm leading-snug text-muted-foreground',
              errors.cbMarketing && !cbMarketing && 'text-destructive',
            )}
          >
            I consent to receive marketing communications and promotions to the phone number provided.
            See details: <TermsPrivacyLinks />
          </span>
        </label>
        {errors.cbMarketing && !cbMarketing && (
          <p className="pl-7 text-xs text-destructive">{errors.cbMarketing}</p>
        )}

        <label
          className="group flex cursor-pointer items-start gap-3"
          onClick={() => {
            setCbTerms((v) => !v)
            clearError('cbTerms')
          }}
        >
          <div className={checkboxClass(cbTerms, !!errors.cbTerms)}>
            {cbTerms && <span className="text-[10px] font-bold">✓</span>}
          </div>
          <span className={cn('text-sm leading-snug', errors.cbTerms && !cbTerms && 'text-destructive')}>
            I accept the <TermsLink /> and <PrivacyLink />.{' '}
            <span className="text-destructive">*</span>
          </span>
        </label>
        {errors.cbTerms && !cbTerms && <p className="pl-7 text-xs text-destructive">{errors.cbTerms}</p>}
      </div>

      <div>
        <CloudflareTurnstile
          onVerify={(t) => {
            setCaptchaToken(t)
            clearError('captcha')
          }}
          onExpire={() => setCaptchaToken(null)}
          theme="auto"
        />
        {errors.captcha && <p className="mt-1 text-xs text-destructive">{errors.captcha}</p>}
      </div>

      <Button type="submit" disabled={formState === 'submitting'} className="w-full" size="lg">
        {formState === 'submitting' ? 'Subscribing...' : submitLabel}
      </Button>

      {formState === 'error' && (
        <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3">
          <AlertCircle className="size-4 shrink-0 text-destructive" />
          <span className="text-sm text-destructive">Something went wrong. Please try again.</span>
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground">
        {BRAND.name} / {BRAND.legalEntity}
      </p>
    </form>
  )
}

export function validateSubscribeForm({
  firstName,
  lastName,
  email,
  phone,
  cbEmail,
  cbSms,
  cbMarketing,
  cbTerms,
  captchaToken,
}: {
  firstName: string
  lastName: string
  email: string
  phone: string
  cbEmail: boolean
  cbSms: boolean
  cbMarketing: boolean
  cbTerms: boolean
  captchaToken: string | null
}): Record<string, string> {
  const e: Record<string, string> = {}
  if (!firstName.trim()) e.firstName = 'First name is required'
  if (!lastName.trim()) e.lastName = 'Last name is required'

  if (email.trim() && !cbEmail) e.cbEmail = 'You entered an email — please select email consent above'
  if (cbEmail && !email.trim()) e.email = 'Email is required when email consent is selected'
  if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email address'

  if (phone.trim()) {
    if (!cbSms) e.cbSms = 'Required when a phone number is provided'
    if (!cbMarketing) e.cbMarketing = 'Required when a phone number is provided'
  }
  if ((cbSms || cbMarketing) && !phone.trim()) {
    e.phone = 'Phone number is required when SMS consent is selected'
  }

  if (!cbTerms) e.cbTerms = 'You must accept the Terms & Conditions and Privacy Policy'
  if (!captchaToken) e.captcha = 'Please complete the security check'
  return e
}
