import type { Metadata } from "next"
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { MobileHeader } from "@/components/mobile-header"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Artisan — Recettes",
  description: "L'excellence pâtissière à portée de main",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Artisan",
  },
}

export const viewport = {
  themeColor: "#d97706",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}
    >
      <head>
        <link rel="apple-touch-icon" href="/pwa/app-icon.png" />
      </head>
      <body className="font-sans text-culinary-fg bg-culinary-bg antialiased flex min-h-screen">
        <Sidebar />
        <MobileHeader />
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
