import type { MetricTemplate } from "../metric-template"

export const damageTakenHaMetric = {
  id: "damage-taken-ha",

  name: "Damage Taken (Heavy Attack)",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
