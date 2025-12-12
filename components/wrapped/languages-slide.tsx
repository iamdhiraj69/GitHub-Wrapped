"use client"

import { motion } from "framer-motion"
import type { WrappedStats } from "@/lib/types"

interface LanguagesSlideProps {
  stats: WrappedStats
}

export function LanguagesSlide({ stats }: LanguagesSlideProps) {
  const languages = stats.languages.slice(0, 6)
  const topLanguage = languages[0]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-3 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xs sm:max-w-sm md:max-w-lg"
      >
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-1">Your Languages</p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Code Breakdown</h2>
        </div>

        {/* Top language highlight */}
        {topLanguage && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 sm:p-4 md:p-6 mb-3 sm:mb-4 md:mb-6 text-center"
          >
            <p className="text-muted-foreground text-[10px] sm:text-xs md:text-sm mb-1.5 sm:mb-2">
              Top Language of {stats.year}
            </p>
            <div className="flex items-center justify-center gap-2 sm:gap-2.5 md:gap-3">
              <span
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full"
                style={{ backgroundColor: topLanguage.color }}
              />
              <span className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">{topLanguage.name}</span>
            </div>
            <p className="text-[#58a6ff] text-base sm:text-lg md:text-xl font-semibold mt-1.5 sm:mt-2">
              {topLanguage.percentage.toFixed(1)}% of your code
            </p>
          </motion.div>
        )}

        {/* Language bars */}
        <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
          {languages.map((lang, index) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span
                    className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full"
                    style={{ backgroundColor: lang.color }}
                  />
                  <span className="text-foreground font-medium text-xs sm:text-sm md:text-base">{lang.name}</span>
                </div>
                <span className="text-muted-foreground text-[10px] sm:text-xs md:text-sm">
                  {lang.percentage.toFixed(1)}%
                </span>
              </div>
              <div className="h-1 sm:h-1.5 md:h-2 bg-[#21262d] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${lang.percentage}%` }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: lang.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {languages.length === 0 && (
          <div className="text-center text-muted-foreground py-6 sm:py-8 text-xs sm:text-sm">
            No language data available
          </div>
        )}
      </motion.div>
    </div>
  )
}
