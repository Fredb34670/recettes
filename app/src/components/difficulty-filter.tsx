"use client"

import { Star } from "lucide-react"
import { useRecipeStore } from "@/store/use-recipe-store"

const difficulties = [
  { value: "Débutant", stars: 1 },
  { value: "Intermédiaire", stars: 2 },
  { value: "Avancé", stars: 3 },
]

export function DifficultyFilter() {
  const { selectedDifficulty, setSelectedDifficulty } = useRecipeStore()

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => setSelectedDifficulty(null)}
        className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border transition-all ${
          !selectedDifficulty
            ? "bg-amber-600 text-white border-amber-600"
            : "bg-white text-stone-500 border-stone-200 hover:border-amber-300"
        }`}
      >
        Tous niveaux
      </button>
      {difficulties.map((d) => (
        <button
          key={d.value}
          onClick={() => setSelectedDifficulty(d.value)}
          className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border transition-all flex items-center gap-1 ${
            selectedDifficulty === d.value
              ? "bg-amber-600 text-white border-amber-600"
              : "bg-white text-stone-500 border-stone-200 hover:border-amber-300"
          }`}
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <Star
              key={i}
              size={11}
              className={i < d.stars ? "fill-current" : "text-current opacity-25"}
            />
          ))}
          {d.value}
        </button>
      ))}
    </div>
  )
}
