import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricCriticalDamageWeapon = {
  id: "019e2fcd-597b-703c-aea1-b4dfff3b9318",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-critical-damage-weapon",
  title: "Critical Damage Weapon",
  nodeId: "critical-damage-weapon",
  nodeType: "metric",
  displayOrder: 1,
  parent: "metric-critical-damage",
} as const satisfies TemperMetricTree
