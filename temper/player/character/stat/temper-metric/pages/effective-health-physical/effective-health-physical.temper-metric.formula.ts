import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  "type": "divide",
  "operands": [
    {
      "type": "metric-refs",
      "metricIds": ["health-maximum"],
    },
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
              "type": "multiply",
              "operands": [
                {
                  "type": "constant",
                  "value": -1,
                },
                {
                  "type": "min",
                  "operands": [
                    {
                      "type": "constant",
                      "value": 0.5,
                    },
                    {
                      "type": "metric-refs",
                      "metricIds": ["resistance-physical"],
                      "convertRatingToChance": true,
                    },
                  ],
                },
              ],
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
              "metricIds": ["damage-taken"],
            },
          ],
        },
      ],
    },
  ],
}
