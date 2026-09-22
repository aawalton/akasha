import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricEffectivePowerSpell = {
  id: "019e2fcd-595e-7aeb-bb30-eba69d201501",
  type: "page-type/temper-metric-tree",
  slug: "metric-effective-power-spell",
  title: "Effective Power Spell",
  nodeId: "effective-power-spell",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/metric-effective-power",
} as const satisfies TemperMetricTree
