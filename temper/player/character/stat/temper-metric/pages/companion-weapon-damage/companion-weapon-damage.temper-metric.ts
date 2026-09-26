import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionWeaponDamage = {
  id: "01a0df07-1cd5-7b7a-b752-1cba6ccba670",
  type: "page-type/temper-metric",
  slug: "companion-weapon-damage",
  title: "Weapon Damage",
  subject: "companion",
  valueType: "integer",
  effectType: "integer",
} as const satisfies TemperMetric
