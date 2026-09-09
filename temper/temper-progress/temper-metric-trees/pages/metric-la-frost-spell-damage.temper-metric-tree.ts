import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricLaFrostSpellDamage = {
  id: "019e2fcd-5992-743b-b3ea-384183458641",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-la-frost-spell-damage",
  title: "La Frost Spell Damage",
  nodeId: "la-frost-spell-damage",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-la-power",
} as const satisfies TemperMetricTree
