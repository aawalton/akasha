import type { MetricTemplate } from "../metric-template"

export const healingDoneSingleTargetMetric = {
  id: "healing-done-single-target",

  name: "Single Target Healing Done",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
