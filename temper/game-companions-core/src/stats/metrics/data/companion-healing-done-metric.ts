import type { CompanionMetricTemplate } from "@akasha/temper-companions-core/companion-metric-template"

export const companionHealingDoneMetric = {
  id: "companion-healing-done",
  name: "Healing Done",
  valueType: "fractional-change",
  effectType: "fractional-change",
} satisfies CompanionMetricTemplate
