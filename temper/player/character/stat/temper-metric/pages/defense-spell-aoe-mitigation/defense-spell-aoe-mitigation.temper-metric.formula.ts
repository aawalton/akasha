import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
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
          "type": "metric-refs",
          "metricIds": ["damage-taken-from-area"],
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
          "type": "multiply",
          "operands": [
            {
              "type": "constant",
              "value": -1,
            },
            {
              "type": "metric-refs",
              "metricIds": ["defense-spell-mitigation"],
            },
          ],
        },
      ],
    },
  ],
}
