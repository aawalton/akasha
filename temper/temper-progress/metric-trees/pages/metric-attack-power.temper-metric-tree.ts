import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricAttackPower = {
  id: "019e2fcd-5968-718b-872f-252cc0039db4",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-attack-power",
  title: "Attack Power",
  nodeId: "attack-power",
  nodeType: "metric",
  displayOrder: 2,
  parent: "category-damage",
} as const satisfies TemperMetricTree
