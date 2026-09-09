import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHaFrostWeaponDamage = {
  id: "019e2fcd-59af-738b-a21e-559382c17b6e",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-ha-frost-weapon-damage",
  title: "Ha Frost Weapon Damage",
  nodeId: "ha-frost-weapon-damage",
  nodeType: "metric",
  displayOrder: 3,
  parent: "subcategory-ha-power",
} as const satisfies TemperMetricTree
