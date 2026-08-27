import type { MetricTemplate } from "../metric-template"

export const targetUltimateRestorationMetric = {
  id: "target-ultimate-restoration",
  fullyImplemented: true,

  name: "Target Ultimate Restoration",
  valueType: "number-per-second",
  polarity: "higher-is-better",
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
