import type { CompanionMetricTemplate } from "../companion-metric-template"

export const companionCriticalHealingMetric = {
  id: "companion-critical-healing",
  name: "Critical Healing",
  valueType: "fractional-change",
  effectType: "fractional-change",
} satisfies CompanionMetricTemplate
