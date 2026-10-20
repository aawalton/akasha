import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  type: "multiply",
  operands: [
    {
      type: "floor",
      operand: {
        type: "sum",
        effectType: "integer",
      },
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
          effectType: "fractional-change",
        },
        {
          type: "multiply",
          operands: [
            {
              type: "constant",
              value: -1,
            },
            {
              type: "sum",
              categories: ["curse"],
              effectType: "fractional-change",
            },
          ],
        },
      ],
    },
    {
      type: "product",
      categories: ["curse"],
      effectType: "fractional-change",
    },
  ],
}
