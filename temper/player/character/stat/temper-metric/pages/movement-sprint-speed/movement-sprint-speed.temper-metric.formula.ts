import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  type: "divide",
  operands: [
    {
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
                  type: "add",
                  operands: [
                    {
                      type: "constant",
                      value: 1,
                    },
                    {
                      type: "constant",
                      value: 0.4,
                    },
                  ],
                },
                {
                  type: "add",
                  operands: [
                    {
                      type: "sum",
                      effectType: "fractional-change",
                      sign: "increase",
                    },
                    {
                      type: "sum",
                      effectType: "fractional-change",
                      sign: "decrease",
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
      type: "constant",
      value: 100,
    },
  ],
}
