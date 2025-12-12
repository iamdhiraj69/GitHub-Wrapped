import type {
  GitHubUser,
  GitHubRepo,
  GitHubEvent,
  ContributionCalendar,
  ContributionWeek,
  LanguageStats,
  WrappedStats,
} from "./types"

const GITHUB_API_BASE = "https://api.github.com"

// Language colors from GitHub
const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Scala: "#c22d40",
  Shell: "#89e051",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Lua: "#000080",
  R: "#198CE7",
  Julia: "#a270ba",
  Haskell: "#5e5086",
  Elixir: "#6e4a7e",
  Clojure: "#db5855",
  Erlang: "#B83998",
  OCaml: "#3be133",
  Zig: "#ec915c",
  Nim: "#ffc200",
  Crystal: "#000100",
  Other: "#8b949e",
}

async function fetchWithRetry<T>(url: string, options?: RequestInit, retries = 3): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...options?.headers,
        },
      })

      if (response.status === 404) {
        throw new Error("User not found")
      }

      if (response.status === 403) {
        const resetTime = response.headers.get("X-RateLimit-Reset")
        throw new Error(
          `Rate limited. Resets at ${resetTime ? new Date(Number(resetTime) * 1000).toLocaleTimeString() : "unknown"}`,
        )
      }

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`)
      }

      return response.json()
    } catch (error) {
      if (i === retries - 1) throw error
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)))
    }
  }
  throw new Error("Failed after retries")
}

export async function fetchUser(username: string): Promise<GitHubUser> {
  return fetchWithRetry<GitHubUser>(`${GITHUB_API_BASE}/users/${username}`)
}

export async function fetchUserRepos(username: string, year: number): Promise<GitHubRepo[]> {
  const allRepos: GitHubRepo[] = []
  let page = 1
  const perPage = 100

  while (true) {
    const repos = await fetchWithRetry<GitHubRepo[]>(
      `${GITHUB_API_BASE}/users/${username}/repos?per_page=${perPage}&page=${page}&sort=updated&type=all`,
    )

    if (repos.length === 0) break

    // Filter repos that were active in the given year
    const yearRepos = repos.filter((repo) => {
      const pushedYear = new Date(repo.pushed_at).getFullYear()
      const updatedYear = new Date(repo.updated_at).getFullYear()
      return pushedYear === year || updatedYear === year
    })

    allRepos.push(...yearRepos)
    if (repos.length < perPage) break
    page++
    if (page > 10) break // Safety limit
  }

  return allRepos
}

export async function fetchUserEvents(username: string): Promise<GitHubEvent[]> {
  const allEvents: GitHubEvent[] = []
  let page = 1

  // GitHub only returns last 90 days of events via API, but we'll get what we can
  while (page <= 10) {
    try {
      const events = await fetchWithRetry<GitHubEvent[]>(
        `${GITHUB_API_BASE}/users/${username}/events/public?per_page=100&page=${page}`,
      )
      if (events.length === 0) break
      allEvents.push(...events)
      page++
    } catch {
      break
    }
  }

  return allEvents
}

// Scrape contribution data from GitHub profile page (GraphQL alternative)
export async function fetchContributionCalendar(username: string, year: number): Promise<ContributionCalendar> {
  try {
    // Try to fetch from GitHub's contribution calendar via their GraphQL-like endpoint
    const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`)

    if (response.ok) {
      const data = await response.json()

      // Convert to our format
      const weeks: ContributionWeek[] = []
      let currentWeek: ContributionWeek = { days: [] }
      let totalContributions = 0

      if (data.contributions) {
        data.contributions.forEach((day: { date: string; count: number; level: number }) => {
          const contributionDay = {
            date: day.date,
            count: day.count,
            level: Math.min(4, day.level) as 0 | 1 | 2 | 3 | 4,
          }
          currentWeek.days.push(contributionDay)
          totalContributions += day.count

          if (currentWeek.days.length === 7) {
            weeks.push(currentWeek)
            currentWeek = { days: [] }
          }
        })

        if (currentWeek.days.length > 0) {
          weeks.push(currentWeek)
        }
      }

      return { totalContributions, weeks }
    }
  } catch (error) {
    console.error("Failed to fetch contribution calendar:", error)
  }

  // Fallback: generate from events
  return generateContributionCalendarFromEvents(username, year)
}

async function generateContributionCalendarFromEvents(username: string, year: number): Promise<ContributionCalendar> {
  const events = await fetchUserEvents(username)
  const contributionMap = new Map<string, number>()

  // Count contributions per day from events
  events.forEach((event) => {
    const date = event.created_at.split("T")[0]
    const eventYear = new Date(event.created_at).getFullYear()
    if (eventYear === year) {
      const current = contributionMap.get(date) || 0
      contributionMap.set(date, current + 1)
    }
  })

  // Generate calendar structure
  const startDate = new Date(year, 0, 1)
  const endDate = new Date(year, 11, 31)
  const weeks: ContributionWeek[] = []
  let currentWeek: ContributionWeek = { days: [] }
  let totalContributions = 0

  // Adjust start to Sunday
  const dayOfWeek = startDate.getDay()
  for (let i = 0; i < dayOfWeek; i++) {
    currentWeek.days.push({ date: "", count: 0, level: 0 })
  }

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split("T")[0]
    const count = contributionMap.get(dateStr) || 0
    totalContributions += count

    const level = count === 0 ? 0 : count <= 3 ? 1 : count <= 6 ? 2 : count <= 9 ? 3 : 4

    currentWeek.days.push({
      date: dateStr,
      count,
      level: level as 0 | 1 | 2 | 3 | 4,
    })

    if (currentWeek.days.length === 7) {
      weeks.push(currentWeek)
      currentWeek = { days: [] }
    }
  }

  if (currentWeek.days.length > 0) {
    weeks.push(currentWeek)
  }

  return { totalContributions, weeks }
}

export async function fetchLanguageStats(username: string, repos: GitHubRepo[]): Promise<LanguageStats[]> {
  const languageBytes = new Map<string, number>()

  // Get language breakdown for each repo
  for (const repo of repos.slice(0, 20)) {
    // Limit to top 20 repos to avoid rate limits
    try {
      const languages = await fetchWithRetry<Record<string, number>>(
        `${GITHUB_API_BASE}/repos/${username}/${repo.name}/languages`,
      )

      Object.entries(languages).forEach(([lang, bytes]) => {
        const current = languageBytes.get(lang) || 0
        languageBytes.set(lang, current + bytes)
      })
    } catch {
      // Skip if we can't fetch languages for this repo
    }
  }

  // Convert to percentages
  const totalBytes = Array.from(languageBytes.values()).reduce((a, b) => a + b, 0)
  const stats: LanguageStats[] = Array.from(languageBytes.entries())
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: totalBytes > 0 ? (bytes / totalBytes) * 100 : 0,
      color: LANGUAGE_COLORS[name] || LANGUAGE_COLORS.Other,
    }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 10) // Top 10 languages

  return stats
}

function calculateStreaks(calendar: ContributionCalendar): { longest: number; current: number } {
  let longest = 0
  let current = 0
  let tempStreak = 0

  const allDays = calendar.weeks.flatMap((w) => w.days).filter((d) => d.date)

  for (let i = 0; i < allDays.length; i++) {
    if (allDays[i].count > 0) {
      tempStreak++
      longest = Math.max(longest, tempStreak)
    } else {
      tempStreak = 0
    }
  }

  // Calculate current streak from the end
  for (let i = allDays.length - 1; i >= 0; i--) {
    if (allDays[i].count > 0) {
      current++
    } else {
      break
    }
  }

  return { longest, current }
}

function findMostProductiveDay(calendar: ContributionCalendar): string {
  const dayCounts = [0, 0, 0, 0, 0, 0, 0] // Sun-Sat
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  calendar.weeks.forEach((week) => {
    week.days.forEach((day, index) => {
      if (day.date) {
        dayCounts[index] += day.count
      }
    })
  })

  const maxIndex = dayCounts.indexOf(Math.max(...dayCounts))
  return dayNames[maxIndex]
}

function findMostProductiveMonth(calendar: ContributionCalendar): string {
  const monthCounts = new Array(12).fill(0)
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  calendar.weeks.forEach((week) => {
    week.days.forEach((day) => {
      if (day.date) {
        const month = new Date(day.date).getMonth()
        monthCounts[month] += day.count
      }
    })
  })

  const maxIndex = monthCounts.indexOf(Math.max(...monthCounts))
  return monthNames[maxIndex]
}

function analyzeEvents(events: GitHubEvent[], year: number) {
  const yearEvents = events.filter((e) => new Date(e.created_at).getFullYear() === year)

  let commits = 0

  yearEvents.forEach((event) => {
    if (event.type === "PushEvent") {
      commits += (event.payload as { commits?: unknown[] }).commits?.length || 1
    }
  })

  return { commits }
}

// Fetch accurate PR/Issue stats using GitHub Search API (full year data)
async function fetchCollaborationStats(username: string, year: number) {
  const startDate = `${year}-01-01`
  const endDate = `${year}-12-31`

  // Search queries for accurate counts
  const queries = {
    prsOpened: `author:${username} type:pr created:${startDate}..${endDate}`,
    prsMerged: `author:${username} type:pr merged:${startDate}..${endDate}`,
    issuesOpened: `author:${username} type:issue created:${startDate}..${endDate}`,
    issuesClosed: `author:${username} type:issue closed:${startDate}..${endDate}`,
    reviews: `reviewed-by:${username} type:pr created:${startDate}..${endDate}`,
  }

  const counts = {
    prsOpened: 0,
    prsMerged: 0,
    issuesOpened: 0,
    issuesClosed: 0,
    reviews: 0,
  }

  // Fetch counts in parallel
  const fetchCount = async (query: string): Promise<number> => {
    try {
      const response = await fetch(
        `${GITHUB_API_BASE}/search/issues?q=${encodeURIComponent(query)}&per_page=1`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        }
      )
      if (response.ok) {
        const data = await response.json()
        return data.total_count || 0
      }
    } catch (error) {
      console.error("Search API error:", error)
    }
    return 0
  }

  const [prsOpened, prsMerged, issuesOpened, issuesClosed, reviews] = await Promise.all([
    fetchCount(queries.prsOpened),
    fetchCount(queries.prsMerged),
    fetchCount(queries.issuesOpened),
    fetchCount(queries.issuesClosed),
    fetchCount(queries.reviews),
  ])

  counts.prsOpened = prsOpened
  counts.prsMerged = prsMerged
  counts.issuesOpened = issuesOpened
  counts.issuesClosed = issuesClosed
  counts.reviews = reviews

  return counts
}

export async function fetchWrappedStats(username: string, year?: number): Promise<WrappedStats> {
  const targetYear = year || new Date().getFullYear()

  // Fetch data in parallel
  const [user, repos, events, calendar, collaborationStats] = await Promise.all([
    fetchUser(username),
    fetchUserRepos(username, targetYear),
    fetchUserEvents(username),
    fetchContributionCalendar(username, targetYear),
    fetchCollaborationStats(username, targetYear),
  ])

  // Get language stats
  const languages = await fetchLanguageStats(username, repos)

  // Calculate statistics
  const streaks = calculateStreaks(calendar)
  const eventStats = analyzeEvents(events, targetYear)

  // Sort repos by engagement (stars + forks + watchers)
  const topRepositories = repos
    .filter((r) => !r.fork)
    .sort((a, b) => {
      const scoreA = a.stargazers_count + a.forks_count * 2 + a.watchers_count
      const scoreB = b.stargazers_count + b.forks_count * 2 + b.watchers_count
      return scoreB - scoreA
    })
    .slice(0, 5)

  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0)
  const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0)

  return {
    user,
    year: targetYear,
    totalContributions: calendar.totalContributions,
    contributionCalendar: calendar,
    longestStreak: streaks.longest,
    currentStreak: streaks.current,
    mostProductiveDay: findMostProductiveDay(calendar),
    mostProductiveMonth: findMostProductiveMonth(calendar),
    topRepositories,
    languages,
    totalStars,
    totalForks,
    totalCommits: eventStats.commits,
    pullRequestsOpened: collaborationStats.prsOpened,
    pullRequestsMerged: collaborationStats.prsMerged,
    issuesOpened: collaborationStats.issuesOpened,
    issuesClosed: collaborationStats.issuesClosed,
    codeReviews: collaborationStats.reviews,
  }
}
