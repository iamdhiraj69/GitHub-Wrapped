"use client"

import type React from "react"
import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { WrappedStats } from "@/lib/types"

interface SlideContainerProps {
  stats: WrappedStats
  children: React.ReactNode[]
}

export function SlideContainer({ children }: SlideContainerProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = children.length

  const goToNext = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide((prev) => prev + 1)
    }
  }, [currentSlide, totalSlides])

  const goToPrev = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1)
    }
  }, [currentSlide])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault()
        goToNext()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        goToPrev()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goToNext, goToPrev])

  const [touchStart, setTouchStart] = useState<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext()
      } else {
        goToPrev()
      }
    }
    setTouchStart(null)
  }

  return (
    <div
      className="min-h-screen bg-background flex flex-col"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="fixed top-0 left-0 right-0 z-50 flex gap-0.5 p-2 sm:p-3 bg-gradient-to-b from-background to-transparent">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className="flex-1 h-1 sm:h-1.5 rounded-full transition-colors cursor-pointer touch-manipulation"
            style={{
              backgroundColor: i <= currentSlide ? "#58a6ff" : "#30363d",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 relative overflow-hidden pt-6 sm:pt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0 overflow-y-auto"
          >
            {children[currentSlide]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-between items-center p-3 sm:p-4 bg-gradient-to-t from-background via-background/90 to-transparent">
        <button
          onClick={goToPrev}
          disabled={currentSlide === 0}
          className="min-w-[72px] sm:min-w-[88px] px-3 sm:px-4 py-2.5 sm:py-2 rounded-md bg-[#21262d] hover:bg-[#30363d] active:bg-[#3d444d] disabled:opacity-30 disabled:cursor-not-allowed text-foreground transition-colors flex items-center justify-center gap-1 sm:gap-2 text-sm touch-manipulation"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </button>

        <span className="text-xs sm:text-sm text-muted-foreground tabular-nums">
          {currentSlide + 1} / {totalSlides}
        </span>

        <button
          onClick={goToNext}
          disabled={currentSlide === totalSlides - 1}
          className="min-w-[72px] sm:min-w-[88px] px-3 sm:px-4 py-2.5 sm:py-2 rounded-md bg-[#238636] hover:bg-[#2ea043] active:bg-[#3ab64a] disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors flex items-center justify-center gap-1 sm:gap-2 text-sm touch-manipulation"
        >
          <span>Next</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
