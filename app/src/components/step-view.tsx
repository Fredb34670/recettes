"use client"

import { Clock, Lightbulb, ChefHat } from "lucide-react"
import { StepTimer } from "@/components/step-timer"
import type { Step } from "@/types/recipe"

interface StepViewProps {
  step: Step
  stepNumber: number
  totalSteps: number
  isExpert?: boolean
}

export function StepView({ step, stepNumber, totalSteps, isExpert }: StepViewProps) {
  return (
    <div className="flex flex-col items-center text-center max-w-2xl mx-auto px-4">
      <div className="mb-6">
        <span className="text-sm font-bold uppercase tracking-widest text-amber-500">
          Étape {stepNumber} sur {totalSteps}
        </span>
      </div>

      <h2 className="font-display text-3xl md:text-5xl text-stone-800 mb-6 leading-tight">
        {step.title}
      </h2>

      <p className="text-lg md:text-xl text-stone-600 leading-relaxed mb-8 max-w-xl">
        {step.description}
      </p>

      {step.duration && (
        <div className="mb-8">
          <StepTimer duration={step.duration} />
        </div>
      )}

      {step.tip && (
        <div className="w-full p-5 bg-amber-50 border border-amber-200 rounded-2xl mb-4">
          <div className="flex items-start gap-3">
            <Lightbulb size={20} className="text-amber-600 mt-0.5 shrink-0" />
            <p className="text-sm text-stone-700 text-left leading-relaxed">{step.tip}</p>
          </div>
        </div>
      )}

      {step.expertNote && isExpert && (
        <div className="w-full p-5 bg-stone-50 border border-stone-200 rounded-2xl">
          <div className="flex items-start gap-3">
            <ChefHat size={20} className="text-amber-600 mt-0.5 shrink-0" />
            <p className="text-sm text-stone-600 text-left leading-relaxed">{step.expertNote}</p>
          </div>
        </div>
      )}
    </div>
  )
}
