"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useMemo, useEffect } from "react"
import { ArrowLeft, Clock, Flame, Users, Plus, Minus, Lightbulb, Star, Heart, ChefHat, Microscope, Activity, Video, X, Play, Printer, Share2, Check } from "lucide-react"
import { getRecipe } from "@/lib/recipes-registry"
import { getFamilyColor } from "@/lib/families"
import { getDifficultyStars } from "@/lib/difficulty"
import { formatQuantity } from "@/lib/format"
import { useAppStore } from "@/lib/store"
import { shareRecipe, buildShareUrl } from "@/lib/share"
import { CgiVault } from "@/components/cgi-vault"
import { ExpertOverlay } from "@/components/expert-overlay"
import { ToolBadge } from "@/components/tool-badge"
import { RecipeImage } from "@/components/recipe-image"
import { useCustomImages } from "@/hooks/use-custom-images"
import { ProductionMode } from "@/components/production-mode"
import { AssistantChat } from "@/components/assistant-chat"
import { VoiceAssistant } from "@/components/voice-assistant"
import { motion, AnimatePresence } from "framer-motion"
import type { Recipe, Ingredient, TechnicalSpec, Step } from "@/types/recipe"

interface RecipeDetailClientProps {
  recipe: Recipe
}

export function RecipeDetailClient({ recipe }: RecipeDetailClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [servings, setServings] = useState(recipe?.servings || 4)
  const [activeVideoStep, setActiveVideoStep] = useState<number | null>(null)
  const [productionMode, setProductionMode] = useState(false)
  const [shareFeedback, setShareFeedback] = useState(false)
  const [editedQuantities, setEditedQuantities] = useState<Record<number, number>>({})
  const { mode, hydrated, hydrate, favorites, toggleFavorite } = useAppStore()
  const { getCustomImage } = useCustomImages()
  const customImage = getCustomImage(recipe.id)
  const imageSrc = customImage || recipe.image

  useEffect(() => { hydrate() }, [hydrate])

  useEffect(() => {
    const portionsParam = searchParams.get("portions")
    if (portionsParam) {
      const parsed = parseInt(portionsParam, 10)
      if (!isNaN(parsed) && parsed >= 1) {
        setServings(Math.min(99, parsed))
      }
    }
  }, [searchParams])

  const handleIngredientEdit = (index: number, newQty: number) => {
    const original = recipe.ingredients[index].quantity
    if (!original || original === 0) return
    const ratio = newQty / original
    const newQuantities: Record<number, number> = {}
    recipe.ingredients.forEach((_, i) => {
      newQuantities[i] = recipe.ingredients[i].quantity * ratio
    })
    setEditedQuantities(newQuantities)
    setServings(Math.round((recipe.servings || 4) * ratio))
  }

  const handleShare = async () => {
    const result = await shareRecipe({
      title: recipe.title,
      text: `Découvrez la recette ${recipe.title} sur Artisan`,
      url: buildShareUrl(recipe.id, servings),
    })
    if (result === "copied") {
      setShareFeedback(true)
      setTimeout(() => setShareFeedback(false), 2000)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const isFavorite = favorites.includes(recipe.id)
  const scale = servings / recipe.servings
  const scaledAmount = (amount: number) => Math.round((amount * scale) * 1000) / 1000
  const stars = getDifficultyStars(recipe.difficulty)

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.push("/recipes")}
          className="flex items-center gap-2 text-stone-500 hover:text-stone-700 transition-colors"
        >
          <ArrowLeft size={18} />
          Retour aux recettes
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            aria-label="Imprimer la recette"
            className="p-3 rounded-xl border border-stone-200 bg-white text-stone-500 hover:text-amber-600 hover:border-amber-200 transition-all"
          >
            <Printer size={20} />
          </button>
          <button
            onClick={handleShare}
            aria-label="Partager la recette"
            className={`p-3 rounded-xl border transition-all ${
              shareFeedback
                ? "bg-green-50 border-green-100 text-green-500"
                : "border-stone-200 bg-white text-stone-500 hover:text-amber-600 hover:border-amber-200"
            }`}
          >
            {shareFeedback ? <Check size={20} /> : <Share2 size={20} />}
          </button>
          {hydrated && (
            <button
              onClick={() => toggleFavorite(recipe.id)}
              aria-label={isFavorite ? `Retirer ${recipe.title} des favoris` : `Ajouter ${recipe.title} aux favoris`}
              aria-pressed={isFavorite}
              className={`p-3 rounded-xl border transition-all ${
                isFavorite 
                  ? "bg-rose-50 border-rose-100 text-rose-500" 
                  : "bg-white border-stone-200 text-stone-400 hover:text-rose-400"
              }`}
            >
              <Heart size={20} className={isFavorite ? "fill-current" : ""} />
            </button>
          )}
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden mb-8">
<RecipeImage
            src={imageSrc}
            alt={recipe.title}
          sizes="(max-width: 768px) 100vw, 800px"
          priority
          className="w-full h-auto"
        />
      </div>

      <div className="mb-8">
        <div className="flex flex-wrap gap-3 mb-4">
          <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border ${getFamilyColor(recipe.family)}`}>
            {recipe.family}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border bg-stone-100 text-stone-600 border-stone-200">
            {Array.from({ length: 3 }).map((_, i) => (
              <Star
                key={i}
                size={11}
                className={i < stars ? "text-amber-500 fill-amber-500" : "text-stone-200"}
              />
            ))}
            {recipe.difficulty}
          </span>
          {hydrated && mode === "expert" && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border bg-amber-50 text-amber-700 border-amber-200">
              <ChefHat size={11} />
              Expert
            </span>
          )}
        </div>
        <h1 className="font-display text-3xl md:text-5xl text-stone-800 mb-4">{recipe.title}</h1>
        <p className="text-stone-500 text-lg leading-relaxed">{recipe.description}</p>
      </div>

      <AnimatePresence>
        {hydrated && mode === "expert" && recipe.technicalSpecs && recipe.technicalSpecs.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-10 overflow-hidden"
          >
            <div className="rounded-2xl bg-stone-900 text-white p-6 md:p-8 border border-stone-800 shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <Microscope size={20} className="text-amber-500" />
                <h3 className="font-display text-xl">Analyse Physico-Chimique</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {recipe.technicalSpecs.map((spec: { label: string; value: string; unit: string; description: string }, i: number) => (
                  <div key={i} className="group relative">
                    <div className="flex items-center justify-between mb-1 opacity-60">
                      <span className="text-[10px] font-bold uppercase tracking-widest">{spec.label}</span>
                      <Activity size={12} className="text-amber-500" />
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-display font-bold text-white">{spec.value}</span>
                      <span className="text-sm text-stone-500 font-medium">{spec.unit}</span>
                    </div>
                    <p className="text-[10px] text-stone-400 mt-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity">
                      {spec.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { icon: Clock, label: "Préparation", value: `${Math.round(recipe.prepTime * (servings / (recipe.servings || 4)))} min` },
          { icon: Flame, label: "Cuisson", value: `${Math.round(recipe.cookTime * (servings / (recipe.servings || 4)))} min` },
          { icon: Clock, label: "Repos", value: `${recipe.restTime} min` },
          { icon: Users, label: "Portions", value: `${recipe.servings}` },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-white border border-stone-200 p-4 text-center">
            <stat.icon className="mx-auto text-amber-600 mb-2" size={20} />
            <p className="text-[10px] font-bold uppercase text-stone-400 mb-1">{stat.label}</p>
            <p className="font-bold text-stone-700">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white border border-stone-200 p-6 md:p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-2xl text-stone-800">Ingrédients</h3>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setServings(Math.max(1, servings - 1))}
              aria-label="Diminuer le nombre de portions"
              className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition-colors"
            >
              <Minus size={16} />
            </button>
            <button
              onClick={() => setServings(Math.round(servings * 2))}
              aria-label="Doubler les portions"
              className="px-2 py-1 rounded-lg bg-amber-100 text-amber-700 text-xs font-bold hover:bg-amber-200 transition-colors"
            >
              ×2
            </button>
            <button
              onClick={() => setServings(Math.round(servings * 4))}
              aria-label="Quadrupler les portions"
              className="px-2 py-1 rounded-lg bg-amber-100 text-amber-700 text-xs font-bold hover:bg-amber-200 transition-colors"
            >
              ×4
            </button>
            <button
              onClick={() => setServings(Math.max(1, Math.round(servings / 2)))}
              aria-label="Diviser par deux les portions"
              className="px-2 py-1 rounded-lg bg-stone-100 text-stone-600 text-xs font-bold hover:bg-stone-200 transition-colors"
            >
              ÷2
            </button>
            <input
              type="number"
              min={1}
              max={99}
              value={servings}
              onChange={(e) => setServings(Math.max(1, parseInt(e.target.value) || 1))}
              aria-label="Nombre de portions"
              className="w-16 text-center font-mono text-sm font-medium text-stone-700 bg-stone-50 border border-stone-200 rounded-lg py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
            <span className="text-xs text-stone-400">pers.</span>
            <button
              onClick={() => { setServings(recipe?.servings || 4); setEditedQuantities({}); }}
              aria-label="Réinitialiser au nombre original"
              className="px-2 py-1 rounded-lg bg-stone-100 text-stone-600 text-xs font-medium hover:bg-stone-200 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
        <div className="space-y-3">
          {recipe.ingredients.map((ing, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-stone-100 last:border-0">
              <span className="text-stone-700">{ing.name}</span>
              <div className="flex items-center gap-2">
                {scale !== 1 && (
                  <span className="text-[10px] text-stone-300 line-through">
                    {formatQuantity(ing.quantity, ing.unit)}
                  </span>
                )}
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={editedQuantities[i] !== undefined ? editedQuantities[i] : ing.quantity}
                  onChange={(e) => handleIngredientEdit(i, parseFloat(e.target.value) || 0)}
                  className="w-20 font-mono text-sm text-stone-500 bg-stone-50 border border-stone-200 rounded px-1 py-0.5 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-stone-50 border border-stone-200 p-6 md:p-8 mb-8">
        <h3 className="font-display text-2xl text-stone-800 mb-6 flex items-center gap-2">
          <ChefHat size={24} className="text-amber-600" />
          Matériel nécessaire
        </h3>
        <div className="flex flex-wrap gap-2">
          {recipe.tools?.map((tool, i) => (
            <ToolBadge key={i} name={tool} />
          ))}
        </div>
      </div>

      <button
        onClick={() => setProductionMode(true)}
        className="w-full py-5 mb-8 bg-amber-500 text-white rounded-2xl font-bold text-lg hover:bg-amber-600 shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
      >
        <Play size={22} />
        Lancer la Production
      </button>

      <div className="rounded-2xl bg-white border border-stone-200 p-6 md:p-8">
        <h3 className="font-display text-2xl text-stone-800 mb-8">Les étapes</h3>
        <div className="space-y-8">
          {recipe.steps.map((step, i) => (
            <div key={i} className="relative flex gap-6">
              <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold shrink-0 relative z-10">
                {i + 1}
              </div>
              {i < recipe.steps.length - 1 && (
                <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-stone-200" />
              )}
              <div className="flex-1 pb-8">
                <h4 className="font-display text-xl text-stone-800 mb-2 flex items-center justify-between">
                  {step.title}
                {step.gestureVideo && mode === "debutant" && (
                  <button
                    onClick={() => setActiveVideoStep(activeVideoStep === i ? null : i)}
                    className={`p-2 rounded-full transition-all ${
                      activeVideoStep === i 
                        ? "bg-amber-600 text-white shadow-lg shadow-amber-600/20" 
                        : "bg-stone-100 text-stone-400 hover:text-amber-600 hover:bg-amber-50"
                    }`}
                    title={activeVideoStep === i ? "Masquer la vidéo" : "Voir le geste technique"}
                    aria-label={activeVideoStep === i ? `Masquer la vidéo de l'étape ${i + 1}` : `Voir la vidéo du geste technique de l'étape ${i + 1}`}
                    aria-expanded={activeVideoStep === i}
                  >
                    <Video size={14} />
                  </button>
                )}
                </h4>
                <p className="text-stone-600 leading-relaxed mb-3">{step.description}</p>
                
                <AnimatePresence>
                  {step.gestureVideo && mode === "debutant" && activeVideoStep === i && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0, scale: 0.95 }}
                      animate={{ opacity: 1, height: "auto", scale: 1 }}
                      exit={{ opacity: 0, height: 0, scale: 0.95 }}
                      className="mb-6 overflow-hidden rounded-xl border-2 border-amber-100 shadow-xl bg-stone-900 aspect-video"
                    >
                      <CgiVault src={step.gestureVideo} className="w-full h-full" showControls />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center gap-4 text-sm text-stone-400">
                  {step.duration && (
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {step.duration} min
                    </span>
                  )}
                </div>
                {step.tip && (
                  <div className="mt-3 p-4 bg-amber-50 border border-amber-100 rounded-xl">
                    <p className="text-sm text-stone-700 italic"><Lightbulb size={14} className="inline mr-1.5 -mt-0.5 text-amber-600" />{step.tip}</p>
                  </div>
                )}
                {step.expertNote && hydrated && mode === "expert" && (
                  <div className="mt-3 p-4 bg-stone-50 border border-stone-200 rounded-xl">
                    <div className="flex items-center gap-1.5 mb-2">
                      <ChefHat size={14} className="text-amber-600" />
                    </div>
                    <p className="text-sm text-stone-600">{step.expertNote}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {productionMode && (
          <ProductionMode recipe={recipe} onClose={() => setProductionMode(false)} />
        )}
      </AnimatePresence>

      <div className="no-print">
        <AssistantChat recipe={recipe} />
      </div>
    </div>
  )
}