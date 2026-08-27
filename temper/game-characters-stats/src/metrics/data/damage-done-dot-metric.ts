import type { MetricTemplate } from "../metric-template"

export const damageDoneDotMetric = {
  id: "damage-done-dot",

  name: "Damage Done (DOT)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
