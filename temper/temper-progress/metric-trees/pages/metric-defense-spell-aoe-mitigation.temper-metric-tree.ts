import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDefenseSpellAoeMitigation = {
  id: "019e2fcd-5a47-76f0-84fd-396ab05bc474",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-defense-spell-aoe-mitigation",
  title: "Defense Spell Aoe Mitigation",
  nodeId: "defense-spell-aoe-mitigation",
  nodeType: "metric",
  displayOrder: 4,
  parent: "subcategory-defense-mitigation",
} as const satisfies TemperMetricTree
