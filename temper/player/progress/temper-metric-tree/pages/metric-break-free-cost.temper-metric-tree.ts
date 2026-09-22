import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricBreakFreeCost = {
  id: "019e2fcd-5a15-7f61-a8b0-17fc388ffbb1",
  type: "page-type/temper-metric-tree",
  slug: "metric-break-free-cost",
  title: "Break Free Cost",
  nodeId: "break-free-cost",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-costs",
} as const satisfies TemperMetricTree
