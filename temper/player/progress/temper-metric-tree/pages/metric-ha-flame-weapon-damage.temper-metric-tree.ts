import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHaFlameWeaponDamage = {
  id: "019e2fcd-59ad-71a8-977a-4f7ac974e8ad",
  type: "page-type/temper-metric-tree",
  slug: "metric-ha-flame-weapon-damage",
  title: "Ha Flame Weapon Damage",
  nodeId: "ha-flame-weapon-damage",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-ha-power",
} as const satisfies TemperMetricTree
