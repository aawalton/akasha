import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricLaMagicWeaponDamage = {
  id: "019e2fcd-5995-7483-8bad-134eb3c5b11d",
  type: "page-type/temper-metric-tree",
  slug: "metric-la-magic-weapon-damage",
  title: "La Magic Weapon Damage",
  nodeId: "la-magic-weapon-damage",
  nodeType: "metric",
  displayOrder: 5,
  parent: "temper-metric-tree/subcategory-la-power",
} as const satisfies TemperMetricTree
