import type { MetricTemplate } from "../metric-template"

export const healingTakenBaseMetric = {
  id: "healing-taken-base",

  name: "Healing Taken",
  category: "advanced",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_HEALING_TAKEN_BONUSES",
  esoStatValuePart: "percent",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
