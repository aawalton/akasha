import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  type: "floor-product",
  operand: {
    type: "constant",
    value: 133,
  },
  effectType: "fractional-change",
}
