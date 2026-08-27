import type { MetricTemplate } from "../metric-template"

export const damageTakenFromAreaMetric = {
  id: "damage-taken-from-area",

  name: "Damage Taken from Area",
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
