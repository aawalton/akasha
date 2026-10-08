import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricEffectiveHealingSpell = {
  id: "019e2fcd-5a5d-77b5-82cf-0cf7418a83c4",
  type: "page-type/temper-metric-tree",
  slug: "metric-effective-healing-spell",
  title: "Effective Spell Healing Power",
  nodeId: "effective-healing-spell",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-effective-healing",
  createdAt: "2026-05-16T08:00:47.709Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
