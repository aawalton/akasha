import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricMartialAoeStatusChance = {
  id: "019e2fcd-59e2-7b76-98c0-e6e8e2ba42ac",
  type: "page-type/temper-metric-tree",
  slug: "metric-martial-aoe-status-chance",
  title: "Martial Aoe Status Chance",
  nodeId: "martial-aoe-status-chance",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-martial-status-chance",
} as const satisfies TemperMetricTree
