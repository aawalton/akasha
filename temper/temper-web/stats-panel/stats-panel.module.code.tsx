"use client"

import {
  PanelToggleContext,
  PanelToggleLocalContext,
  type PanelToggleSignal,
} from "@akasha/design-layout/panel-toggle-context"
import { ResponsiveColumns } from "@akasha/design-layout/responsive-columns"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@akasha/design-patterns/empty"
import type { CharacterState } from "@akasha/temper-character-build/build-types"
import { METRIC_TREE } from "@akasha/temper-characters-stats/metric-tree-data"
import {
  isMetricNode,
  isSubcategoryNode,
  type MetricTreeNode,
} from "@akasha/temper-characters-stats/metric-tree-types"
import { getMetricDisplayName } from "@akasha/temper-characters-stats/metrics"
import { isNamedSource } from "@akasha/temper-formula-framework/effect-source"
import { Search } from "lucide-react"
import { useCallback, useState } from "react"
import { BuffOrDebuffExplanationDialog } from "../buff-or-debuff-explanation-dialog/buff-or-debuff-explanation-dialog.module.code.tsx"
import { EffectsPanelCard } from "../effects-panel-card/effects-panel-card.module.code.tsx"
import { OptimizationPanelCard } from "../optimization-panel-card/optimization-panel-card.module.code.tsx"
import { PanelCardSkeleton } from "../panel-card-skeleton/panel-card-skeleton.module.code.tsx"
import { StatCategoryPanelCard } from "../stat-category-panel-card/stat-category-panel-card.module.code.tsx"
import { StatExplanationDialog } from "../stat-explanation-dialog/stat-explanation-dialog.module.code.tsx"
import { filterEffectsBySearch } from "../stats-filtering/stats-filtering.module.code.ts"
import { StatsHeaderPanelCard } from "../stats-header-panel-card/stats-header-panel-card.module.code.tsx"
import type { StatsRecord } from "../stats-types/stats-types.module.code.ts"
import { useStatsCalculation } from "../use-stats-calculation/use-stats-calculation.module.code.ts"
import { useStatsUIState } from "../use-stats-ui-state/use-stats-ui-state.module.code.ts"

interface StatsPanelProps {
  build: CharacterState
  activeStatsTab: "primary" | "backup"
  onActiveStatsTabChange: (tab: "primary" | "backup") => void
  className?: string
  columnCount: 1 | 2
}

export function StatsPanel({
  build,
  activeStatsTab,
  onActiveStatsTabChange,
  className,
  columnCount,
}: StatsPanelProps) {
  const [searchFilter, setSearchFilter] = useState("")

  const { frontStats, backStats, frontSources, backSources, isLoading } = useStatsCalculation(build)

  const activeStats = activeStatsTab === "primary" ? frontStats : backStats
  const activeSources = activeStatsTab === "primary" ? frontSources : backSources

  const {
    selectedMetric,
    setSelectedMetric,
    isDialogOpen,
    setIsDialogOpen,
    selectedBuff,
    setSelectedBuff,
    isBuffDialogOpen,
    setIsBuffDialogOpen,
    showAdvancedMetrics,
    setShowAdvancedMetrics,
  } = useStatsUIState()

  const [toggleSignal, setToggleSignal] = useState<PanelToggleSignal>({
    action: "collapse-all",
    generation: 0,
  })

  const handleExpandAll = useCallback(() => {
    setToggleSignal((prev) => ({ action: "expand-all", generation: prev.generation + 1 }))
  }, [])

  const handleCollapseAll = useCallback(() => {
    setToggleSignal((prev) => ({ action: "collapse-all", generation: prev.generation + 1 }))
  }, [])

  function nodeMatchesSearch(
    node: MetricTreeNode,
    stats: StatsRecord,
    searchTerm: string
  ): boolean {
    if (searchTerm.trim() === "") return true

    const lowerSearch = searchTerm.toLowerCase()

    const label = isSubcategoryNode(node) ? node.name : getMetricDisplayName(node.id)
    if (label.toLowerCase().includes(lowerSearch)) {
      return true
    }

    if (isMetricNode(node) && stats[node.id]) {
      return true
    }

    if (node.children) {
      return node.children.some((child) => nodeMatchesSearch(child, stats, searchTerm))
    }

    return false
  }

  function categoryHasResults(
    category: { name: string; children?: readonly MetricTreeNode[] },
    stats: StatsRecord,
    searchTerm: string
  ): boolean {
    if (searchTerm.trim() === "") return true

    const lowerSearch = searchTerm.toLowerCase()

    if (category.name.toLowerCase().includes(lowerSearch)) {
      return true
    }

    if (category.children) {
      return category.children.some((child) => nodeMatchesSearch(child, stats, searchTerm))
    }

    return false
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <StatsHeaderPanelCard
          activeTab={activeStatsTab}
          onTabChange={onActiveStatsTabChange}
          searchFilter=""
          onSearchChange={() => {}}
          onExpandAll={() => {}}
          onCollapseAll={() => {}}
          showAdvancedMetrics={false}
          onShowAdvancedMetricsChange={() => {}}
          className={className}
        />
        <PanelCardSkeleton collapsible={false} rows={3} className={className} title="Resources" />
        <PanelCardSkeleton collapsible={false} rows={3} className={className} title="Offensive" />
        <PanelCardSkeleton collapsible={false} rows={3} className={className} title="Defensive" />
      </div>
    )
  }

  const buffs = activeSources.filter(isNamedSource).filter((s) => s.categoryId === "buffs")
  const debuffs = activeSources.filter(isNamedSource).filter((s) => s.categoryId === "debuffs")
  const hasBuffResults = filterEffectsBySearch(buffs, searchFilter).length > 0
  const hasDebuffResults = filterEffectsBySearch(debuffs, searchFilter).length > 0
  const hasStatCategoryResults = Object.values(METRIC_TREE).some((category) =>
    categoryHasResults(category, activeStats, searchFilter)
  )
  const hasResults = hasBuffResults || hasDebuffResults || hasStatCategoryResults

  const panelChildren = [
    <StatsHeaderPanelCard
      key="header"
      activeTab={activeStatsTab}
      onTabChange={onActiveStatsTabChange}
      searchFilter={searchFilter}
      onSearchChange={setSearchFilter}
      onExpandAll={handleExpandAll}
      onCollapseAll={handleCollapseAll}
      showAdvancedMetrics={showAdvancedMetrics}
      onShowAdvancedMetricsChange={setShowAdvancedMetrics}
      className={className}
    />,
  ]

  if (!hasResults && searchFilter.trim() !== "") {
    panelChildren.push(
      <Empty key="no-results" className="py-8">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Search />
          </EmptyMedia>
          <EmptyTitle>No results found</EmptyTitle>
          <EmptyDescription>No stats match &quot;{searchFilter}&quot;</EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  } else {
    Object.entries(METRIC_TREE).forEach(([categoryKey, category]) => {
      panelChildren.push(
        <StatCategoryPanelCard
          key={category.name}
          id={`stats-${categoryKey}`}
          category={category}
          stats={activeStats}
          searchTerm={searchFilter}
          onStatClick={(metric) => {
            setSelectedMetric(metric)
            setIsDialogOpen(true)
          }}
          showAdvancedMetrics={showAdvancedMetrics}
          className={className}
        />
      )
    })

    panelChildren.push(
      <EffectsPanelCard
        key="self-buffs"
        id="self-buffs"
        cardTitle="Self Buffs"
        effectCategory="buffs"
        sources={activeSources}
        searchTerm={searchFilter}
        onEffectClick={(effect) => {
          setSelectedBuff(effect)
          setIsBuffDialogOpen(true)
        }}
        className={className}
      />,
      <EffectsPanelCard
        key="target-debuffs"
        id="target-debuffs"
        cardTitle="Target Debuffs"
        effectCategory="debuffs"
        sources={activeSources}
        searchTerm={searchFilter}
        onEffectClick={(effect) => {
          setSelectedBuff(effect)
          setIsBuffDialogOpen(true)
        }}
        className={className}
      />
    )

    panelChildren.push(
      <OptimizationPanelCard
        key="optimization"
        stats={activeStats}
        searchTerm={searchFilter}
        className={className}
      />
    )
  }

  return (
    <>
      <PanelToggleLocalContext value={true}>
        <PanelToggleContext value={toggleSignal}>
          <ResponsiveColumns columnCount={columnCount} hasSummaryPanel>
            {panelChildren}
          </ResponsiveColumns>
        </PanelToggleContext>
      </PanelToggleLocalContext>
      <StatExplanationDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        metric={selectedMetric}
        sources={activeSources}
        allStats={activeStats}
      />
      <BuffOrDebuffExplanationDialog
        open={isBuffDialogOpen}
        onOpenChange={setIsBuffDialogOpen}
        buff={selectedBuff}
        sources={activeSources}
      />
    </>
  )
}
