"use client"

import { useRecipeStore } from "@/store/use-recipe-store"
import { recipeFamilies, getFamilyColor } from "@/lib/families"

export function FamilyFilter() {
  const { selectedFamily, setSelectedFamily } = useRecipeStore()

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => setSelectedFamily(null)}
        className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border transition-all ${
          !selectedFamily
            ? "bg-amber-600 text-white border-amber-600"
            : "bg-white text-stone-500 border-stone-200 hover:border-amber-300"
        }`}
      >
        Toutes
      </button>
      {recipeFamilies.map((family) => (
        <button
          key={family}
          onClick={() => setSelectedFamily(family)}
          className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border transition-all ${
            selectedFamily === family
              ? "bg-amber-600 text-white border-amber-600"
              : `${getFamilyColor(family)} hover:opacity-80`
          }`}
        >
          {family}
        </button>
      ))}
    </div>
  )
}
