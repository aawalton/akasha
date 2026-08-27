import type { MetricTemplate } from "../metric-template"

export const effectiveHealingMetric = {
  id: "effective-healing",

  name: "Effective Healing Power",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "max",
    operands: [
      { type: "metric-refs", metricIds: ["effective-healing-spell"] },
      { type: "metric-refs", metricIds: ["effective-healing-weapon"] },
    ],
  },
} satisfies MetricTemplate
