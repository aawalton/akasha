import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageTakenFromArea = {
  id: "019e2fcd-5a39-73f2-89b5-e1d4279ca9a0",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-taken-from-area",
  title: "Damage Taken From Area",
  nodeId: "damage-taken-from-area",
  nodeType: "metric",
  displayOrder: 4,
  parent: "subcategory-damage-taken",
} as const satisfies TemperMetricTree
