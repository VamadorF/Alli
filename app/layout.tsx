import type { Metadata } from 'next'
import { Nunito, Quicksand } from 'next/font/google'

const _nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" })
const _quicksand = Quicksand({ subsets: ["latin"], variable: "--font-quicksand" })

export const metadata: Metadata = {
  title: 'AlivIA - Tu compañero de salud',
  description: 'Plataforma de salud digital para el manejo del dolor cronico con apoyo continuo.',
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${_nunito.variable} ${_quicksand.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}


import './globals.css'