import type { TemperMetricTree } from "akasha/temper/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricResistanceCritical = {
  id: "019e2fcd-5a32-7305-9525-34e99b202461",
  type: "page-type/temper-metric-tree",
  slug: "metric-resistance-critical",
  title: "Resistance Critical",
  nodeId: "resistance-critical",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-critical-defense",
} as const satisfies TemperMetricTree
