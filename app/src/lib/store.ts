import { create } from "zustand"

type AppMode = "debutant" | "expert"

interface AppStore {
  mode: AppMode
  hydrated: boolean
  favorites: string[]
  toggleMode: () => void
  toggleFavorite: (recipeId: string) => void
  hydrate: () => void
}

export const useAppStore = create<AppStore>((set) => ({
  mode: "debutant",
  hydrated: false,
  favorites: [],
  toggleMode: () =>
    set((state) => {
      const next = state.mode === "debutant" ? "expert" : "debutant"
      localStorage.setItem("app-mode", next)
      return { mode: next }
    }),
  toggleFavorite: (recipeId: string) =>
    set((state) => {
      const next = state.favorites.includes(recipeId)
        ? state.favorites.filter((id) => id !== recipeId)
        : [...state.favorites, recipeId]
      localStorage.setItem("app-favorites", JSON.stringify(next))
      return { favorites: next }
    }),
  hydrate: () => {
    const storedMode = localStorage.getItem("app-mode") as AppMode | null
    const storedFavs = localStorage.getItem("app-favorites")
    set({ 
      mode: storedMode || "debutant", 
      favorites: storedFavs ? JSON.parse(storedFavs) : [],
      hydrated: true 
    })
  },
}))
