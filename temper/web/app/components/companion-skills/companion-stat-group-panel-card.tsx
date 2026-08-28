import { PanelCard } from "@shared/design-layout/components/panel-card"
import { Skeleton } from "@shared/design-primitives/components/skeleton"
import { StatRow } from "@shared/design-patterns/components/stat-row"
import type { CompanionMetricGroup } from "@temper/game-companions-core/stats/companion-metric-tree"
import { type CompanionMetricValue, companionMetrics } from "@temper/game-companions-core/stats/companion-metrics.generated"
import { type CompanionMetricId } from "@temper/game-companions-core/stats/companion-metric-ids.generated"
import { CompanionStatValue } from "@/components/companion-skills/companion-stat-value"

interface CompanionStatGroupPanelCardProps {
  id: string
  group: CompanionMetricGroup
  stats: Partial<Record<CompanionMetricId, CompanionMetricValue>>
  onStatClick: (stat: CompanionMetricValue) => void
  className?: string
}

export function CompanionStatGroupPanelCard({
  id,
  group,
  stats,
  onStatClick,
  className,
}: CompanionStatGroupPanelCardProps) {
  const hasAnyStats = group.categories.some((category) => {
    const headerStat = stats[category.headerMetricId]
    const childStats = category.children.filter((node) => {
      const stat = stats[node.id]
      return stat && stat.value !== 0
    })
    return (headerStat && headerStat.value !== 0) || childStats.length > 0
  })

  if (!hasAnyStats) {
    return null
  }

  return (
    <PanelCard id={id} collapsible={true} title={group.label} className={className}>
      <div className="space-y-4">
        {group.categories.map((category, categoryIndex) => {
          const headerMetric = companionMetrics.data[category.headerMetricId]
          const headerStat = stats[category.headerMetricId]

          const metricsWithValues = category.children.filter((node) => {
            const stat = stats[node.id]
            return stat && stat.value !== 0
          })

          if ((!headerStat || headerStat.value === 0) && metricsWithValues.length === 0) {
            return null
          }

          return (
            <div key={category.headerMetricId}>
              <StatRow
                label={headerMetric.name}
                value={headerStat ? <CompanionStatValue stat={headerStat} /> : undefined}
                onClick={headerStat ? () => onStatClick(headerStat) : undefined}
                useAccentColor={categoryIndex === 0}
                depth={0}
              />
              {metricsWithValues.map((node) => {
                const stat = stats[node.id]
                if (!stat) return null

                return (
                  <StatRow
                    key={node.id}
                    label={companionMetrics.data[node.id].name}
                    value={<CompanionStatValue stat={stat} />}
                    onClick={() => onStatClick(stat)}
                    depth={1}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    </PanelCard>
  )
}

interface CompanionStatGroupPanelCardSkeletonProps {
  id: string
  group: CompanionMetricGroup
  className?: string
}

export function CompanionStatGroupPanelCardSkeleton({
  id,
  group,
  className,
}: CompanionStatGroupPanelCardSkeletonProps) {
  return (
    <PanelCard id={id} collapsible={true} title={group.label} className={className}>
      <div className="space-y-4">
        {group.categories.map((category) => (
          <div key={category.headerMetricId} className="space-y-2">
            <Skeleton className="h-8 w-full" />
            <div className="space-y-1">
              {category.children.slice(0, 3).map((_, i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </PanelCard>
  )
}
