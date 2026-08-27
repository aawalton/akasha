import type { CompanionMetricTemplate } from "../companion-metric-template"

export const companionHpsTotalMetric = {
  id: "companion-hps-total",
  name: "Healing Per Second",
  valueType: "integer",
  formula: {
    type: "add",
    operands: [
      { type: "metric-ref", metricId: "companion-hps-direct" },
      { type: "metric-ref", metricId: "companion-hps-hot" },
      { type: "metric-ref", metricId: "companion-hps-shield" },
    ],
  },
} satisfies CompanionMetricTemplate
