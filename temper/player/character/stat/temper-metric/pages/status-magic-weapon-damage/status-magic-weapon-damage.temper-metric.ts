import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const statusMagicWeaponDamage = {
  id: "01a0de67-c00c-7749-a17c-40c1a121cba7",
  type: "page-type/temper-metric",
  slug: "status-magic-weapon-damage",
  title: "Status Magic Weapon Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
