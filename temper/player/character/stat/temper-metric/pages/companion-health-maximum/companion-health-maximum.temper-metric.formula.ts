import type { CompanionFormulaNode } from "akasha/temper/catalog/companion/companions-core/modules/companion-metric-template/companion-metric-template.module.code.ts"

export const FORMULA: CompanionFormulaNode = {
  type: "multiply",
  operands: [
    {
      type: "sum",
      metricId: "companion-health-maximum",
      effectType: "integer",
    },
    {
      type: "product",
      metricId: "companion-health-maximum",
      effectType: "fractional-change",
    },
  ],
}
