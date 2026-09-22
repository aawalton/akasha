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
} as const satisfies TemperMetricTree
