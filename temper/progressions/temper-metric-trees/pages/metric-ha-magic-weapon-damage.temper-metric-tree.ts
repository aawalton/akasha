import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricHaMagicWeaponDamage = {
  id: "019e2fcd-59b1-7567-9585-71922d4fee34",
  type: "temper-metric-tree",
  slug: "metric-ha-magic-weapon-damage",
  title: "Ha Magic Weapon Damage",
  nodeId: "ha-magic-weapon-damage",
  nodeType: "metric",
  displayOrder: 5,
  parent: "subcategory-ha-power",
} as const satisfies TemperMetricTree
