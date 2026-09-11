import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricHaFlameWeaponDamage = {
  id: "019e2fcd-59ad-71a8-977a-4f7ac974e8ad",
  type: "temper-metric-tree",
  slug: "metric-ha-flame-weapon-damage",
  title: "Ha Flame Weapon Damage",
  nodeId: "ha-flame-weapon-damage",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-ha-power",
} as const satisfies TemperMetricTree
