import type { MetricTemplate } from "../metric-template"

export const damageDoneBleedMetric = {
  id: "damage-done-bleed",

  name: "Damage Done (Bleed)",
  category: "advanced",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_BLEED_DAMAGE",
  esoStatValuePart: "percent",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
