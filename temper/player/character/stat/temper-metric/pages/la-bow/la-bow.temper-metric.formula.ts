import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  "type": "multiply",
  "operands": [
    {
      "type": "min",
      "operands": [
        {
          "type": "add",
          "operands": [
            {
              "type": "floor-multiply",
              "operands": [
                {
                  "type": "constant",
                  "value": 0.045,
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
                  "value": 0.4725,
                },
                {
                  "type": "max",
                  "operands": [
                    {
                      "type": "metric-refs",
                      "metricIds": ["la-physical-weapon-damage"],
                    },
                    {
                      "type": "metric-refs",
                      "metricIds": ["la-physical-spell-damage"],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          "type": "constant",
          "value": 3465,
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
          "metricIds": ["damage-done-bow"],
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
