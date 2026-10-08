import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageTakenTrial = {
  id: "019e2fcd-5a3a-766e-be35-e33bbb10b9af",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-taken-trial",
  title: "Damage Taken (Trial)",
  nodeId: "damage-taken-trial",
  nodeType: "metric",
  displayOrder: 5,
  parent: "temper-metric-tree/subcategory-damage-taken",
  createdAt: "2026-05-16T08:00:47.674Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
