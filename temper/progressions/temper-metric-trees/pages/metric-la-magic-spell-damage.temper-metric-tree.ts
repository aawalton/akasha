import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricLaMagicSpellDamage = {
  id: "019e2fcd-5994-7440-87b1-6e25c3041876",
  type: "temper-metric-tree",
  slug: "metric-la-magic-spell-damage",
  title: "La Magic Spell Damage",
  nodeId: "la-magic-spell-damage",
  nodeType: "metric",
  displayOrder: 4,
  parent: "subcategory-la-power",
} as const satisfies TemperMetricTree
