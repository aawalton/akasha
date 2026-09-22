import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHaFlameSpellDamage = {
  id: "019e2fcd-59ab-7f0c-ba82-1e840bfd4a95",
  type: "page-type/temper-metric-tree",
  slug: "metric-ha-flame-spell-damage",
  title: "Ha Flame Spell Damage",
  nodeId: "ha-flame-spell-damage",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-ha-power",
} as const satisfies TemperMetricTree
