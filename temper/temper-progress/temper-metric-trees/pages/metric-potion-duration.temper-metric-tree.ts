import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricPotionDuration = {
  id: "019e2fcd-5ab7-75d8-a534-b47a61842f01",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-potion-duration",
  title: "Potion Duration",
  nodeId: "potion-duration",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-potions",
} as const satisfies TemperMetricTree
