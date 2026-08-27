import type { MetricTemplate } from "../metric-template"

export const damageDoneFlameMetric = {
  id: "damage-done-flame",

  name: "Damage Done (Flame)",
  category: "advanced",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_FIRE_DAMAGE",
  esoStatValuePart: "percent",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
