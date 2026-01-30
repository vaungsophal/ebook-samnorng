import React from "react"
import type { Metadata } from 'next'
import { Lato, Kantumruy_Pro } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/context/cart-context'
import { LanguageProvider } from '@/context/language-context'
import './globals.css'

const lato = Lato({
  subsets: ["latin"],
  weight: ['100', '300', '400', '700', '900'],
  variable: '--font-lato'
});

const kantumruyPro = Kantumruy_Pro({
  subsets: ["khmer"],
  variable: '--font-kantumruy-pro'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ebooksomnorng.com'),
  title: {
    default: 'EbookSomnorng - Civil Engineering E-book Store',
    template: '%s | EbookSomnorng'
  },
  description: 'EbookSomnorng (អេប៊ុកសំណង់) - The #1 premium e-book store for civil engineers and construction professionals. Discover architecture drawings, structural documents, and engineering spreadsheets.',
  keywords: ['EbookSomnorng', 'Somnorng Ebook', 'Ebook Somnorng', 'somnorng', 'somnang ebook', 'somnong ebook', 'somnorng book', 'somnong', 'samnang', 'samnorng', 'samnorng ebook', 'somnorng book', 'ebook samnorng', 'ebook somnong', 'ebook samnang', 'ebook somnang', 'ebook somnorng', 'sormnorng ebook', 'Civil Engineering Ebooks', 'Construction Documents', 'អេប៊ុកសំណង់', 'សៀវភៅសំណង់'],
  generator: 'PoDev',
  authors: [{ name: 'EbookSomnorng Team' }],
  creator: 'EbookSomnorng',
  publisher: 'EbookSomnorng',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'EbookSomnorng - Civil Engineering E-book Store',
    description: 'Premium e-books and professional documents for civil engineers and construction professionals.',
    url: 'https://www.ebooksomnorng.com',
    siteName: 'EbookSomnorng',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'EbookSomnorng Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EbookSomnorng - Civil Engineering E-book Store',
    description: 'Premium e-books and professional documents for civil engineers and construction professionals.',
    images: ['/logo.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
  },
  manifest: '/manifest.json',
}

import { Toaster } from 'sonner'
import { ScrollToTop } from '@/components/scroll-to-top'
import { InstallPWA } from '@/components/install-pwa'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${lato.variable} ${kantumruyPro.variable}`}>
      <body className="antialiased font-sans">
        <Toaster position="top-center" richColors />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              "name": "EbookSomnorng",
              "alternateName": ["Somnorng Ebook", "Somnorng", "Somnong", "Samnang", "Samnorng", "Somnang"],
              "url": "https://www.ebooksomnorng.com",
              "logo": "https://www.ebooksomnorng.com/logo.png",
              "description": "Premium e-book store for civil engineers and construction professionals in Cambodia (អេប៊ុកសំណង់).",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Toul Kork",
                "addressLocality": "Phnom Penh",
                "addressCountry": "KH"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+855-87330027",
                "contactType": "customer service"
              },
              "sameAs": [
                "https://www.facebook.com/groups/1157562836264568/",
                "https://t.me/SORIYA_VAUNG"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "EbookSomnorng",
              "alternateName": ["Somnorng Ebook", "Somnorng", "Somnong", "Samnang", "Samnorng", "Somnang"],
              "url": "https://www.ebooksomnorng.com",
              "logo": "https://www.ebooksomnorng.com/logo.png",
              "sameAs": [
                "https://www.facebook.com/groups/1157562836264568/",
                "https://t.me/SORIYA_VAUNG"
              ]
            })
          }}
        />
        <LanguageProvider>
          <CartProvider>
            <InstallPWA />
            <div className="language-font-wrapper">
              {children}
            </div>
            <ScrollToTop />
          </CartProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
