import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricPoisonedDamage = {
  id: "019e2fcd-59d7-795c-9656-9218565d6c18",
  type: "page-type/temper-metric-tree",
  slug: "metric-poisoned-damage",
  title: "Poisoned Damage",
  nodeId: "poisoned-damage",
  nodeType: "metric",
  displayOrder: 6,
  parent: "temper-metric-tree/subcategory-status-damage",
  createdAt: "2026-05-16T08:00:47.575Z",
  updatedAt: "2026-09-22T20:46:12.000Z",
} as const satisfies TemperMetricTree
