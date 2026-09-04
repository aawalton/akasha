import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHealingCriticalBonusSpell = {
  id: "019e2fcd-5a64-7e80-af30-c1c04677f2f1",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-healing-critical-bonus-spell",
  title: "Healing Critical Bonus Spell",
  nodeId: "healing-critical-bonus-spell",
  nodeType: "metric",
  displayOrder: 0,
  parent: "metric-healing-critical-bonus",
} as const satisfies TemperMetricTree
