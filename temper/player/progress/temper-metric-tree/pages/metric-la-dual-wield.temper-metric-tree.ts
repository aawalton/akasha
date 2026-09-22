import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricLaDualWield = {
  id: "019e2fcd-599c-769b-ab2b-af2fdbb8aaa8",
  type: "page-type/temper-metric-tree",
  slug: "metric-la-dual-wield",
  title: "La Dual Wield",
  nodeId: "la-dual-wield",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-la-damage",
} as const satisfies TemperMetricTree
