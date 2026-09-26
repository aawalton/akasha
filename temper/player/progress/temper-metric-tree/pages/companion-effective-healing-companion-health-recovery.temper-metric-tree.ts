import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionEffectiveHealingCompanionHealthRecovery = {
  id: "01a0df07-1cd6-7901-adfb-9708b82b3c77",
  type: "page-type/temper-metric-tree",
  slug: "companion-effective-healing-companion-health-recovery",
  title: "Health Recovery",
  nodeId: "companion-health-recovery",
  nodeType: "metric",
  displayOrder: 4,
  parent: "temper-metric-tree/companion-category-companion-effective-healing",
} as const satisfies TemperMetricTree
