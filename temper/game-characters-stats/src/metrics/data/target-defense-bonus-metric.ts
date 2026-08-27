import type { MetricTemplate } from "../metric-template"

export const targetDefenseBonusMetric = {
  id: "target-defense-bonus",

  name: "Target Defense Bonus",
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
