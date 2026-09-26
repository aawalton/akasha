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
} as const satisfies TemperMetricTree
