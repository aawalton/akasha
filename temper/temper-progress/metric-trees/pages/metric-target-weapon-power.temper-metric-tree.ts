import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetWeaponPower = {
  id: "019e2fcd-5a97-7829-9d89-99c96e7e9e5c",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-weapon-power",
  title: "Target Weapon Power",
  nodeId: "target-weapon-power",
  nodeType: "metric",
  displayOrder: 1,
  parent: "metric-target-power",
} as const satisfies TemperMetricTree
