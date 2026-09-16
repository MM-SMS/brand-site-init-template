import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { PaymentProvider } from 'orione-pay/react'
import 'orione-pay/styles.css'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { SubscribeModalAuto } from '@/components/forms/subscription/subscribe-modal-auto'
import { BRAND } from '@/lib/constants'
import { publicPaymentConfig } from '@/lib/payment'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: BRAND.name,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.description ?? BRAND.tagline,
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <PaymentProvider config={publicPaymentConfig}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <SubscribeModalAuto />
        </PaymentProvider>
      </body>
    </html>
  )
}
