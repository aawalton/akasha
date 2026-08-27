import type { MetricTemplate } from "../metric-template"

export const damageDoneOblivionMetric = {
  id: "damage-done-oblivion",

  name: "Damage Done (Oblivion)",
  category: "advanced",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_OBLIVION_DAMAGE",
  esoStatValuePart: "percent",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
