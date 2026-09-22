import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricLaShockSpellDamage = {
  id: "019e2fcd-5998-756e-89d8-cd88335826ee",
  type: "page-type/temper-metric-tree",
  slug: "metric-la-shock-spell-damage",
  title: "La Shock Spell Damage",
  nodeId: "la-shock-spell-damage",
  nodeType: "metric",
  displayOrder: 8,
  parent: "temper-metric-tree/subcategory-la-power",
} as const satisfies TemperMetricTree
