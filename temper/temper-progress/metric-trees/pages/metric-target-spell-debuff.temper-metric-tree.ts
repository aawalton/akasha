import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetSpellDebuff = {
  id: "019e2fcd-5aa7-7eac-ba29-6bd1a5d9f00f",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-spell-debuff",
  title: "Target Spell Debuff",
  nodeId: "target-spell-debuff",
  nodeType: "metric",
  displayOrder: 5,
  parent: "subcategory-target-toughness",
} as const satisfies TemperMetricTree
