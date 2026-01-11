import type { Metadata } from 'next'
import './globals.css'
import LocaleProvider from '@/components/providers/LocaleProvider'
import Header from '@/components/organisms/Header'
import Footer from '@/components/organisms/Footer'

export const metadata: Metadata = {
  title: 'Emailat - Professional Email Hosting',
  description: 'Professional email hosting for growing businesses',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" className="light">
      <body className="bg-background-light dark:bg-background-dark text-[#0c121d] dark:text-white transition-colors duration-200">
        <LocaleProvider>
          <Header />
          {children}
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  )
}
