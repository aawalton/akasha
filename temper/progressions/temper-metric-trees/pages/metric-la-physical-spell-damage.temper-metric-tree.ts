import type { TemperMetricTree } from "akasha/temper/progressions/temper-metric-trees/temper-metric-tree.page-type.types.ts"

export const metricLaPhysicalSpellDamage = {
  id: "019e2fcd-5996-749a-be02-c6ba466b42a1",
  type: "temper-metric-tree",
  slug: "metric-la-physical-spell-damage",
  title: "La Physical Spell Damage",
  nodeId: "la-physical-spell-damage",
  nodeType: "metric",
  displayOrder: 6,
  parent: "subcategory-la-power",
} as const satisfies TemperMetricTree
