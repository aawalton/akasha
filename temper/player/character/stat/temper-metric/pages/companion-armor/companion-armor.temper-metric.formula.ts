import type { CompanionFormulaNode } from "akasha/temper/catalog/companion/companions-core/modules/companion-metric-template/companion-metric-template.module.code.ts"

export const FORMULA: CompanionFormulaNode = {
  type: "multiply",
  operands: [
    {
      type: "sum",
      metricId: "companion-armor",
      effectType: "integer",
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
          metricId: "companion-armor",
          effectType: "fractional-change",
        },
      ],
    },
  ],
}
