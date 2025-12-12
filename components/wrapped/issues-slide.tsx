"use client"

import { motion } from "framer-motion"
import type { WrappedStats } from "@/lib/types"

interface IssuesSlideProps {
  stats: WrappedStats
}

export function IssuesSlide({ stats }: IssuesSlideProps) {
  const closeRate = stats.issuesOpened > 0 ? ((stats.issuesClosed / stats.issuesOpened) * 100).toFixed(0) : "0"

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <p className="text-muted-foreground text-lg mb-2">Issue Tracking</p>
          <h2 className="text-3xl font-bold text-foreground">Bug Hunter Status</h2>
        </div>

        {/* Main stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <svg className="w-6 h-6 text-[#3fb950]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <p className="text-4xl font-bold text-foreground">{stats.issuesOpened}</p>
            <p className="text-sm text-muted-foreground">Issues Opened</p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <svg className="w-6 h-6 text-[#a371f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-4xl font-bold text-foreground">{stats.issuesClosed}</p>
            <p className="text-sm text-muted-foreground">Issues Closed</p>
          </motion.div>
        </div>

        {/* Close rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#161b22] border border-[#30363d] rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-muted-foreground">Resolution Rate</span>
            <span className="text-2xl font-bold text-[#a371f7]">{closeRate}%</span>
          </div>
          <div className="h-3 bg-[#21262d] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${closeRate}%` }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="h-full rounded-full bg-[#a371f7]"
            />
          </div>
          {Number(closeRate) > 80 && (
            <p className="text-xs text-[#a371f7] mt-3 text-center">Excellent issue management!</p>
          )}
        </motion.div>

        {/* Total commits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 mt-4 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg className="w-6 h-6 text-[#58a6ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-4xl font-bold text-foreground">{stats.totalCommits}</p>
          <p className="text-sm text-muted-foreground">Commits Recorded</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
