import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageDoneTrial = {
  id: "019e2fcd-5975-717b-aea1-f91f7f1bbe74",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-done-trial",
  title: "Damage Done Trial",
  nodeId: "damage-done-trial",
  nodeType: "metric",
  displayOrder: 9,
  parent: "temper-metric-tree/subcategory-damage-done",
} as const satisfies TemperMetricTree
