import type { MetricTemplate } from "../metric-template"

export const healthMaximumMetric = {
  id: "health-maximum",

  name: "Max Health",
  category: "base",
  esoStatConstantName: "STAT_HEALTH_MAX",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "floor-multiply",
    operands: [
      { type: "sum", effectType: "integer" },
      { type: "product", effectType: "fractional-change" },
    ],
  },
} satisfies MetricTemplate
