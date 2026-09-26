import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  "type": "add",
  "operands": [
    {
      "type": "metric-refs",
      "metricIds": ["critical-damage-spell"],
    },
    {
      "type": "multiply",
      "operands": [
        {
          "type": "constant",
          "value": -1,
        },
        {
          "type": "metric-refs",
          "metricIds": ["target-critical-resistance"],
          "convertRatingToChance": true,
        },
      ],
    },
  ],
}
