import type { MetricTemplate } from "../metric-template"

export const damageDonePoisonMetric = {
  id: "damage-done-poison",

  name: "Damage Done (Poison)",
  category: "advanced",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_POISON_DAMAGE",
  esoStatValuePart: "percent",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
