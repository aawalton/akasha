import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricAttackSpellMitigation = {
  id: "019e2fcd-59e8-7902-a031-e462223043c9",
  type: "page-type/temper-metric-tree",
  slug: "metric-attack-spell-mitigation",
  title: "Attack Spell Mitigation",
  nodeId: "attack-spell-mitigation",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-mitigation",
} as const satisfies TemperMetricTree
