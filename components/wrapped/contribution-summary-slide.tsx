"use client"

import type React from "react"
import { motion } from "framer-motion"
import type { WrappedStats } from "@/lib/types"
import { formatNumber, getContributionPercentile } from "@/lib/calculations"

interface ContributionSummarySlideProps {
  stats: WrappedStats
}

export function ContributionSummarySlide({ stats }: ContributionSummarySlideProps) {
  const percentile = getContributionPercentile(stats.totalContributions)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-3 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xs sm:max-w-sm md:max-w-lg"
      >
        {/* Main number */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-sm sm:text-base md:text-lg mb-1"
          >
            Total Contributions
          </motion.p>
          <motion.h2
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#3fb950]"
          >
            {formatNumber(stats.totalContributions)}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-muted-foreground mt-1 sm:mt-2 text-xs sm:text-sm md:text-base"
          >
            You&apos;re in the top {100 - percentile}% of GitHub users
          </motion.p>
        </div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4"
        >
          <StatCard
            icon={
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
            label="Longest Streak"
            value={`${stats.longestStreak} days`}
            color="#d29922"
          />
          <StatCard
            icon={
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                />
              </svg>
            }
            label="Current Streak"
            value={`${stats.currentStreak} days`}
            color="#f85149"
          />
          <StatCard
            icon={
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            }
            label="Best Day"
            value={stats.mostProductiveDay}
            color="#58a6ff"
          />
          <StatCard
            icon={
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            }
            label="Best Month"
            value={stats.mostProductiveMonth}
            color="#a371f7"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: string
  color: string
}) {
  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-2.5 sm:p-3 md:p-4">
      <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5 md:mb-2" style={{ color }}>
        {icon}
        <span className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">{label}</span>
      </div>
      <p className="text-base sm:text-lg md:text-xl font-semibold text-foreground">{value}</p>
    </div>
  )
}
