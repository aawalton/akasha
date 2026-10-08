import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricLaFrostSpellDamage = {
  id: "019e2fcd-5992-743b-b3ea-384183458641",
  type: "page-type/temper-metric-tree",
  slug: "metric-la-frost-spell-damage",
  title: "LA Frost Spell Damage",
  nodeId: "la-frost-spell-damage",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/subcategory-la-power",
  createdAt: "2026-05-16T08:00:47.506Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
