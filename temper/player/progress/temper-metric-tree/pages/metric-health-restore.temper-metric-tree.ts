import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHealthRestore = {
  id: "019e2fcd-5a1f-7587-a6af-18ac8a86f60a",
  type: "page-type/temper-metric-tree",
  slug: "metric-health-restore",
  title: "Restore Health",
  nodeId: "health-restore",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-health",
  createdAt: "2026-05-16T08:00:47.647Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
