import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const statusShockWeaponDamage = {
  id: "01a0de67-c00c-7723-94bf-2aa946ff323f",
  type: "page-type/temper-metric",
  slug: "status-shock-weapon-damage",
  title: "Status Shock Weapon Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.460Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
