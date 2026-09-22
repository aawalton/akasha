import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricTargetSpellDebuff = {
  id: "019e2fcd-5aa7-7eac-ba29-6bd1a5d9f00f",
  type: "page-type/temper-metric-tree",
  slug: "metric-target-spell-debuff",
  title: "Target Spell Debuff",
  nodeId: "target-spell-debuff",
  nodeType: "metric",
  displayOrder: 5,
  parent: "temper-metric-tree/subcategory-target-toughness",
} as const satisfies TemperMetricTree
