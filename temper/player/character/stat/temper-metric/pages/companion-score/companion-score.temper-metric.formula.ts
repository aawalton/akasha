import type { CompanionFormulaNode } from "akasha/temper/catalog/companion/companions-core/modules/companion-metric-template/companion-metric-template.module.code.ts"

export const FORMULA: CompanionFormulaNode = {
  type: "role-sum",
  operands: [
    {
      role: "dps",
      metricRef: "companion-dps-total",
    },
    {
      role: "healer",
      metricRef: "companion-hps-total",
    },
    {
      role: "tank",
      metricRef: "companion-tps-total",
      scale: 0.1,
    },
    {
      role: "support",
      metricRef: "companion-support-dps",
    },
    {
      role: "support",
      metricRef: "companion-support-tps",
      scale: 0.1,
    },
  ],
}
