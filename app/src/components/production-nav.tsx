"use client"

import { ChevronLeft, ChevronRight, Check } from "lucide-react"

interface ProductionNavProps {
  currentStep: number
  totalSteps: number
  onPrev: () => void
  onNext: () => void
  onFinish: () => void
}

export function ProductionNav({ currentStep, totalSteps, onPrev, onNext, onFinish }: ProductionNavProps) {
  const isFirst = currentStep === 1
  const isLast = currentStep === totalSteps

  return (
    <div className="flex items-center justify-between w-full max-w-md mx-auto px-4">
      <button
        onClick={onPrev}
        disabled={isFirst}
        aria-label="Étape précédente"
        className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-lg transition-all ${
          isFirst
            ? "bg-stone-100 text-stone-300 cursor-not-allowed"
            : "bg-stone-100 text-stone-600 hover:bg-stone-200 active:scale-95"
        }`}
      >
        <ChevronLeft size={24} />
        Retour
      </button>

      <div className="flex items-center gap-2" role="progressbar" aria-label="Progression" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={totalSteps}>
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i + 1 === currentStep
                ? "bg-amber-500 w-8"
                : i + 1 < currentStep
                  ? "bg-amber-300"
                  : "bg-stone-200"
            }`}
          />
        ))}
      </div>

      {isLast ? (
        <button
          onClick={onFinish}
          aria-label="Terminer la recette"
          className="flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-lg bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/30 active:scale-95 transition-all"
        >
          <Check size={24} />
          Terminer
        </button>
      ) : (
        <button
          onClick={onNext}
          aria-label="Étape suivante"
          className="flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-lg bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/30 active:scale-95 transition-all"
        >
          Suivant
          <ChevronRight size={24} />
        </button>
      )}
    </div>
  )
}
