import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  "type": "floor-multiply",
  "operands": [
    {
      "type": "sum",
      "effectType": "integer",
    },
    {
      "type": "product",
      "effectType": "fractional-change",
    },
  ],
}
