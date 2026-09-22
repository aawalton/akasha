import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHaRestoration = {
  id: "019e2fcd-59c4-7e4a-9aa6-411eea3abbbe",
  type: "page-type/temper-metric-tree",
  slug: "metric-ha-restoration",
  title: "Ha Restoration",
  nodeId: "ha-restoration",
  nodeType: "metric",
  displayOrder: 6,
  parent: "temper-metric-tree/subcategory-ha-damage",
} as const satisfies TemperMetricTree
