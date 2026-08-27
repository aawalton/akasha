import type { MetricTemplate } from "../metric-template"

export const damageDonePhysicalMetric = {
  id: "damage-done-physical",

  name: "Damage Done (Physical)",
  category: "advanced",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_PHYSICAL_DAMAGE",
  esoStatValuePart: "percent",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
