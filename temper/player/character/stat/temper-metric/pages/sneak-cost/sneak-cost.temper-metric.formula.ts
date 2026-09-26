import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  "type": "multiply",
  "operands": [
    {
      "type": "constant",
      "value": 105,
    },
    {
      "type": "product",
      "effectType": "fractional-change",
    },
  ],
}
