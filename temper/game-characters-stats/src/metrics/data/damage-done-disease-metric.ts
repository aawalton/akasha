import type { MetricTemplate } from "../metric-template"

export const damageDoneDiseaseMetric = {
  id: "damage-done-disease",

  name: "Damage Done (Disease)",
  category: "advanced",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_DISEASE_DAMAGE",
  esoStatValuePart: "percent",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
