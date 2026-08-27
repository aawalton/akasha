import type { MetricTemplate } from "../metric-template"

export const targetHealthRecoveryMetric = {
  id: "target-health-recovery",
  fullyImplemented: true,

  name: "Target Health Recovery",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  formula: {
    type: "add",
    operands: [
      {
        type: "sum",
        effectType: "fractional-change",
      },
    ],
  },
} satisfies MetricTemplate
