import type { MetricTemplate } from "../metric-template"

export const healingDoneBaseMetric = {
  id: "healing-done-base",

  name: "Healing Done",
  category: "advanced",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_HEALING_DONE_BONUSES",
  esoStatValuePart: "percent",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
