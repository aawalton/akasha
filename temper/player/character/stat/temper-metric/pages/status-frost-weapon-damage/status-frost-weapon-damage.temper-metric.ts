import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const statusFrostWeaponDamage = {
  id: "01a0de67-c00c-721a-9a80-8533a23751b0",
  type: "page-type/temper-metric",
  slug: "status-frost-weapon-damage",
  title: "Status Frost Weapon Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
