import type { CompanionFormulaNode } from "akasha/temper/catalog/companion/companions-core/modules/companion-metric-template/companion-metric-template.module.code.ts"

export const FORMULA: CompanionFormulaNode = {
  "type": "add",
  "operands": [
    {
      "type": "metric-ref",
      "metricId": "companion-sps-self",
    },
    {
      "type": "metric-ref",
      "metricId": "companion-sps-ally",
    },
  ],
}
