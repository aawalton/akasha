import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricOverloadDamage = {
  id: "019e2fcd-59a8-7cba-9531-b7831555beb7",
  type: "page-type/temper-metric-tree",
  slug: "metric-overload-damage",
  title: "Overload Damage",
  nodeId: "overload-damage",
  nodeType: "metric",
  displayOrder: 4,
  parent: "temper-metric-tree/subcategory-light-attacks",
} as const satisfies TemperMetricTree
