import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 're:learn — Real Estate License & Investment Mastery',
  description: 'Get your real estate license in any state + master investment analysis. Monthly cohorts. Live community. AI-powered tools.',
  openGraph: {
    title: 're:learn — Real Estate License & Investment Mastery',
    description: 'Get licensed in any state + learn to analyze deals like a pro. Monthly cohorts starting soon.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
