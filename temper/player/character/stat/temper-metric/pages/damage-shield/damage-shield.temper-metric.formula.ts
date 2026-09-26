import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  "type": "add",
  "operands": [
    {
      "type": "multiply",
      "operands": [
        {
          "type": "add",
          "operands": [
            {
              "type": "constant",
              "value": 1,
            },
            {
              "type": "sum",
              "categories": ["champion-points"],
              "effectType": "fractional-change",
            },
          ],
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
              "categories": ["buffs"],
              "effectType": "fractional-change",
            },
          ],
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
              "categories": ["sets"],
              "effectType": "fractional-change",
            },
          ],
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
              "categories": ["skills"],
              "effectType": "fractional-change",
            },
          ],
        },
      ],
    },
    {
      "type": "constant",
      "value": -1,
    },
  ],
}
