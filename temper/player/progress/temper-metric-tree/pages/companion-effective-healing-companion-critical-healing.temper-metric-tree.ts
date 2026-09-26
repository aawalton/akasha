import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionEffectiveHealingCompanionCriticalHealing = {
  id: "01a0df07-1cd6-7ec7-8944-43e79ea8c1ec",
  type: "page-type/temper-metric-tree",
  slug: "companion-effective-healing-companion-critical-healing",
  title: "Critical Healing",
  nodeId: "companion-critical-healing",
  nodeType: "metric",
  displayOrder: 2,
  parent: "temper-metric-tree/companion-category-companion-effective-healing",
} as const satisfies TemperMetricTree
