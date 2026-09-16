import { BuyButton } from 'orione-pay/react'
import { BRAND } from '@/lib/constants'
import { SAMPLE_PRODUCT_ID, publicPaymentConfig } from '@/lib/payment'

const sample = publicPaymentConfig.products[0]

function formatUsd(cents: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    cents / 100,
  )
}

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
        Shop
      </p>
      <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {sample.name}
      </h1>
      <p className="mb-8 max-w-xl text-muted-foreground">{sample.description}</p>
      <p className="mb-8 text-2xl font-semibold text-foreground">{formatUsd(sample.amount)}</p>
      <BuyButton productId={SAMPLE_PRODUCT_ID}>Buy / Purchase</BuyButton>
      <p className="mt-8 text-sm text-muted-foreground">
        Checkout is wired from the {BRAND.name} template via{' '}
        <code className="rounded bg-muted px-1 py-0.5 text-xs">orione-pay</code>. Default flow is{' '}
        <code className="rounded bg-muted px-1 py-0.5 text-xs">PAYMENT_FLOW=custom</code>. Switch to
        Stripe in env when keys are ready.
      </p>
    </div>
  )
}
