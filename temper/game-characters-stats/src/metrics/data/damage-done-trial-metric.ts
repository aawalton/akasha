import type { MetricTemplate } from "../metric-template"

export const damageDoneTrialMetric = {
  id: "damage-done-trial",

  name: "Damage Done (Trial)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "fractional-change",
  },
} satisfies MetricTemplate
