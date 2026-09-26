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
              "type": "metric-refs",
              "metricIds": ["healing-done-base"],
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
              "type": "metric-refs",
              "metricIds": ["healing-taken-base"],
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
              "type": "metric-refs",
              "metricIds": ["healing-received-base"],
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
