import type { MetricTemplate } from "../metric-template"

export const targetCriticalRatingMetric = {
  id: "target-critical-rating",

  name: "Target Critical Rating",
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
