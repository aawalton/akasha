import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"

export const FORMULA: FormulaNode = {
  type: "add",
  operands: [
    {
      type: "sum",
      effectType: "fractional-change",
    },
    {
      type: "metric-refs",
      metricIds: ["damage-done-base", "damage-done-single-target"],
    },
  ],
}
