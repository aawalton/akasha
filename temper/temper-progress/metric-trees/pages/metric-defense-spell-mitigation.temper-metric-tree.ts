import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDefenseSpellMitigation = {
  id: "019e2fcd-5a4a-70e7-8d20-d963ac5de1d6",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-defense-spell-mitigation",
  title: "Defense Spell Mitigation",
  nodeId: "defense-spell-mitigation",
  nodeType: "metric",
  displayOrder: 6,
  parent: "subcategory-defense-mitigation",
} as const satisfies TemperMetricTree
