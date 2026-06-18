import { Mail } from 'lucide-react'
import { BRAND } from '@/lib/constants'

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-4xl font-bold text-foreground mb-6">Contact Us</h1>
      <p className="text-muted-foreground leading-relaxed mb-6">
        Replace this with a real contact form or details.
      </p>
      <a
        href={`mailto:${BRAND.contactEmail}`}
        className="inline-flex items-center gap-2 text-primary hover:underline"
      >
        <Mail className="w-4 h-4" />
        {BRAND.contactEmail}
      </a>
    </div>
  )
}
