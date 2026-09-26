import type { CompanionFormulaNode } from "akasha/temper/catalog/companion/companions-core/modules/companion-metric-template/companion-metric-template.module.code.ts"

export const FORMULA: CompanionFormulaNode = {
  "type": "add",
  "operands": [
    {
      "type": "metric-ref",
      "metricId": "companion-hps-direct",
    },
    {
      "type": "metric-ref",
      "metricId": "companion-hps-hot",
    },
    {
      "type": "metric-ref",
      "metricId": "companion-hps-shield",
    },
  ],
}
