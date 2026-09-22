import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricPenetrationPhysical = {
  id: "019e2fcd-5980-702c-b97e-9ec2e7152321",
  type: "page-type/temper-metric-tree",
  slug: "metric-penetration-physical",
  title: "Penetration Physical",
  nodeId: "penetration-physical",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/metric-penetration",
} as const satisfies TemperMetricTree
