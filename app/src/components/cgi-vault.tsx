"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Maximize2, Play, Pause } from "lucide-react"

interface CgiVaultProps {
  src: string
  poster?: string
  className?: string
  showControls?: boolean
  autoPlay?: boolean
}

export function CgiVault({ src, poster, className = "", showControls = false, autoPlay = true }: CgiVaultProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!src) {
      setHasError(true)
      setIsLoading(false)
      return
    }
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Video play error:", error)
        })
      }
    } else {
      video.pause()
    }
  }, [isPlaying, src])

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        if (isLoading) setIsLoading(false)
      }, 8000)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  return (
    <div className={`relative overflow-hidden bg-stone-900 group ${className}`}>
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-stone-900">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
            <span className="text-[10px] text-stone-500 uppercase tracking-widest animate-pulse">Chargement du rendu...</span>
          </div>
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-stone-100 text-stone-400 p-6 text-center">
          <Maximize2 size={24} className="mb-2 opacity-20" />
          <p className="text-xs uppercase tracking-wider font-bold">Rendu indisponible</p>
          <p className="text-[10px] mt-1 opacity-60">Le flux virtuel ne peut pas être établi pour le moment.</p>
        </div>
      )}
      
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop
        muted
        playsInline
        autoPlay={autoPlay}
        onLoadedData={() => {
          console.log("Video loaded:", src)
          setIsLoading(false)
          setHasError(false)
        }}
        onCanPlay={() => {
          setIsLoading(false)
        }}
        onError={() => {
          setIsLoading(false)
          setHasError(true)
        }}
        className={`w-full h-full object-cover transition-opacity duration-1000 ${(isLoading || hasError) ? 'opacity-0' : 'opacity-100'}`}
      />

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {showControls && !isLoading && (
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
        </div>
      )}

      {/* Cinematic Grain Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  )
}
