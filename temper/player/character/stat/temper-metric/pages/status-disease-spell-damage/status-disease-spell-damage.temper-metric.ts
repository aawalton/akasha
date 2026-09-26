import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const statusDiseaseSpellDamage = {
  id: "01a0de67-c00c-73df-9232-6975e25af907",
  type: "page-type/temper-metric",
  slug: "status-disease-spell-damage",
  title: "Status Disease Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
