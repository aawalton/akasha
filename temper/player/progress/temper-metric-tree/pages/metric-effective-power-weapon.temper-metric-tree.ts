import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricEffectivePowerWeapon = {
  id: "019e2fcd-5960-7c3b-a075-48a2de26674d",
  type: "page-type/temper-metric-tree",
  slug: "metric-effective-power-weapon",
  title: "Effective Power Weapon",
  nodeId: "effective-power-weapon",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/metric-effective-power",
} as const satisfies TemperMetricTree
