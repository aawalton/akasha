import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricPowerWeapon = {
  id: "019e2fcd-5966-7853-bec8-fb9e5d908451",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-power-weapon",
  title: "Power Weapon",
  nodeId: "power-weapon",
  nodeType: "metric",
  displayOrder: 1,
  parent: "metric-power",
} as const satisfies TemperMetricTree
