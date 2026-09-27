"use client"

import { assertNever } from "akasha/code/type/narrowing/modules/assert-never/assert-never.module.code.ts"
import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import { ResponsiveColumns } from "akasha/design/interface/layout/modules/responsive-columns/responsive-columns.module.code.tsx"
import { Text } from "akasha/design/interface/primitive/modules/text-body/text-body.module.code.tsx"
import type { CompanionMetricId } from "akasha/temper/catalog/companion/companions-core/modules/companion-metric-ids/companion-metric-ids.module.code.ts"
import {
  type CompanionMetricGroup,
  getCompanionMetricTree,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-metric-tree/companion-metric-tree.module.code.ts"
import type { CompanionMetricValue } from "akasha/temper/catalog/companion/companions-core/modules/companion-metrics/companion-metrics.module.code.ts"
import { CompanionRotationBreakdownPanelCard } from "akasha/temper/web/modules/companion-rotation-breakdown-panel-card/companion-rotation-breakdown-panel-card.module.code.tsx"
import { CompanionStatExplanationDialog } from "akasha/temper/web/modules/companion-stat-explanation-dialog/companion-stat-explanation-dialog.module.code.tsx"
import {
  CompanionStatGroupPanelCard,
  CompanionStatGroupPanelCardSkeleton,
} from "akasha/temper/web/modules/companion-stat-group-panel-card/companion-stat-group-panel-card.module.code.tsx"
import {
  type CompanionStatsPanelState,
  deriveCompanionStatsPanelState,
} from "akasha/temper/web/modules/companion-stats-panel-state/companion-stats-panel-state.module.code.ts"
import { CompanionSuggestionsPanelCard } from "akasha/temper/web/modules/companion-suggestions-panel-card/companion-suggestions-panel-card.module.code.tsx"
import { CompanionSurplusPanelCard } from "akasha/temper/web/modules/companion-surplus-panel-card/companion-surplus-panel-card.module.code.tsx"
import { useCompanion } from "akasha/temper/web/modules/use-companion/use-companion.module.code.ts"
import { useHeldCompanionCatalog } from "akasha/temper/web/modules/use-companion-catalog/use-companion-catalog.module.code.tsx"
import { useCompanionStats } from "akasha/temper/web/modules/use-companion-stats/use-companion-stats.module.code.ts"
import { useHeldMetricCatalog } from "akasha/temper/web/modules/use-metric-catalog/use-metric-catalog.module.code.tsx"
import {
  type Phrase,
  usePhrase,
  usePhraseDescription,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { companionStatsPanelCalculationFailed } from "akasha/temper/web/phrase/pages/companion-stats-panel-calculation-failed.temper-web-phrase.ts"
import { companionStatsPanelNoCompanion } from "akasha/temper/web/phrase/pages/companion-stats-panel-no-companion.temper-web-phrase.ts"
import { companionStatsPanelNoStats } from "akasha/temper/web/phrase/pages/companion-stats-panel-no-stats.temper-web-phrase.ts"
import { companionStatsPanelTitle } from "akasha/temper/web/phrase/pages/companion-stats-panel-title.temper-web-phrase.ts"
import { type ReactNode, useMemo, useState } from "react"

interface CompanionStatsPanelProps {
  className?: string
  columnCount: number
}

function groupPanelId(group: CompanionMetricGroup) {
  return `companion-stat-${group.label.toLowerCase().replace(/\s+/g, "-")}`
}

function StatsMessageCard({ className, children }: { className?: string; children: ReactNode }) {
  const phrase = usePhrase()
  return (
    <PanelCard
      id="companion-stats"
      collapsible={true}
      title={phrase(companionStatsPanelTitle.slug)}
      className={className}
    >
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
  phrase: Phrase
  describe: Phrase
}

function StatsLeadPanels({
  state,
  metricTree,
  stats,
  className,
  onStatClick,
  phrase,
  describe,
}: StatsLeadPanelsArgs): ReactNode {
  switch (state) {
    case "no-companion":
      return (
        <StatsMessageCard className={className}>
          {phrase(companionStatsPanelNoCompanion.slug)}
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
          {describe(companionStatsPanelCalculationFailed.slug)}
        </StatsMessageCard>
      )
    case "no-stats":
      return (
        <StatsMessageCard className={className}>
          {describe(companionStatsPanelNoStats.slug)}
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
  const phrase = usePhrase()
  const describe = usePhraseDescription()
  const { stats, sources, isLoading, hasError } = useCompanionStats()
  const catalog = useHeldMetricCatalog()
  const roles = useHeldCompanionCatalog()

  const metricTree = useMemo(
    () =>
      catalog === null || roles === null ? [] : getCompanionMetricTree(build.companion.baseRoles),
    [build.companion.baseRoles, catalog, roles]
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
        {StatsLeadPanels({
          state,
          metricTree,
          stats,
          className,
          onStatClick: handleStatClick,
          phrase,
          describe,
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
