import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  type: "floor",
  operand: {
    type: "add",
    operands: [
      {
        type: "sum",
        effectType: "integer",
      },
      {
        type: "multiply",
        operands: [
          {
            type: "sum-for-metric",
            metricId: "resistance",
            effectType: "integer",
          },
          {
            type: "sum-for-metric",
            metricId: "resistance",
            effectType: "fractional-change",
          },
        ],
      },
    ],
  },
}
