'use client'

import { useEffect, useRef } from 'react'

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

interface CloudflareTurnstileProps {
  onVerify: (token: string) => void
  onExpire?: () => void
  theme?: 'dark' | 'light' | 'auto'
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: object) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
  }
}

export function CloudflareTurnstile({
  onVerify,
  onExpire,
  theme = 'auto',
}: CloudflareTurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const onVerifyRef = useRef(onVerify)
  const onExpireRef = useRef(onExpire)

  useEffect(() => {
    onVerifyRef.current = onVerify
    onExpireRef.current = onExpire
  }, [onVerify, onExpire])

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) {
      console.warn('[Turnstile] NEXT_PUBLIC_TURNSTILE_SITE_KEY not set')
      return
    }

    const scriptId = 'cf-turnstile-script'

    const renderWidget = () => {
      if (containerRef.current && window.turnstile && !widgetIdRef.current) {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme,
          callback: (token: string) => onVerifyRef.current(token),
          'expired-callback': () => onExpireRef.current?.(),
        })
      }
    }

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script')
      script.id = scriptId
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
      script.async = true
      script.defer = true
      script.onload = renderWidget
      document.head.appendChild(script)
    } else if (window.turnstile) {
      renderWidget()
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [theme])

  if (!TURNSTILE_SITE_KEY) {
    return (
      <p className="text-center text-xs text-muted-foreground">
        Captcha is not configured (set NEXT_PUBLIC_TURNSTILE_SITE_KEY).
      </p>
    )
  }

  return <div ref={containerRef} className="flex min-h-[65px] items-center justify-center" />
}
