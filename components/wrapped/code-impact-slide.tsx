"use client"

import { motion } from "framer-motion"
import type { WrappedStats } from "@/lib/types"
import { formatNumber, getContributionPercentile } from "@/lib/calculations"

interface CodeImpactSlideProps {
  stats: WrappedStats
}

export function CodeImpactSlide({ stats }: CodeImpactSlideProps) {
  const percentile = getContributionPercentile(stats.totalContributions)
  // Get the most starred repository (truly most impactful)
  const topRepo = [...stats.topRepositories].sort((a, b) => b.stargazers_count - a.stargazers_count)[0]

  const estimatedLinesChanged = stats.totalCommits * 50
  const impactScore = Math.min(
    100,
    Math.round(
      stats.totalContributions / 10 +
        stats.totalStars * 2 +
        stats.longestStreak +
        stats.languages.length * 5 +
        stats.pullRequestsMerged * 3,
    ),
  )

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-3 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16 pb-20 sm:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xs sm:max-w-sm md:max-w-lg"
      >
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-1">Your Impact</p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Code Impact & Influence</h2>
        </div>

        {/* Impact score */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 sm:p-4 md:p-6 mb-3 sm:mb-4 text-center"
        >
          <p className="text-muted-foreground text-[10px] sm:text-xs md:text-sm mb-1.5 sm:mb-2">
            Developer Impact Score
          </p>
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto mb-2 sm:mb-3">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="50%" cy="50%" r="45%" fill="none" stroke="#21262d" strokeWidth="6" />
              <motion.circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="#3fb950"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${impactScore * 2.83} 283`}
                initial={{ strokeDasharray: "0 283" }}
                animate={{ strokeDasharray: `${impactScore * 2.83} 283` }}
                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl sm:text-2xl md:text-3xl font-bold text-[#3fb950]">{impactScore}</span>
            </div>
          </div>
          <p className="text-[10px] sm:text-xs md:text-sm text-[#58a6ff]">
            More changes than {percentile}% of developers
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-[#161b22] border border-[#30363d] rounded-lg p-2.5 sm:p-3 md:p-4"
          >
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#3fb950]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground">Lines Changed</span>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
              {formatNumber(estimatedLinesChanged)}
            </p>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-[#161b22] border border-[#30363d] rounded-lg p-2.5 sm:p-3 md:p-4"
          >
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#a371f7]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground">Total Commits</span>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
              {formatNumber(stats.totalCommits)}
            </p>
          </motion.div>
        </div>

        {/* Top repo card */}
        {topRepo && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 sm:p-4 md:p-5"
          >
            <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground mb-1.5 sm:mb-2">
              Most Impactful Repository
            </p>
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base md:text-lg font-semibold text-[#58a6ff] truncate">{topRepo.name}</p>
                {topRepo.description && (
                  <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-0.5 sm:mt-1 line-clamp-2">
                    {topRepo.description}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 sm:gap-3 ml-2 sm:ml-3">
                <div className="flex items-center gap-0.5 sm:gap-1 text-muted-foreground">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                  </svg>
                  <span className="text-[10px] sm:text-xs md:text-sm">{topRepo.stargazers_count}</span>
                </div>
                <div className="flex items-center gap-0.5 sm:gap-1 text-muted-foreground">
                  <svg
                    className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  <span className="text-[10px] sm:text-xs md:text-sm">{topRepo.forks_count}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
