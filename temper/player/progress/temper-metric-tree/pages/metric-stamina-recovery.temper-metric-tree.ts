import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricStaminaRecovery = {
  id: "019e2fcd-59fd-7ecb-8a3d-903974b95b65",
  type: "page-type/temper-metric-tree",
  slug: "metric-stamina-recovery",
  title: "Stamina Recovery",
  nodeId: "stamina-recovery",
  nodeType: "metric",
  displayOrder: 5,
  parent: "temper-metric-tree/subcategory-stamina",
  createdAt: "2026-05-16T08:00:47.613Z",
  updatedAt: "2026-09-22T20:46:12.000Z",
} as const satisfies TemperMetricTree
