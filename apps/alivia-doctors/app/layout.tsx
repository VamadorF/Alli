import type { Metadata } from "next"
import { Nunito, Quicksand } from "next/font/google"
import "@alli/ui/globals.css"

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" })
const quicksand = Quicksand({ subsets: ["latin"], variable: "--font-quicksand" })

export const metadata: Metadata = {
  title: "AlivIA — Alli",
  description: "Plataforma de salud digital para el manejo del dolor crónico (monorepo Alli).",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${nunito.variable} ${quicksand.variable}`} suppressHydrationWarning>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  )
}
