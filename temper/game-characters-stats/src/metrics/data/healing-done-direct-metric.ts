import type { MetricTemplate } from "../metric-template"

export const healingDoneDirectMetric = {
  id: "healing-done-direct",

  name: "Direct Healing Done",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
