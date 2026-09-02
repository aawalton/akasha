import type { CompanionMetricTemplate } from "@akasha/temper-companions-core/companion-metric-template"

export const companionDamageTakenMetric = {
  id: "companion-damage-taken",
  name: "Damage Taken",
  valueType: "fractional-change",
  effectType: "fractional-change",
} satisfies CompanionMetricTemplate
