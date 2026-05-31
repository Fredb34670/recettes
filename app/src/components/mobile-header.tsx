"use client"

import { Suspense, useEffect } from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { ChefHat, LayoutDashboard, BookOpen, Heart, Sparkles, GraduationCap } from "lucide-react"
import { useAppStore } from "@/lib/store"

function MobileNav() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const filter = searchParams.get("filter")
  const { favorites, hydrated, hydrate, mode, toggleMode } = useAppStore()

  useEffect(() => { hydrate() }, [hydrate])

  const navItems = [
    { href: "/", label: "Accueil", icon: LayoutDashboard },
    { href: "/recipes", label: "Recettes", icon: BookOpen },
    { href: "/recipes?filter=favorites", label: "Favoris", icon: Heart },
  ]

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-stone-200 flex items-center justify-around py-2">
      {navItems.map((item) => {
        const isFavsLink = item.href.includes("favorites")
        const isActive = isFavsLink 
          ? filter === "favorites" 
          : (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href) && filter !== "favorites")
        
        if (isFavsLink && favorites.length === 0) return null

        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-all relative ${
              isActive ? "text-amber-600" : "text-stone-400"
            }`}
          >
            <Icon size={20} className={!isActive && isFavsLink ? "text-rose-400" : ""} />
            <span className="text-[10px] font-medium">{item.label}</span>
            {isFavsLink && favorites.length > 0 && (
              <span className={`absolute top-0 right-2 w-4 h-4 flex items-center justify-center text-[8px] font-bold rounded-full ${isActive ? "bg-amber-600 text-white" : "bg-rose-500 text-white"}`}>
                {favorites.length}
              </span>
            )}
          </Link>
        )
      })}
      <button
        onClick={toggleMode}
        className="flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-all"
      >
        {hydrated && mode === "expert" ? (
          <ChefHat size={20} className="text-amber-600" />
        ) : (
          <GraduationCap size={20} className="text-stone-400" />
        )}
        <span className={`text-[10px] font-medium ${hydrated && mode === "expert" ? "text-amber-600" : "text-stone-400"}`}>
          {hydrated && mode === "expert" ? "Expert" : "Débutant"}
        </span>
      </button>
    </nav>
  )
}

export function MobileHeader() {
  return (
    <>
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200 px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center">
            <ChefHat className="text-white" size={16} />
          </div>
          <span className="font-display text-lg font-bold text-amber-900">Artisan</span>
        </Link>
      </header>

      <Suspense fallback={null}>
        <MobileNav />
      </Suspense>

      <div className="lg:hidden h-14" />
    </>
  )
}
