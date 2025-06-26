import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SCLA - Skiin Connected Life App",
  description: "Track your heart rate, symptoms, and health metrics with SKIIN wearable devices",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen mobile-container">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}