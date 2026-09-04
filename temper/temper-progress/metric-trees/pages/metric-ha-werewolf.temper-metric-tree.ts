import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHaWerewolf = {
  id: "019e2fcd-59c9-7a4f-8f8e-a538438a06d3",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-ha-werewolf",
  title: "Ha Werewolf",
  nodeId: "ha-werewolf",
  nodeType: "metric",
  displayOrder: 10,
  parent: "subcategory-ha-damage",
} as const satisfies TemperMetricTree
