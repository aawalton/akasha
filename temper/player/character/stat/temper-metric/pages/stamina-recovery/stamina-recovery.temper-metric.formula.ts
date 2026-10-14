import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  type: "multiply",
  operands: [
    {
      type: "floor",
      operand: {
        type: "add",
        operands: [
          {
            type: "sum",
            effectType: "integer",
          },
          {
            type: "constant",
            value: 0.5,
          },
        ],
      },
    },
    {
      type: "product",
      effectType: "fractional-change",
    },
  ],
}
