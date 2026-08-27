import type { MetricTemplate } from "../metric-template"

export const damageDoneShockMetric = {
  id: "damage-done-shock",

  name: "Damage Done (Shock)",
  category: "advanced",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_SHOCK_DAMAGE",
  esoStatValuePart: "percent",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
