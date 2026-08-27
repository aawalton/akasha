import type { MetricTemplate } from "../metric-template"

export const targetPercentHealthMetric = {
  id: "target-percent-health",

  name: "Target Health Percentage",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  formula: {
    type: "add",
    operands: [
      {
        type: "sum",
        effectType: "fractional-change",
      },
    ],
  },
  fullyImplemented: true,
} satisfies MetricTemplate
