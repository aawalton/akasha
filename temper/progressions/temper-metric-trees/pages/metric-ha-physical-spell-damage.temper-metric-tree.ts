import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricHaPhysicalSpellDamage = {
  id: "019e2fcd-59b2-77d7-acd3-827ebc3c78df",
  type: "temper-metric-tree",
  slug: "metric-ha-physical-spell-damage",
  title: "Ha Physical Spell Damage",
  nodeId: "ha-physical-spell-damage",
  nodeType: "metric",
  displayOrder: 6,
  parent: "subcategory-ha-power",
} as const satisfies TemperMetricTree
