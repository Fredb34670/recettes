"use client"

import { useState } from "react"
import { X, ChefHat, ListChecks } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { StepView } from "@/components/step-view"
import { ProductionNav } from "@/components/production-nav"
import { useAppStore } from "@/lib/store"
import type { Recipe, Step } from "@/types/recipe"

interface ProductionModeProps {
  recipe: Recipe
  onClose: () => void
}

export function ProductionMode({ recipe, onClose }: ProductionModeProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [showIngredients, setShowIngredients] = useState(false)
  const { mode } = useAppStore()
  const isExpert = mode === "expert"
  const step = recipe.steps[currentStep - 1]

  const scale = 1
  const scaledAmount = (amount: number) => amount

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-white flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-stone-200 bg-white shrink-0">
        <button
          onClick={onClose}
          aria-label="Fermer le mode production"
          className="p-2 rounded-xl bg-stone-100 text-stone-500 hover:bg-stone-200 transition-all"
        >
          <X size={20} />
        </button>
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500">Mode Production</p>
          <h2 className="font-display text-lg text-stone-800">{recipe.title}</h2>
        </div>
        <button
          onClick={() => setShowIngredients(!showIngredients)}
          aria-label={showIngredients ? "Masquer la liste des ingrédients" : "Afficher la liste des ingrédients"}
          aria-expanded={showIngredients}
          className={`p-2 rounded-xl transition-all ${
            showIngredients
              ? "bg-amber-500 text-white"
              : "bg-stone-100 text-stone-500 hover:bg-stone-200"
          }`}
        >
          <ListChecks size={20} />
        </button>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1 bg-stone-100 shrink-0">
        <motion.div
          className="h-full bg-amber-500"
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / recipe.steps.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Ingredients panel */}
      <AnimatePresence>
        {showIngredients && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-b border-stone-200 overflow-hidden shrink-0"
          >
            <div className="p-4 max-h-60 overflow-y-auto">
              <h3 className="font-display text-sm font-bold text-stone-800 mb-3 flex items-center gap-2">
                <ChefHat size={16} className="text-amber-600" />
                Ingrédients
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {recipe.ingredients.map((ing, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 px-3 bg-stone-50 rounded-lg text-sm">
                    <span className="text-stone-700">{ing.name}</span>
                    <span className="font-mono text-xs text-stone-500 ml-2">
                      {scaledAmount(ing.quantity)} {ing.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step content */}
      <div className="flex-1 overflow-y-auto flex items-center justify-center py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <StepView
              step={step}
              stepNumber={currentStep}
              totalSteps={recipe.steps.length}
              isExpert={isExpert}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="shrink-0 py-4 border-t border-stone-200 bg-white">
        <ProductionNav
          currentStep={currentStep}
          totalSteps={recipe.steps.length}
          onPrev={() => setCurrentStep(Math.max(1, currentStep - 1))}
          onNext={() => setCurrentStep(Math.min(recipe.steps.length, currentStep + 1))}
          onFinish={onClose}
        />
      </div>
    </motion.div>
  )
}
