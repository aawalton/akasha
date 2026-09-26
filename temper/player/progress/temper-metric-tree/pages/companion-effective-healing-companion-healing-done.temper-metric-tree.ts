import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionEffectiveHealingCompanionHealingDone = {
  id: "01a0df07-1cd6-7a43-a549-b974cb28c785",
  type: "page-type/temper-metric-tree",
  slug: "companion-effective-healing-companion-healing-done",
  title: "Healing Done",
  nodeId: "companion-healing-done",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/companion-category-companion-effective-healing",
} as const satisfies TemperMetricTree
