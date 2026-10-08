import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricAttackCritDamageWeapon = {
  id: "019e2fcd-5978-7004-a66b-237dda18d388",
  type: "page-type/temper-metric-tree",
  slug: "metric-attack-crit-damage-weapon",
  title: "Attack Weapon Critical Damage",
  nodeId: "attack-crit-damage-weapon",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-critical-damage",
  createdAt: "2026-05-16T08:00:47.480Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
