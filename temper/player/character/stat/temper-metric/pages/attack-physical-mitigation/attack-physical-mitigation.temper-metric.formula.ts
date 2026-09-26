import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  "type": "multiply",
  "operands": [
    {
      "type": "max",
      "operands": [
        {
          "type": "constant",
          "value": 0,
        },
        {
          "type": "min",
          "operands": [
            {
              "type": "constant",
              "value": 1,
            },
            {
              "type": "multiply",
              "operands": [
                {
                  "type": "add",
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
                          "metricIds": ["target-physical-resistance"],
                        },
                      ],
                    },
                    {
                      "type": "metric-refs",
                      "metricIds": ["target-physical-debuff"],
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
                          "metricIds": ["penetration-physical"],
                        },
                      ],
                    },
                  ],
                },
                {
                  "type": "divide",
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
                          "metricIds": ["player-effective-level"],
                        },
                        {
                          "type": "constant",
                          "value": 1000,
                        },
                      ],
                    },
                  ],
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
          "type": "multiply",
          "operands": [
            {
              "type": "constant",
              "value": -1,
            },
            {
              "type": "metric-refs",
              "metricIds": ["target-defense-bonus"],
            },
          ],
        },
      ],
    },
  ],
}
