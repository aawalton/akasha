import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const haFrostWeaponDamage = {
  id: "01a0de67-c009-7855-81af-ab1742f302d5",
  type: "page-type/temper-metric",
  slug: "ha-frost-weapon-damage",
  title: "HA Frost Weapon Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
