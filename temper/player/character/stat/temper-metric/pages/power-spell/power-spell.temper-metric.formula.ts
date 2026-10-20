import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  type: "multiply",
  operands: [
    {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "integer",
        },
        {
          type: "floor-multiply",
          operands: [
            {
              type: "metric-refs",
              metricIds: ["power-per-resistance"],
            },
            {
              type: "metric-refs",
              metricIds: ["resistance-physical", "resistance-spell"],
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
          type: "sum",
          effectType: "fractional-change",
        },
      ],
    },
  ],
}
