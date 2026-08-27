import type { CompanionMetricTemplate } from "../companion-metric-template"

export const companionHealingReceivedMetric = {
  id: "companion-healing-received",
  name: "Healing Received",
  valueType: "fractional-change",
  effectType: "fractional-change",
} satisfies CompanionMetricTemplate
