import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHaFlameStaff = {
  id: "019e2fcd-59be-72ed-92b1-36a7bbdba537",
  type: "page-type/temper-metric-tree",
  slug: "metric-ha-flame-staff",
  title: "Ha Flame Staff",
  nodeId: "ha-flame-staff",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/subcategory-ha-damage",
} as const satisfies TemperMetricTree
