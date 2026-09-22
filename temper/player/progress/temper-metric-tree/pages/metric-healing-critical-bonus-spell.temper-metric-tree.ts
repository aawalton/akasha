import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHealingCriticalBonusSpell = {
  id: "019e2fcd-5a64-7e80-af30-c1c04677f2f1",
  type: "page-type/temper-metric-tree",
  slug: "metric-healing-critical-bonus-spell",
  title: "Healing Critical Bonus Spell",
  nodeId: "healing-critical-bonus-spell",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/metric-healing-critical-bonus",
} as const satisfies TemperMetricTree
