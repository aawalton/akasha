import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricDamageTakenHa = {
  id: "019e2fcd-5a3f-70c0-8d43-62cd8e7a9e27",
  type: "temper-metric-tree",
  slug: "metric-damage-taken-ha",
  title: "Damage Taken Ha",
  nodeId: "damage-taken-ha",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-damage-taken-by-type",
} as const satisfies TemperMetricTree
