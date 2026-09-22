import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricMartialAbilityStatusChance = {
  id: "019e2fcd-59e1-7a4e-95b0-9325bcdef0fe",
  type: "page-type/temper-metric-tree",
  slug: "metric-martial-ability-status-chance",
  title: "Martial Ability Status Chance",
  nodeId: "martial-ability-status-chance",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-martial-status-chance",
} as const satisfies TemperMetricTree
