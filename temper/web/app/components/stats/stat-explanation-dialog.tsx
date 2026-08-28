"use client"

import { Dialog, DialogBody, DialogContent, DialogHeader, DialogTitle } from "@shared/design-primitives/components/dialog"
import { useSurface } from "@shared/design-primitives/components/surface-provider"
import { Text } from "@shared/design-primitives/components/text"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { cn } from "@shared/design-primitives/utils/cn"
import { metricToDisplayFormula } from "@temper/game-characters-stats/metrics/metric-display-formula"
import type { MetricId } from "@temper/shared-formula-framework/metric-ids.generated"
import { getMetricDisplayName } from "@temper/game-characters-stats/metrics/metrics.generated"
import type { MetricValue } from "@temper/game-characters-stats/metrics/types"
import type { EffectSource } from "@temper/shared-formula-framework/effect-source"
import { formatStatValue } from "@temper/shared-formula-framework/format"
import { typedPartialRecordKeys } from "@temper/shared-formula-framework/object-utils"
import { FormulaDisplay } from "@/components/ui/formula-display"

interface StatExplanationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  metric: MetricValue | null
  sources: readonly EffectSource[]
  allStats: Partial<Record<MetricId, MetricValue>>
}

export function StatExplanationDialog({
  open,
  onOpenChange,
  metric,
  sources,
  allStats,
}: StatExplanationDialogProps) {
  const surface = useSurface()

  if (!metric) {
    return null
  }

  const metricValues = new Map<MetricId, number>()
  for (const id of typedPartialRecordKeys(allStats)) {
    const mv = allStats[id]
    if (mv) metricValues.set(id, mv.value)
  }

  const displayFormula = metricToDisplayFormula(metric, sources, metricValues)
  const name = getMetricDisplayName(metric.id)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
        </DialogHeader>
        <DialogBody className="space-y-4">
          <div className={cn("overflow-x-auto rounded-md p-4", surfaceClass(surface + 1))}>
            {displayFormula ? (
              <FormulaDisplay formula={displayFormula} />
            ) : (
              <Text>{formatStatValue(metric)} (no formula)</Text>
            )}
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}
