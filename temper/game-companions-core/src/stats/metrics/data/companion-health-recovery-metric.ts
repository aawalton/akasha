import type { CompanionMetricTemplate } from "../companion-metric-template"

export const companionHealthRecoveryMetric = {
  id: "companion-health-recovery",
  name: "Health Recovery",
  valueType: "fractional-change",
  effectType: "fractional-change",
} satisfies CompanionMetricTemplate
