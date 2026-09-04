import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricStaminaRestore = {
  id: "019e2fcd-59ff-748e-bfe5-f8f68e1180d8",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-stamina-restore",
  title: "Stamina Restore",
  nodeId: "stamina-restore",
  nodeType: "metric",
  displayOrder: 6,
  parent: "subcategory-stamina",
} as const satisfies TemperMetricTree
