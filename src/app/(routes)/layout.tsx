import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../_style/globals.css'
import Header from '../_UI/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Examensarbete | Learn Next.js and Shopify',
    template: 'Examensarbete | %s ',
  },
  description: '...',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
