import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHaShockStaff = {
  id: "019e2fcd-59c5-7f95-a7dd-69499a829a11",
  type: "page-type/temper-metric-tree",
  slug: "metric-ha-shock-staff",
  title: "Ha Shock Staff",
  nodeId: "ha-shock-staff",
  nodeType: "metric",
  displayOrder: 7,
  parent: "temper-metric-tree/subcategory-ha-damage",
} as const satisfies TemperMetricTree
