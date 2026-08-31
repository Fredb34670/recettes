import { Suspense } from "react"
import { recipes } from "@/lib/recipes-registry"
import { RecipeDetailClient } from "./RecipeDetailClient"

export function generateStaticParams() {
  return recipes.map((recipe) => ({ id: recipe.id }))
}

export default async function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const recipe = recipes.find((r) => r.id === id)
  
  if (!recipe) {
    return (
      <div className="text-center py-20">
        <p className="text-stone-400 text-lg">Recette introuvable</p>
        <a href="/recipes" className="mt-4 text-amber-600 font-medium hover:underline">
          Retour aux recettes
        </a>
      </div>
    )
  }

  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto py-20 text-center text-stone-400">Chargement de la recette...</div>}>
      <RecipeDetailClient recipe={recipe} />
    </Suspense>
  )
}