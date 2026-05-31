export interface Ingredient {
  name: string
  quantity: number
  unit: string
}

export interface Step {
  title: string
  description: string
  duration?: number
  tip?: string
  expertNote?: string
}

export interface Recipe {
  id: string
  family: string
  title: string
  difficulty: "Débutant" | "Intermédiaire" | "Avancé"
  description: string
  prepTime: number
  cookTime: number
  restTime: number
  servings: number
  calories?: number
  ingredients: Ingredient[]
  steps: Step[]
  tips: string[]
  tools: string[]
  image: string
}
