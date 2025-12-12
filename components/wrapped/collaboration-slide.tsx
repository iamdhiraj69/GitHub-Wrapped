"use client"

import { motion } from "framer-motion"
import type { WrappedStats } from "@/lib/types"

interface CollaborationSlideProps {
  stats: WrappedStats
}

export function CollaborationSlide({ stats }: CollaborationSlideProps) {
  const getCollaborationStyle = () => {
    if (stats.codeReviews > 20 && stats.issuesClosed > 10) {
      return { label: "Team Leader", color: "#d29922", description: "You lead by example and help others succeed" }
    }
    if (stats.pullRequestsMerged > stats.issuesOpened) {
      return { label: "Code Contributor", color: "#3fb950", description: "You ship code that makes a difference" }
    }
    if (stats.issuesOpened > 5) {
      return { label: "Problem Solver", color: "#a371f7", description: "You identify and tackle issues head-on" }
    }
    if (stats.codeReviews > 5) {
      return { label: "Community Builder", color: "#58a6ff", description: "You help others grow through feedback" }
    }
    return { label: "Silent Contributor", color: "#8b949e", description: "Your code speaks louder than words" }
  }

  const collaborationStyle = getCollaborationStyle()
  const totalInteractions =
    stats.pullRequestsOpened + stats.pullRequestsMerged + stats.issuesOpened + stats.issuesClosed + stats.codeReviews
  const activeRepos = stats.topRepositories.length

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-3 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16 pb-20 sm:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xs sm:max-w-sm md:max-w-lg"
      >
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-1">Working Together</p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Collaboration Footprint</h2>
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 sm:p-4 md:p-6 mb-3 sm:mb-4 text-center"
        >
          <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground mb-1.5 sm:mb-2">
            Your Collaboration Style
          </p>
          <div
            className="inline-flex items-center justify-center px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-full mb-2 sm:mb-3"
            style={{
              backgroundColor: `${collaborationStyle.color}20`,
              border: `1px solid ${collaborationStyle.color}`,
            }}
          >
            <span className="text-base sm:text-lg md:text-xl font-bold" style={{ color: collaborationStyle.color }}>
              {collaborationStyle.label}
            </span>
          </div>
          <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">{collaborationStyle.description}</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-[#161b22] border border-[#30363d] rounded-lg p-2.5 sm:p-3 md:p-4 text-center"
          >
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#3fb950]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
            </div>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">{stats.pullRequestsOpened}</p>
            <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground">PRs Opened</p>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-[#161b22] border border-[#30363d] rounded-lg p-2.5 sm:p-3 md:p-4 text-center"
          >
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#a371f7]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">{stats.pullRequestsMerged}</p>
            <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground">PRs Merged</p>
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-[#161b22] border border-[#30363d] rounded-lg p-2.5 sm:p-3 md:p-4 text-center"
          >
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#58a6ff]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">{stats.codeReviews}</p>
            <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground">Code Reviews</p>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-[#161b22] border border-[#30363d] rounded-lg p-2.5 sm:p-3 md:p-4 text-center"
          >
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#d29922]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
              {stats.issuesOpened + stats.issuesClosed}
            </p>
            <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground">Issues Activity</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 sm:p-4 md:p-5"
        >
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-[#238636]/20 flex items-center justify-center shrink-0">
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#3fb950]"
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
              <p className="text-[10px] sm:text-xs md:text-sm text-foreground">
                Contributed to <span className="text-[#58a6ff] font-semibold">{activeRepos} repositories</span>
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-[#a371f7]/20 flex items-center justify-center shrink-0">
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
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <p className="text-[10px] sm:text-xs md:text-sm text-foreground">
                <span className="text-[#d29922] font-semibold">{totalInteractions} interactions</span> across GitHub
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
