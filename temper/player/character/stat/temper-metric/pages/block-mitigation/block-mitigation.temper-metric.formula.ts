import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  type: "add",
  operands: [
    {
      type: "multiply",
      operands: [
        {
          type: "constant",
          value: 0.5,
        },
        {
          type: "sum",
          effectType: "fractional-change",
        },
      ],
    },
    {
      type: "sum",
      effectType: "integer",
    },
    {
      type: "constant",
      value: 0.5,
    },
  ],
}
