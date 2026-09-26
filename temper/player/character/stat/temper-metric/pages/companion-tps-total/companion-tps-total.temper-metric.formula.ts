import type { CompanionFormulaNode } from "akasha/temper/catalog/companion/companions-core/modules/companion-metric-template/companion-metric-template.module.code.ts"

export const FORMULA: CompanionFormulaNode = {
  type: "add",
  operands: [
    {
      type: "metric-ref",
      metricId: "companion-effective-toughness",
    },
    {
      type: "metric-ref",
      metricId: "companion-tps-buff",
    },
    {
      type: "metric-ref",
      metricId: "companion-tps-self-hps",
    },
    {
      type: "metric-ref",
      metricId: "companion-tps-shield",
    },
  ],
}
