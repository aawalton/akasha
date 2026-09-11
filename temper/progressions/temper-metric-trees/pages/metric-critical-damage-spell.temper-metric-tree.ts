import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricCriticalDamageSpell = {
  id: "019e2fcd-597a-70c8-9fbb-f4969e37d3ee",
  type: "temper-metric-tree",
  slug: "metric-critical-damage-spell",
  title: "Critical Damage Spell",
  nodeId: "critical-damage-spell",
  nodeType: "metric",
  displayOrder: 0,
  parent: "metric-critical-damage",
} as const satisfies TemperMetricTree
