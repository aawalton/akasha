import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  "type": "multiply",
  "operands": [
    {
      "type": "metric-refs",
      "metricIds": ["health-recovery"],
    },
    {
      "type": "constant",
      "value": 4,
    },
  ],
}
