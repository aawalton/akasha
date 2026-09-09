import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricBashDamage = {
  id: "019e2fcd-5981-7fad-84e8-76469b469f89",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-bash-damage",
  title: "Bash Damage",
  nodeId: "bash-damage",
  nodeType: "metric",
  displayOrder: 6,
  parent: "category-damage",
} as const satisfies TemperMetricTree
