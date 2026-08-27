import type { MetricTemplate } from "../metric-template"

export const damageDonePetMetric = {
  id: "damage-done-pet",

  name: "Damage Done (Pet)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
