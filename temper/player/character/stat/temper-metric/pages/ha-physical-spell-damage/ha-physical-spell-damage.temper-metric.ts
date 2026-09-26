import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const haPhysicalSpellDamage = {
  id: "01a0de67-c00a-7280-bc4d-a5e7207f4ed5",
  type: "page-type/temper-metric",
  slug: "ha-physical-spell-damage",
  title: "HA Physical Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
