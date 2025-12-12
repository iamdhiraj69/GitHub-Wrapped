"use client"

import type { WrappedStats } from "@/lib/types"
import { SlideContainer } from "@/components/wrapped/slide-container"
import { IntroSlide } from "@/components/wrapped/intro-slide"
import { ContributionSummarySlide } from "@/components/wrapped/contribution-summary-slide"
import { ContributionGraphSlide } from "@/components/wrapped/contribution-graph-slide"
import { RepoRankingsSlide } from "@/components/wrapped/repo-rankings-slide"
import { LanguagesSlide } from "@/components/wrapped/languages-slide"
import { CodeImpactSlide } from "@/components/wrapped/code-impact-slide"
import { CollaborationSlide } from "@/components/wrapped/collaboration-slide"
import { SocialMetricsSlide } from "@/components/wrapped/social-metrics-slide"
import { InsightsSlide } from "@/components/wrapped/insights-slide"
import { FinalSlide } from "@/components/wrapped/final-slide"

interface WrappedClientProps {
  stats: WrappedStats
}

export function WrappedClient({ stats }: WrappedClientProps) {
  return (
    <SlideContainer stats={stats}>
      <IntroSlide stats={stats} />
      <ContributionSummarySlide stats={stats} />
      <ContributionGraphSlide stats={stats} />
      <RepoRankingsSlide stats={stats} />
      <LanguagesSlide stats={stats} />
      <CodeImpactSlide stats={stats} />
      <CollaborationSlide stats={stats} />
      <SocialMetricsSlide stats={stats} />
      <InsightsSlide stats={stats} />
      <FinalSlide stats={stats} />
    </SlideContainer>
  )
}
