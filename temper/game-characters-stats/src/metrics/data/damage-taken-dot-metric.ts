import type { MetricTemplate } from "../metric-template"

export const damageTakenDotMetric = {
  id: "damage-taken-dot",

  name: "Damage Taken (DOT)",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
