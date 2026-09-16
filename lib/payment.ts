import { definePaymentConfig, toPublicPaymentConfig } from 'orione-pay'
import { BRAND } from '@/lib/constants'

export const SAMPLE_PRODUCT_ID = 'sample'

export const serverPaymentConfig = definePaymentConfig({
  brandId: BRAND.domain.replace(/\./g, '-'),
  brandName: BRAND.name,
  products: [
    {
      id: SAMPLE_PRODUCT_ID,
      name: `${BRAND.name} — Sample product`,
      description: 'Placeholder SKU. Replace with a real product before launch.',
      amount: 2900,
      currency: 'usd',
      stripePriceId: process.env.STRIPE_PRICE_ID,
    },
  ],
  urls: {
    success: '/purchase/success',
    cancel: '/purchase/cancel',
    checkout: '/payment',
  },
  theme: {
    primary: '#f5f5f5',
    primaryForeground: '#0c0c0c',
    background: '#0c0c0c',
    surface: '#161616',
    text: '#f5f5f5',
    mutedText: '#a3a3a3',
    border: '#2a2a2a',
    radius: '0.75rem',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
})

export const publicPaymentConfig = toPublicPaymentConfig(serverPaymentConfig)
