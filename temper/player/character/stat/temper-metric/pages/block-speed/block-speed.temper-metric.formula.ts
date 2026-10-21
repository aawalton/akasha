import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  type: "divide",
  operands: [
    {
      type: "floor",
      operand: {
        type: "multiply",
        operands: [
          {
            type: "constant",
            value: 40,
          },
          {
            type: "add",
            operands: [
              {
                type: "constant",
                value: 1,
              },
              {
                type: "sum",
                categories: ["skills"],
                effectType: "fractional-change",
              },
            ],
          },
          {
            type: "add",
            operands: [
              {
                type: "constant",
                value: 1,
              },
              {
                type: "sum",
                categories: ["champion-points"],
                effectType: "fractional-change",
              },
            ],
          },
        ],
      },
    },
    {
      type: "constant",
      value: 100,
    },
  ],
}
