import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/components/language-provider'
import { FloatingActionButtons } from '@/components/floating-action-buttons'
import { ClientProviders } from '@/providers/ClientProviders';

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'رخام جدة | مؤسسة الشعلة الراقية في جدة | Marble Jeddah | Premium Stone Supplier',
  description: 'افضل انواع الرخام في جدة - توريد وتركيب رخام عالي الجودة. Best marble company in Saudi Arabia. Premium marble and stone supplier in Jeddah.',
  keywords: ['رخام جدة', 'رخام في جدة', 'شركة رخام في جدة', 'توريد رخام جدة', 'تركيب رخام جدة', 'افضل انواع الرخام جدة', 'marble in jeddah', 'jeddah marble supplier', 'marble company saudi arabia', 'marble store jeddah'],
  generator: 'v0.app',
  openGraph: {
    title: 'مؤسسة الشعلة الراقية في جدة | Elegant Torch Jeddah',
    description: 'Premium marble and stone products - توريد وتركيب رخام عالي الجودة',
    type: 'website',
    locale: 'ar_SA',
    alternateName: 'en_US',
  },
  alternates: {
    languages: {
      ar: 'https://marblecompany.sa/ar',
      en: 'https://marblecompany.sa/en',
    },
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/favicon.ico',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning dir="ltr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#161950" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#101828" media="(prefers-color-scheme: dark)" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Marble Company Jeddah",
            "description": "Premium marble and stone supplier in Jeddah, Saudi Arabia",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Jeddah",
              "addressLocality": "Jeddah",
              "addressRegion": "Makkah",
              "addressCountry": "SA"
            },
            "telephone": "+966XXXXXXXXX",
            "sameAs": [
              "https://wa.me/966XXXXXXXXX"
            ]
          })}
        </script>
      </head>
      <body className={`font-sans antialiased`}>
        <ClientProviders>
        <ThemeProvider>
          <LanguageProvider>
            {children}
            <FloatingActionButtons />
          </LanguageProvider>
        </ThemeProvider>
        </ClientProviders>
        <Analytics />
      </body>
    </html>
  )
}
