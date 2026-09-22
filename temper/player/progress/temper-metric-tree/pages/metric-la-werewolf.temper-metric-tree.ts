import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricLaWerewolf = {
  id: "019e2fcd-59a5-7b76-b293-149fa3fc99d7",
  type: "page-type/temper-metric-tree",
  slug: "metric-la-werewolf",
  title: "La Werewolf",
  nodeId: "la-werewolf",
  nodeType: "metric",
  displayOrder: 10,
  parent: "temper-metric-tree/subcategory-la-damage",
} as const satisfies TemperMetricTree
