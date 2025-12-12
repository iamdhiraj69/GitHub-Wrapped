import { fetchWrappedStats } from "@/lib/github-api"
import { WrappedClient } from "./wrapped-client"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ username: string }>
}

export default async function WrappedPage({ params }: PageProps) {
  const { username } = await params

  try {
    const stats = await fetchWrappedStats(username)
    return <WrappedClient stats={stats} />
  } catch (error) {
    console.error("Failed to fetch stats:", error)
    notFound()
  }
}
