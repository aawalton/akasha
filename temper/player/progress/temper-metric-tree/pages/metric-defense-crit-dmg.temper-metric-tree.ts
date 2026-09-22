import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDefenseCritDmg = {
  id: "019e2fcd-5a42-7a67-9457-5588e44370b9",
  type: "page-type/temper-metric-tree",
  slug: "metric-defense-crit-dmg",
  title: "Defense Crit Dmg",
  nodeId: "defense-crit-dmg",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-defense-mitigation",
} as const satisfies TemperMetricTree
