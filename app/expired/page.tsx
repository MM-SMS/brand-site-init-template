import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BRAND } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Offer expired — ${BRAND.name}`,
  robots: { index: false, follow: false },
}

export default function ExpiredPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
      <div className="mb-6 rounded-md border border-border bg-card p-4">
        <Clock className="size-10 text-muted-foreground" />
      </div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Offer status — expired
      </p>
      <h1 className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        This offer is no longer available
      </h1>
      <p className="mb-10 max-w-lg text-muted-foreground leading-relaxed">
        The promotion you were looking for has expired or been removed. You can still explore{' '}
        {BRAND.name} below.
      </p>
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <Button asChild>
          <Link href="/">
            Go to {BRAND.name}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/subscribe">Subscribe</Link>
        </Button>
      </div>
      <Link
        href="/"
        className="mt-12 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" /> Back home
      </Link>
    </div>
  )
}
