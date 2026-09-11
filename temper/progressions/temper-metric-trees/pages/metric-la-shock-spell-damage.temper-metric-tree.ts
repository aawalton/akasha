import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricLaShockSpellDamage = {
  id: "019e2fcd-5998-756e-89d8-cd88335826ee",
  type: "temper-metric-tree",
  slug: "metric-la-shock-spell-damage",
  title: "La Shock Spell Damage",
  nodeId: "la-shock-spell-damage",
  nodeType: "metric",
  displayOrder: 8,
  parent: "subcategory-la-power",
} as const satisfies TemperMetricTree
