import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  type: "divide",
  operands: [
    {
      type: "multiply",
      operands: [
        {
          type: "add",
          operands: [
            {
              type: "metric-refs",
              metricIds: ["stamina-dodge-base-cost"],
            },
            {
              type: "sum",
              effectType: "integer",
            },
          ],
        },
        {
          type: "add",
          operands: [
            {
              type: "constant",
              value: 1,
            },
            {
              type: "sum",
              effectType: "fractional-change",
            },
            {
              type: "multiply",
              operands: [
                {
                  type: "constant",
                  value: -1,
                },
                {
                  type: "sum",
                  categories: ["armor"],
                  effectType: "fractional-change",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "add",
      operands: [
        {
          type: "constant",
          value: 1,
        },
        {
          type: "multiply",
          operands: [
            {
              type: "constant",
              value: -1,
            },
            {
              type: "sum",
              categories: ["armor"],
              effectType: "fractional-change",
            },
          ],
        },
      ],
    },
  ],
}
