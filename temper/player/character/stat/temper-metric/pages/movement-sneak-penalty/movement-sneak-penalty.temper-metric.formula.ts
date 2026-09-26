import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  "type": "multiply",
  "operands": [
    {
      "type": "sum",
      "effectType": "fractional-change",
      "categories": ["base"],
    },
    {
      "type": "max",
      "operands": [
        {
          "type": "constant",
          "value": 0,
        },
        {
          "type": "product",
          "effectType": "fractional-change",
          "categories": ["champion-points", "skills", "sets", "buffs"],
        },
      ],
    },
  ],
}
