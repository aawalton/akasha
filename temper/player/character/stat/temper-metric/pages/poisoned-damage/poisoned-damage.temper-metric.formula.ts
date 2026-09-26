import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  "type": "multiply",
  "operands": [
    {
      "type": "add",
      "operands": [
        {
          "type": "floor-multiply",
          "operands": [
            {
              "type": "constant",
              "value": 0.0144,
            },
            {
              "type": "max",
              "operands": [
                {
                  "type": "metric-refs",
                  "metricIds": ["magicka-maximum"],
                },
                {
                  "type": "metric-refs",
                  "metricIds": ["stamina-maximum"],
                },
              ],
            },
          ],
        },
        {
          "type": "floor-multiply",
          "operands": [
            {
              "type": "constant",
              "value": 0.1512,
            },
            {
              "type": "max",
              "operands": [
                {
                  "type": "metric-refs",
                  "metricIds": ["status-poison-spell-damage"],
                },
                {
                  "type": "metric-refs",
                  "metricIds": ["status-poison-weapon-damage"],
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
          "metricIds": ["damage-done-poison"],
        },
        {
          "type": "metric-refs",
          "metricIds": ["damage-done-dot"],
        },
        {
          "type": "metric-refs",
          "metricIds": ["damage-done-single-target"],
        },
        {
          "type": "metric-refs",
          "metricIds": ["damage-done-base"],
        },
      ],
    },
  ],
}
