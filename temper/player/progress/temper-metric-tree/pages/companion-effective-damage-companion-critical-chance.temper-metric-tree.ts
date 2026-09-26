import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionEffectiveDamageCompanionCriticalChance = {
  id: "01a0df07-1cd6-7b1f-a54f-2622754907d3",
  type: "page-type/temper-metric-tree",
  slug: "companion-effective-damage-companion-critical-chance",
  title: "Critical Chance",
  nodeId: "companion-critical-chance",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/companion-category-companion-effective-damage",
} as const satisfies TemperMetricTree
