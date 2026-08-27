import type { MetricTemplate } from "../metric-template"

export const damageTakenFallMetric = {
  id: "damage-taken-fall",

  name: "Damage Taken (Fall)",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
