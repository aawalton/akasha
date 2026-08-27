import type { MetricTemplate } from "../metric-template"

export const targetCriticalResistanceMetric = {
  id: "target-critical-resistance",

  name: "Target Critical Resistance",
  valueType: "rating",
  divisor: 5000,
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
