import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  "type": "add",
  "operands": [
    {
      "type": "constant",
      "value": 1,
    },
    {
      "type": "multiply",
      "operands": [
        {
          "type": "constant",
          "value": -0.5,
        },
        {
          "type": "add",
          "operands": [
            {
              "type": "constant",
              "value": 1,
            },
            {
              "type": "multiply",
              "operands": [
                {
                  "type": "constant",
                  "value": -1,
                },
                {
                  "type": "sum",
                  "effectType": "fractional-change",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
