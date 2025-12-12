// GitHub API response types

export interface GitHubUser {
  login: string
  id: number
  avatar_url: string
  html_url: string
  name: string | null
  company: string | null
  blog: string
  location: string | null
  email: string | null
  bio: string | null
  twitter_username: string | null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  fork: boolean
  created_at: string
  updated_at: string
  pushed_at: string
  homepage: string | null
  size: number
  stargazers_count: number
  watchers_count: number
  language: string | null
  forks_count: number
  open_issues_count: number
  default_branch: string
  topics: string[]
}

export interface GitHubEvent {
  id: string
  type: string
  actor: {
    id: number
    login: string
    avatar_url: string
  }
  repo: {
    id: number
    name: string
    url: string
  }
  payload: Record<string, unknown>
  public: boolean
  created_at: string
}

export interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export interface ContributionWeek {
  days: ContributionDay[]
}

export interface ContributionCalendar {
  totalContributions: number
  weeks: ContributionWeek[]
}

export interface LanguageStats {
  name: string
  percentage: number
  color: string
  bytes: number
}

export interface WrappedStats {
  user: GitHubUser
  year: number
  totalContributions: number
  contributionCalendar: ContributionCalendar
  longestStreak: number
  currentStreak: number
  mostProductiveDay: string
  mostProductiveMonth: string
  topRepositories: GitHubRepo[]
  languages: LanguageStats[]
  totalStars: number
  totalForks: number
  totalCommits: number
  pullRequestsOpened: number
  pullRequestsMerged: number
  issuesOpened: number
  issuesClosed: number
  codeReviews: number
}
