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
  createdAt: "2026-09-26T15:48:56.457Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
