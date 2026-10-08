import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricMountedSpeed = {
  id: "019e2fcd-5a7d-77e7-8d1c-7ab9abf38c1a",
  type: "page-type/temper-metric-tree",
  slug: "metric-mounted-speed",
  title: "Mounted Speed",
  nodeId: "mounted-speed",
  nodeType: "metric",
  displayOrder: 3,
  parent: "temper-metric-tree/category-mobility",
  includeInChildAggregates: true,
  createdAt: "2026-05-16T08:00:47.741Z",
  updatedAt: "2026-09-22T20:46:12.000Z",
} as const satisfies TemperMetricTree
