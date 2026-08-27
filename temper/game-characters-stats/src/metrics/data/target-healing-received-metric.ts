import type { MetricTemplate } from "../metric-template"

export const targetHealingReceivedMetric = {
  id: "target-healing-received",

  name: "Target Healing Received",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
