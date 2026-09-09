import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricPotionCooldown = {
  id: "019e2fcd-5ab6-71c3-ae77-70a452f219df",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-potion-cooldown",
  title: "Potion Cooldown",
  nodeId: "potion-cooldown",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-potions",
} as const satisfies TemperMetricTree
