import type { MetricTemplate } from "../metric-template"

export const targetResistanceMetric = {
  id: "target-resistance",

  name: "Target Resistance",
  valueType: "integer",
  polarity: "higher-is-better",
  formula: {
    type: "add",
    operands: [
      {
        type: "sum",
        effectType: "integer",
      },
    ],
  },
  fullyImplemented: true,
} satisfies MetricTemplate
