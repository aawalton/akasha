import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHealingCriticalBonusWeapon = {
  id: "019e2fcd-5a66-73f0-8281-2878832a4779",
  type: "page-type/temper-metric-tree",
  slug: "metric-healing-critical-bonus-weapon",
  title: "Weapon Critical Healing Bonus",
  nodeId: "healing-critical-bonus-weapon",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/metric-healing-critical-bonus",
  createdAt: "2026-05-16T08:00:47.718Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
