import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricStealthDetection = {
  id: "019e2fcd-5a88-7734-9804-6c1780b29b56",
  type: "page-type/temper-metric-tree",
  slug: "metric-stealth-detection",
  title: "Stealth Detection",
  nodeId: "stealth-detection",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-stealth",
} as const satisfies TemperMetricTree
