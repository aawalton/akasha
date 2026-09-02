import type { CompanionMetricTemplate } from "@akasha/temper-companions-core/companion-metric-template"

export const companionCriticalDamageMetric = {
  id: "companion-critical-damage",
  name: "Critical Damage",
  valueType: "fractional-change",
  effectType: "fractional-change",
} satisfies CompanionMetricTemplate
