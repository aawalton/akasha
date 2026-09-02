import type { CompanionMetricTemplate } from "@akasha/temper-companions-core/companion-metric-template"

export const companionBuffDurationMetric = {
  id: "companion-buff-duration",
  name: "Buff Duration",
  valueType: "fractional-change",
  effectType: "fractional-change",
} satisfies CompanionMetricTemplate
