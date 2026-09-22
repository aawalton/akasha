import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricLaShockStaff = {
  id: "019e2fcd-59a2-7a63-a0d3-9a7b7f4a89ae",
  type: "page-type/temper-metric-tree",
  slug: "metric-la-shock-staff",
  title: "La Shock Staff",
  nodeId: "la-shock-staff",
  nodeType: "metric",
  displayOrder: 7,
  parent: "temper-metric-tree/subcategory-la-damage",
} as const satisfies TemperMetricTree
