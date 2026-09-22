import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHealingDoneAoe = {
  id: "019e2fcd-5a53-7891-9ccc-7a53880e196b",
  type: "page-type/temper-metric-tree",
  slug: "metric-healing-done-aoe",
  title: "Healing Done Aoe",
  nodeId: "healing-done-aoe",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-healing-done",
} as const satisfies TemperMetricTree
