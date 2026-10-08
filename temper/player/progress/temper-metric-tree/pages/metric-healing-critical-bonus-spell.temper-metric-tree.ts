import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHealingCriticalBonusSpell = {
  id: "019e2fcd-5a64-7e80-af30-c1c04677f2f1",
  type: "page-type/temper-metric-tree",
  slug: "metric-healing-critical-bonus-spell",
  title: "Spell Critical Healing Bonus",
  nodeId: "healing-critical-bonus-spell",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/metric-healing-critical-bonus",
  createdAt: "2026-05-16T08:00:47.716Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
