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
              "value": 0.008,
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
              "value": 0.084,
            },
            {
              "type": "max",
              "operands": [
                {
                  "type": "metric-refs",
                  "metricIds": ["status-physical-spell-damage"],
                },
                {
                  "type": "metric-refs",
                  "metricIds": ["status-physical-weapon-damage"],
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
          "metricIds": ["damage-done-physical"],
        },
        {
          "type": "metric-refs",
          "metricIds": ["damage-done-direct"],
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
