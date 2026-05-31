"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useMemo, useEffect } from "react"
import { ArrowLeft, Clock, Flame, Users, Plus, Minus, Lightbulb, Star, Heart, ChefHat, Microscope, Activity, Video, X } from "lucide-react"
import { getRecipe } from "@/lib/recipes-registry"
import { getFamilyColor } from "@/lib/families"
import { getDifficultyStars } from "@/lib/difficulty"
import { formatQuantity } from "@/lib/format"
import { useAppStore } from "@/lib/store"
import { CgiVault } from "@/components/cgi-vault"
import { ExpertOverlay } from "@/components/expert-overlay"
import { ToolBadge } from "@/components/tool-badge"
import { motion, AnimatePresence } from "framer-motion"

export default function RecipeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const recipe = useMemo(() => getRecipe(params.id as string), [params.id])
  const [servings, setServings] = useState(recipe?.servings || 4)
  const [activeVideoStep, setActiveVideoStep] = useState<number | null>(null)
  const { mode, hydrated, hydrate, favorites, toggleFavorite } = useAppStore()

  useEffect(() => { hydrate() }, [hydrate])

  if (!recipe) {
    return (
      <div className="text-center py-20">
        <p className="text-stone-400 text-lg">Recette introuvable</p>
        <button onClick={() => router.push("/recipes")} className="mt-4 text-amber-600 font-medium hover:underline">
          Retour aux recettes
        </button>
      </div>
    )
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
          {hydrated && (
            <button
              onClick={() => toggleFavorite(recipe.id)}
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

      <div className="rounded-2xl overflow-hidden mb-8 relative">
        <div className="h-64 md:h-[400px]">
          <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
        </div>
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
                {recipe.technicalSpecs.map((spec, i) => (
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
          { icon: Clock, label: "Préparation", value: `${recipe.prepTime} min` },
          { icon: Flame, label: "Cuisson", value: `${recipe.cookTime} min` },
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
              className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition-colors"
            >
              <Minus size={16} />
            </button>
            <input
              type="number"
              min={1}
              max={99}
              value={servings}
              onChange={(e) => setServings(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 text-center font-mono text-sm font-medium text-stone-700 bg-stone-50 border border-stone-200 rounded-lg py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
            <span className="text-xs text-stone-400">pers.</span>
            <button
              onClick={() => setServings(servings + 1)}
              className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition-colors"
            >
              <Plus size={16} />
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
                <span className="font-mono text-sm text-stone-500">
                  {formatQuantity(scaledAmount(ing.quantity), ing.unit)}
                </span>
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
                    >
                      {activeVideoStep === i ? <X size={16} /> : <Video size={16} />}
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
    </div>
  )
}
