import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricLaFlameWeaponDamage = {
  id: "019e2fcd-5991-7430-8e69-08599c20fcd7",
  type: "page-type/temper-metric-tree",
  slug: "metric-la-flame-weapon-damage",
  title: "La Flame Weapon Damage",
  nodeId: "la-flame-weapon-damage",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-la-power",
} as const satisfies TemperMetricTree
