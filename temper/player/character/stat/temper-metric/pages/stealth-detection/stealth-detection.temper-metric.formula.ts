import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  "type": "multiply",
  "operands": [
    {
      "type": "max",
      "operands": [
        {
          "type": "constant",
          "value": 0,
        },
        {
          "type": "add",
          "operands": [
            {
              "type": "constant",
              "value": 6.5,
            },
            {
              "type": "sum",
              "effectType": "integer",
            },
          ],
        },
      ],
    },
    {
      "type": "product",
      "effectType": "fractional-change",
    },
  ],
}
