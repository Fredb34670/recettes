"use client"

import { useState, useEffect, useCallback } from "react"
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react"

interface VoiceAssistantProps {
  stepTitle?: string;
  stepDesc?: string;
  isActive?: boolean;
}

export function VoiceAssistant({ stepTitle, stepDesc, isActive = false }: VoiceAssistantProps) {
  const [listening, setListening] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [recognition, setRecognition] = useState<any>(null)
  const [interim, setInterim] = useState("")

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis || !text) return
    window.speechSynthesis.cancel()
    setSpeaking(true)
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = "fr-FR"
    utter.rate = 0.95
    utter.pitch = 1
    utter.onend = () => setSpeaking(false)
    window.speechSynthesis.speak(utter)
  }, [])

  const startListening = useCallback(() => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) return
    const Rec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const rec = new Rec()
    rec.lang = "fr-FR"
    rec.continuous = false
    rec.interimResults = true
    rec.onresult = (e: any) => {
      const transcript = Array.from(e.results)
        .map((r: any) => r[0].transcript)
        .join("")
      setInterim(transcript)
    }
    rec.onend = () => {
      setListening(false)
      setInterim("")
    }
    setRecognition(rec)
    rec.start()
    setListening(true)
  }, [])

  const stopListening = useCallback(() => {
    recognition?.stop()
    setListening(false)
    setInterim("")
  }, [recognition])

  const handleStep = useCallback(() => {
    if (stepDesc) speak(`${stepTitle}. ${stepDesc}`)
  }, [stepTitle, stepDesc, speak])

  useEffect(() => {
    if (isActive && stepTitle && stepDesc) {
      handleStep()
    }
  }, [isActive, stepTitle, stepDesc, handleStep])

  return (
    <div className="flex items-center gap-2 bg-stone-900/90 rounded-full px-3 py-1.5 backdrop-blur-md">
      <button
        onClick={speaking ? () => window.speechSynthesis.cancel() : () => handleStep()}
        aria-label={speaking ? "Arrêter la lecture" : "Lire l'étape"}
        className={`p-1.5 rounded-full transition-colors ${speaking ? "bg-amber-500 text-white" : "text-amber-400 hover:text-amber-300"}`}
      >
        {speaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>

      <button
        onClick={listening ? stopListening : startListening}
        aria-label={listening ? "Arrêter l'écoute" : "Écouter une commande vocale"}
        className={`p-1.5 rounded-full transition-colors ${listening ? "bg-rose-500 text-white animate-pulse" : "text-stone-300 hover:text-amber-400"}`}
      >
        <Mic size={16} />
      </button>

      {interim && (
        <span className="text-xs text-amber-200 font-medium truncate max-w-[120px]">{interim}</span>
      )}
    </div>
  )
}
