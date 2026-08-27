import type { MetricTemplate } from "../metric-template"

export const targetAttackBonusMetric = {
  id: "target-attack-bonus",

  name: "Target Attack Bonus",
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
