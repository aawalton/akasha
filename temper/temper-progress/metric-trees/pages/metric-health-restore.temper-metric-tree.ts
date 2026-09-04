import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHealthRestore = {
  id: "019e2fcd-5a1f-7587-a6af-18ac8a86f60a",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-health-restore",
  title: "Health Restore",
  nodeId: "health-restore",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-health",
} as const satisfies TemperMetricTree
