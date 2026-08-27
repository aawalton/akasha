import type { MetricTemplate } from "../metric-template"

export const targetDamageTakenMetric = {
  id: "target-damage-taken",

  name: "Target Damage Taken",
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
