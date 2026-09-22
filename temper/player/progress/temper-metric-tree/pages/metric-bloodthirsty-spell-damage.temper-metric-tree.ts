import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricBloodthirstySpellDamage = {
  id: "019e2fcd-59ec-7e2b-a73f-1c44fafcf76a",
  type: "page-type/temper-metric-tree",
  slug: "metric-bloodthirsty-spell-damage",
  title: "Bloodthirsty Spell Damage",
  nodeId: "bloodthirsty-spell-damage",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-bloodthirsty",
} as const satisfies TemperMetricTree
