import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricPenetrationSpell = {
  id: "019e2fcd-5980-7fed-8900-a1a6813d6e9f",
  type: "page-type/temper-metric-tree",
  slug: "metric-penetration-spell",
  title: "Spell Penetration",
  nodeId: "penetration-spell",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/metric-penetration",
  createdAt: "2026-05-16T08:00:47.488Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
