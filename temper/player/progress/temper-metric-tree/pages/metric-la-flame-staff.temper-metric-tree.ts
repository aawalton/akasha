import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricLaFlameStaff = {
  id: "019e2fcd-599d-76bb-9994-6313e05d7783",
  type: "page-type/temper-metric-tree",
  slug: "metric-la-flame-staff",
  title: "La Flame Staff",
  nodeId: "la-flame-staff",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/subcategory-la-damage",
} as const satisfies TemperMetricTree
