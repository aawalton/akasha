import type { MetricTemplate } from "../metric-template"

export const movementSneakPenaltyMetric = {
  id: "movement-sneak-penalty",

  name: "Sneak Penalty",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "multiply",
    operands: [
      {
        type: "sum",
        effectType: "fractional-change",
        categories: ["base"],
      },
      {
        type: "max",
        operands: [
          { type: "constant", value: 0 },
          {
            type: "product",
            effectType: "fractional-change",
            categories: ["champion-points", "skills", "sets", "buffs"],
          },
        ],
      },
    ],
  },
} satisfies MetricTemplate
