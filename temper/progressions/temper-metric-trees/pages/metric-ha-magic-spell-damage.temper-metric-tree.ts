import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricHaMagicSpellDamage = {
  id: "019e2fcd-59b0-744e-b0c2-455da81dc4cb",
  type: "temper-metric-tree",
  slug: "metric-ha-magic-spell-damage",
  title: "Ha Magic Spell Damage",
  nodeId: "ha-magic-spell-damage",
  nodeType: "metric",
  displayOrder: 4,
  parent: "subcategory-ha-power",
} as const satisfies TemperMetricTree
