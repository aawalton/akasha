import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionEffectiveHealingCompanionHealingReceived = {
  id: "01a0df07-1cd6-72aa-9d15-b6fc56a8449a",
  type: "page-type/temper-metric-tree",
  slug: "companion-effective-healing-companion-healing-received",
  title: "Healing Received",
  nodeId: "companion-healing-received",
  nodeType: "metric",
  displayOrder: 3,
  parent: "temper-metric-tree/companion-category-companion-effective-healing",
  createdAt: "2026-09-26T18:43:00.438Z",
  updatedAt: "2026-09-26T18:43:39.000Z",
} as const satisfies TemperMetricTree
