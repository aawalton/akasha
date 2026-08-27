import type { MetricTemplate } from "../metric-template"

export const magickaAbilityCostMetric = {
  id: "magicka-ability-cost",
  fullyImplemented: true,

  name: "Magicka Ability Cost",
  valueType: "fractional-change",
  polarity: "lower-is-better",
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
          {
            type: "add",
            operands: [
              { type: "constant", value: 1 },
              { type: "sum", categories: ["curse"], effectType: "fractional-change" },
            ],
          },
        ],
      },
      { type: "constant", value: -1 },
    ],
  },
} satisfies MetricTemplate
