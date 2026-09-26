import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const haMagicWeaponDamage = {
  id: "01a0de67-c009-7752-80ee-63d5a0b271a7",
  type: "page-type/temper-metric",
  slug: "ha-magic-weapon-damage",
  title: "HA Magic Weapon Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
