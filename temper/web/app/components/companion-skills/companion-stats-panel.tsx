"use client"

import { PanelCard, ResponsiveColumns, Text } from "@shared/design-system"
import { assertNever } from "@shared/utils-narrow/assert-never"
import {
  type CompanionMetricGroup,
  getCompanionMetricTree,
} from "@temper/game-companions-core/stats/companion-metric-tree"
import type { CompanionMetricValue } from "@temper/game-companions-core/stats/companion-metrics.generated"
import type { CompanionMetricId } from "@temper/game-companions-core/stats/companion-metric-ids.generated"
import { type ReactNode, useMemo, useState } from "react"
import { CompanionRotationBreakdownPanelCard } from "@/components/companion-skills/companion-rotation-breakdown-panel-card"
import { CompanionStatExplanationDialog } from "@/components/companion-skills/companion-stat-explanation-dialog"
import {
  CompanionStatGroupPanelCard,
  CompanionStatGroupPanelCardSkeleton,
} from "@/components/companion-skills/companion-stat-group-panel-card"
import {
  type CompanionStatsPanelState,
  deriveCompanionStatsPanelState,
} from "@/components/companion-skills/companion-stats-panel-state"
import { CompanionSuggestionsPanelCard } from "@/components/companion-skills/companion-suggestions-panel-card"
import { CompanionSurplusPanelCard } from "@/components/companion-skills/companion-surplus-panel-card"
import { useCompanion } from "@/components/companions/context/use-companion"
import { useCompanionStats } from "@/components/companions/context/use-companion-stats"

interface CompanionStatsPanelProps {
  className?: string
  columnCount: number
}

function groupPanelId(group: CompanionMetricGroup) {
  return `companion-stat-${group.label.toLowerCase().replace(/\s+/g, "-")}`
}

function StatsMessageCard({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <PanelCard id="companion-stats" collapsible={true} title="Stats" className={className}>
      <Text>{children}</Text>
    </PanelCard>
  )
}

interface StatsLeadPanelsArgs {
  state: CompanionStatsPanelState
  metricTree: readonly CompanionMetricGroup[]
  stats: Partial<Record<CompanionMetricId, CompanionMetricValue>>
  className: string | undefined
  onStatClick: (stat: CompanionMetricValue) => void
}

function statsLeadPanels({
  state,
  metricTree,
  stats,
  className,
  onStatClick,
}: StatsLeadPanelsArgs): ReactNode {
  switch (state) {
    case "no-companion":
      return (
        <StatsMessageCard className={className}>
          Select a companion to see their stats.
        </StatsMessageCard>
      )
    case "calculating":
      return metricTree.map((group) => (
        <CompanionStatGroupPanelCardSkeleton
          key={group.label}
          id={groupPanelId(group)}
          group={group}
          className={className}
        />
      ))
    case "calculation-failed":
      return (
        <StatsMessageCard className={className}>
          Temper could not finish calculating this companion's stats, so none are shown. The failure
          is in Temper's calculation, not in your gear or skills — the error is in your browser
          console. Changing anything in the build runs the calculation again.
        </StatsMessageCard>
      )
    case "no-stats":
      return (
        <StatsMessageCard className={className}>
          The stat calculation finished and returned nothing — not even the base stats every
          companion starts with. No build setting can cause that, so it points at Temper's stat data
          rather than at your companion.
        </StatsMessageCard>
      )
    case "stats":
      return metricTree.map((group) => (
        <CompanionStatGroupPanelCard
          key={group.label}
          id={groupPanelId(group)}
          group={group}
          stats={stats}
          onStatClick={onStatClick}
          className={className}
        />
      ))
    default:
      return assertNever(state)
  }
}

export function CompanionStatsPanel({ className, columnCount }: CompanionStatsPanelProps) {
  const build = useCompanion()
  const { stats, sources, isLoading, hasError } = useCompanionStats()

  const metricTree = useMemo(
    () => getCompanionMetricTree(build.companion.baseRoles),
    [build.companion.baseRoles]
  )

  const [selectedMetric, setSelectedMetric] = useState<CompanionMetricValue | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleStatClick = (stat: CompanionMetricValue) => {
    setSelectedMetric(stat)
    setIsDialogOpen(true)
  }

  const state = deriveCompanionStatsPanelState({
    hasCompanion: build.companion.id !== "no-companion",
    isLoading,
    hasError,
    statCount: Object.keys(stats).length,
  })

  return (
    <>
      <ResponsiveColumns columnCount={columnCount} hasSummaryPanel>
        {statsLeadPanels({
          state,
          metricTree,
          stats,
          className,
          onStatClick: handleStatClick,
        })}
        <CompanionSuggestionsPanelCard key="suggestions" className={className} />
        <CompanionRotationBreakdownPanelCard key="rotation" className={className} />
        <CompanionSurplusPanelCard key="surplus" className={className} />
      </ResponsiveColumns>
      <CompanionStatExplanationDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        metric={selectedMetric}
        sources={sources}
        allStats={stats}
        roles={build.companion.baseRoles}
      />
    </>
  )
}
