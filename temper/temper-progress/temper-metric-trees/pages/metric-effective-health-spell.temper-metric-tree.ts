import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricEffectiveHealthSpell = {
  id: "019e2fcd-5a1b-7d89-82fe-a072d4e7066f",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-effective-health-spell",
  title: "Effective Health Spell",
  nodeId: "effective-health-spell",
  nodeType: "metric",
  displayOrder: 1,
  parent: "category-toughness",
  useAccentColor: true,
} as const satisfies TemperMetricTree
