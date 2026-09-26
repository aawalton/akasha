import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  "type": "add",
  "operands": [
    {
      "type": "constant",
      "value": 4,
    },
    {
      "type": "sum",
      "effectType": "integer",
    },
  ],
}
