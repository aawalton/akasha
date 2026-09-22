import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricLaFrostWeaponDamage = {
  id: "019e2fcd-5993-7430-bd23-6412b58facdf",
  type: "page-type/temper-metric-tree",
  slug: "metric-la-frost-weapon-damage",
  title: "La Frost Weapon Damage",
  nodeId: "la-frost-weapon-damage",
  nodeType: "metric",
  displayOrder: 3,
  parent: "temper-metric-tree/subcategory-la-power",
} as const satisfies TemperMetricTree
