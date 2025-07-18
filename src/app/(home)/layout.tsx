import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
// import { dbConnect } from '../../services/mongo'
// import ReduxProvider from './components/ReduxProvider'
import { dbConnect } from '../../../services/mongo'
import ReduxProvider from '../components/ReduxProvider'
import '../globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'tasker',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  await dbConnect()
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReduxProvider>
          <Toaster position='top-center' />
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
