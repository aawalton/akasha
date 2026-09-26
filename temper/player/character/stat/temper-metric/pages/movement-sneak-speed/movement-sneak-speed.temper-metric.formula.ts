import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  "type": "multiply",
  "operands": [
    {
      "type": "constant",
      "value": 1,
    },
    {
      "type": "add",
      "operands": [
        {
          "type": "constant",
          "value": 1,
        },
        {
          "type": "metric-refs",
          "metricIds": ["movement-sneak-penalty"],
        },
        {
          "type": "sum",
          "categories": ["buffs", "mundus", "skills", "sets"],
          "effectType": "fractional-change",
        },
      ],
    },
    {
      "type": "product",
      "effectType": "fractional-change",
    },
  ],
}
