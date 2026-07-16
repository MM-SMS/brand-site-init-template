import Link from 'next/link'
import { Mail } from 'lucide-react'
import { BRAND } from '@/lib/constants'

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/subscribe', label: 'Subscribe' },
]

const legalLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
  { href: '/unsubscribe', label: 'Unsubscribe' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
              {BRAND.name}
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">{BRAND.tagline}</p>
            <Link
              href={`mailto:${BRAND.contactEmail}`}
              className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4" />
              {BRAND.contactEmail}
            </Link>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:gap-12">
            <ul className="flex flex-col gap-3 sm:flex-row sm:gap-6">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-3 sm:flex-row sm:gap-6">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
