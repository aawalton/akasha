import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDefenseSpellMitigation = {
  id: "019e2fcd-5a4a-70e7-8d20-d963ac5de1d6",
  type: "page-type/temper-metric-tree",
  slug: "metric-defense-spell-mitigation",
  title: "Defense Spell Mitigation",
  nodeId: "defense-spell-mitigation",
  nodeType: "metric",
  displayOrder: 6,
  parent: "temper-metric-tree/subcategory-defense-mitigation",
  createdAt: "2026-05-16T08:00:47.690Z",
  updatedAt: "2026-09-22T20:46:12.000Z",
} as const satisfies TemperMetricTree
