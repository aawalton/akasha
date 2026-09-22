import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricLaSpeed = {
  id: "019e2fcd-59a6-7be9-9649-ac6c1ef4b88a",
  type: "page-type/temper-metric-tree",
  slug: "metric-la-speed",
  title: "La Speed",
  nodeId: "la-speed",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/subcategory-light-attacks",
} as const satisfies TemperMetricTree
