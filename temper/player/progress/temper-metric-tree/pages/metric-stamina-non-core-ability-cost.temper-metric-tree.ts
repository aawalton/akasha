import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricStaminaNonCoreAbilityCost = {
  id: "019e2fcd-59f9-7640-aafd-9184dccf39ea",
  type: "page-type/temper-metric-tree",
  slug: "metric-stamina-non-core-ability-cost",
  title: "Stamina Non Core Ability Cost",
  nodeId: "stamina-non-core-ability-cost",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-stamina",
} as const satisfies TemperMetricTree
