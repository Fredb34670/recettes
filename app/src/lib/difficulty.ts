import { Star } from "lucide-react"

export function getDifficultyStars(difficulty: string): number {
  const map: Record<string, number> = {
    Débutant: 1,
    Intermédiaire: 2,
    Avancé: 3,
  }
  return map[difficulty] || 1
}

export function getDifficultyLabel(difficulty: string): string {
  const count = getDifficultyStars(difficulty)
  return "★".repeat(count) + "☆".repeat(3 - count)
}
