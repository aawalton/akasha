import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricResistanceSpell = {
  id: "019e2fcd-5a27-7b25-bbf6-b8fbcbde819e",
  type: "page-type/temper-metric-tree",
  slug: "metric-resistance-spell",
  title: "Spell Resistance",
  nodeId: "resistance-spell",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/metric-resistance",
  includeInChildAggregates: true,
  createdAt: "2026-05-16T08:00:47.655Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
