import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricStealthDetection = {
  id: "019e2fcd-5a88-7734-9804-6c1780b29b56",
  type: "temper-metric-tree",
  slug: "metric-stealth-detection",
  title: "Stealth Detection",
  nodeId: "stealth-detection",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-stealth",
} as const satisfies TemperMetricTree
