import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricBloodthirstyWeaponDamage = {
  id: "019e2fcd-59ed-7f91-96d7-165b6dc12c99",
  type: "page-type/temper-metric-tree",
  slug: "metric-bloodthirsty-weapon-damage",
  title: "Bloodthirsty Weapon Damage",
  nodeId: "bloodthirsty-weapon-damage",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/subcategory-bloodthirsty",
} as const satisfies TemperMetricTree
