"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { GitHubLogo } from "./github-logo"

export function UsernameInput() {
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const currentYear = new Date().getFullYear()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim()) return

    setIsLoading(true)
    router.push(`/wrapped/${username.trim()}`)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-8 safe-area-inset">
      <div className="w-full max-w-[300px] sm:max-w-sm md:max-w-md flex flex-col items-center gap-5 sm:gap-6 md:gap-8">
        {/* Logo and Title */}
        <div className="flex flex-col items-center gap-2.5 sm:gap-3 md:gap-4">
          <GitHubLogo className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 text-foreground" />
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
              GitHub Wrapped
            </h1>
            <p className="text-muted-foreground mt-1 sm:mt-1.5 md:mt-2 text-xs sm:text-sm md:text-base">
              Your {currentYear} on GitHub, wrapped.
            </p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2.5 sm:gap-3 md:gap-4">
          <div className="relative">
            <label htmlFor="username" className="sr-only">
              GitHub Username
            </label>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your GitHub username"
              className="w-full pl-9 sm:pl-10 pr-4 py-3 sm:py-2.5 md:py-3 bg-[#0d1117] border border-border rounded-md text-foreground text-sm sm:text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all touch-manipulation"
              disabled={isLoading}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
            />
          </div>

          <button
            type="submit"
            disabled={!username.trim() || isLoading}
            className="w-full py-3 sm:py-2.5 md:py-3 px-4 bg-[#238636] hover:bg-[#2ea043] active:bg-[#3ab64a] disabled:bg-[#238636]/50 disabled:cursor-not-allowed text-white text-sm sm:text-base font-medium rounded-md transition-colors flex items-center justify-center gap-2 touch-manipulation"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
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
                <span>Generating...</span>
              </>
            ) : (
              <>
                <span>Generate My Wrapped</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Footer hint */}
        <p className="text-[10px] sm:text-xs text-muted-foreground text-center px-2 sm:px-4">
          See your contributions, top repositories, languages, and more
        </p>
      </div>
    </div>
  )
}
