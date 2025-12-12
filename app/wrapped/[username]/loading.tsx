"use client"

import { GitHubLogo } from "@/components/github-logo"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 safe-area-inset">
      <div className="text-center max-w-[280px] sm:max-w-sm">
        <GitHubLogo className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-foreground mx-auto mb-3 sm:mb-4 md:mb-6 animate-pulse" />

        {/* Animated loading bar */}
        <div className="w-40 sm:w-48 md:w-64 h-1 bg-[#21262d] rounded-full mx-auto mb-3 sm:mb-4 md:mb-6 overflow-hidden">
          <div className="h-full bg-[#58a6ff] rounded-full animate-loading-bar" />
        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <svg
            className="animate-spin h-4 w-4 md:h-5 md:w-5 text-[#58a6ff]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="text-foreground font-medium text-xs sm:text-sm md:text-base">
            Generating your wrapped...
          </span>
        </div>

        <div className="mt-3 sm:mt-4 md:mt-6 space-y-1.5 sm:space-y-2">
          <p className="text-muted-foreground text-[10px] sm:text-xs md:text-sm">Fetching your GitHub data</p>
          <div className="flex items-center justify-center gap-1 sm:gap-1.5">
            <span
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#3fb950] animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#3fb950] animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#3fb950] animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
