import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionEffectiveHealingCompanionCriticalChance = {
  id: "01a0df07-1cd6-7a37-bd89-e66a0feb0076",
  type: "page-type/temper-metric-tree",
  slug: "companion-effective-healing-companion-critical-chance",
  title: "Critical Chance",
  nodeId: "companion-critical-chance",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/companion-category-companion-effective-healing",
} as const satisfies TemperMetricTree
