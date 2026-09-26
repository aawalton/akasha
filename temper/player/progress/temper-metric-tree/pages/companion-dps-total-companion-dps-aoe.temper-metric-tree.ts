import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionDpsTotalCompanionDpsAoe = {
  id: "01a0df07-1cd5-7c5c-8c9d-a7bc246906a4",
  type: "page-type/temper-metric-tree",
  slug: "companion-dps-total-companion-dps-aoe",
  title: "Per-Target Damage Per Second",
  nodeId: "companion-dps-aoe",
  nodeType: "metric",
  displayOrder: 3,
  parent: "temper-metric-tree/companion-category-companion-dps-total",
} as const satisfies TemperMetricTree
