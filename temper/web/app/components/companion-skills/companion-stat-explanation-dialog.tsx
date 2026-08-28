"use client"

import { Dialog, DialogBody, DialogContent, DialogHeader, DialogTitle } from "@shared/design-primitives/components/dialog"
import { useSurface } from "@shared/design-primitives/components/surface-provider"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { cn } from "@shared/design-primitives/utils/cn"
import type { CompanionBaseRoleId } from "@temper/game-companions-core/companion-base-roles-data"
import type { CompanionEffectSource } from "@temper/game-companions-core/stats/companion-effect-sources"
import { companionMetricToDisplayFormula } from "@temper/game-companions-core/stats/companion-metric-display-formula"
import { type CompanionMetricValue, getCompanionMetricName } from "@temper/game-companions-core/stats/companion-metrics.generated"
import { type CompanionMetricId } from "@temper/game-companions-core/stats/companion-metric-ids.generated"
import { FormulaDisplay } from "@/components/ui/formula-display"

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
