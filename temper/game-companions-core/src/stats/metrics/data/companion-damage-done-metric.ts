import type { CompanionMetricTemplate } from "@akasha/temper-companions-core/companion-metric-template"

export const companionDamageDoneMetric = {
  id: "companion-damage-done",
  name: "Damage Done",
  valueType: "fractional-change",
  effectType: "fractional-change",
} satisfies CompanionMetricTemplate
