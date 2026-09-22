import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricBashDamage = {
  id: "019e2fcd-5981-7fad-84e8-76469b469f89",
  type: "page-type/temper-metric-tree",
  slug: "metric-bash-damage",
  title: "Bash Damage",
  nodeId: "bash-damage",
  nodeType: "metric",
  displayOrder: 6,
  parent: "temper-metric-tree/category-damage",
} as const satisfies TemperMetricTree
