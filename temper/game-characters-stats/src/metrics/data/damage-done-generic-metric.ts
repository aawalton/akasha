import type { MetricTemplate } from "../metric-template"

export const damageDoneGenericMetric = {
  id: "damage-done-generic",

  name: "Damage Done (Generic)",
  category: "advanced",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_GENERIC_DAMAGE",
  esoStatValuePart: "percent",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
