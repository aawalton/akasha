import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHealingEffectivePowerBase = {
  id: "019e2fcd-5a5f-7e61-84a3-36c7c6787025",
  type: "page-type/temper-metric-tree",
  slug: "metric-healing-effective-power-base",
  title: "Healing Effective Power Base",
  nodeId: "healing-effective-power-base",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-healing-power",
} as const satisfies TemperMetricTree
