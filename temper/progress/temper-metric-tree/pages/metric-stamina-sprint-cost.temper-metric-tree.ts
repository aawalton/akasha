import type { TemperMetricTree } from "akasha/temper/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricStaminaSprintCost = {
  id: "019e2fcd-5a00-7aca-a831-d8160616dbb9",
  type: "page-type/temper-metric-tree",
  slug: "metric-stamina-sprint-cost",
  title: "Stamina Sprint Cost",
  nodeId: "stamina-sprint-cost",
  nodeType: "metric",
  displayOrder: 7,
  parent: "subcategory-stamina",
} as const satisfies TemperMetricTree
