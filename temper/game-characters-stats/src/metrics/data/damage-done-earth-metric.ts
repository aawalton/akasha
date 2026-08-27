import type { MetricTemplate } from "../metric-template"

export const damageDoneEarthMetric = {
  id: "damage-done-earth",

  name: "Damage Done (Earth)",
  category: "advanced",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_EARTH_DAMAGE",
  esoStatValuePart: "percent",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
