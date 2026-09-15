import type { TemperMetricTree } from "akasha/temper/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricPowerWeapon = {
  id: "019e2fcd-5966-7853-bec8-fb9e5d908451",
  type: "page-type/temper-metric-tree",
  slug: "metric-power-weapon",
  title: "Power Weapon",
  nodeId: "power-weapon",
  nodeType: "metric",
  displayOrder: 1,
  parent: "metric-power",
} as const satisfies TemperMetricTree
