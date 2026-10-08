import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricTargetDefenseBonus = {
  id: "019e2fcd-5aa1-77ad-a4e5-c175bb079cc2",
  type: "page-type/temper-metric-tree",
  slug: "metric-target-defense-bonus",
  title: "Target Defense Bonus",
  nodeId: "target-defense-bonus",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/subcategory-target-toughness",
  createdAt: "2026-05-16T08:00:47.777Z",
  updatedAt: "2026-09-22T20:46:12.000Z",
} as const satisfies TemperMetricTree
