import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/contexts/cart-context'
import { WebVitals } from './web-vitals'
import { ServiceWorkerRegistration } from './service-worker-registration'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TUFOLDBETA SOLUTIONS - Your Online Shopping Destination',
  description: 'Shop goods, services, and products of all kinds including electronics, apparel, accessories, home goods, and personal items with competitive prices and India-wide delivery.',
  keywords: 'ecommerce, online shopping, electronics, apparel, accessories, home goods, personal items, India online store',
  authors: [{ name: 'TUFOLDBETA SOLUTIONS PRIVATE LIMITED' }],
  robots: 'index, follow',
  openGraph: {
    title: 'TUFOLDBETA SOLUTIONS - Your Online Shopping Destination',
    description: 'Shop products of all kinds with competitive prices and India-wide delivery.',
    type: 'website',
    locale: 'en_US',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/logo/logo.png" />
        <link rel="apple-touch-icon" href="/logo/logo.png" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className={inter.className}>
        <CartProvider>
          {children}
        </CartProvider>
        <WebVitals />
        <ServiceWorkerRegistration />
      </body>
    </html>
  )
}
