import type { MetricTemplate } from "../metric-template"

export const effectivePowerMetric = {
  id: "effective-power",

  name: "Effective Power",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "max",
    operands: [
      { type: "metric-refs", metricIds: ["effective-power-spell"] },
      { type: "metric-refs", metricIds: ["effective-power-weapon"] },
    ],
  },
} satisfies MetricTemplate
