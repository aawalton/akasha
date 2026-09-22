import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const metricPotionCooldown = {
  id: "019e2fcd-5ab6-71c3-ae77-70a452f219df",
  type: "page-type/temper-metric-tree",
  slug: "metric-potion-cooldown",
  title: "Potion Cooldown",
  nodeId: "potion-cooldown",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/subcategory-potions",
} as const satisfies TemperMetricTree
