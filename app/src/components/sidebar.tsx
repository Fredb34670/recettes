"use client"

import { Suspense, useEffect } from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { LayoutDashboard, BookOpen, ChefHat, GraduationCap, Sparkles, Heart } from "lucide-react"
import { useAppStore } from "@/lib/store"

const navItems = [
  { href: "/", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/recipes", label: "Recettes", icon: BookOpen },
  { href: "/recipes?filter=favorites", label: "Favoris", icon: Heart },
]

function SidebarNav() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const filter = searchParams.get("filter")
  const { mode, hydrated, toggleMode, hydrate, favorites } = useAppStore()

  useEffect(() => { hydrate() }, [hydrate])

  return (
    <>
      <nav className="flex-1 space-y-2">
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
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                isActive
                  ? "bg-amber-600 text-white shadow-lg shadow-amber-600/20"
                  : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              <Icon size={20} className={isActive ? "" : (isFavsLink ? "text-rose-500" : "")} />
              <span className="font-medium">{item.label}</span>
              {isFavsLink && (
                <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-rose-50 text-rose-500"}`}>
                  {favorites.length}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      <button
        onClick={toggleMode}
        className="w-full flex items-center gap-3 p-3 rounded-xl transition-all text-stone-600 hover:bg-stone-100 mb-3"
      >
        {hydrated && mode === "expert" ? (
          <Sparkles size={20} className="text-amber-600" />
        ) : (
          <GraduationCap size={20} className="text-stone-400" />
        )}
        <div className="flex items-center justify-between flex-1">
          <span className="font-medium text-sm">Mode</span>
          <span className={`text-xs font-bold uppercase tracking-wider ${hydrated && mode === "expert" ? "text-amber-600" : "text-stone-400"}`}>
            {hydrated && mode === "expert" ? "Expert" : "Débutant"}
          </span>
        </div>
      </button>
    </>
  )
}

export function Sidebar() {
  return (
    <aside className="w-64 h-screen sticky top-0 border-r border-stone-200 flex flex-col p-6 bg-white hidden lg:flex">
      <Link href="/" className="mb-12 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center">
          <ChefHat className="text-white" size={20} />
        </div>
        <h1 className="font-display text-xl font-bold text-amber-900">Artisan</h1>
      </Link>

      <Suspense fallback={<div className="flex-1" />}>
        <SidebarNav />
      </Suspense>

      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
        <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">Artisan</p>
        <p className="text-xs text-stone-500">L&apos;excellence pâtissière</p>
      </div>
    </aside>
  )
}
