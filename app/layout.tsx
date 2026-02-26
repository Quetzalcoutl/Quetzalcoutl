import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { headers } from 'next/headers'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Quetzalcoutl | Coder. Developer. Activist.',
  description: 'The digital portfolio of Quetzalcoutl - a multi-disciplinary creative at the intersection of code, activism, and decentralized systems.',
  generator: 'v0.app',
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
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#050505',
  userScalable: false,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // headers() returns a Promise in app router; await before accessing
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';

  return (
    <html lang={locale} className={`${_geist.variable} ${_geistMono.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground overflow-x-hidden">
        {/* expose locale to client code to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__LOCALE__ = "${locale}";`,
          }}
        />
        {children}
        <div className="noise-overlay" aria-hidden="true" />
        <Analytics />
      </body>
    </html>
  )
}
