"use client"

import { motion } from "framer-motion"
import type { WrappedStats } from "@/lib/types"
import { GitHubLogo } from "../github-logo"

interface IntroSlideProps {
  stats: WrappedStats
}

export function IntroSlide({ stats }: IntroSlideProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col items-center gap-3 sm:gap-4 md:gap-6 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
      >
        {/* GitHub Logo */}
        <motion.div initial={{ y: -20 }} animate={{ y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
          <GitHubLogo className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-foreground" />
        </motion.div>

        {/* Avatar */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4, type: "spring" }}
          className="relative"
        >
          <img
            src={stats.user.avatar_url || "/github-avatar.png"}
            alt={stats.user.login}
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full border-4 border-[#30363d]"
            crossOrigin="anonymous"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "/github-avatar.png"
            }}
          />
          <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-[#238636] rounded-full p-1 sm:p-1.5 md:p-2">
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </motion.div>

        {/* Welcome text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-0.5 sm:mb-1">Welcome back,</p>
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-foreground mb-0.5 sm:mb-1 text-balance">
            {stats.user.name || `@${stats.user.login}`}
          </h1>
          {stats.user.name && (
            <p className="text-muted-foreground text-xs sm:text-sm md:text-base">@{stats.user.login}</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="mt-1 sm:mt-2 md:mt-4"
        >
          <div className="inline-flex items-center justify-center px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-[#161b22] border border-[#30363d] rounded-full">
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-[#58a6ff]">{stats.year}</span>
            <span className="text-foreground text-sm sm:text-base md:text-lg ml-1.5 sm:ml-2 font-medium">Wrapped</span>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1 }}
          className="text-muted-foreground text-center text-xs sm:text-sm md:text-base max-w-[240px] sm:max-w-xs md:max-w-md mt-1 sm:mt-2 md:mt-4"
        >
          Let&apos;s see what you built this year
        </motion.p>
      </motion.div>
    </div>
  )
}
