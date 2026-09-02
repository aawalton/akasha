import type { CompanionMetricTemplate } from "@akasha/temper-companions-core/companion-metric-template"

export const companionDamageBlockedMetric = {
  id: "companion-damage-blocked",
  name: "Damage Blocked",
  valueType: "fractional-change",
  effectType: "fractional-change",
} satisfies CompanionMetricTemplate
