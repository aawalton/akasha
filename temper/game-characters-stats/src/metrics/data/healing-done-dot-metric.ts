import type { MetricTemplate } from "../metric-template"

export const healingDoneDotMetric = {
  id: "healing-done-dot",

  name: "DOT Healing Done",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
