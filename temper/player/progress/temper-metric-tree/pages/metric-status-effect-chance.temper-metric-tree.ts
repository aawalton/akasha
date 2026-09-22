import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricStatusEffectChance = {
  id: "019e2fcd-59cc-7dc4-abc0-1532ba29268d",
  type: "page-type/temper-metric-tree",
  slug: "metric-status-effect-chance",
  title: "Status Effect Chance",
  nodeId: "status-effect-chance",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-status-effects",
} as const satisfies TemperMetricTree
