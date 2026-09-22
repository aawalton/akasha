import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricLaTwoHand = {
  id: "019e2fcd-59a3-7acf-99cf-c2172b46ea13",
  type: "page-type/temper-metric-tree",
  slug: "metric-la-two-hand",
  title: "La Two Hand",
  nodeId: "la-two-hand",
  nodeType: "metric",
  displayOrder: 8,
  parent: "temper-metric-tree/subcategory-la-damage",
} as const satisfies TemperMetricTree
