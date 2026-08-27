import type { MetricTemplate } from "../metric-template"

export const damageDoneBowMetric = {
  id: "damage-done-bow",

  name: "Damage Done (Bow)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
