import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionGroupHealing = {
  id: "01a0df07-1cd6-7cea-ae53-4aa60e3fd971",
  type: "page-type/temper-metric-tree",
  slug: "companion-group-healing",
  title: "Healing",
  nodeId: "healing",
  nodeType: "companion-group",
  displayOrder: 2,
  parent: "temper-metric-tree/companion-stats",
  createdAt: "2026-09-26T18:43:00.438Z",
  updatedAt: "2026-09-26T18:43:39.000Z",
} as const satisfies TemperMetricTree
