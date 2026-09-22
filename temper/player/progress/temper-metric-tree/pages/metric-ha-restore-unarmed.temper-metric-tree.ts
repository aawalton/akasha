import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHaRestoreUnarmed = {
  id: "019e2fcd-5a10-788f-9e73-a1aa4742b514",
  type: "page-type/temper-metric-tree",
  slug: "metric-ha-restore-unarmed",
  title: "Ha Restore Unarmed",
  nodeId: "ha-restore-unarmed",
  nodeType: "metric",
  displayOrder: 7,
  parent: "temper-metric-tree/subcategory-ha-restore",
} as const satisfies TemperMetricTree
