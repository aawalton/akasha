import type { MetricTemplate } from "../metric-template"

export const damageTakenMetric = {
  id: "damage-taken",

  name: "Damage Taken",
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
