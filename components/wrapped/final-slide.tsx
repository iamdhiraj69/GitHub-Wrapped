"use client"

import { useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"
import type { WrappedStats } from "@/lib/types"
import { GitHubLogo } from "../github-logo"
import { formatNumber } from "@/lib/calculations"

interface FinalSlideProps {
  stats: WrappedStats
}

export function FinalSlide({ stats }: FinalSlideProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [shareMessage, setShareMessage] = useState<string | null>(null)

  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/wrapped/${stats.user.login}` : ""
  const shareText = `Check out my GitHub Wrapped for ${stats.year}! ${stats.totalContributions.toLocaleString()} contributions and more.`

  const generateShareImage = useCallback(async (): Promise<string | null> => {
    if (!cardRef.current) return null

    try {
      setIsGenerating(true)
      const html2canvas = (await import("html2canvas")).default

      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#0d1117",
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      })

      return canvas.toDataURL("image/png")
    } catch (error) {
      console.error("Failed to generate image:", error)
      setShareMessage("Failed to generate image")
      return null
    } finally {
      setIsGenerating(false)
    }
  }, [])

  const handleDownload = async () => {
    const dataUrl = await generateShareImage()
    if (!dataUrl) return

    const link = document.createElement("a")
    link.download = `github-wrapped-${stats.user.login}-${stats.year}.png`
    link.href = dataUrl
    link.click()
    setShareMessage("Image downloaded!")
    setTimeout(() => setShareMessage(null), 3000)
  }

  const handleShareToX = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(tweetUrl, "_blank", "noopener,noreferrer")
  }

  const handleShareToInstagram = async () => {
    const dataUrl = await generateShareImage()
    if (!dataUrl) return

    const link = document.createElement("a")
    link.download = `github-wrapped-${stats.user.login}-${stats.year}-instagram.png`
    link.href = dataUrl
    link.click()

    setShareMessage("Image downloaded! Open Instagram to share.")
    setTimeout(() => setShareMessage(null), 4000)
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        const dataUrl = await generateShareImage()

        if (dataUrl && navigator.canShare) {
          const response = await fetch(dataUrl)
          const blob = await response.blob()
          const file = new File([blob], `github-wrapped-${stats.user.login}.png`, { type: "image/png" })

          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: `${stats.user.login}'s GitHub Wrapped ${stats.year}`,
              text: shareText,
              files: [file],
            })
            return
          }
        }

        await navigator.share({
          title: `${stats.user.login}'s GitHub Wrapped ${stats.year}`,
          text: shareText,
          url: shareUrl,
        })
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          handleShareToX()
        }
      }
    } else {
      handleShareToX()
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-3 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16 pb-20 sm:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[320px] sm:max-w-sm md:max-w-md lg:max-w-lg"
      >
        <div className="text-center mb-3 sm:mb-4 md:mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Your {stats.year} Wrapped</h2>
          <p className="text-muted-foreground mt-1 text-xs sm:text-sm md:text-base">Share your year with the world</p>
        </div>

        <div
          ref={cardRef}
          className="bg-[#0d1117] border border-[#30363d] rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 mb-3 sm:mb-4 md:mb-6 aspect-square"
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4">
              <GitHubLogo className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-foreground" />
              <span className="text-[#58a6ff] font-bold text-xs sm:text-sm md:text-base">{stats.year} Wrapped</span>
            </div>

            {/* User info */}
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
              <img
                src={stats.user.avatar_url || "/github-avatar.png"}
                alt={stats.user.login}
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-full border-2 border-[#30363d]"
                crossOrigin="anonymous"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/github-avatar.png"
                }}
              />
              <div className="min-w-0">
                <p className="font-bold text-foreground text-sm sm:text-base md:text-lg truncate">
                  {stats.user.name || stats.user.login}
                </p>
                <p className="text-muted-foreground text-[10px] sm:text-xs md:text-sm">@{stats.user.login}</p>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2 md:gap-3 flex-1">
              <StatBox label="Contributions" value={formatNumber(stats.totalContributions)} color="#3fb950" />
              <StatBox label="Longest Streak" value={`${stats.longestStreak}d`} color="#d29922" />
              <StatBox label="Top Language" value={stats.languages[0]?.name || "N/A"} color="#58a6ff" />
              <StatBox label="Stars Earned" value={formatNumber(stats.totalStars)} color="#d29922" />
              <StatBox label="PRs Merged" value={formatNumber(stats.pullRequestsMerged)} color="#a371f7" />
              <StatBox label="Repositories" value={formatNumber(stats.user.public_repos)} color="#3fb950" />
            </div>

            {/* Footer */}
            <div className="mt-2 sm:mt-3 md:mt-4 pt-2 sm:pt-3 md:pt-4 border-t border-[#30363d] flex items-center justify-between">
              <span className="text-muted-foreground text-[8px] sm:text-[10px] md:text-xs">github.com</span>
              <span className="text-muted-foreground text-[8px] sm:text-[10px] md:text-xs">{stats.year}</span>
            </div>
          </div>
        </div>

        {/* Message */}
        {shareMessage && (
          <div className="mb-2 sm:mb-3 p-2 bg-[#161b22] border border-[#30363d] rounded-md text-center">
            <p className="text-xs sm:text-sm text-[#58a6ff]">{shareMessage}</p>
          </div>
        )}

        <div className="flex flex-col gap-2 sm:gap-3">
          {/* Download button */}
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="w-full py-2.5 sm:py-3 px-4 bg-[#238636] hover:bg-[#2ea043] active:bg-[#3ab64a] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-md transition-colors flex items-center justify-center gap-2 text-sm touch-manipulation"
          >
            {isGenerating ? (
              <LoadingSpinner />
            ) : (
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            )}
            Download Image
          </button>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={handleShareToX}
              className="py-2.5 sm:py-3 px-2 sm:px-3 bg-[#21262d] hover:bg-[#30363d] active:bg-[#3d444d] text-foreground font-medium rounded-md transition-colors flex items-center justify-center gap-1.5 text-xs sm:text-sm touch-manipulation"
              title="Share to X"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="hidden xs:inline sm:inline">Post</span>
            </button>

            <button
              onClick={handleShareToInstagram}
              disabled={isGenerating}
              className="py-2.5 sm:py-3 px-2 sm:px-3 bg-[#21262d] hover:bg-[#30363d] active:bg-[#3d444d] disabled:opacity-50 text-foreground font-medium rounded-md transition-colors flex items-center justify-center gap-1.5 text-xs sm:text-sm touch-manipulation"
              title="Download for Instagram Story"
            >
              {isGenerating ? (
                <LoadingSpinner small />
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              )}
              <span className="hidden xs:inline sm:inline">Story</span>
            </button>

            <button
              onClick={handleNativeShare}
              disabled={isGenerating}
              className="py-2.5 sm:py-3 px-2 sm:px-3 bg-[#21262d] hover:bg-[#30363d] active:bg-[#3d444d] disabled:opacity-50 text-foreground font-medium rounded-md transition-colors flex items-center justify-center gap-1.5 text-xs sm:text-sm touch-manipulation"
              title="Share"
            >
              {isGenerating ? (
                <LoadingSpinner small />
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              )}
              <span className="hidden xs:inline sm:inline">Share</span>
            </button>
          </div>
        </div>

        {/* Back to home */}
        <div className="mt-3 sm:mt-4 md:mt-6 text-center">
          <a href="/" className="text-[#58a6ff] hover:underline text-xs sm:text-sm">
            Generate another wrapped
          </a>
        </div>
      </motion.div>
    </div>
  )
}

function StatBox({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-[#161b22] rounded-md sm:rounded-lg p-1.5 sm:p-2 md:p-3 text-center">
      <p className="text-xs sm:text-sm md:text-lg font-bold truncate" style={{ color }}>
        {value}
      </p>
      <p className="text-[8px] sm:text-[10px] md:text-xs text-muted-foreground truncate">{label}</p>
    </div>
  )
}

function LoadingSpinner({ small = false }: { small?: boolean }) {
  return (
    <svg
      className={`animate-spin ${small ? "h-3 w-3 sm:h-4 sm:w-4" : "h-4 w-4 sm:h-5 sm:w-5"}`}
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
  )
}
