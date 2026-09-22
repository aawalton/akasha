import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDefenseSpellAoeMitigation = {
  id: "019e2fcd-5a47-76f0-84fd-396ab05bc474",
  type: "page-type/temper-metric-tree",
  slug: "metric-defense-spell-aoe-mitigation",
  title: "Defense Spell Aoe Mitigation",
  nodeId: "defense-spell-aoe-mitigation",
  nodeType: "metric",
  displayOrder: 4,
  parent: "temper-metric-tree/subcategory-defense-mitigation",
} as const satisfies TemperMetricTree
