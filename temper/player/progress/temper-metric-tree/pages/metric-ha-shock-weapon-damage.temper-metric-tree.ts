import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHaShockWeaponDamage = {
  id: "019e2fcd-59b7-728a-99b2-a3090b4d74b2",
  type: "page-type/temper-metric-tree",
  slug: "metric-ha-shock-weapon-damage",
  title: "Ha Shock Weapon Damage",
  nodeId: "ha-shock-weapon-damage",
  nodeType: "metric",
  displayOrder: 9,
  parent: "temper-metric-tree/subcategory-ha-power",
} as const satisfies TemperMetricTree
