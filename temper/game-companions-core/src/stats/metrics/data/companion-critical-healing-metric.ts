import type { CompanionMetricTemplate } from "@akasha/temper-companions-core/companion-metric-template"

export const companionCriticalHealingMetric = {
  id: "companion-critical-healing",
  name: "Critical Healing",
  valueType: "fractional-change",
  effectType: "fractional-change",
} satisfies CompanionMetricTemplate
