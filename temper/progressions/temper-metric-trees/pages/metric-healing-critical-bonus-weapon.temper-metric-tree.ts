import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricHealingCriticalBonusWeapon = {
  id: "019e2fcd-5a66-73f0-8281-2878832a4779",
  type: "temper-metric-tree",
  slug: "metric-healing-critical-bonus-weapon",
  title: "Healing Critical Bonus Weapon",
  nodeId: "healing-critical-bonus-weapon",
  nodeType: "metric",
  displayOrder: 1,
  parent: "metric-healing-critical-bonus",
} as const satisfies TemperMetricTree
