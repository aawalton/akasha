import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageTakenTrial = {
  id: "019e2fcd-5a3a-766e-be35-e33bbb10b9af",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-taken-trial",
  title: "Damage Taken Trial",
  nodeId: "damage-taken-trial",
  nodeType: "metric",
  displayOrder: 5,
  parent: "subcategory-damage-taken",
} as const satisfies TemperMetricTree
