import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricEffectiveHealthPhysical = {
  id: "019e2fcd-5a1a-7b1c-acfb-b2973d49c013",
  type: "page-type/temper-metric-tree",
  slug: "metric-effective-health-physical",
  title: "Effective Health Physical",
  nodeId: "effective-health-physical",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/category-toughness",
  useAccentColor: true,
} as const satisfies TemperMetricTree
