import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricLaFrostSpellDamage = {
  id: "019e2fcd-5992-743b-b3ea-384183458641",
  type: "page-type/temper-metric-tree",
  slug: "metric-la-frost-spell-damage",
  title: "La Frost Spell Damage",
  nodeId: "la-frost-spell-damage",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/subcategory-la-power",
} as const satisfies TemperMetricTree
