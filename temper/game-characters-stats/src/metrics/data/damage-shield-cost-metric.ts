import type { MetricTemplate } from "../metric-template"

export const damageShieldCostMetric = {
  id: "damage-shield-cost",

  name: "Damage Shield Cost",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
