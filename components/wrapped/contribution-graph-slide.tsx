"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import type { WrappedStats, ContributionDay } from "@/lib/types"

interface ContributionGraphSlideProps {
  stats: WrappedStats
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const CONTRIBUTION_COLORS = {
  0: "#161b22",
  1: "#0e4429",
  2: "#006d32",
  3: "#26a641",
  4: "#39d353",
} as const

export function ContributionGraphSlide({ stats }: ContributionGraphSlideProps) {
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

  const calendar = stats.contributionCalendar

  // Get month labels with positions
  const monthLabels = useMemo(() => {
    const labels: { month: string; weekIndex: number }[] = []
    let currentMonth = -1

    calendar.weeks.forEach((week, weekIndex) => {
      const firstDay = week.days.find((d) => d.date)
      if (firstDay) {
        const month = new Date(firstDay.date).getMonth()
        if (month !== currentMonth) {
          labels.push({ month: MONTHS[month], weekIndex })
          currentMonth = month
        }
      }
    })
    return labels
  }, [calendar.weeks])

  const handleMouseEnter = (day: ContributionDay, event: React.MouseEvent) => {
    if (!day.date) return
    setHoveredDay(day)
    const rect = event.currentTarget.getBoundingClientRect()
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
    })
  }

  const handleMouseLeave = () => {
    setHoveredDay(null)
  }

  const cellSize = 10
  const cellGap = 2
  const graphWidth = calendar.weeks.length * (cellSize + cellGap)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-2 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-1">Your Activity</p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Contribution Graph</h2>
          <p className="text-[#3fb950] text-base sm:text-lg md:text-xl font-semibold mt-2">
            {stats.totalContributions.toLocaleString()} contributions in {stats.year}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-[#0d1117] border border-[#30363d] rounded-md p-2 sm:p-3 md:p-4 overflow-x-auto scrollbar-thin flex justify-center"
        >
          <div style={{ width: `${graphWidth + 36}px` }} className="pb-1">
            {/* Month labels */}
            <div className="relative h-4 mb-1 ml-6 sm:ml-7">
              {monthLabels.map((label, index) => (
                <span
                  key={index}
                  className="absolute text-[9px] sm:text-[10px] md:text-xs text-[#7d8590]"
                  style={{ left: `${label.weekIndex * (cellSize + cellGap)}px` }}
                >
                  {label.month}
                </span>
              ))}
            </div>

            {/* Graph grid */}
            <div className="flex">
              {/* Day labels */}
              <div className="flex flex-col justify-around w-6 sm:w-7 text-[9px] sm:text-[10px] md:text-xs text-[#7d8590] pr-1">
                <span className="h-[10px] leading-[10px]"></span>
                <span className="h-[10px] leading-[10px]">Mon</span>
                <span className="h-[10px] leading-[10px]"></span>
                <span className="h-[10px] leading-[10px]">Wed</span>
                <span className="h-[10px] leading-[10px]"></span>
                <span className="h-[10px] leading-[10px]">Fri</span>
                <span className="h-[10px] leading-[10px]"></span>
              </div>

              {/* Contribution cells */}
              <div className="flex" style={{ gap: `${cellGap}px` }}>
                {calendar.weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col" style={{ gap: `${cellGap}px` }}>
                    {week.days.map((day, dayIndex) => (
                      <motion.div
                        key={`${weekIndex}-${dayIndex}`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.5 + weekIndex * 0.006,
                          duration: 0.1,
                        }}
                        className="rounded-sm cursor-pointer transition-all hover:ring-1 hover:ring-[#58a6ff]"
                        style={{
                          width: `${cellSize}px`,
                          height: `${cellSize}px`,
                          backgroundColor: day.date ? CONTRIBUTION_COLORS[day.level] : "transparent",
                        }}
                        onMouseEnter={(e) => handleMouseEnter(day, e)}
                        onMouseLeave={handleMouseLeave}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-1 mt-2 sm:mt-3 text-[9px] sm:text-[10px] md:text-xs text-[#7d8590]">
              <span className="mr-1">Less</span>
              {([0, 1, 2, 3, 4] as const).map((level) => (
                <div
                  key={level}
                  className="rounded-sm"
                  style={{
                    width: `${cellSize}px`,
                    height: `${cellSize}px`,
                    backgroundColor: CONTRIBUTION_COLORS[level],
                  }}
                />
              ))}
              <span className="ml-1">More</span>
            </div>
          </div>
        </motion.div>

        <p className="text-center text-[10px] sm:text-xs text-[#7d8590] mt-2 sm:hidden">Swipe to view full graph</p>

        {/* Tooltip */}
        {hoveredDay && hoveredDay.date && (
          <div
            className="fixed z-50 px-2 py-1 bg-[#1c2128] border border-[#30363d] rounded-md text-xs pointer-events-none transform -translate-x-1/2 -translate-y-full shadow-lg"
            style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y,
            }}
          >
            <p className="text-foreground font-medium">
              {hoveredDay.count} contribution{hoveredDay.count !== 1 ? "s" : ""}
            </p>
            <p className="text-[#7d8590] text-[10px]">
              {new Date(hoveredDay.date).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
