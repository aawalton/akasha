import type { CompanionFormulaNode } from "akasha/temper/catalog/companion/companions-core/modules/companion-metric-template/companion-metric-template.module.code.ts"

export const FORMULA: CompanionFormulaNode = {
  type: "add",
  operands: [
    {
      type: "metric-ref",
      metricId: "companion-target-armor",
    },
    {
      type: "multiply",
      operands: [
        {
          type: "metric-ref",
          metricId: "companion-penetration",
        },
        {
          type: "constant",
          value: -1,
        },
      ],
    },
  ],
}
