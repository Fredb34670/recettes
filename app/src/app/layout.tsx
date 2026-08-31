import type { Metadata } from "next"
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { MobileHeader } from "@/components/mobile-header"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
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
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-600 focus:text-white focus:rounded-lg focus:top-4 focus:left-4">
          Aller au contenu principal
        </a>
        <Sidebar />
        <MobileHeader />
        <main id="main-content" className="flex-1 p-4 lg:p-8 overflow-y-auto min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
