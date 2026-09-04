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
import type { CompanionBaseRoleId } from "@akasha/temper-companions-core/companion-base-roles"
import type { CompanionEffectSource } from "@akasha/temper-companions-core/companion-effect-sources"
import { companionMetricToDisplayFormula } from "@akasha/temper-companions-core/companion-metric-display-formula"
import type { CompanionMetricId } from "@akasha/temper-companions-core/companion-metric-ids"
import {
  type CompanionMetricValue,
  getCompanionMetricName,
} from "@akasha/temper-companions-core/companion-metrics"
import { FormulaDisplay } from "../formula-display/formula-display.module.code.tsx"

interface CompanionStatExplanationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  metric: CompanionMetricValue | null
  sources: readonly CompanionEffectSource[]
  allStats: Partial<Record<CompanionMetricId, CompanionMetricValue>>
  roles: readonly CompanionBaseRoleId[]
}

export function CompanionStatExplanationDialog({
  open,
  onOpenChange,
  metric,
  sources,
  allStats,
  roles,
}: CompanionStatExplanationDialogProps) {
  const surface = useSurface()

  if (!metric) {
    return null
  }

  const displayFormula = companionMetricToDisplayFormula(metric, sources, allStats, roles)
  const name = getCompanionMetricName(metric.id)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
        </DialogHeader>
        <DialogBody className="space-y-4">
          <div className={cn("overflow-x-auto rounded-md p-4", surfaceClass(surface + 1))}>
            <FormulaDisplay formula={displayFormula} />
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}
