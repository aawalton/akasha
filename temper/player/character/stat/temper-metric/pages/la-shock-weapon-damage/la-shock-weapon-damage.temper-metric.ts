import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const laShockWeaponDamage = {
  id: "01a0de67-c00b-70c5-bef2-80c3c9eae6ad",
  type: "page-type/temper-metric",
  slug: "la-shock-weapon-damage",
  title: "LA Shock Weapon Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.459Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
