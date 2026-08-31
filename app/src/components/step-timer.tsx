"use client"

import { useState, useEffect, useCallback } from "react"
import { Play, Pause, RotateCcw } from "lucide-react"

interface StepTimerProps {
  duration: number
  onComplete?: () => void
}

export function StepTimer({ duration, onComplete }: StepTimerProps) {
  const totalSeconds = duration * 60
  const [remaining, setRemaining] = useState(totalSeconds)
  const [isRunning, setIsRunning] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  const minutes = Math.floor(remaining / 60)
  const seconds = remaining % 60
  const progress = 1 - remaining / totalSeconds

  const reset = useCallback(() => {
    setRemaining(totalSeconds)
    setIsRunning(false)
    setIsFinished(false)
  }, [totalSeconds])

  useEffect(() => {
    if (!isRunning || remaining <= 0) return
    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          setIsRunning(false)
          setIsFinished(true)
          onComplete?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [isRunning, remaining, onComplete])

  useEffect(() => {
    setRemaining(totalSeconds)
    setIsRunning(false)
    setIsFinished(false)
  }, [totalSeconds])

  const circumference = 2 * Math.PI * 54
  const strokeDashoffset = circumference * (1 - progress)

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="6" className="text-stone-200" />
          <circle
            cx="60" cy="60" r="54" fill="none"
            stroke="currentColor" strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`transition-all duration-1000 ${isFinished ? "text-green-500" : isRunning ? "text-amber-500" : "text-stone-400"}`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-mono text-3xl font-bold ${isFinished ? "text-green-500" : "text-stone-800"}`}>
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
          {isFinished && (
            <span className="text-xs font-bold text-green-500 uppercase tracking-wider mt-1">Terminé !</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsRunning(!isRunning)}
          aria-label={isRunning ? "Mettre le minuteur en pause" : "Démarrer le minuteur"}
          className={`p-3 rounded-full transition-all ${
            isRunning
              ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30"
              : "bg-stone-100 text-stone-600 hover:bg-stone-200"
          }`}
        >
          {isRunning ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button
          onClick={reset}
          aria-label="Réinitialiser le minuteur"
          className="p-3 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 transition-all"
        >
          <RotateCcw size={20} />
        </button>
      </div>
    </div>
  )
}
