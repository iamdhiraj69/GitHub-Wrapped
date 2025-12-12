"use client"

import { motion } from "framer-motion"
import type { WrappedStats } from "@/lib/types"

interface RepoRankingsSlideProps {
  stats: WrappedStats
}

export function RepoRankingsSlide({ stats }: RepoRankingsSlideProps) {
  const topRepos = stats.topRepositories.slice(0, 5)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-3 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16 pb-20 sm:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xs sm:max-w-sm md:max-w-lg"
      >
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-1">Your Top Repositories</p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Most Popular Projects</h2>
        </div>

        <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
          {topRepos.map((repo, index) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="block bg-[#161b22] border border-[#30363d] rounded-lg p-2.5 sm:p-3 md:p-4 hover:border-[#58a6ff] active:bg-[#21262d] transition-colors"
            >
              <div className="flex items-start gap-2 sm:gap-2.5 md:gap-3">
                <div
                  className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full text-[10px] sm:text-xs md:text-sm font-bold shrink-0"
                  style={{
                    backgroundColor:
                      index === 0 ? "#d29922" : index === 1 ? "#8b949e" : index === 2 ? "#a371f7" : "#30363d",
                    color: index < 3 ? "#0d1117" : "#e6edf3",
                  }}
                >
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
                    <svg
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-muted-foreground shrink-0"
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
                    <span className="font-semibold text-[#58a6ff] truncate text-xs sm:text-sm md:text-base">
                      {repo.name}
                    </span>
                  </div>
                  {repo.description && (
                    <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-0.5 sm:mt-1 line-clamp-1 sm:line-clamp-2">
                      {repo.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mt-1 sm:mt-1.5 md:mt-2">
                    {repo.language && (
                      <span className="flex items-center gap-1 text-[9px] sm:text-[10px] md:text-xs text-muted-foreground">
                        <span
                          className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full"
                          style={{ backgroundColor: getLanguageColor(repo.language) }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-0.5 sm:gap-1 text-[9px] sm:text-[10px] md:text-xs text-muted-foreground">
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-0.5 sm:gap-1 text-[9px] sm:text-[10px] md:text-xs text-muted-foreground">
                      <svg
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4"
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
                      {repo.forks_count}
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {topRepos.length === 0 && (
          <div className="text-center text-muted-foreground py-6 sm:py-8 text-xs sm:text-sm">
            No repositories found for this year
          </div>
        )}
      </motion.div>
    </div>
  )
}

function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    Java: "#b07219",
    Go: "#00ADD8",
    Rust: "#dea584",
    Ruby: "#701516",
    PHP: "#4F5D95",
    Swift: "#F05138",
    Kotlin: "#A97BFF",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Vue: "#41b883",
    Shell: "#89e051",
  }
  return colors[language] || "#8b949e"
}
