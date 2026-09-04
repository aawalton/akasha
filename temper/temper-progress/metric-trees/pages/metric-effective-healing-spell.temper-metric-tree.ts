import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricEffectiveHealingSpell = {
  id: "019e2fcd-5a5d-77b5-82cf-0cf7418a83c4",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-effective-healing-spell",
  title: "Effective Healing Spell",
  nodeId: "effective-healing-spell",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-effective-healing",
} as const satisfies TemperMetricTree
