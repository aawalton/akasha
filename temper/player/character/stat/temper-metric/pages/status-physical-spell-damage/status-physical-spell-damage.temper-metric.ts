import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const statusPhysicalSpellDamage = {
  id: "01a0de67-c00c-7558-a41e-64dacea739af",
  type: "page-type/temper-metric",
  slug: "status-physical-spell-damage",
  title: "Status Physical Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
