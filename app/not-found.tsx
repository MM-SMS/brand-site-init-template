import Link from 'next/link'
import { ArrowRight, SearchX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BRAND } from '@/lib/constants'

/**
 * Next.js 404 UI for unmatched routes.
 * Also shown when landing-page redirects send users to /not-found
 * (unknown campaign code from redirections-lp-setup).
 */
export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
      <div className="mb-6 rounded-md border border-border bg-card p-4">
        <SearchX className="size-10 text-muted-foreground" />
      </div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        404 — not found
      </p>
      <h1 className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        We couldn&apos;t find that page
      </h1>
      <p className="mb-10 max-w-lg text-muted-foreground leading-relaxed">
        The page or campaign link you requested doesn&apos;t exist or may have been removed.
      </p>
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <Button asChild>
          <Link href="/">
            Back to {BRAND.name}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/contact">Contact us</Link>
        </Button>
      </div>
    </div>
  )
}
