import type { MetricTemplate } from "../metric-template"

export const damageDoneFrostMetric = {
  id: "damage-done-frost",

  name: "Damage Done (Frost)",
  category: "advanced",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_COLD_DAMAGE",
  esoStatValuePart: "percent",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
