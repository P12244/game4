import type { Metadata, Viewport } from 'next'
import { Noto_Sans_Thai, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const notoSansThai = Noto_Sans_Thai({ 
  subsets: ['thai', 'latin'],
  variable: '--font-sans',
  display: 'swap',
})

const geistMono = Geist_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Imposter Game - เกมหาสายลับ',
  description: 'เกมปาร์ตี้สุดมันส์ เล่นกับเพื่อนได้ทันที ไม่ต้องสมัครสมาชิก',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Imposter Game',
  },
  icons: {
    icon: '/icon-192.png',
    apple: '/icon-512.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0f0a1a',
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="th" className="bg-background">
      <body className={`${notoSansThai.variable} ${geistMono.variable} font-sans antialiased min-h-screen overflow-x-hidden`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
