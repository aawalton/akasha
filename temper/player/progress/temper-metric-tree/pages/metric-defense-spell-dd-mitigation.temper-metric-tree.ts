import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDefenseSpellDdMitigation = {
  id: "019e2fcd-5a48-79fc-8c06-589ea20bb524",
  type: "page-type/temper-metric-tree",
  slug: "metric-defense-spell-dd-mitigation",
  title: "Defense Spell Dd Mitigation",
  nodeId: "defense-spell-dd-mitigation",
  nodeType: "metric",
  displayOrder: 5,
  parent: "temper-metric-tree/subcategory-defense-mitigation",
} as const satisfies TemperMetricTree
