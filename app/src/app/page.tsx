"use client"

import { useEffect } from "react"
import Link from "next/link"
import { recipes } from "@/lib/recipes-registry"
import { Utensils, Timer, Star, Heart } from "lucide-react"
import { getDifficultyStars } from "@/lib/difficulty"
import { getFamilyColor, getFamilyIcon } from "@/lib/families"
import { useAppStore } from "@/lib/store"
import { RecipeCard } from "@/components/recipe-card"

function plural(n: number) { return n > 1 ? "s" : "" }

export default function Home() {
  const { favorites, hydrated, hydrate } = useAppStore()

  useEffect(() => { hydrate() }, [hydrate])

  const featured = recipes[0]
  const favoriteRecipes = recipes.filter(r => favorites.includes(r.id))

  const byFamily = recipes.reduce<Record<string, typeof recipes>>((acc, r) => {
    ;(acc[r.family] ??= []).push(r)
    return acc
  }, {})

  return (
    <div className="max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h2 className="font-display text-3xl md:text-4xl text-stone-800 mb-1">Bonjour Chef, prêt ?</h2>
          <p className="text-stone-500 text-sm md:text-base">Des classiques aux signatures, la pâtisserie de chef à portée de main.</p>
        </div>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        <div className="rounded-2xl bg-white border border-stone-200 p-4 md:p-6 flex flex-col items-center text-center">
          <p className="text-[10px] text-stone-400 uppercase tracking-tighter mb-1">Recettes</p>
          <p className="text-2xl md:text-3xl font-display font-bold text-amber-600">{recipes.length}</p>
        </div>
        <div className="rounded-2xl bg-white border border-stone-200 p-4 md:p-6 flex flex-col items-center text-center">
          <p className="text-[10px] text-stone-400 uppercase tracking-tighter mb-1">Familles</p>
          <p className="text-2xl md:text-3xl font-display font-bold text-amber-600">
            {Object.keys(byFamily).length}
          </p>
        </div>
        <div className="rounded-2xl bg-white border border-stone-200 p-4 md:p-6 flex flex-col items-center text-center">
          <p className="text-[10px] text-stone-400 uppercase tracking-tighter mb-1">Favoris</p>
          <p className="text-2xl md:text-3xl font-display font-bold text-rose-500">{favorites.length}</p>
        </div>
        <div className="rounded-2xl bg-white border border-stone-200 p-4 md:p-6 flex flex-col items-center text-center">
          <p className="text-[10px] text-stone-400 uppercase tracking-tighter mb-1">Difficulté</p>
          <p className="text-2xl md:text-3xl font-display font-bold text-amber-600">Mixte</p>
        </div>
      </div>

      {hydrated && favoriteRecipes.length > 0 && (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-2xl text-stone-800 flex items-center gap-2">
              <Heart size={24} className="text-rose-500 fill-rose-500" />
              Vos Favoris
            </h3>
            <Link href="/recipes?filter=favorites" className="text-amber-600 hover:text-amber-700 text-sm font-medium">
              Voir tout →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteRecipes.slice(0, 3).map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </section>
      )}

      {featured && (
        <Link
          href={`/recipes/${featured.id}`}
          className="block mb-12 rounded-2xl overflow-hidden relative group cursor-pointer"
        >
          <img
            src={featured.image}
            alt={featured.title}
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent p-6 md:p-8 flex flex-col justify-end">
            <span className="inline-block w-fit bg-amber-600 text-white px-3 py-1 rounded-full text-[10px] font-bold mb-3 uppercase tracking-widest">
              En vedette
            </span>
            <h3 className="font-display text-2xl md:text-4xl text-white mb-2">{featured.title}</h3>
            <div className="flex items-center gap-4 text-white/80 text-xs md:text-sm font-medium">
              <span className="flex items-center gap-1"><Utensils size={14} />{featured.family}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Timer size={14} />{featured.prepTime + featured.cookTime}min</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Star
                    key={i}
                    size={11}
                    className={i < getDifficultyStars(featured.difficulty) ? "text-amber-400 fill-amber-400" : "text-white/30"}
                  />
                ))}
              </span>
            </div>
          </div>
        </Link>
      )}

      <div>
        <h3 className="font-display text-2xl text-stone-800 mb-1">Découvrir par famille</h3>
        <p className="text-stone-500 text-sm mb-6">Un exemple par catégorie</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(byFamily).map(([family, familyRecipes]) => {
            const example = familyRecipes[0]
            const stars = getDifficultyStars(example.difficulty)
            const FamilyIcon = getFamilyIcon(family)
            return (
              <Link
                key={family}
                href={`/recipes?family=${encodeURIComponent(family)}`}
                className="group block rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={example.image}
                    alt={example.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${getFamilyColor(family)}`}>
                      <FamilyIcon size={12} />
                      {family}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-stone-800 mb-2">{example.title}</h3>
                  <p className="text-sm text-stone-500 line-clamp-2">{example.description}</p>
                  <div className="flex items-center gap-4 mt-4 text-xs text-stone-400">
                    <span className="flex items-center gap-1">
                      <Timer size={14} />
                      {example.prepTime + example.cookTime} min
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
                  <p className="mt-3 text-xs text-amber-600 font-medium">
                    + {familyRecipes.length - 1} recette{plural(familyRecipes.length - 1)} dans cette famille →
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
