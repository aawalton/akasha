import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionEffectiveDamageCompanionDamageDone = {
  id: "01a0df07-1cd6-7574-9080-8fbb42576e0a",
  type: "page-type/temper-metric-tree",
  slug: "companion-effective-damage-companion-damage-done",
  title: "Damage Done",
  nodeId: "companion-damage-done",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/companion-category-companion-effective-damage",
} as const satisfies TemperMetricTree
