import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHaMagicWeaponDamage = {
  id: "019e2fcd-59b1-7567-9585-71922d4fee34",
  type: "page-type/temper-metric-tree",
  slug: "metric-ha-magic-weapon-damage",
  title: "Ha Magic Weapon Damage",
  nodeId: "ha-magic-weapon-damage",
  nodeType: "metric",
  displayOrder: 5,
  parent: "temper-metric-tree/subcategory-ha-power",
} as const satisfies TemperMetricTree
