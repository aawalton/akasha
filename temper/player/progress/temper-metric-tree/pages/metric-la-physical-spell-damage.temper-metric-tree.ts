import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricLaPhysicalSpellDamage = {
  id: "019e2fcd-5996-749a-be02-c6ba466b42a1",
  type: "page-type/temper-metric-tree",
  slug: "metric-la-physical-spell-damage",
  title: "La Physical Spell Damage",
  nodeId: "la-physical-spell-damage",
  nodeType: "metric",
  displayOrder: 6,
  parent: "temper-metric-tree/subcategory-la-power",
} as const satisfies TemperMetricTree
