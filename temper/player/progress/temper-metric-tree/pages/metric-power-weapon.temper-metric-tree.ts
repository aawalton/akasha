import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricPowerWeapon = {
  id: "019e2fcd-5966-7853-bec8-fb9e5d908451",
  type: "page-type/temper-metric-tree",
  slug: "metric-power-weapon",
  title: "Weapon Power",
  nodeId: "power-weapon",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/metric-power",
  createdAt: "2026-05-16T08:00:47.462Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
