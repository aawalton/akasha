import type { CompanionMetricTemplate } from "@akasha/temper-companions-core/companion-metric-template"

export const companionHealingReceivedMetric = {
  id: "companion-healing-received",
  name: "Healing Received",
  valueType: "fractional-change",
  effectType: "fractional-change",
} satisfies CompanionMetricTemplate
