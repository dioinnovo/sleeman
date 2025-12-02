import type { Metadata, Viewport } from 'next'
import { Lato, Roboto } from 'next/font/google'
import './globals.css'
import DisableGrammarly from '@/components/DisableGrammarly'
import { ThemeProvider } from '@/contexts/theme-provider'

const lato = Lato({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato'
})

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto'
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: 'Sleeman BrewMind - AI-Powered Brewery Analytics',
  description: 'AI-powered analytics and operations intelligence for Sleeman Breweries - Production, quality, inventory, and distribution insights',
  keywords: 'brewery analytics, beer production, quality control, inventory management, Sleeman, craft beer, AI analytics',
  authors: [{ name: 'Sleeman Breweries' }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/favicon_io/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'Sleeman BrewMind - AI-Powered Brewery Analytics',
    description: 'AI-powered analytics platform for Sleeman Breweries - Transform brewery operations with natural language data insights',
    type: 'website',
    locale: 'en_US',
    siteName: 'Sleeman BrewMind',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${lato.variable} ${roboto.variable}`}>
      <body className={`${lato.className} font-sans`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          disableTransitionOnChange={false}
        >
          <DisableGrammarly />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}