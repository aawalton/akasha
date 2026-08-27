import type { MetricTemplate } from "../metric-template"

export const healthAbilityCostMetric = {
  id: "health-ability-cost",

  name: "Health Ability Cost",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: {
    type: "add",
    operands: [
      {
        type: "multiply",
        operands: [
          {
            type: "add",
            operands: [
              { type: "constant", value: 1 },
              { type: "sum", categories: ["champion-points"], effectType: "fractional-change" },
            ],
          },
          {
            type: "add",
            operands: [
              { type: "constant", value: 1 },
              { type: "sum", categories: ["skills"], effectType: "fractional-change" },
            ],
          },
          {
            type: "add",
            operands: [
              { type: "constant", value: 1 },
              { type: "sum", categories: ["sets"], effectType: "fractional-change" },
            ],
          },
          {
            type: "add",
            operands: [
              { type: "constant", value: 1 },
              { type: "sum", categories: ["buffs"], effectType: "fractional-change" },
            ],
          },
        ],
      },
      { type: "constant", value: -1 },
    ],
  },
} satisfies MetricTemplate
