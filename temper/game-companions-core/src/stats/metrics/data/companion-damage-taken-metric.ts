import type { CompanionMetricTemplate } from "../companion-metric-template"

export const companionDamageTakenMetric = {
  id: "companion-damage-taken",
  name: "Damage Taken",
  valueType: "fractional-change",
  effectType: "fractional-change",
} satisfies CompanionMetricTemplate
