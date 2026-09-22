import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHaFrostStaff = {
  id: "019e2fcd-59bf-7ce0-a135-f9ed082a65b7",
  type: "page-type/temper-metric-tree",
  slug: "metric-ha-frost-staff",
  title: "Ha Frost Staff",
  nodeId: "ha-frost-staff",
  nodeType: "metric",
  displayOrder: 3,
  parent: "temper-metric-tree/subcategory-ha-damage",
} as const satisfies TemperMetricTree
