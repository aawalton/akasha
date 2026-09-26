import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  "type": "multiply",
  "operands": [
    {
      "type": "add",
      "operands": [
        {
          "type": "multiply",
          "operands": [
            {
              "type": "metric-refs",
              "metricIds": ["stamina-maximum"],
            },
            {
              "type": "constant",
              "value": 0.095238,
            },
          ],
        },
        {
          "type": "metric-refs",
          "metricIds": ["power-weapon"],
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
              "type": "metric-refs",
              "metricIds": ["critical-rating-weapon"],
              "convertRatingToChance": true,
            },
            {
              "type": "metric-refs",
              "metricIds": ["attack-crit-damage-weapon"],
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
          "type": "multiply",
          "operands": [
            {
              "type": "constant",
              "value": -1,
            },
            {
              "type": "metric-refs",
              "metricIds": ["attack-physical-mitigation"],
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
          "metricIds": ["target-damage-taken"],
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
          "metricIds": ["damage-done-base"],
        },
      ],
    },
  ],
}
