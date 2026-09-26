import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const laPhysicalWeaponDamage = {
  id: "01a0de67-c00a-7690-9c68-7aaf4d14ae02",
  type: "page-type/temper-metric",
  slug: "la-physical-weapon-damage",
  title: "LA Physical Weapon Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
