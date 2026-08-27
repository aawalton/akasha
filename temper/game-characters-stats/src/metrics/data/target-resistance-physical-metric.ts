import type { MetricTemplate } from "../metric-template"

export const targetResistancePhysicalMetric = {
  id: "target-physical-resistance",

  name: "Target Physical Resistance",
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
