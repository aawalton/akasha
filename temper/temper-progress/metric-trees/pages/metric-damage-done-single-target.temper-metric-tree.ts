import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageDoneSingleTarget = {
  id: "019e2fcd-5974-71a3-8297-b3631b07592e",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-done-single-target",
  title: "Damage Done Single Target",
  nodeId: "damage-done-single-target",
  nodeType: "metric",
  displayOrder: 8,
  parent: "subcategory-damage-done",
} as const satisfies TemperMetricTree
