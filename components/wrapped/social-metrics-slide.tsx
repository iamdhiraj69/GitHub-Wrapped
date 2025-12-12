"use client"

import { motion } from "framer-motion"
import type { WrappedStats } from "@/lib/types"
import { formatNumber } from "@/lib/calculations"

interface SocialMetricsSlideProps {
  stats: WrappedStats
}

export function SocialMetricsSlide({ stats }: SocialMetricsSlideProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-3 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xs sm:max-w-sm md:max-w-lg"
      >
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-1">Community Impact</p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Your Reach</h2>
        </div>

        {/* Main follower count */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 sm:p-6 md:p-8 mb-3 sm:mb-4 md:mb-6 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-1.5 sm:mb-2">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#58a6ff]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            {formatNumber(stats.user.followers)}
          </p>
          <p className="text-muted-foreground text-xs sm:text-sm md:text-base">Followers</p>
          <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-1.5 sm:mt-2">
            Following {formatNumber(stats.user.following)}
          </p>
        </motion.div>

        {/* Stars and Forks */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 sm:p-4 md:p-6 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-1.5 sm:mb-2">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#d29922]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
              {formatNumber(stats.totalStars)}
            </p>
            <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">Total Stars</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 sm:p-4 md:p-6 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-1.5 sm:mb-2">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#8b949e]"
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
            </div>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
              {formatNumber(stats.totalForks)}
            </p>
            <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">Total Forks</p>
          </motion.div>
        </div>

        {/* Public repos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 sm:p-4 md:p-6 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-1.5 sm:mb-2">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#3fb950]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">{stats.user.public_repos}</p>
          <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">Public Repositories</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
