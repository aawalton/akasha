import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHaRestoreRestStaff = {
  id: "019e2fcd-5a0e-7462-b2d3-d6f630207ef6",
  type: "page-type/temper-metric-tree",
  slug: "metric-ha-restore-rest-staff",
  title: "Ha Restore Rest Staff",
  nodeId: "ha-restore-rest-staff",
  nodeType: "metric",
  displayOrder: 5,
  parent: "temper-metric-tree/subcategory-ha-restore",
} as const satisfies TemperMetricTree
