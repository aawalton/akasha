import type { CompanionMetricTemplate } from "../companion-metric-template"

export const companionDpsTotalMetric = {
  id: "companion-dps-total",
  name: "Damage Per Second",
  valueType: "integer",
  formula: {
    type: "add",
    operands: [
      { type: "metric-ref", metricId: "companion-dps-direct" },
      { type: "metric-ref", metricId: "companion-dps-dot" },
    ],
  },
} satisfies CompanionMetricTemplate
