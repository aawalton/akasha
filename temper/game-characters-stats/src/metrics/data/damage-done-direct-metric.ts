import type { MetricTemplate } from "../metric-template"

export const damageDoneDirectMetric = {
  id: "damage-done-direct",

  name: "Damage Done (Direct)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
