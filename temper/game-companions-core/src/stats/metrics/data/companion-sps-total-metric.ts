import type { CompanionMetricTemplate } from "../companion-metric-template"

export const companionSpsTotalMetric = {
  id: "companion-sps-total",
  name: "Shielding Per Second",
  valueType: "integer",
  formula: {
    type: "add",
    operands: [
      { type: "metric-ref", metricId: "companion-sps-self" },
      { type: "metric-ref", metricId: "companion-sps-ally" },
    ],
  },
} satisfies CompanionMetricTemplate
