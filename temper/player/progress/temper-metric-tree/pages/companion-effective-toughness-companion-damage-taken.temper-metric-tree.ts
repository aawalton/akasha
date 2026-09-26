import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionEffectiveToughnessCompanionDamageTaken = {
  id: "01a0df07-1cd6-7e09-b821-a3758d7acbd6",
  type: "page-type/temper-metric-tree",
  slug: "companion-effective-toughness-companion-damage-taken",
  title: "Damage Taken",
  nodeId: "companion-damage-taken",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/companion-category-companion-effective-toughness",
} as const satisfies TemperMetricTree
