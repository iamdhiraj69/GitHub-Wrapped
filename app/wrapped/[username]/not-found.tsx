import Link from "next/link"
import { GitHubLogo } from "@/components/github-logo"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <GitHubLogo className="w-16 h-16 text-foreground mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-foreground mb-2">User Not Found</h1>
        <p className="text-muted-foreground mb-6 max-w-md">
          We couldn&apos;t find this GitHub user or there was an error fetching their data. Please check the username
          and try again.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#238636] hover:bg-[#2ea043] text-white rounded-md transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Try Again
        </Link>
      </div>
    </div>
  )
}
