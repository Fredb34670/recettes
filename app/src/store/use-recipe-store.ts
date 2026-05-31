import { create } from "zustand"

interface RecipeState {
  searchQuery: string
  selectedFamily: string | null
  selectedDifficulty: string | null
  setSearchQuery: (query: string) => void
  setSelectedFamily: (family: string | null) => void
  setSelectedDifficulty: (difficulty: string | null) => void
}

export const useRecipeStore = create<RecipeState>((set) => ({
  searchQuery: "",
  selectedFamily: null,
  selectedDifficulty: null,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedFamily: (family) => set({ selectedFamily: family }),
  setSelectedDifficulty: (difficulty) => set({ selectedDifficulty: difficulty }),
}))
