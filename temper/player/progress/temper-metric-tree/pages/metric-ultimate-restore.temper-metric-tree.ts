import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricUltimateRestore = {
  id: "019e2fcd-5a06-7538-b748-b93cebe7fae5",
  type: "page-type/temper-metric-tree",
  slug: "metric-ultimate-restore",
  title: "Ultimate Restore",
  nodeId: "ultimate-restore",
  nodeType: "metric",
  displayOrder: 3,
  parent: "temper-metric-tree/subcategory-ultimate",
} as const satisfies TemperMetricTree
