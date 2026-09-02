import type { CompanionMetricTemplate } from "@akasha/temper-companions-core/companion-metric-template"

export const companionHealthRecoveryMetric = {
  id: "companion-health-recovery",
  name: "Health Recovery",
  valueType: "fractional-change",
  effectType: "fractional-change",
} satisfies CompanionMetricTemplate
