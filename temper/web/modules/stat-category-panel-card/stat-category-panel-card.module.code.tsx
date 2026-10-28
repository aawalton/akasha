import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import {
  type CategoryNode,
  isSubcategoryNode,
} from "akasha/temper/player/character/stat/modules/metric-tree-types/metric-tree-types.module.code.ts"
import type { MetricValue } from "akasha/temper/player/character/stat/modules/metric-value/metric-value.module.code.ts"
import {
  hasVisibleMetricRows,
  MetricTreeRenderer,
} from "akasha/temper/web/modules/metric-tree-renderer/metric-tree-renderer.module.code.tsx"
import { StatSubcategoryPanelCard } from "akasha/temper/web/modules/stat-subcategory-panel-card/stat-subcategory-panel-card.module.code.tsx"
import type { StatsRecord } from "akasha/temper/web/modules/stats-types/stats-types.module.code.ts"

interface StatCategoryPanelCardProps {
  id: string
  category: CategoryNode
  stats: StatsRecord
  statusDamage: Readonly<Record<string, number>>
  searchTerm?: string
  onStatClick: (metric: MetricValue) => void
  showAdvancedMetrics?: boolean
  className?: string
}

export function StatCategoryPanelCard({
  id,
  category,
  stats,
  statusDamage,
  searchTerm,
  onStatClick,
  showAdvancedMetrics,
  className,
}: StatCategoryPanelCardProps) {
  if (!category.children || category.children.length === 0) {
    return null
  }

  if (!hasVisibleMetricRows(category.children, stats, statusDamage, showAdvancedMetrics)) {
    return null
  }

  return (
    <PanelCard id={id} collapsible={true} title={category.name} className={className}>
      {category.children.map((child) => {
        if (!isSubcategoryNode(child)) {
          return (
            <MetricTreeRenderer
              key={child.id}
              nodes={[child]}
              stats={stats}
              statusDamage={statusDamage}
              searchTerm={searchTerm}
              onMetricClick={onStatClick}
              showAdvancedMetrics={showAdvancedMetrics}
            />
          )
        }

        return (
          <StatSubcategoryPanelCard
            key={child.id}
            subcategoryName={child.name}
            subcategoryNodes={child.children || []}
            stats={stats}
            statusDamage={statusDamage}
            searchTerm={searchTerm}
            onStatClick={onStatClick}
            showAdvancedMetrics={showAdvancedMetrics}
          />
        )
      })}
    </PanelCard>
  )
}
