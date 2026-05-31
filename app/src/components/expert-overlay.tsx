"use client"

import { motion } from "framer-motion"
import type { TechnicalSpec } from "@/types/recipe"
import { Activity, Info } from "lucide-react"

interface ExpertOverlayProps {
  specs: TechnicalSpec[]
  isVisible: boolean
}

export function ExpertOverlay({ specs, isVisible }: ExpertOverlayProps) {
  if (!specs.length) return null

  return (
    <div className={`absolute inset-0 pointer-events-none p-6 flex flex-col justify-end transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {specs.map((spec, index) => (
          <motion.div
            key={spec.label}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: index * 0.1 }}
            className="pointer-events-auto group relative"
          >
            <div className="bg-stone-900/80 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500/80">{spec.label}</span>
                <Activity size={12} className="text-amber-500/40" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-display font-bold text-white">{spec.value}</span>
                <span className="text-xs font-medium text-stone-400">{spec.unit}</span>
              </div>
              
              {/* Leader Line Animation */}
              <motion.div 
                className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-500 to-transparent"
                initial={{ scaleX: 0 }}
                animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
              />
            </div>

            {/* Tooltip on hover */}
            <div className="absolute bottom-full left-0 mb-2 w-48 p-3 bg-white text-stone-800 text-[10px] rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
              <p className="leading-relaxed">{spec.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
