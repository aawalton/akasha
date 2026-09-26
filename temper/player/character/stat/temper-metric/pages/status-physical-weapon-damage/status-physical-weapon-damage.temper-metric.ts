import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const statusPhysicalWeaponDamage = {
  id: "01a0de67-c00c-7bcf-958f-28aa8b175c32",
  type: "page-type/temper-metric",
  slug: "status-physical-weapon-damage",
  title: "Status Physical Weapon Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
