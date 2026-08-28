import { PanelCard } from "@shared/design-layout/components/panel-card"
import { StatRow } from "@shared/design-patterns/components/stat-row"
import type { CompanionMetricValue } from "@temper/game-companions-core/stats/companion-metrics.generated"
import { useCompanionStats } from "@/components/companions/context/use-companion-stats"

interface CompanionSurplusPanelCardProps {
  className?: string
}

export function CompanionSurplusPanelCard({ className }: CompanionSurplusPanelCardProps) {
  const { stats } = useCompanionStats()
  const metricsWithSurplus = Object.values(stats).filter(
    (stat): stat is CompanionMetricValue =>
      stat !== undefined && stat.surplus !== undefined && stat.surplus.surplusRating > 0
  )

  if (metricsWithSurplus.length === 0) {
    return null
  }

  return (
    <PanelCard id="companion-surplus" collapsible={true} title="Optimization" className={className}>
      <div className="space-y-4">
        {metricsWithSurplus.map((stat) => {
          const { surplus } = stat
          if (!surplus) return null

          const surplusPercent = ((surplus.rawValue - surplus.effectiveValue) * 100).toFixed(2)
          const incrementPercent = (surplus.floorIncrement * 100).toFixed(0)

          return (
            <div key={stat.id} className="space-y-1">
              <StatRow label={stat.name} useAccentColor depth={0} />
              <StatRow
                label="Surplus"
                value={
                  <span className="text-warning">
                    +{Math.round(surplus.surplusRating).toLocaleString()} (+{surplusPercent}%)
                  </span>
                }
                depth={1}
              />
              {surplus.ratingToNextThreshold > 0 && (
                <StatRow
                  label={`To next ${incrementPercent}%`}
                  value={Math.round(surplus.ratingToNextThreshold).toLocaleString()}
                  depth={1}
                />
              )}
            </div>
          )
        })}
      </div>
    </PanelCard>
  )
}
