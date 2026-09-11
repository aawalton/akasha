import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricDamageTakenFromArea = {
  id: "019e2fcd-5a39-73f2-89b5-e1d4279ca9a0",
  type: "temper-metric-tree",
  slug: "metric-damage-taken-from-area",
  title: "Damage Taken From Area",
  nodeId: "damage-taken-from-area",
  nodeType: "metric",
  displayOrder: 4,
  parent: "subcategory-damage-taken",
} as const satisfies TemperMetricTree
