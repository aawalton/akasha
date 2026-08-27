import type { CompanionMetricTemplate } from "../companion-metric-template"

export const companionDamageDoneMetric = {
  id: "companion-damage-done",
  name: "Damage Done",
  valueType: "fractional-change",
  effectType: "fractional-change",
} satisfies CompanionMetricTemplate
