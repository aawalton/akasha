import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricLaPhysicalWeaponDamage = {
  id: "019e2fcd-5997-7549-8fb6-178aaf9218da",
  type: "page-type/temper-metric-tree",
  slug: "metric-la-physical-weapon-damage",
  title: "La Physical Weapon Damage",
  nodeId: "la-physical-weapon-damage",
  nodeType: "metric",
  displayOrder: 7,
  parent: "temper-metric-tree/subcategory-la-power",
} as const satisfies TemperMetricTree
