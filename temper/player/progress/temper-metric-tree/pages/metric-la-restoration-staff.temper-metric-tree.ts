import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricLaRestorationStaff = {
  id: "019e2fcd-59a1-7810-9c2a-a675499ecf3f",
  type: "page-type/temper-metric-tree",
  slug: "metric-la-restoration-staff",
  title: "La Restoration Staff",
  nodeId: "la-restoration-staff",
  nodeType: "metric",
  displayOrder: 6,
  parent: "temper-metric-tree/subcategory-la-damage",
} as const satisfies TemperMetricTree
