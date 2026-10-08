import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const haFlameWeaponDamage = {
  id: "01a0de67-c009-7d22-acf4-bb2332e452d6",
  type: "page-type/temper-metric",
  slug: "ha-flame-weapon-damage",
  title: "HA Flame Weapon Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.457Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
