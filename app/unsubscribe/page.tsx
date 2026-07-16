'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { CheckCircle, AlertCircle, Heart, ArrowLeft, UserMinus } from 'lucide-react'
import { CloudflareTurnstile } from '@/components/forms/turnstile'
import { Button } from '@/components/ui/button'
import { BRAND } from '@/lib/constants'
import { submitUnsubscribe } from '@/lib/subscription-client'
import { cn } from '@/lib/utils'

type FormState = 'idle' | 'submitting' | 'success' | 'error'
type Option = 'email' | 'sms' | 'both'

export default function UnsubscribePage() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [serverError, setServerError] = useState('')
  const [selected, setSelected] = useState<Option | null>(null)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const needsEmail = selected === 'email' || selected === 'both'
  const needsPhone = selected === 'sms' || selected === 'both'

  const validate = () => {
    const e: Record<string, string> = {}
    if (!selected) e.option = 'Please select an option'
    if (needsEmail && !email.trim()) e.email = 'Email is required'
    if (needsEmail && email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.email = 'Enter a valid email'
    }
    if (needsPhone && !phone.trim()) e.phone = 'Phone is required'
    if (!captchaToken) e.captcha = 'Please complete the security check'
    return e
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setServerError('')
    setFormState('submitting')

    const channels: ('email' | 'sms')[] =
      selected === 'both' ? ['email', 'sms'] : selected === 'email' ? ['email'] : ['sms']

    const result = await submitUnsubscribe({
      channels,
      email: needsEmail ? email : undefined,
      phone: needsPhone ? phone : undefined,
      turnstileToken: captchaToken,
    })

    if (result.success) {
      setFormState('success')
    } else {
      setServerError(result.error || 'Something went wrong.')
      setFormState('error')
    }
  }

  const inputClass = (field: string) =>
    cn(
      'w-full rounded-md border bg-background px-4 py-3 text-sm outline-none transition-colors focus:ring-2 focus:ring-ring/30',
      errors[field] ? 'border-destructive' : 'border-border',
    )

  const options: { id: Option; label: string; desc: string }[] = [
    { id: 'email', label: 'Email only', desc: 'Stop receiving email newsletters' },
    { id: 'sms', label: 'SMS only', desc: 'Stop receiving text messages' },
    { id: 'both', label: 'Both email & SMS', desc: 'Unsubscribe from everything' },
  ]

  if (formState === 'success') {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
        <CheckCircle className="mx-auto mb-6 size-14 text-primary" />
        <h1 className="mb-4 text-3xl font-semibold tracking-tight">You&apos;ve been unsubscribed</h1>
        <p className="mb-4 leading-relaxed text-muted-foreground">
          We&apos;ve processed your request. You will no longer receive the selected communications from{' '}
          {BRAND.name}. Allow up to 5 business days for full removal from all systems.
        </p>
        <p className="mb-8 text-sm text-muted-foreground">
          SMS: you can also reply <strong className="text-foreground">STOP</strong> to any message at any
          time.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/subscribe">
              <Heart className="size-4" /> Resubscribe
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="size-4" /> Return home
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 lg:py-20">
      <div className="mb-8 flex items-center gap-2">
        <UserMinus className="size-5 text-muted-foreground" />
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Unsubscribe</p>
      </div>
      <h1 className="mb-3 text-3xl font-semibold tracking-tight">Manage your preferences</h1>
      <p className="mb-8 text-muted-foreground">
        Choose which communications from {BRAND.name} you want to stop receiving.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-border bg-card p-6 sm:p-8">
        <div className="space-y-3">
          {options.map((opt) => (
            <label
              key={opt.id}
              className={cn(
                'flex cursor-pointer items-start gap-3 rounded-md border p-4 transition-colors',
                selected === opt.id ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/40',
              )}
            >
              <input
                type="radio"
                name="channel"
                className="mt-1"
                checked={selected === opt.id}
                onChange={() => {
                  setSelected(opt.id)
                  setErrors((prev) => {
                    const next = { ...prev }
                    delete next.option
                    return next
                  })
                }}
              />
              <span>
                <span className="block text-sm font-medium text-foreground">{opt.label}</span>
                <span className="text-sm text-muted-foreground">{opt.desc}</span>
              </span>
            </label>
          ))}
          {errors.option && <p className="text-xs text-destructive">{errors.option}</p>}
        </div>

        {needsEmail && (
          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass('email')}
              placeholder={`you@${BRAND.domain}`}
              autoComplete="email"
            />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
          </div>
        )}

        {needsPhone && (
          <div>
            <label className="mb-2 block text-sm font-medium">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass('phone')}
              placeholder="+1 (555) 000-0000"
              autoComplete="tel"
            />
            {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
          </div>
        )}

        <div>
          <CloudflareTurnstile
            onVerify={setCaptchaToken}
            onExpire={() => setCaptchaToken(null)}
            theme="auto"
          />
          {errors.captcha && <p className="mt-1 text-xs text-destructive">{errors.captcha}</p>}
        </div>

        {formState === 'error' && (
          <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3">
            <AlertCircle className="size-4 shrink-0 text-destructive" />
            <span className="text-sm text-destructive">{serverError || 'Something went wrong.'}</span>
          </div>
        )}

        <Button type="submit" disabled={formState === 'submitting'} className="w-full" size="lg">
          {formState === 'submitting' ? 'Processing...' : 'Unsubscribe'}
        </Button>
      </form>
    </div>
  )
}
