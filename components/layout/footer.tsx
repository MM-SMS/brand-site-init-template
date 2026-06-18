import Link from 'next/link'
import { Mail } from 'lucide-react'
import { BRAND } from '@/lib/constants'

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div>
            <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
              {BRAND.name}
            </Link>
            <p className="text-sm text-muted-foreground mt-2">{BRAND.tagline}</p>
            <Link
              href={`mailto:${BRAND.contactEmail}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mt-4"
            >
              <Mail className="w-4 h-4" />
              {BRAND.contactEmail}
            </Link>
          </div>

          <ul className="flex gap-6">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
