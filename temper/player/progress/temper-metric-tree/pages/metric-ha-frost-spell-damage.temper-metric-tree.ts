import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHaFrostSpellDamage = {
  id: "019e2fcd-59ae-72d9-8d0f-86a5b87a5965",
  type: "page-type/temper-metric-tree",
  slug: "metric-ha-frost-spell-damage",
  title: "HA Frost Spell Damage",
  nodeId: "ha-frost-spell-damage",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/subcategory-ha-power",
  createdAt: "2026-05-16T08:00:47.534Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
