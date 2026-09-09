import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricMountedWalkSpeed = {
  id: "019e2fcd-5a7f-7e9e-a250-4b4eba6bcce5",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-mounted-walk-speed",
  title: "Mounted Walk Speed",
  nodeId: "mounted-walk-speed",
  nodeType: "metric",
  displayOrder: 1,
  parent: "metric-mounted-speed",
} as const satisfies TemperMetricTree
