import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHaFrostSpellDamage = {
  id: "019e2fcd-59ae-72d9-8d0f-86a5b87a5965",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-ha-frost-spell-damage",
  title: "Ha Frost Spell Damage",
  nodeId: "ha-frost-spell-damage",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-ha-power",
} as const satisfies TemperMetricTree
