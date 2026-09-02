import type { CompanionMetricTemplate } from "@akasha/temper-companions-core/companion-metric-template"

export const companionTpsSelfHpsMetric = {
  id: "companion-tps-self-hps",
  name: "Self Healing Per Second",
  valueType: "integer",
} satisfies CompanionMetricTemplate
