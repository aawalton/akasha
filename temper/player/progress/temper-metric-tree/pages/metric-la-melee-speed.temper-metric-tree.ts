import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricLaMeleeSpeed = {
  id: "019e2fcd-59a7-7c52-bde2-b9ac36a9b42c",
  type: "page-type/temper-metric-tree",
  slug: "metric-la-melee-speed",
  title: "LA Melee Speed",
  nodeId: "la-melee-speed",
  nodeType: "metric",
  displayOrder: 3,
  parent: "temper-metric-tree/subcategory-light-attacks",
  createdAt: "2026-05-16T08:00:47.527Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
