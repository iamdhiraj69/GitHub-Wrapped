"use client"

import type React from "react"
import { motion } from "framer-motion"
import type { WrappedStats } from "@/lib/types"
import { generateInsights } from "@/lib/calculations"

interface InsightsSlideProps {
  stats: WrappedStats
}

export function InsightsSlide({ stats }: InsightsSlideProps) {
  const insights = generateInsights(stats)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-3 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16 pb-20 sm:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xs sm:max-w-sm md:max-w-lg"
      >
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-1">Fun Facts</p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Your {stats.year} Insights</h2>
        </div>

        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.15 }}
              className="bg-[#161b22] border border-[#30363d] rounded-lg p-2.5 sm:p-3 md:p-4 flex items-start gap-2 sm:gap-2.5 md:gap-3"
            >
              <div
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: getInsightColor(index),
                }}
              >
                {getInsightIcon(index)}
              </div>
              <p className="text-foreground text-[11px] sm:text-xs md:text-sm leading-relaxed pt-0.5 sm:pt-1">
                {insight}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function getInsightColor(index: number): string {
  const colors = ["#238636", "#1f6feb", "#d29922", "#a371f7", "#f85149", "#3fb950"]
  return colors[index % colors.length]
}

function getInsightIcon(index: number): React.ReactNode {
  const icons = [
    <svg
      key="0"
      className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>,
    <svg
      key="1"
      className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>,
    <svg
      key="2"
      className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>,
    <svg
      key="3"
      className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>,
    <svg key="4" className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>,
    <svg
      key="5"
      className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>,
  ]
  return icons[index % icons.length]
}
