import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDivines = {
  id: "019e2fcd-5abc-76d4-832a-1139b9a698a1",
  type: "page-type/temper-metric-tree",
  slug: "metric-divines",
  title: "Divines",
  nodeId: "divines",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-traits",
} as const satisfies TemperMetricTree
