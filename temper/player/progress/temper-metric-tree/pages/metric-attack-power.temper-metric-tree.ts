import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricAttackPower = {
  id: "019e2fcd-5968-718b-872f-252cc0039db4",
  type: "page-type/temper-metric-tree",
  slug: "metric-attack-power",
  title: "Attack Power",
  nodeId: "attack-power",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/category-damage",
  createdAt: "2026-05-16T08:00:47.464Z",
  updatedAt: "2026-09-22T20:46:12.000Z",
} as const satisfies TemperMetricTree
