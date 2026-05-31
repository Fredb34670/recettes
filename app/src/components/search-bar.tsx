"use client"

import { Search, HelpCircle } from "lucide-react"
import { useRecipeStore } from "@/store/use-recipe-store"
import { useState } from "react"

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useRecipeStore()
  const [showHelp, setShowHelp] = useState(false)

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
      <input
        type="text"
        placeholder="Recette, +lait, -oeuf, 20mn..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-11 pr-11 py-3 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
      />
      <button 
        className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-300 hover:text-amber-500 transition-colors"
        onMouseEnter={() => setShowHelp(true)}
        onMouseLeave={() => setShowHelp(false)}
        onClick={() => setShowHelp(!showHelp)}
        type="button"
      >
        <HelpCircle size={18} />
      </button>

      {showHelp && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-stone-800 text-white text-xs rounded-xl shadow-xl z-50 animate-in fade-in zoom-in-95 duration-200">
          <p className="font-bold mb-2 text-amber-400">Astuces de recherche :</p>
          <ul className="space-y-1.5 opacity-90">
            <li>• <code className="text-amber-200">20mn</code> : recettes de 20 min précisément</li>
            <li>• <code className="text-amber-200">+lait</code> : doit contenir du lait</li>
            <li>• <code className="text-amber-200">-oeuf</code> : exclure l&apos;oeuf</li>
            <li>• <code className="text-amber-200">lait +beurre -oeuf</code> : recherche combinée</li>
          </ul>
        </div>
      )}
    </div>
  )
}
