"use client"

import { Suspense, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { recipes } from "@/lib/recipes-registry"
import { RecipeCard } from "@/components/recipe-card"
import { SearchBar } from "@/components/search-bar"
import { FamilyFilter } from "@/components/family-filter"
import { DifficultyFilter } from "@/components/difficulty-filter"
import { searchRecipes } from "@/lib/search"
import { useRecipeStore } from "@/store/use-recipe-store"
import { useAppStore } from "@/lib/store"
import { Heart, GraduationCap, ChefHat, Info } from "lucide-react"

function RecipesContent() {
  const searchParams = useSearchParams()
  const familyParam = searchParams.get("family")
  const favsParam = searchParams.get("filter") === "favorites"
  const { searchQuery, selectedFamily, selectedDifficulty, setSelectedFamily } = useRecipeStore()
  const { favorites, hydrated, mode } = useAppStore()

  useEffect(() => {
    if (familyParam) setSelectedFamily(familyParam)
  }, [familyParam, setSelectedFamily])

  const filtered = recipes.filter((r) => {
    const matchesSearch = searchQuery
      ? searchRecipes(recipes, searchQuery).some((sr) => sr.id === r.id)
      : true
    const matchesFamily = selectedFamily ? r.family === selectedFamily : true
    const matchesDifficulty = selectedDifficulty ? r.difficulty === selectedDifficulty : true
    const matchesFavs = favsParam ? favorites.includes(r.id) : true
    return matchesSearch && matchesFamily && matchesDifficulty && matchesFavs
  })

  // Group by category if searching
  const grouped = filtered.reduce<Record<string, typeof recipes>>((acc, r) => {
    ;(acc[r.family] ??= []).push(r)
    return acc
  }, {})

  const isSearching = !!searchQuery.trim()

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8">
        {(selectedFamily || favsParam) ? (
          <div className="flex items-center gap-3 mb-1">
            <Link href="/recipes" className="text-amber-600 hover:text-amber-700 text-sm font-medium shrink-0">
              ← Toutes les recettes
            </Link>
          </div>
        ) : null}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-1">
          <h2 className="font-display text-3xl md:text-4xl text-stone-800">
            {favsParam ? "Mes Favoris" : (selectedFamily || "Recettes")}
          </h2>
          {hydrated && (
            <div className="flex items-center gap-4 text-xs font-medium text-stone-500 bg-stone-100/50 px-4 py-2 rounded-full border border-stone-200">
              <div className="flex items-center gap-1.5">
                <GraduationCap size={14} className="text-stone-400" />
                <span>Débutant : Vidéos</span>
              </div>
              <div className="w-px h-3 bg-stone-300" />
              <div className="flex items-center gap-1.5">
                <ChefHat size={14} className="text-amber-600" />
                <span>Expert : Chimie</span>
              </div>
            </div>
          )}
        </div>
        <p className="text-stone-500 text-sm md:text-base">
          {filtered.length} recette{filtered.length > 1 ? "s" : ""} trouvée{filtered.length > 1 ? "s" : ""}
        </p>
      </header>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <SearchBar />
        {hydrated && favorites.length > 0 && !favsParam && (
          <Link 
            href="/recipes?filter=favorites"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-stone-200 text-stone-600 hover:border-rose-200 hover:text-rose-500 transition-all shadow-sm shrink-0"
          >
            <Heart size={18} className="text-rose-500" />
            <span className="font-medium">Mes Favoris ({favorites.length})</span>
          </Link>
        )}
      </div>

      <div className="mb-6 overflow-x-auto no-scrollbar">
        <FamilyFilter />
      </div>
      <div className="mb-8 overflow-x-auto no-scrollbar">
        <DifficultyFilter />
      </div>

      {filtered.length > 0 ? (
        <div className="space-y-12">
          {isSearching ? (
            Object.entries(grouped).map(([family, familyRecipes]) => (
              <div key={family} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="font-display text-2xl text-stone-700 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-400 text-sm">
                    {familyRecipes.length}
                  </span>
                  {family}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {familyRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-stone-400 text-lg">Aucune recette trouvée</p>
          <p className="text-stone-400 text-sm mt-2">Essayez de modifier vos filtres</p>
        </div>
      )}
    </div>
  )
}

export default function RecipesPage() {
  return (
    <Suspense fallback={<div className="max-w-6xl mx-auto py-20 text-center text-stone-400">Chargement...</div>}>
      <RecipesContent />
    </Suspense>
  )
}
