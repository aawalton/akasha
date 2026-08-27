import type { MetricTemplate } from "../metric-template"

export const targetPowerMetric = {
  id: "target-power",

  name: "Target Power",
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
