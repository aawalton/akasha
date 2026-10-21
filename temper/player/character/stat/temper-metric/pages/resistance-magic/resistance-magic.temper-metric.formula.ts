import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  type: "add",
  operands: [
    {
      type: "floor",
      operand: {
        type: "add",
        operands: [
          {
            type: "sum",
            categories: [
              "account",
              "armor",
              "attributes",
              "base",
              "buffs",
              "companion-armor",
              "companion-base",
              "companion-jewelry",
              "companion-skills",
              "companion-weapons",
              "curse",
              "debuffs",
              "food-or-drink",
              "jewelry",
              "mundus",
              "poisons",
              "potions",
              "sets",
              "target",
              "weapons",
            ],
            effectType: "integer",
          },
          {
            type: "floor",
            operand: {
              type: "sum",
              categories: ["skills"],
              effectType: "integer",
            },
          },
          {
            type: "multiply",
            operands: [
              {
                type: "add",
                operands: [
                  {
                    type: "sum-for-metric",
                    metricId: "resistance",
                    categories: [
                      "account",
                      "armor",
                      "attributes",
                      "base",
                      "buffs",
                      "companion-armor",
                      "companion-base",
                      "companion-jewelry",
                      "companion-skills",
                      "companion-weapons",
                      "curse",
                      "debuffs",
                      "food-or-drink",
                      "jewelry",
                      "mundus",
                      "poisons",
                      "potions",
                      "sets",
                      "target",
                      "weapons",
                    ],
                    effectType: "integer",
                  },
                  {
                    type: "floor",
                    operand: {
                      type: "sum-for-metric",
                      metricId: "resistance",
                      categories: ["skills"],
                      effectType: "integer",
                    },
                  },
                ],
              },
              {
                type: "sum-for-metric",
                metricId: "resistance",
                effectType: "fractional-change",
              },
            ],
          },
          {
            type: "constant",
            value: 0.5,
          },
        ],
      },
    },
    {
      type: "floor",
      operand: {
        type: "add",
        operands: [
          {
            type: "sum",
            categories: ["champion-points"],
            effectType: "integer",
          },
          {
            type: "multiply",
            operands: [
              {
                type: "sum-for-metric",
                metricId: "resistance",
                categories: ["champion-points"],
                effectType: "integer",
              },
              {
                type: "sum-for-metric",
                metricId: "resistance",
                effectType: "fractional-change",
              },
            ],
          },
        ],
      },
    },
  ],
}
