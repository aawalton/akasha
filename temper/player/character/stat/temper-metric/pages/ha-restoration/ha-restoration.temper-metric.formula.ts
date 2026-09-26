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
              "value": 0.071429,
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
              "value": 0.75,
            },
            {
              "type": "max",
              "operands": [
                {
                  "type": "metric-refs",
                  "metricIds": ["ha-magic-spell-damage"],
                },
                {
                  "type": "metric-refs",
                  "metricIds": ["ha-magic-weapon-damage"],
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
          "type": "sum",
          "effectType": "fractional-change",
        },
        {
          "type": "metric-refs",
          "metricIds": ["damage-done-magic"],
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
