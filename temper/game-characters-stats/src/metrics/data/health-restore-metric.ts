import type { MetricTemplate } from "../metric-template"

export const healthRestoreMetric = {
  id: "health-restore",

  name: "Restore Health",
  valueType: "number-per-second",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "add",
    operands: [
      {
        type: "sum",
        effectType: "number-per-seconds",
      },
    ],
  },
} satisfies MetricTemplate
