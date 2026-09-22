import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricPlayerEffectiveLevel = {
  id: "019e2fcd-5ac4-706c-82e6-df145309463e",
  type: "page-type/temper-metric-tree",
  slug: "metric-player-effective-level",
  title: "Player Effective Level",
  nodeId: "player-effective-level",
  nodeType: "metric",
  displayOrder: 5,
  parent: "temper-metric-tree/category-other",
} as const satisfies TemperMetricTree
