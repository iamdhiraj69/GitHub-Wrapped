import type { WrappedStats, ContributionCalendar } from "./types"

// Generate fun insights like Spotify Wrapped
export function generateInsights(stats: WrappedStats): string[] {
  const insights: string[] = []

  // Contribution volume insight
  if (stats.totalContributions > 1000) {
    insights.push(
      `You made ${stats.totalContributions.toLocaleString()} contributions. That's more than most developers make in a year!`,
    )
  } else if (stats.totalContributions > 500) {
    insights.push(`${stats.totalContributions.toLocaleString()} contributions! You were busy this year.`)
  } else if (stats.totalContributions > 100) {
    insights.push(`You made ${stats.totalContributions.toLocaleString()} contributions this year.`)
  } else {
    insights.push(`${stats.totalContributions} contributions this year. Quality over quantity, right?`)
  }

  // Streak insight
  if (stats.longestStreak > 30) {
    insights.push(`Your ${stats.longestStreak}-day streak shows serious dedication. Impressive!`)
  } else if (stats.longestStreak > 7) {
    insights.push(`A ${stats.longestStreak}-day coding streak. Consistency is key!`)
  }

  // Day preference
  insights.push(`${stats.mostProductiveDay}s were your most productive day. The code just flows better then.`)

  // Language insight
  if (stats.languages.length > 0) {
    const topLang = stats.languages[0]
    if (topLang.percentage > 50) {
      insights.push(`${topLang.name} dominated your year with ${topLang.percentage.toFixed(0)}% of your code.`)
    } else {
      insights.push(
        `You're a polyglot! ${stats.languages
          .slice(0, 3)
          .map((l) => l.name)
          .join(", ")} were your top languages.`,
      )
    }
  }

  // Stars insight
  if (stats.totalStars > 100) {
    insights.push(`${stats.totalStars.toLocaleString()} stars across your repos. People love your work!`)
  } else if (stats.totalStars > 10) {
    insights.push(`You collected ${stats.totalStars} stars this year. Keep building!`)
  }

  // PR insight
  if (stats.pullRequestsMerged > 0 && stats.pullRequestsOpened > 0) {
    const mergeRate = ((stats.pullRequestsMerged / stats.pullRequestsOpened) * 100).toFixed(0)
    insights.push(`${mergeRate}% of your PRs got merged. Your code review game is strong.`)
  }

  // Code reviews
  if (stats.codeReviews > 10) {
    insights.push(`You reviewed code ${stats.codeReviews} times. A true team player.`)
  }

  return insights
}

// Get the busiest week
export function getBusiestWeek(calendar: ContributionCalendar): { weekStart: string; contributions: number } | null {
  let maxContributions = 0
  let busiestWeekStart = ""

  calendar.weeks.forEach((week) => {
    const weekContributions = week.days.reduce((sum, day) => sum + day.count, 0)
    if (weekContributions > maxContributions) {
      maxContributions = weekContributions
      busiestWeekStart = week.days.find((d) => d.date)?.date || ""
    }
  })

  return busiestWeekStart ? { weekStart: busiestWeekStart, contributions: maxContributions } : null
}

// Calculate average contributions per active day
export function getAveragePerActiveDay(calendar: ContributionCalendar): number {
  const activeDays = calendar.weeks.flatMap((w) => w.days).filter((d) => d.count > 0).length

  return activeDays > 0 ? Math.round(calendar.totalContributions / activeDays) : 0
}

// Get contribution percentile (rough estimate)
export function getContributionPercentile(totalContributions: number): number {
  // Based on rough GitHub statistics
  if (totalContributions > 2000) return 99
  if (totalContributions > 1000) return 95
  if (totalContributions > 500) return 85
  if (totalContributions > 250) return 70
  if (totalContributions > 100) return 50
  if (totalContributions > 50) return 30
  return 10
}

// Format large numbers
export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

// Get time-based greeting
export function getTimeGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 18) return "Good afternoon"
  return "Good evening"
}
