import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricLaOneHand = {
  id: "019e2fcd-599f-7769-8d95-d16a5a695335",
  type: "page-type/temper-metric-tree",
  slug: "metric-la-one-hand",
  title: "La One Hand",
  nodeId: "la-one-hand",
  nodeType: "metric",
  displayOrder: 4,
  parent: "temper-metric-tree/subcategory-la-damage",
} as const satisfies TemperMetricTree
