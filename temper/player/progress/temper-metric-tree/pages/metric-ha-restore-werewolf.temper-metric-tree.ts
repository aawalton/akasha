import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricHaRestoreWerewolf = {
  id: "019e2fcd-5a12-703f-a38c-b68836517d0b",
  type: "page-type/temper-metric-tree",
  slug: "metric-ha-restore-werewolf",
  title: "Ha Restore Werewolf",
  nodeId: "ha-restore-werewolf",
  nodeType: "metric",
  displayOrder: 8,
  parent: "temper-metric-tree/subcategory-ha-restore",
} as const satisfies TemperMetricTree
