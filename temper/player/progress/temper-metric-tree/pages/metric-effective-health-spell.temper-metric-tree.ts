import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricEffectiveHealthSpell = {
  id: "019e2fcd-5a1b-7d89-82fe-a072d4e7066f",
  type: "page-type/temper-metric-tree",
  slug: "metric-effective-health-spell",
  title: "Effective Health (Spell)",
  nodeId: "effective-health-spell",
  nodeType: "metric",
  displayOrder: 1,
  parent: "temper-metric-tree/category-toughness",
  useAccentColor: true,
  createdAt: "2026-05-16T08:00:47.643Z",
  updatedAt: "2026-09-26T15:51:54.000Z",
} as const satisfies TemperMetricTree
