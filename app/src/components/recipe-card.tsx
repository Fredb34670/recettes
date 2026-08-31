"use client"

import Link from "next/link"
import { Clock, Star, Heart } from "lucide-react"
import type { Recipe } from "@/types/recipe"
import { getFamilyColor, getFamilyIcon } from "@/lib/families"
import { getDifficultyStars } from "@/lib/difficulty"
import { useAppStore } from "@/lib/store"
import { RecipeImage } from "@/components/recipe-image"

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const stars = getDifficultyStars(recipe.difficulty)
  const FamilyIcon = getFamilyIcon(recipe.family)
  const { favorites, toggleFavorite, hydrated } = useAppStore()
  const isFavorite = favorites.includes(recipe.id)

  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="group block rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative"
    >
      <div className="h-48 overflow-hidden relative">
        <RecipeImage
          src={recipe.image}
          alt={recipe.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="group-hover:scale-105 transition-transform duration-700"
        />
        {hydrated && (
          <button
            onClick={(e) => {
              e.preventDefault()
              toggleFavorite(recipe.id)
            }}
            aria-label={isFavorite ? `Retirer ${recipe.title} des favoris` : `Ajouter ${recipe.title} aux favoris`}
            aria-pressed={isFavorite}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
              isFavorite 
                ? "bg-rose-500/90 text-white" 
                : "bg-white/70 text-stone-500 hover:text-rose-500"
            }`}
          >
            <Heart size={16} className={isFavorite ? "fill-current" : ""} />
          </button>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${getFamilyColor(recipe.family)}`}>
            <FamilyIcon size={12} />
            {recipe.family}
          </span>
        </div>
        <h3 className="font-display text-lg font-bold text-stone-800 mb-2">{recipe.title}</h3>
        <p className="text-sm text-stone-500 line-clamp-2">{recipe.description}</p>
        <div className="flex items-center gap-4 mt-4 text-xs text-stone-400">
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {recipe.prepTime + recipe.cookTime} min
          </span>
          <span className="flex items-center gap-0.5">
            {Array.from({ length: 3 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < stars ? "text-amber-500 fill-amber-500" : "text-stone-200"}
              />
            ))}
          </span>
        </div>
      </div>
    </Link>
  )
}
