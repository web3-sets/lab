import '@/styles/app.css'
import '@/styles/gradient.css'
import '@/styles/periphery.css'
import { Raleway } from '@next/font/google'
import { Inter as FontSans } from '@next/font/google'
import localFont from '@next/font/local'

import RootProvider from '@/components/providers/root-provider'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: ['Web3 Development', 'Ethereum Developer', 'Blockchains', 'Smart Contracts', 'Verifiable Credentials'],
  authors: [
    {
      name: 'District Labs',
      url: 'https://districtlabs.com',
    },
  ],
  creator: 'District Labs',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpeg`],
    creator: '@district_labs',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: any) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body className={cn('min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-50', fontSans.variable)}>
          <RootProvider>{children}</RootProvider>
        </body>
      </html>
    </>
  )
}
