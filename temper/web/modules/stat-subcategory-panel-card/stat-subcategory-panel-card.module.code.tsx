import { StatRow } from "akasha/design/interface/pattern/modules/stat-row/stat-row.module.code.tsx"
import type { MetricTreeNode } from "akasha/temper/player/character/stat/modules/metric-tree-types/metric-tree-types.module.code.ts"
import type { MetricValue } from "akasha/temper/player/character/stat/modules/metric-value/metric-value.module.code.ts"
import {
  hasVisibleMetricRows,
  MetricTreeRenderer,
} from "akasha/temper/web/modules/metric-tree-renderer/metric-tree-renderer.module.code.tsx"
import type { StatsRecord } from "akasha/temper/web/modules/stats-types/stats-types.module.code.ts"

interface StatSubcategoryPanelCardProps {
  subcategoryName: string
  subcategoryNodes: readonly MetricTreeNode[]
  stats: StatsRecord
  statusDamage: Readonly<Record<string, number>>
  searchTerm?: string
  onStatClick: (metric: MetricValue) => void
  showAdvancedMetrics?: boolean
}

export function StatSubcategoryPanelCard({
  subcategoryName,
  subcategoryNodes,
  stats,
  statusDamage,
  searchTerm,
  onStatClick,
  showAdvancedMetrics,
}: StatSubcategoryPanelCardProps) {
  if (!hasVisibleMetricRows(subcategoryNodes, stats, statusDamage, showAdvancedMetrics)) {
    return null
  }

  return (
    <div>
      <StatRow label={subcategoryName} />
      <div className="space-y-1 pl-4">
        <MetricTreeRenderer
          nodes={subcategoryNodes}
          stats={stats}
          statusDamage={statusDamage}
          searchTerm={searchTerm}
          onMetricClick={onStatClick}
          showAdvancedMetrics={showAdvancedMetrics}
        />
      </div>
    </div>
  )
}
