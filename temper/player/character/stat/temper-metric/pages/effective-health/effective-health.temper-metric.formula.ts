import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  type: "divide",
  operands: [
    {
      type: "constant",
      value: 2,
    },
    {
      type: "add",
      operands: [
        {
          type: "divide",
          operands: [
            {
              type: "constant",
              value: 1,
            },
            {
              type: "metric-refs",
              metricIds: ["effective-health-physical"],
            },
          ],
        },
        {
          type: "divide",
          operands: [
            {
              type: "constant",
              value: 1,
            },
            {
              type: "metric-refs",
              metricIds: ["effective-health-spell"],
            },
          ],
        },
      ],
    },
  ],
}
