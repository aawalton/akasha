import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricStaminaRecovery = {
  id: "019e2fcd-59fd-7ecb-8a3d-903974b95b65",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-stamina-recovery",
  title: "Stamina Recovery",
  nodeId: "stamina-recovery",
  nodeType: "metric",
  displayOrder: 5,
  parent: "subcategory-stamina",
} as const satisfies TemperMetricTree
