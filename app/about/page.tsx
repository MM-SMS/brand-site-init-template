import { BRAND } from '@/lib/constants'

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-4xl font-bold text-foreground mb-6">About {BRAND.name}</h1>
      <p className="text-muted-foreground leading-relaxed">
        Replace this with your brand&apos;s story.
      </p>
    </div>
  )
}
