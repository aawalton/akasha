import type { MetricTemplate } from "../metric-template"

export const targetPenetrationMetric = {
  id: "target-penetration",

  name: "Target Penetration",
  valueType: "integer",
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
