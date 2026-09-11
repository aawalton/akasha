import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricStaminaBlockCost = {
  id: "019e2fcd-59fa-7852-a025-242f86133e08",
  type: "temper-metric-tree",
  slug: "metric-stamina-block-cost",
  title: "Stamina Block Cost",
  nodeId: "stamina-block-cost",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-stamina",
} as const satisfies TemperMetricTree
