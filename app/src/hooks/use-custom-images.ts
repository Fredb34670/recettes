import { useState, useEffect } from "react"

const CUSTOM_IMAGES_KEY = "artisan-custom-images"

export interface CustomImages {
  [recipeId: string]: string
}

export function useCustomImages() {
  const [images, setImages] = useState<CustomImages>({})

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(CUSTOM_IMAGES_KEY)
        if (saved) setImages(JSON.parse(saved))
      } catch {}
    }
  }, [])

  const getCustomImage = (recipeId: string): string | undefined => {
    return images[recipeId]
  }

  const setCustomImage = (recipeId: string, base64: string) => {
    const updated = { ...images, [recipeId]: base64 }
    setImages(updated)
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(CUSTOM_IMAGES_KEY, JSON.stringify(updated))
      } catch {}
    }
  }

  const clearCustomImage = (recipeId: string) => {
    const updated = { ...images }
    delete updated[recipeId]
    setImages(updated)
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(CUSTOM_IMAGES_KEY, JSON.stringify(updated))
      } catch {}
    }
  }

  const clearAll = () => {
    setImages({})
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(CUSTOM_IMAGES_KEY)
      } catch {}
    }
  }

  return { images, getCustomImage, setCustomImage, clearCustomImage, clearAll }
}