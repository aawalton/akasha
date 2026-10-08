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
  createdAt: "2026-05-16T08:00:47.767Z",
  updatedAt: "2026-09-22T20:46:12.000Z",
} as const satisfies TemperMetricTree
