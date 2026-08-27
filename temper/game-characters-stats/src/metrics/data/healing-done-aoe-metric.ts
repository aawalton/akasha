import type { MetricTemplate } from "../metric-template"

export const healingDoneAoeMetric = {
  id: "healing-done-aoe",

  name: "AOE Healing Done",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
