import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  "type": "multiply",
  "operands": [
    {
      "type": "add",
      "operands": [
        {
          "type": "sum",
          "effectType": "integer",
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
          "value": -3,
        },
        {
          "type": "product",
          "categories": ["skills"],
          "effectType": "fractional-change",
        },
        {
          "type": "product",
          "categories": ["armor"],
          "effectType": "fractional-change",
        },
        {
          "type": "product",
          "categories": ["sets"],
          "effectType": "fractional-change",
        },
        {
          "type": "product",
          "categories": ["buffs"],
          "effectType": "fractional-change",
        },
      ],
    },
  ],
}
