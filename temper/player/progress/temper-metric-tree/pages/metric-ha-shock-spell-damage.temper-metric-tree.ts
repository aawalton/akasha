import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHaShockSpellDamage = {
  id: "019e2fcd-59b5-77c4-9f95-ecf766196821",
  type: "page-type/temper-metric-tree",
  slug: "metric-ha-shock-spell-damage",
  title: "Ha Shock Spell Damage",
  nodeId: "ha-shock-spell-damage",
  nodeType: "metric",
  displayOrder: 8,
  parent: "temper-metric-tree/subcategory-ha-power",
} as const satisfies TemperMetricTree
