import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricAttackCritDamageSpell = {
  id: "019e2fcd-5977-709a-ab59-e730b762a494",
  type: "page-type/temper-metric-tree",
  slug: "metric-attack-crit-damage-spell",
  title: "Attack Spell Critical Damage",
  nodeId: "attack-crit-damage-spell",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-critical-damage",
  createdAt: "2026-05-16T08:00:47.479Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
