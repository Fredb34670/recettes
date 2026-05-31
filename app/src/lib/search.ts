import type { Recipe } from "@/types/recipe"

/**
 * Advanced search function for recipes.
 * Supports:
 * - Time search (e.g., "20mn", "20 min")
 * - Inclusion/Exclusion (e.g., "lait + beurre - oeuf")
 * - Fuzzy search on title, family, and description
 */
export function searchRecipes(recipes: Recipe[], query: string): Recipe[] {
  const q = query.trim().toLowerCase()
  if (!q) return recipes

  // 1. Check for time-based search (e.g., "20mn", "20 min")
  const timeMatch = q.match(/^(\d+)\s*(mn|min)$/)
  if (timeMatch) {
    const targetTime = parseInt(timeMatch[1])
    return recipes.filter(r => (r.prepTime + r.cookTime) === targetTime)
  }

  // 2. Parse advanced tokens (lait + beurre - oeuf)
  // We split by spaces and keep track of prefixes (+, -)
  // Default (no prefix) is treated as a "should have" (OR behavior or fuzzy)
  // But per requirements, if there's a mix, we follow the logic.
  
  const tokens = q.split(/[\s,]+/).filter(t => t.length > 0)
  
  // If no advanced tokens found but it's a simple query, we'll use a simpler logic
  // but let's implement the logic for all.
  
  return recipes.filter(recipe => {
    const title = recipe.title.toLowerCase()
    const family = recipe.family.toLowerCase()
    const desc = recipe.description.toLowerCase()
    const ingredients = recipe.ingredients.map(i => i.name.toLowerCase()).join(" ")
    
    const fullText = `${title} ${family} ${desc} ${ingredients}`
    
    let isMatch = true
    let hasPositiveTokens = false

    for (const token of tokens) {
      if (token.startsWith("-")) {
        const term = token.slice(1)
        if (term && fullText.includes(term)) return false
      } else if (token.startsWith("+")) {
        const term = token.slice(1)
        if (term && !fullText.includes(term)) return false
        hasPositiveTokens = true
      } else {
        // Simple term (treated as MUST for consistency with + but allows any of multiple simple terms)
        // If the user typed "lait beurre", they usually want both or one.
        // Given the prompt "lait + beurre - oeuf", we'll treat simple terms as "should contain"
        if (!fullText.includes(token)) isMatch = false
        hasPositiveTokens = true
      }
    }

    // If query was only exclusions, it must not have excluded anything (handled above)
    // If it had positive requirements, it must meet them.
    return hasPositiveTokens ? isMatch : true
  })
}
