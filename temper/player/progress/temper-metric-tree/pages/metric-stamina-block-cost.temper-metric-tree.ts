import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricStaminaBlockCost = {
  id: "019e2fcd-59fa-7852-a025-242f86133e08",
  type: "page-type/temper-metric-tree",
  slug: "metric-stamina-block-cost",
  title: "Block Cost",
  nodeId: "stamina-block-cost",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/subcategory-stamina",
  createdAt: "2026-05-16T08:00:47.610Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
