import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import Navbar from '@/components/Navbar'
import NotificationListener from '@/components/NotificationListener'

import Footer from '@/components/Footer'

export const metadata: Metadata = {
    title: 'RK Portal',
    description: 'Transportation Bidding System',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
                <AuthProvider>
                    <NotificationListener />
                    <Navbar />
                    {children}
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    )
}
