import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHaRestoreDw = {
  id: "019e2fcd-5a0b-7f6a-b505-abb72805fc3e",
  type: "page-type/temper-metric-tree",
  slug: "metric-ha-restore-dw",
  title: "Ha Restore Dw",
  nodeId: "ha-restore-dw",
  nodeType: "metric",
  displayOrder: 3,
  parent: "temper-metric-tree/subcategory-ha-restore",
} as const satisfies TemperMetricTree
