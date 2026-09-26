import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const haPhysicalWeaponDamage = {
  id: "01a0de67-c00a-70e5-9897-47b4191aae47",
  type: "page-type/temper-metric",
  slug: "ha-physical-weapon-damage",
  title: "HA Physical Weapon Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
