import { recipes } from "@/lib/recipes-registry"

export function generateStaticParams() {
  return recipes.map((recipe) => ({ id: recipe.id }))
}