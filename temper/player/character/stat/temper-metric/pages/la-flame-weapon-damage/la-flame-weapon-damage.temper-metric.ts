import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const laFlameWeaponDamage = {
  id: "01a0de67-c00a-7ad0-88ae-91ee8338dcb5",
  type: "page-type/temper-metric",
  slug: "la-flame-weapon-damage",
  title: "LA Flame Weapon Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
