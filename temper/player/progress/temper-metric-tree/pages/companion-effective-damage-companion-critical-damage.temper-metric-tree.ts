import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionEffectiveDamageCompanionCriticalDamage = {
  id: "01a0df07-1cd6-7a6a-8672-917dd6a09843",
  type: "page-type/temper-metric-tree",
  slug: "companion-effective-damage-companion-critical-damage",
  title: "Critical Damage",
  nodeId: "companion-critical-damage",
  nodeType: "metric",
  displayOrder: 3,
  parent: "temper-metric-tree/companion-category-companion-effective-damage",
} as const satisfies TemperMetricTree
