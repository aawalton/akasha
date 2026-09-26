import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionEffectiveDamageCompanionPenetration = {
  id: "01a0df07-1cd6-7272-bce8-915103596e83",
  type: "page-type/temper-metric-tree",
  slug: "companion-effective-damage-companion-penetration",
  title: "Penetration",
  nodeId: "companion-penetration",
  nodeType: "metric",
  displayOrder: 5,
  parent: "temper-metric-tree/companion-category-companion-effective-damage",
} as const satisfies TemperMetricTree
