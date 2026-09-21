"use client"

import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "akasha/design/interface/primitive/modules/dialog/dialog.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { Text } from "akasha/design/interface/primitive/modules/text-body/text-body.module.code.tsx"
import type { EffectSource } from "akasha/temper/formula-framework/modules/effect-source/effect-source.module.code.ts"
import type { MetricId } from "akasha/temper/formula-framework/modules/metric-id/metric-id.module.code.ts"
import { formatStatValue } from "akasha/temper/formula-framework/modules/number-format/number-format.module.code.ts"
import { typedPartialRecordKeys } from "akasha/temper/formula-framework/modules/record-parts/record-parts.module.code.ts"
import { metricToDisplayFormula } from "akasha/temper/player/character/stat/modules/metric-display-formula/metric-display-formula.module.code.ts"
import type { MetricValue } from "akasha/temper/player/character/stat/modules/metric-value/metric-value.module.code.ts"
import { getMetricDisplayName } from "akasha/temper/player/character/stat/modules/metrics/metrics.module.code.ts"
import { FormulaDisplay } from "akasha/temper/web/modules/formula-display/formula-display.module.code.tsx"

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
