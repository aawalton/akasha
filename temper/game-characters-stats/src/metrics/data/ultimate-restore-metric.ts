import type { MetricTemplate } from "../metric-template"

export const ultimateRestoreMetric = {
  id: "ultimate-restore",
  fullyImplemented: true,

  name: "Ultimate Restore",
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
} satisfies MetricTemplate
