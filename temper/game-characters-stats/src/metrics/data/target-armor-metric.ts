import type { MetricTemplate } from "../metric-template"

export const targetArmorMetric = {
  id: "target-armor",

  name: "Target Armor",
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
