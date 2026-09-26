import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const statusFlameWeaponDamage = {
  id: "01a0de67-c00c-78ea-a9f3-76fe60f7a6d0",
  type: "page-type/temper-metric",
  slug: "status-flame-weapon-damage",
  title: "Status Flame Weapon Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
