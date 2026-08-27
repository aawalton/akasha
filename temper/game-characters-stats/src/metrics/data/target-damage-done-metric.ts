import type { MetricTemplate } from "../metric-template"

export const targetDamageDoneMetric = {
  id: "target-damage-done",

  name: "Target Damage Done",
  valueType: "fractional-change",
  polarity: "higher-is-better",
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
