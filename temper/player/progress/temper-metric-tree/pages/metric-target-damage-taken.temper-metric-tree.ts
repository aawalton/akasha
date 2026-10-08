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
  createdAt: "2026-05-16T08:00:47.785Z",
  updatedAt: "2026-09-22T20:46:12.000Z",
} as const satisfies TemperMetricTree
