import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricCriticalDamageWeapon = {
  id: "019e2fcd-597b-703c-aea1-b4dfff3b9318",
  type: "page-type/temper-metric-tree",
  slug: "metric-critical-damage-weapon",
  title: "Critical Damage Weapon",
  nodeId: "critical-damage-weapon",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/metric-critical-damage",
} as const satisfies TemperMetricTree
