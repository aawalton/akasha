import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricPotionDuration = {
  id: "019e2fcd-5ab7-75d8-a534-b47a61842f01",
  type: "page-type/temper-metric-tree",
  slug: "metric-potion-duration",
  title: "Potion Duration",
  nodeId: "potion-duration",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-potions",
} as const satisfies TemperMetricTree
