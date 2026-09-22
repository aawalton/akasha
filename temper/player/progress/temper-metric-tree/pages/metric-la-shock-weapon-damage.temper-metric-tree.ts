import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricLaShockWeaponDamage = {
  id: "019e2fcd-5999-7592-a10c-55ba4b88caa1",
  type: "page-type/temper-metric-tree",
  slug: "metric-la-shock-weapon-damage",
  title: "La Shock Weapon Damage",
  nodeId: "la-shock-weapon-damage",
  nodeType: "metric",
  displayOrder: 9,
  parent: "temper-metric-tree/subcategory-la-power",
} as const satisfies TemperMetricTree
