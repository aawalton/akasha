import type { MetricTemplate } from "../metric-template"

export const effectiveHealthMetric = {
  id: "effective-health",

  name: "Effective Health",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "min",
    operands: [
      { type: "metric-refs", metricIds: ["effective-health-physical"] },
      { type: "metric-refs", metricIds: ["effective-health-spell"] },
    ],
  },
} satisfies MetricTemplate
