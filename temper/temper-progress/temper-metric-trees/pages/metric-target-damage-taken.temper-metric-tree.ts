import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetDamageTaken = {
  id: "019e2fcd-5aa9-7304-9db8-69ac106c68b4",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-damage-taken",
  title: "Target Damage Taken",
  nodeId: "target-damage-taken",
  nodeType: "metric",
  displayOrder: 6,
  parent: "subcategory-target-toughness",
} as const satisfies TemperMetricTree
