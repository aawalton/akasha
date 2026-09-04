import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricAttackCritDamageSpell = {
  id: "019e2fcd-5977-709a-ab59-e730b762a494",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-attack-crit-damage-spell",
  title: "Attack Crit Damage Spell",
  nodeId: "attack-crit-damage-spell",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-critical-damage",
} as const satisfies TemperMetricTree
