import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  "type": "add",
  "operands": [
    {
      "type": "sum",
      "effectType": "integer",
    },
    {
      "type": "floor",
      "operand": {
        "type": "multiply",
        "operands": [
          {
            "type": "sum",
            "effectType": "fractional-change",
          },
          {
            "type": "metric-refs",
            "metricIds": ["player-effective-level"],
          },
          {
            "type": "constant",
            "value": 100,
          },
        ],
      },
    },
  ],
}
