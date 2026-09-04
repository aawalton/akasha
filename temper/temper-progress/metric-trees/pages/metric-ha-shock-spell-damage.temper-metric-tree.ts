import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHaShockSpellDamage = {
  id: "019e2fcd-59b5-77c4-9f95-ecf766196821",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-ha-shock-spell-damage",
  title: "Ha Shock Spell Damage",
  nodeId: "ha-shock-spell-damage",
  nodeType: "metric",
  displayOrder: 8,
  parent: "subcategory-ha-power",
} as const satisfies TemperMetricTree
