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
  createdAt: "2026-09-26T15:48:56.458Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
