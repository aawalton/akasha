import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricEffectiveHealth = {
  id: "01a15984-8ccd-72e6-84c0-1f8d0f1efc23",
  type: "page-type/temper-metric-tree",
  slug: "metric-effective-health",
  title: "Effective Health",
  nodeId: "effective-health",
  nodeType: "metric",
  displayOrder: 9,
  parent: "temper-metric-tree/category-toughness",
  useAccentColor: true,
  createdAt: "2026-10-20T13:33:41.452Z",
  updatedAt: "2026-10-20T13:33:41.452Z",
} as const satisfies TemperMetricTree
