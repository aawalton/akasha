import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricStaminaAbilityCost = {
  id: "019e2fcd-59f7-7ff8-be26-8a74ab41bd9b",
  type: "page-type/temper-metric-tree",
  slug: "metric-stamina-ability-cost",
  title: "Stamina Ability Cost",
  nodeId: "stamina-ability-cost",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-stamina",
} as const satisfies TemperMetricTree
