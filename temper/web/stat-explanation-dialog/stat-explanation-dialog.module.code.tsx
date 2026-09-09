"use client"

import { cn } from "@akasha/design-primitives/cn"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@akasha/design-primitives/dialog"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import { Text } from "@akasha/design-primitives/text-body"
import { metricToDisplayFormula } from "akasha/temper/temper-characters-stats/metric-display-formula/metric-display-formula.module.code.ts"
import type { MetricValue } from "akasha/temper/temper-characters-stats/metric-value/metric-value.module.code.ts"
import { getMetricDisplayName } from "akasha/temper/temper-characters-stats/metrics/metrics.module.code.ts"
import type { EffectSource } from "../../formula-framework/effect-source/effect-source.module.code.ts"
import type { MetricId } from "../../formula-framework/metric-id/metric-id.module.code.ts"
import { formatStatValue } from "../../formula-framework/number-format/number-format.module.code.ts"
import { typedPartialRecordKeys } from "../../formula-framework/record-parts/record-parts.module.code.ts"
import { FormulaDisplay } from "../formula-display/formula-display.module.code.tsx"

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
