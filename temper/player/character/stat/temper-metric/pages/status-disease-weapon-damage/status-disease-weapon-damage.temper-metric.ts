import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const statusDiseaseWeaponDamage = {
  id: "01a0de67-c00c-72fa-baf5-c39175adfde7",
  type: "page-type/temper-metric",
  slug: "status-disease-weapon-damage",
  title: "Status Disease Weapon Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
