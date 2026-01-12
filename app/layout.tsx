import type { Metadata } from 'next'
import './globals.css'
import LocaleProvider from '@/components/providers/LocaleProvider'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
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
    <html lang="ar" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background-light dark:bg-background-dark text-[#0c121d] dark:text-white transition-colors duration-200">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LocaleProvider>
            <Header />
            {children}
            <Footer />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
