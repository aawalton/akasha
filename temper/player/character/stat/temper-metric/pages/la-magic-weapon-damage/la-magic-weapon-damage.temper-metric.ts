import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const laMagicWeaponDamage = {
  id: "01a0de67-c00a-7f96-99d9-4aaea55c9a1d",
  type: "page-type/temper-metric",
  slug: "la-magic-weapon-damage",
  title: "LA Magic Weapon Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.458Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
