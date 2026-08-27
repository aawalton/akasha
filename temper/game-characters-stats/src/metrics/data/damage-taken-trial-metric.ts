import type { MetricTemplate } from "../metric-template"

export const damageTakenTrialMetric = {
  id: "damage-taken-trial",

  name: "Damage Taken (Trial)",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: {
    type: "add",
    operands: [
      {
        type: "sum",
        effectType: "fractional-change",
      },
    ],
  },
} satisfies MetricTemplate
