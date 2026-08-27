import type { CompanionMetricTemplate } from "../companion-metric-template"

export const companionHealingDoneMetric = {
  id: "companion-healing-done",
  name: "Healing Done",
  valueType: "fractional-change",
  effectType: "fractional-change",
} satisfies CompanionMetricTemplate
