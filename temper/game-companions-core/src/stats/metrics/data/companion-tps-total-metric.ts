import type { CompanionMetricTemplate } from "@akasha/temper-companions-core/companion-metric-template"

export const companionTpsTotalMetric = {
  id: "companion-tps-total",
  name: "Toughness Per Second",
  valueType: "integer",
  formula: {
    type: "add",
    operands: [
      { type: "metric-ref", metricId: "companion-effective-toughness" },
      { type: "metric-ref", metricId: "companion-tps-buff" },
      { type: "metric-ref", metricId: "companion-tps-self-hps" },
      { type: "metric-ref", metricId: "companion-tps-shield" },
    ],
  },
} satisfies CompanionMetricTemplate
