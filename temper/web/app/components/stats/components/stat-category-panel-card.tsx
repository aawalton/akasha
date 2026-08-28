import { PanelCard } from "@shared/design-layout/components/panel-card"
import {
  type CategoryNode,
  isMetricNode,
  isSubcategoryNode,
} from "@temper/game-characters-stats/metrics/metric-tree-types"
import type { MetricValue } from "@temper/game-characters-stats/metrics/types"
import {
  hasVisibleMetricRows,
  MetricTreeRenderer,
} from "@/components/stats/components/metric-tree-renderer"
import { StatSubcategoryPanelCard } from "@/components/stats/components/stat-subcategory-panel-card"
import type { StatsRecord } from "@/components/stats/types"

interface StatCategoryPanelCardProps {
  id: string
  category: CategoryNode
  stats: StatsRecord
  searchTerm?: string
  onStatClick: (metric: MetricValue) => void
  showAdvancedMetrics?: boolean
  className?: string
}

export function StatCategoryPanelCard({
  id,
  category,
  stats,
  searchTerm,
  onStatClick,
  showAdvancedMetrics,
  className,
}: StatCategoryPanelCardProps) {
  if (!category.children || category.children.length === 0) {
    return null
  }

  if (!hasVisibleMetricRows(category.children, stats, showAdvancedMetrics)) {
    return null
  }

  return (
    <PanelCard id={id} collapsible={true} title={category.name} className={className}>
      {category.children.map((child) => {
        if (isMetricNode(child)) {
          return (
            <MetricTreeRenderer
              key={child.id}
              nodes={[child]}
              stats={stats}
              searchTerm={searchTerm}
              onMetricClick={onStatClick}
              showAdvancedMetrics={showAdvancedMetrics}
            />
          )
        }

        if (isSubcategoryNode(child)) {
          return (
            <StatSubcategoryPanelCard
              key={child.id}
              subcategoryName={child.name}
              subcategoryNodes={child.children || []}
              stats={stats}
              searchTerm={searchTerm}
              onStatClick={onStatClick}
              showAdvancedMetrics={showAdvancedMetrics}
            />
          )
        }

        return null
      })}
    </PanelCard>
  )
}
