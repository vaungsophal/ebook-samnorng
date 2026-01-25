import React from "react"
import type { Metadata } from 'next'
import { Lato, Noto_Sans_Khmer } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/context/cart-context'
import { LanguageProvider } from '@/context/language-context'
import './globals.css'

const lato = Lato({
  subsets: ["latin"],
  weight: ['100', '300', '400', '700', '900'],
  variable: '--font-lato'
});

const notoSansKhmer = Noto_Sans_Khmer({
  subsets: ["khmer"],
  variable: '--font-noto-sans-khmer'
});

export const metadata: Metadata = {
  title: 'EbookSamnorng - Civil Engineering E-book Store',
  description: 'Premium e-books for civil engineers and construction professionals',
  generator: 'v0.app',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${lato.variable} ${notoSansKhmer.variable}`}>
      <body className="antialiased font-sans">
        <LanguageProvider>
          <CartProvider>
            <div className="language-font-wrapper">
              {children}
            </div>
          </CartProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
