import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricLaFrostStaff = {
  id: "019e2fcd-599e-76e9-a91e-94b4d3749f29",
  type: "page-type/temper-metric-tree",
  slug: "metric-la-frost-staff",
  title: "La Frost Staff",
  nodeId: "la-frost-staff",
  nodeType: "metric",
  displayOrder: 3,
  parent: "temper-metric-tree/subcategory-la-damage",
} as const satisfies TemperMetricTree
