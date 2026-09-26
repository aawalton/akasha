import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  "type": "min",
  "operands": [
    {
      "type": "metric-refs",
      "metricIds": ["effective-health-physical"],
    },
    {
      "type": "metric-refs",
      "metricIds": ["effective-health-spell"],
    },
  ],
}
