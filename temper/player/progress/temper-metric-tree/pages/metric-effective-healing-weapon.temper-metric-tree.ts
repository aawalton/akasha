import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricEffectiveHealingWeapon = {
  id: "019e2fcd-5a5e-7ac8-b301-c686225810d5",
  type: "page-type/temper-metric-tree",
  slug: "metric-effective-healing-weapon",
  title: "Effective Weapon Healing Power",
  nodeId: "effective-healing-weapon",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/subcategory-effective-healing",
  createdAt: "2026-05-16T08:00:47.710Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
