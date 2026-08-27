import type { MetricTemplate } from "../metric-template"

export const targetMagickaAbilityCostMetric = {
  id: "target-magicka-ability-cost",
  fullyImplemented: true,

  name: "Target Magicka Ability Cost",
  valueType: "fractional-change",
  polarity: "lower-is-better",
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
