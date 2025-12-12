"use client"

import { motion } from "framer-motion"
import type { WrappedStats } from "@/lib/types"

interface PullRequestsSlideProps {
  stats: WrappedStats
}

export function PullRequestsSlide({ stats }: PullRequestsSlideProps) {
  const mergeRate =
    stats.pullRequestsOpened > 0 ? ((stats.pullRequestsMerged / stats.pullRequestsOpened) * 100).toFixed(0) : "0"

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <p className="text-muted-foreground text-lg mb-2">Collaboration</p>
          <h2 className="text-3xl font-bold text-foreground">Pull Requests & Reviews</h2>
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
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
            </div>
            <p className="text-4xl font-bold text-foreground">{stats.pullRequestsOpened}</p>
            <p className="text-sm text-muted-foreground">PRs Opened</p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <svg className="w-6 h-6 text-[#a371f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-4xl font-bold text-foreground">{stats.pullRequestsMerged}</p>
            <p className="text-sm text-muted-foreground">PRs Merged</p>
          </motion.div>
        </div>

        {/* Merge rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-muted-foreground">Merge Rate</span>
            <span className="text-2xl font-bold text-[#3fb950]">{mergeRate}%</span>
          </div>
          <div className="h-3 bg-[#21262d] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${mergeRate}%` }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="h-full rounded-full bg-[#3fb950]"
            />
          </div>
        </motion.div>

        {/* Code reviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg className="w-6 h-6 text-[#58a6ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>
          <p className="text-4xl font-bold text-foreground">{stats.codeReviews}</p>
          <p className="text-sm text-muted-foreground">Code Reviews</p>
          {stats.codeReviews > 10 && <p className="text-xs text-[#58a6ff] mt-2">You&apos;re a great team player!</p>}
        </motion.div>
      </motion.div>
    </div>
  )
}
