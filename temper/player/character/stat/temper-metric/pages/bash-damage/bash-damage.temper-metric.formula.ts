import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  type: "multiply",
  operands: [
    {
      type: "add",
      operands: [
        {
          type: "floor",
          operand: {
            type: "multiply",
            operands: [
              {
                type: "metric-refs",
                metricIds: ["resistance-physical"],
              },
              {
                type: "constant",
                value: 0.01125,
              },
            ],
          },
        },
        {
          type: "floor",
          operand: {
            type: "multiply",
            operands: [
              {
                type: "metric-refs",
                metricIds: ["resistance-spell"],
              },
              {
                type: "constant",
                value: 0.01125,
              },
            ],
          },
        },
        {
          type: "constant",
          value: 1,
        },
        {
          type: "sum",
          effectType: "integer",
        },
      ],
    },
    {
      type: "multiply",
      operands: [
        {
          type: "add",
          operands: [
            {
              type: "constant",
              value: 1,
            },
            {
              type: "metric-refs",
              metricIds: [
                "damage-done-physical-without-base",
                "damage-done-base",
                "damage-done-generic",
                "damage-done-direct",
                "damage-done-single-target",
              ],
            },
          ],
        },
        {
          type: "product",
          effectType: "fractional-change",
        },
      ],
    },
  ],
}
