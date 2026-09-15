import type { TemperMetricTree } from "akasha/temper/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricTargetPenetration = {
  id: "019e2fcd-5a93-7c18-8e8c-fa93db48441c",
  type: "page-type/temper-metric-tree",
  slug: "metric-target-penetration",
  title: "Target Penetration",
  nodeId: "target-penetration",
  nodeType: "metric",
  displayOrder: 5,
  parent: "subcategory-target-damage",
} as const satisfies TemperMetricTree
