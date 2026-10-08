import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDiseaseDamage = {
  id: "019e2fcd-59d4-765c-9a94-f796bb4af337",
  type: "page-type/temper-metric-tree",
  slug: "metric-disease-damage",
  title: "Disease Damage",
  nodeId: "disease-damage",
  nodeType: "metric",
  displayOrder: 3,
  parent: "temper-metric-tree/subcategory-status-damage",
  createdAt: "2026-05-16T08:00:47.572Z",
  updatedAt: "2026-09-22T20:46:12.000Z",
} as const satisfies TemperMetricTree
