import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  type: "divide",
  operands: [
    {
      type: "divide",
      operands: [
        {
          type: "metric-refs",
          metricIds: ["resistance-poison"],
        },
        {
          type: "constant",
          value: 660,
        },
      ],
    },
    {
      type: "constant",
      value: 100,
    },
  ],
}
