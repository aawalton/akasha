import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  "type": "max",
  "operands": [
    {
      "type": "metric-refs",
      "metricIds": ["effective-healing-spell"],
    },
    {
      "type": "metric-refs",
      "metricIds": ["effective-healing-weapon"],
    },
  ],
}
