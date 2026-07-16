import Link from 'next/link'
import { BRAND, LEGAL } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function LegalBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('mt-10 max-w-3xl space-y-10 text-sm leading-relaxed text-muted-foreground', className)}>
      {children}
    </div>
  )
}

export function LegalSection({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-xl tracking-tight text-foreground">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  )
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export function LegalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-primary underline-offset-2 hover:underline">
      {children}
    </Link>
  )
}

export function LegalMail({ email }: { email: string }) {
  return (
    <a href={`mailto:${email}`} className="text-primary underline-offset-2 hover:underline">
      {email}
    </a>
  )
}

export function LegalCallout({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-md border border-border bg-card px-4 py-3 text-xs font-medium uppercase leading-relaxed tracking-wide text-foreground">
      {children}
    </p>
  )
}

export function TradeNameNotice() {
  return (
    <LegalSection id="trade-name" title="Trade Name / DBA Notice">
      <p>
        {BRAND.domain} (the &quot;Site&quot;) is operated under the trade name &quot;{BRAND.name}&quot; by:
      </p>
      <LegalList
        items={[
          `Legal entity: ${LEGAL.entityName}`,
          `Trade name / DBA: ${BRAND.name}`,
          `Legal form: ${LEGAL.legalForm}`,
          `State and country of formation: ${LEGAL.state}, ${LEGAL.country}`,
          `Principal address: ${LEGAL.principalAddress}`,
          `Mailing address: ${LEGAL.mailingAddress}`,
          `Registered agent: ${LEGAL.registeredAgent}`,
          `Registered agent address: ${LEGAL.registeredAgentAddress}`,
          `Authorized person: ${LEGAL.authorizedPerson}`,
          `Contact email: ${BRAND.contactEmail}`,
          ...(LEGAL.contactPhone ? [`Contact phone: ${LEGAL.contactPhone}`] : []),
        ]}
      />
    </LegalSection>
  )
}
