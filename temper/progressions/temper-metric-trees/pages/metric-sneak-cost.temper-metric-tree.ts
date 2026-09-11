import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricSneakCost = {
  id: "019e2fcd-5a18-7621-a12d-91f15e2765bf",
  type: "temper-metric-tree",
  slug: "metric-sneak-cost",
  title: "Sneak Cost",
  nodeId: "sneak-cost",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-costs",
} as const satisfies TemperMetricTree
