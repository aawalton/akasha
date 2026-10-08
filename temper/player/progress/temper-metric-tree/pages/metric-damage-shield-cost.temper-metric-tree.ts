import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageShieldCost = {
  id: "019e2fcd-5a4d-795e-8213-2549c7eb8ec2",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-shield-cost",
  title: "Damage Shield Cost",
  nodeId: "damage-shield-cost",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/subcategory-damage-shields",
  createdAt: "2026-05-16T08:00:47.693Z",
  updatedAt: "2026-09-22T20:46:12.000Z",
} as const satisfies TemperMetricTree
