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
  createdAt: "2026-09-26T15:48:56.460Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
