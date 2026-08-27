import type { MetricTemplate } from "../metric-template"

export const healingCriticalBonusMetric = {
  id: "healing-critical-bonus",

  name: "Healing Critical Bonus",
  category: "advanced",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_CRITICAL_HEALING",
  esoStatValuePart: "percent",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
