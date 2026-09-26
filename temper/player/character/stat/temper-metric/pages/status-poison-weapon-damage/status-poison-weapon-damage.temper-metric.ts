import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const statusPoisonWeaponDamage = {
  id: "01a0de67-c00c-700d-b58b-39592ffc5685",
  type: "page-type/temper-metric",
  slug: "status-poison-weapon-damage",
  title: "Status Poison Weapon Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
