import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  "type": "floor",
  "operand": {
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
            "effectType": "fractional-change",
          },
        ],
      },
    ],
  },
}
