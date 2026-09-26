import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const statusBleedWeaponDamage = {
  id: "01a0de67-c00c-7d87-bd0f-9a6016b66cff",
  type: "page-type/temper-metric",
  slug: "status-bleed-weapon-damage",
  title: "Status Bleed Weapon Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
