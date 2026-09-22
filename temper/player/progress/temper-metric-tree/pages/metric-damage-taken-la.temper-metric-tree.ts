import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricDamageTakenLa = {
  id: "019e2fcd-5a40-74d8-a048-4b436b053863",
  type: "page-type/temper-metric-tree",
  slug: "metric-damage-taken-la",
  title: "Damage Taken La",
  nodeId: "damage-taken-la",
  nodeType: "metric",
  displayOrder: 3,
  parent: "temper-metric-tree/subcategory-damage-taken-by-type",
} as const satisfies TemperMetricTree
