import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricSneakRange = {
  id: "019e2fcd-5a89-7bd0-a36e-cb314c0bf936",
  type: "page-type/temper-metric-tree",
  slug: "metric-sneak-range",
  title: "Sneak Range",
  nodeId: "sneak-range",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-stealth",
} as const satisfies TemperMetricTree
