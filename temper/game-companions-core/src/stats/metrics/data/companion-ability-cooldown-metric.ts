import type { CompanionMetricTemplate } from "../companion-metric-template"

export const companionAbilityCooldownMetric = {
  id: "companion-ability-cooldown",
  name: "Cooldown",
  valueType: "fractional-change",
  effectType: "fractional-change",
} satisfies CompanionMetricTemplate
