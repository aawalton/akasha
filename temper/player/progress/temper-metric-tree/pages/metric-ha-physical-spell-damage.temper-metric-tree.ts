import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHaPhysicalSpellDamage = {
  id: "019e2fcd-59b2-77d7-acd3-827ebc3c78df",
  type: "page-type/temper-metric-tree",
  slug: "metric-ha-physical-spell-damage",
  title: "HA Physical Spell Damage",
  nodeId: "ha-physical-spell-damage",
  nodeType: "metric",
  displayOrder: 6,
  parent: "temper-metric-tree/subcategory-ha-power",
  createdAt: "2026-05-16T08:00:47.538Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
