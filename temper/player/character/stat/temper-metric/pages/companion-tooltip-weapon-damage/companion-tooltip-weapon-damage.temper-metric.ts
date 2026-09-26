import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionTooltipWeaponDamage = {
  id: "01a0df07-1cd5-7103-b392-c4be6d92b674",
  type: "page-type/temper-metric",
  slug: "companion-tooltip-weapon-damage",
  title: "Tooltip Weapon Damage",
  subject: "companion",
  valueType: "integer",
  formula: "ts",
} as const satisfies TemperMetric
