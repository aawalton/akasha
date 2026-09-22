import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHealingCriticalBonusWeapon = {
  id: "019e2fcd-5a66-73f0-8281-2878832a4779",
  type: "page-type/temper-metric-tree",
  slug: "metric-healing-critical-bonus-weapon",
  title: "Healing Critical Bonus Weapon",
  nodeId: "healing-critical-bonus-weapon",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/metric-healing-critical-bonus",
} as const satisfies TemperMetricTree
