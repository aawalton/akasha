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
  createdAt: "2026-05-16T08:00:47.799Z",
  updatedAt: "2026-09-22T20:46:12.000Z",
} as const satisfies TemperMetricTree
