import type { TemperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.types.ts"

export const companionEffectiveDamageCompanionWeaponDamage = {
  id: "01a0df07-1cd6-7c3c-96de-eb7da1c2805b",
  type: "page-type/temper-metric-tree",
  slug: "companion-effective-damage-companion-weapon-damage",
  title: "Weapon Damage",
  nodeId: "companion-weapon-damage",
  nodeType: "metric",
  displayOrder: 0,
  parent: "temper-metric-tree/companion-category-companion-effective-damage",
} as const satisfies TemperMetricTree
