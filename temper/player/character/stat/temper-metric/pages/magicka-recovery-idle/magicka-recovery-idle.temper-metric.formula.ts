import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  "type": "multiply",
  "operands": [
    {
      "type": "sum-for-metric",
      "metricId": "magicka-recovery",
      "effectType": "integer",
    },
    {
      "type": "add",
      "operands": [
        {
          "type": "constant",
          "value": 1,
        },
        {
          "type": "sum-for-metric",
          "metricId": "magicka-recovery",
          "effectType": "fractional-change",
        },
      ],
    },
    {
      "type": "constant",
      "value": 2,
    },
  ],
}
