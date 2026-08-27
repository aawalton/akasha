import type { CompanionMetricTemplate } from "../companion-metric-template"

export const companionTargetArmorMetric = {
  id: "companion-target-armor",
  name: "Target Armor",
  valueType: "rating",
  effectType: "integer",
  divisor: 50000,
  cap: 0.5,
} satisfies CompanionMetricTemplate
