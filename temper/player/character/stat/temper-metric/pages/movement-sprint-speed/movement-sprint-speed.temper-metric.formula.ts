import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  type: "divide",
  operands: [
    {
      type: "floor",
      operand: {
        type: "multiply",
        operands: [
          {
            type: "constant",
            value: 100,
          },
          {
            type: "min",
            operands: [
              {
                type: "constant",
                value: 2,
              },
              {
                type: "add",
                operands: [
                  {
                    type: "constant",
                    value: 1,
                  },
                  {
                    type: "add",
                    operands: [
                      {
                        type: "constant",
                        value: 0.4,
                      },
                      {
                        type: "sum",
                        effectType: "fractional-change",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      type: "constant",
      value: 100,
    },
  ],
}
