import type { MetricTemplate } from "../metric-template"

export const criticalRatingMetric = {
  id: "critical-rating",

  name: "Critical Rating",
  category: "base",
  esoStatConstantName: "STAT_CRITICAL_CHANCE",
  valueType: "rating",
  divisor: 21912,
  cap: 1,
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "add",
    operands: [
      {
        type: "sum",
        effectType: "integer",
      },
    ],
  },
} satisfies MetricTemplate
