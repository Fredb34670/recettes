"use client"

import { useState } from "react"
import { Upload, Image as ImageIcon, Trash2, Save, Check } from "lucide-react"
import { recipes } from "@/lib/recipes-registry"
import { RecipeCard } from "@/components/recipe-card"

const CUSTOM_IMAGES_KEY = "artisan-custom-images"

export default function AdminPage() {
  const [uploadedImages, setUploadedImages] = useState<Record<string, string>>({})
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle")

  // Charger les images custom depuis localStorage
  useState(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(CUSTOM_IMAGES_KEY)
        if (saved) setUploadedImages(JSON.parse(saved))
      } catch {}
    }
  })

  const handleImageUpload = (recipeId: string, file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const base64 = e.target?.result as string
      const updated = { ...uploadedImages, [recipeId]: base64 }
      setUploadedImages(updated)
      saveToStorage(updated)
    }
    reader.readAsDataURL(file)
  }

  const saveToStorage = (images: Record<string, string>) => {
    setSaveStatus("saving")
    try {
      localStorage.setItem(CUSTOM_IMAGES_KEY, JSON.stringify(images))
      setSaveStatus("saved")
      setTimeout(() => setSaveStatus("idle"), 2000)
    } catch {
      setSaveStatus("idle")
    }
  }

  const handleClear = (recipeId: string) => {
    const updated = { ...uploadedImages }
    delete updated[recipeId]
    setUploadedImages(updated)
    saveToStorage(updated)
  }

  const handleClearAll = () => {
    if (confirm("Supprimer toutes les images personnalisées ?")) {
      setUploadedImages({})
      localStorage.removeItem(CUSTOM_IMAGES_KEY)
    }
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-stone-800 mb-2">Administration des images</h1>
          <p className="text-stone-500 text-sm">
            Uploadez une image pour remplacer celle d'une recette. Les images sont stockées localement (localStorage).
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saveStatus === "saved" && (
            <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <Check size={16} /> Sauvegardé
            </span>
          )}
          <button
            onClick={handleClearAll}
            className="px-4 py-2 rounded-xl border border-stone-200 text-stone-500 hover:text-rose-500 hover:border-rose-200 text-sm font-medium transition-all"
          >
            <Trash2 size={16} className="inline mr-1" />
            Tout effacer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => {
          const customImage = uploadedImages[recipe.id]
          return (
            <div key={recipe.id} className="rounded-2xl border border-stone-200 bg-white overflow-hidden">
              <div className="relative aspect-[4/3] bg-stone-100">
                {customImage ? (
                  <img
                    src={customImage}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute top-2 right-2">
                  {customImage && (
                    <button
                      onClick={() => handleClear(recipe.id)}
                      className="p-1.5 rounded-full bg-rose-500 text-white hover:bg-rose-600 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-display font-bold text-stone-800 mb-1">{recipe.title}</h3>
                <p className="text-xs text-stone-400 mb-3">{recipe.family}</p>
                <label className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 cursor-pointer text-sm font-medium transition-all">
                  <Upload size={16} />
                  {customImage ? "Remplacer" : "Uploader"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleImageUpload(recipe.id, file)
                    }}
                  />
                </label>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-8 p-4 rounded-xl bg-stone-50 border border-stone-200">
        <div className="flex items-start gap-3">
          <ImageIcon size={20} className="text-stone-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-stone-700 mb-1">Comment ça marche ?</p>
            <ul className="text-xs text-stone-500 space-y-1">
              <li>• Cliquez sur "Uploader" pour sélectionner une image</li>
              <li>• Les images sont sauvegardées dans votre navigateur (localStorage)</li>
              <li>• Les images remplacées s'affichent automatiquement sur le site</li>
              <li>• Pour rétablir l'image d'origine, cliquez sur l'icône poubelle</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}