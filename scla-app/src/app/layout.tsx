import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from '@/contexts/AuthContext'
import { ToastProvider } from '@/components/ui/toast'
import IPhoneFrame from '@/components/layout/IPhoneFrame'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SCLA - Skiin Connected Life App",
  description: "Track your heart rate, symptoms, and health metrics with SKIIN wearable devices",
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ToastProvider>
            {isDevelopment ? (
              <IPhoneFrame>
                {children}
              </IPhoneFrame>
            ) : (
              <div className="min-h-screen mobile-container">
                {children}
              </div>
            )}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  )
}