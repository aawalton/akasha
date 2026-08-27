import type { MetricTemplate } from "../metric-template"

export const overloadDamageMetric = {
  id: "overload-damage",

  name: "Overload Damage",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
