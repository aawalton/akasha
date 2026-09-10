import type { TemperMetricTree } from "../temper-metric-tree.page-type.types.ts"

export const metricMountedRunSpeed = {
  id: "019e2fcd-5a7e-7b37-8fff-31c0db7636e9",
  pageTypeSlug: "temper-metric-tree",
  type: "temper-metric-tree",
  slug: "metric-mounted-run-speed",
  title: "Mounted Run Speed",
  nodeId: "mounted-run-speed",
  nodeType: "metric",
  displayOrder: 0,
  parent: "metric-mounted-speed",
} as const satisfies TemperMetricTree
