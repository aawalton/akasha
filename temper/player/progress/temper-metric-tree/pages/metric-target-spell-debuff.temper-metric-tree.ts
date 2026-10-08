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
  createdAt: "2026-05-16T08:00:47.783Z",
  updatedAt: "2026-09-22T20:46:12.000Z",
} as const satisfies TemperMetricTree
