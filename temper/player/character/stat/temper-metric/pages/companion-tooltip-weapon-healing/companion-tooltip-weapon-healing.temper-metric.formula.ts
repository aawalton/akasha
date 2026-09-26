import type { CompanionFormulaNode } from "akasha/temper/catalog/companion/companions-core/modules/companion-metric-template/companion-metric-template.module.code.ts"

export const FORMULA: CompanionFormulaNode = {
  "type": "multiply",
  "operands": [
    {
      "type": "metric-ref",
      "metricId": "companion-weapon-damage",
    },
    {
      "type": "add",
      "operands": [
        {
          "type": "constant",
          "value": 1,
        },
        {
          "type": "metric-ref",
          "metricId": "companion-healing-done",
        },
      ],
    },
  ],
}
