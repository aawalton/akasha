import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricPowerSpell = {
  id: "019e2fcd-5964-77ae-b365-a40ef16578b7",
  type: "page-type/temper-metric-tree",
  slug: "metric-power-spell",
  title: "Power Spell",
  nodeId: "power-spell",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/metric-power",
} as const satisfies TemperMetricTree
