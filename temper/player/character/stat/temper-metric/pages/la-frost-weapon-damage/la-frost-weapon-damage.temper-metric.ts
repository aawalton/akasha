import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const laFrostWeaponDamage = {
  id: "01a0de67-c00a-7c3e-9d95-7b77b206ef0d",
  type: "page-type/temper-metric",
  slug: "la-frost-weapon-damage",
  title: "LA Frost Weapon Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
