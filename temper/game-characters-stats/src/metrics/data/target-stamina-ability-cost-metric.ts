import type { MetricTemplate } from "../metric-template"

export const targetStaminaAbilityCostMetric = {
  id: "target-stamina-ability-cost",
  fullyImplemented: true,

  name: "Target Stamina Ability Cost",
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
