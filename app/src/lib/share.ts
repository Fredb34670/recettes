interface ShareData {
  title: string
  text?: string
  url: string
}

export async function shareRecipe(data: ShareData): Promise<"native" | "copied" | "cancelled"> {
  // Web Share API (mobile native)
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({
        title: data.title,
        text: data.text,
        url: data.url,
      })
      return "native"
    } catch (error) {
      // User cancelled
      if (error instanceof Error && error.name === "AbortError") {
        return "cancelled"
      }
    }
  }

  // Fallback: copy to clipboard
  try {
    await navigator.clipboard.writeText(data.url)
    return "copied"
  } catch {
    return "cancelled"
  }
}

export function buildShareUrl(recipeId: string, servings?: number): string {
  const url = new URL(window.location.origin)
  url.pathname = `/recipes/${recipeId}`
  if (servings && servings > 0) {
    url.searchParams.set("portions", String(servings))
  }
  return url.toString()
}