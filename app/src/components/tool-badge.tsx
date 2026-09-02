"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getToolImage } from "@/lib/tools"

interface ToolBadgeProps {
  name: string
}

export function ToolBadge({ name }: ToolBadgeProps) {
  const [showTooltip, setShowHelp] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imageUrl = getToolImage(name)

  return (
    <div className="relative inline-block">
      <span 
        onMouseEnter={() => setShowHelp(true)}
        onMouseLeave={() => setShowHelp(false)}
        className="px-4 py-2 bg-white border border-stone-200 rounded-xl text-sm text-stone-600 font-medium shadow-sm cursor-help hover:border-amber-200 hover:text-amber-700 transition-colors inline-block"
      >
        {name}
      </span>

      <AnimatePresence>
        {showTooltip && imageUrl && !hasError && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-[100] pointer-events-none"
          >
            <div className="bg-white p-1 rounded-2xl shadow-2xl border border-stone-200 overflow-hidden w-48 h-48">
              <img 
                src={imageUrl} 
                alt={name} 
                className="w-full h-full object-contain rounded-xl bg-stone-50"
                onError={() => setHasError(true)}
              />
              <div className="absolute inset-x-1 bottom-1 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 rounded-b-xl flex items-end">
                <span className="text-[10px] text-white font-bold uppercase tracking-wider truncate drop-shadow-md">{name}</span>
              </div>
            </div>
            {/* Arrow */}
            <div className="w-3 h-3 bg-white border-b border-r border-stone-200 rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2 shadow-sm" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
