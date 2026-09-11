import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricDamageShieldCost = {
  id: "019e2fcd-5a4d-795e-8213-2549c7eb8ec2",
  type: "temper-metric-tree",
  slug: "metric-damage-shield-cost",
  title: "Damage Shield Cost",
  nodeId: "damage-shield-cost",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-damage-shields",
} as const satisfies TemperMetricTree
