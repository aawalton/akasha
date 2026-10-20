import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  type: "add",
  operands: [
    {
      type: "metric-refs",
      metricIds: ["damage-taken"],
    },
    {
      type: "sum",
      effectType: "fractional-change",
    },
  ],
}
