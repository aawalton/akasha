import type { MetricTemplate } from "../metric-template"

export const damageTakenLaMetric = {
  id: "damage-taken-la",

  name: "Damage Taken (Light Attack)",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
