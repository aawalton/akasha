import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const haShockWeaponDamage = {
  id: "01a0de67-c00a-7825-86f1-16e203c5351d",
  type: "page-type/temper-metric",
  slug: "ha-shock-weapon-damage",
  title: "HA Shock Weapon Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
