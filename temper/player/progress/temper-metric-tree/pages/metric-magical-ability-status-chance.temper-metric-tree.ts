import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricMagicalAbilityStatusChance = {
  id: "019e2fcd-59da-7e15-bed3-c521817dfe0e",
  type: "page-type/temper-metric-tree",
  slug: "metric-magical-ability-status-chance",
  title: "Magical Ability Status Chance",
  nodeId: "magical-ability-status-chance",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-magical-status-chance",
} as const satisfies TemperMetricTree
