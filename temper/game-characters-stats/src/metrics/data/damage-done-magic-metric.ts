import type { MetricTemplate } from "../metric-template"

export const damageDoneMagicMetric = {
  id: "damage-done-magic",

  name: "Damage Done (Magic)",
  category: "advanced",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_MAGIC_DAMAGE",
  esoStatValuePart: "percent",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
