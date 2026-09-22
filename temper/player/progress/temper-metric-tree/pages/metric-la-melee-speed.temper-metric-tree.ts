import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricLaMeleeSpeed = {
  id: "019e2fcd-59a7-7c52-bde2-b9ac36a9b42c",
  type: "page-type/temper-metric-tree",
  slug: "metric-la-melee-speed",
  title: "La Melee Speed",
  nodeId: "la-melee-speed",
  nodeType: "metric",
  displayOrder: 3,
  parent: "temper-metric-tree/subcategory-light-attacks",
} as const satisfies TemperMetricTree
