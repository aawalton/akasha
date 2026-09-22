import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricTargetWeaponPower = {
  id: "019e2fcd-5a97-7829-9d89-99c96e7e9e5c",
  type: "page-type/temper-metric-tree",
  slug: "metric-target-weapon-power",
  title: "Target Weapon Power",
  nodeId: "target-weapon-power",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/metric-target-power",
} as const satisfies TemperMetricTree
