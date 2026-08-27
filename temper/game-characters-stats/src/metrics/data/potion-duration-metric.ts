import type { MetricTemplate } from "../metric-template"

export const potionDurationMetric = {
  id: "potion-duration",

  name: "Potion Duration",
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
