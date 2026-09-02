import { StatRow } from "@akasha/design-patterns/stat-row"
import type { MetricTreeNode } from "@akasha/temper-characters-stats/metric-tree-types"
import type { MetricValue } from "@akasha/temper-characters-stats/metric-value"
import {
  hasVisibleMetricRows,
  MetricTreeRenderer,
} from "@/components/stats/components/metric-tree-renderer"
import type { StatsRecord } from "@/components/stats/types"

interface StatSubcategoryPanelCardProps {
  subcategoryName: string
  subcategoryNodes: readonly MetricTreeNode[]
  stats: StatsRecord
  searchTerm?: string
  onStatClick: (metric: MetricValue) => void
  showAdvancedMetrics?: boolean
}

export function StatSubcategoryPanelCard({
  subcategoryName,
  subcategoryNodes,
  stats,
  searchTerm,
  onStatClick,
  showAdvancedMetrics,
}: StatSubcategoryPanelCardProps) {
  if (!hasVisibleMetricRows(subcategoryNodes, stats, showAdvancedMetrics)) {
    return null
  }

  return (
    <div>
      <StatRow label={subcategoryName} />
      <div className="space-y-1 pl-4">
        <MetricTreeRenderer
          nodes={subcategoryNodes}
          stats={stats}
          searchTerm={searchTerm}
          onMetricClick={onStatClick}
          showAdvancedMetrics={showAdvancedMetrics}
        />
      </div>
    </div>
  )
}
