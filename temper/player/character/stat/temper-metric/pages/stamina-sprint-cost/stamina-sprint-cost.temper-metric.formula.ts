import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  "type": "multiply",
  "operands": [
    {
      "type": "sum",
      "effectType": "integer",
    },
    {
      "type": "product",
      "categories": ["skills"],
      "effectType": "fractional-change",
    },
    {
      "type": "add",
      "operands": [
        {
          "type": "constant",
          "value": 1,
        },
        {
          "type": "sum",
          "categories": ["armor"],
          "effectType": "fractional-change",
        },
      ],
    },
  ],
}
