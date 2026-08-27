import type { MetricTemplate } from "../metric-template"

export const damageTakenDirectMetric = {
  id: "damage-taken-direct",

  name: "Direct Damage Taken",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
