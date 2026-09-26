import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  "type": "divide",
  "operands": [
    {
      "type": "min",
      "operands": [
        {
          "type": "constant",
          "value": 33000,
        },
        {
          "type": "metric-refs",
          "metricIds": ["resistance-physical"],
        },
      ],
    },
    {
      "type": "constant",
      "value": 66000,
    },
  ],
}
