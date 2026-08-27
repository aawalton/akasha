import type { MetricTemplate } from "../metric-template"

export const damageDoneBaseMetric = {
  id: "damage-done-base",

  name: "Damage Done",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
