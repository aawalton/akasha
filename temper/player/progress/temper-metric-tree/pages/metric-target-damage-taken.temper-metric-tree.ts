import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricTargetDamageTaken = {
  id: "019e2fcd-5aa9-7304-9db8-69ac106c68b4",
  type: "page-type/temper-metric-tree",
  slug: "metric-target-damage-taken",
  title: "Target Damage Taken",
  nodeId: "target-damage-taken",
  nodeType: "metric",
  displayOrder: 6,
  parent: "temper-metric-tree/subcategory-target-toughness",
} as const satisfies TemperMetricTree
